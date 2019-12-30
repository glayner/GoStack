import { startOfHour, format, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import User from '../models/User';
import Appointment from '../models/Appointment';

import Notification from '../schemas/Notifications';

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    // check if user is create appointments for your self
    if (provider_id === user_id) {
      throw new Error('You cant create appointments for your self');
    }

    // check if provider_id is provider
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!isProvider) {
      throw new Error('You only create appointments with providers');
    }
    // check for past dates
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      throw new Error('Past dates are not permitted');
    }

    // check date availability
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    if (checkAvailability) {
      throw new Error('Appointment date is not available');
    }

    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date: hourStart,
    });
    // notificar prestador de serviço
    const user = await User.findByPk(user_id);
    const formattedDate = format(hourStart, "'dia' dd 'de' MMM', às' H:mm'h'", {
      locale: pt,
    });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return appointment;
  }
}

export default new CreateAppointmentService();

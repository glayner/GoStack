import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import BackGround from '~/components/Background';
import Appointment from '~/components/Appointment';

import {Container, Title, List} from './styles';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('appointments');

      setAppointments(response.data);
    }

    loadAppointments();
  }, []);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {...appointment, canceled_at: response.data.canceled_at}
          : appointment,
      ),
    );
  }

  return (
    <BackGround>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </BackGround>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamento',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({tintColor}) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigationFocus} from 'react-navigation';

import api from '~/services/api';
import BackGround from '~/components/Background';
import Appointment from '~/components/Appointment';

import {Container, Title, List} from './styles';

function Dashboard({isFocused}) {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('appointments');

    setAppointments(response.data);
  }
  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

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

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);

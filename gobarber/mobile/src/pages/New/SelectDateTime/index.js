import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import BackGround from '~/components/Background';
import DateInput from '~/components/DateInput';  // eslint-disable-line

import {Container, HourList, Hour, Title} from './styles';

export default function SelectDateTime({navigation}) {
  const provider = navigation.getParam('provider');

  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
    }
    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {provider, time});
  }

  return (
    <BackGround>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({item}) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}>
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </BackGround>
  );
}

SelectDateTime.navigationOptions = ({navigation}) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});

SelectDateTime.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};

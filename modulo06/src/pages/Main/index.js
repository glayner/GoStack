import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  DeleteButton,
  Buttons,
} from './styles';

export default class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
    error: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({users: JSON.parse(users)});
    }
  }

  componentDidUpdate(_, prevState) {
    const {users} = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const {users, newUser} = this.state;
    this.setState({loading: true, error: false});
    try {
      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
      });
    } catch (err) {
      this.setState({error: true});
    } finally {
      this.setState({
        loading: false,
      });
    }

    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const {navigation} = this.props;

    navigation.navigate('User', {user});
  };

  handleDelete = user => {
    const {users} = this.state;
    this.setState({
      users: users.filter(u => u.login !== user.login),
    });
  };

  static navigationOptions = {
    title: 'Usuários',
  };

  render() {
    const {users, newUser, loading, error} = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false} // não corrigir texto automaticamente
            autoCapitalize="none" // não colocar no maiusculo automaticamente
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
            error={error}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login} // função que vai pegar cada um dos usuarios temos que retornar qual é o item unico dentro desse usuario
          renderItem={({item}) => (
            <User>
              <Avatar source={{uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <Buttons>
                <ProfileButton onPress={() => this.handleNavigate(item)}>
                  <ProfileButtonText>Ver perfil</ProfileButtonText>
                </ProfileButton>
                <DeleteButton onPress={() => this.handleDelete(item)}>
                  <Icon name="remove" size={20} color="#FFF" />
                </DeleteButton>
              </Buttons>
            </User>
          )}
        />
      </Container>
    );
  }
}

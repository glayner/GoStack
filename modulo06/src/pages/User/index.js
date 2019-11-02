import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    page: 1,
    perPage: 10,
    more: true,
  };

  async componentDidMount() {
    this.setState({loading: true, more: true});
    this.loadStars();
  }

  loadStars = async () => {
    const {navigation} = this.props;
    const {stars, page, perPage} = this.state;
    const user = navigation.getParam('user');

    const response = await api.get(
      `/users/${user.login}/starred?per_page=${perPage}&page=${page}`
    );
    if (response.data.length === 0) {
      this.setState({more: false, loading: false});
    } else {
      this.setState({
        stars: [...stars, ...response.data],
        page: page + 1,
        loading: false,
      });
    }
  };

  renderFooter = () => {
    const {loading, more} = this.state;
    if (loading) return null;
    if (more) return <ActivityIndicator color="#7159c1" />;
    return null;
  };

  render() {
    const {navigation} = this.props;
    const {stars, loading} = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading && (
          <ActivityIndicator
            color="#7159c1"
            size={50}
            style={{marginTop: 50}}
          />
        )}

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{uri: item.owner.avatar_url}} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
          onEndReached={this.loadStars}
          onEndReacherdThreshold={0.1}
          ListFooterComponent={this.renderFooter}
        />
      </Container>
    );
  }
}

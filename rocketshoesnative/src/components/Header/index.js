import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  LogoContainer,
  Logo,
  BasketContainer,
  CartAmount,
  IconBasket,
} from './styles';

export default function Header({navigation}) {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <Container>
      <LogoContainer onPress={() => navigation.navigate('Home')}>
        <Logo />
      </LogoContainer>
      <BasketContainer onPress={() => navigation.navigate('Cart')}>
        <CartAmount>{cartSize || 0}</CartAmount>
        <IconBasket />
      </BasketContainer>
    </Container>
  );
}
Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

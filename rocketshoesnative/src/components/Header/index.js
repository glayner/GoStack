import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  LogoContainer,
  Logo,
  BasketContainer,
  CartAmount,
  IconBasket,
} from './styles';

function Header({navigation, cartSize}) {
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
    cartSize: PropTypes.func,
  }).isRequired,
};

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);

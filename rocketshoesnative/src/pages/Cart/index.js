import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import 'numeral/locales/pt-br';
import {
  Container,
  ProductContainer,
  List,
  Footer,
  Product,
  Data,
  Image,
  Detail,
  Title,
  Price,
  DeleteIcon,
  AmountContainer,
  AddAmountButton,
  AddAmount,
  InputAmount,
  RemoveAmountButton,
  RemoveAmount,
  ProductAmount,
  SumAmount,
  IconNoProduct,
  TextNoProduct,
  TotalText,
  TotalValue,
  FinalButton,
  FinalButtonText,
  DeleteButton,
} from './styles';

import * as CartActions from '../../store/modules/cart/actions';

function Cart({cart, cartSize, removeFromCart, updateAmount, total}) {
  Numeral.locale('pt-br');

  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }

  if (cartSize <= 0) {
    return (
      <Container>
        <ProductContainer>
          <IconNoProduct />
          <TextNoProduct>Seu carrinho está vazio</TextNoProduct>
        </ProductContainer>
      </Container>
    );
  }
  return (
    <Container>
      <ProductContainer>
        <List
          data={cart}
          keyExtractor={p => String(p.id)}
          renderItem={({item}) => (
            <Product>
              <Data>
                <Image source={{uri: item.image}} />
                <Detail>
                  <Title>{item.title}</Title>
                  <Price>{item.priceFormatted}</Price>
                </Detail>
                <DeleteButton onPress={() => removeFromCart(item.id)}>
                  <DeleteIcon />
                </DeleteButton>
              </Data>
              <AmountContainer>
                <ProductAmount>
                  <RemoveAmountButton onPress={() => decrement(item)}>
                    <RemoveAmount />
                  </RemoveAmountButton>
                  <InputAmount value={String(item.amount)} />
                  <AddAmountButton onPress={() => increment(item)}>
                    <AddAmount />
                  </AddAmountButton>
                </ProductAmount>
                <SumAmount>{item.subtotal}</SumAmount>
              </AmountContainer>
            </Product>
          )}
        />
        <Footer>
          <TotalText>Total</TotalText>
          <TotalValue>{total}</TotalValue>
          <FinalButton>
            <FinalButtonText>FINALIZAR PEDIDO</FinalButtonText>
          </FinalButton>
        </Footer>
      </ProductContainer>
    </Container>
  );
}
Cart.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
    cart: PropTypes.func,
    cartSize: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: Numeral(product.price * product.amount).format('$0,0.00'),
  })),
  total: Numeral(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ).format('$0,0.00'),
  cartSize: state.cart.length,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
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

export default function Cart() {
  Numeral.locale('pt-br');

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: Numeral(product.price * product.amount).format('$0,0.00'),
    }))
  );

  const cartSize = useSelector(state => state.cart.length);

  const total = useSelector(state =>
    Numeral(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.price * product.amount;
      }, 0)
    ).format('$0,0.00')
  );

  const dispach = useDispatch();

  function increment(product) {
    dispach(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispach(CartActions.updateAmountRequest(product.id, product.amount - 1));
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
                <DeleteButton
                  onPress={() => dispach(CartActions.removeFromCart(item.id))}>
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
  }).isRequired,
};

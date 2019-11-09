import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import 'numeral/locales/pt-br';

// import api from '../../services/api';
import * as server from '../../services/server';

import {
  Container,
  List,
  Product,
  ProductImage,
  Title,
  Price,
  ProductButtonText,
  ProductIconContainer,
  IconBasket,
  ProducIconText,
  ProductButton,
} from './styles';

import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

  useEffect(() => {
    async function loadProducts() {
      // const response = await api.get('/products');
      const response = server.products;

      Numeral.locale('pt-br');

      // const data = response.data.map(p => ({
      const data = response.map(p => ({
        ...p,
        priceFormatted: Numeral(p.price).format('$0,0.00'),
      }));

      setProducts(data);
    }
    loadProducts();
  }, []);

  const dispach = useDispatch();

  function handleAddProduct(id) {
    dispach(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <List
        data={products}
        keyExtractor={p => String(p.id)}
        renderItem={({item}) => (
          <Product>
            <ProductImage source={{uri: item.image}} />
            <Title>{item.title}</Title>
            <Price>{item.priceFormatted}</Price>
            <ProductButton onPress={() => handleAddProduct(item.id)}>
              <ProductIconContainer>
                <IconBasket />
                <ProducIconText>{amount[item.id] || 0}</ProducIconText>
              </ProductIconContainer>
              <ProductButtonText>Adicionar</ProductButtonText>
            </ProductButton>
          </Product>
        )}
      />
    </Container>
  );
}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

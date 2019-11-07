import React, {Component} from 'react';
import api from '../../services/api';

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

export default class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');

    // const data = response.data.map(products => ({
    //   ...products,
    //   priceFormatted: products.price,
    // }));
    this.setState({products: response.data});
  }

  render() {
    const {products} = this.state;
    return (
      <Container>
        <List
          data={products}
          keyExtractor={p => String(p.id)} // função que vai pegar cada um dos usuarios temos que retornar qual é o item unico dentro desse usuario
          renderItem={({item}) => (
            <Product>
              <ProductImage source={{uri: item.image}} />
              <Title>{item.title}</Title>
              <Price>{item.price}</Price>
              <ProductButtonText>
                <ProductIconContainer>
                  <IconBasket />
                  <ProducIconText>0</ProducIconText>
                </ProductIconContainer>
                <ProductButton>Adicionar</ProductButton>
              </ProductButtonText>
            </Product>
          )}
        />
      </Container>
    );
  }
}

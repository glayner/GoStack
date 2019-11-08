import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Numeral from 'numeral';
import 'numeral/locales/pt-br';

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

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');

    Numeral.locale('pt-br');

    const data = response.data.map(products => ({
      ...products,
      priceFormatted: Numeral(products.price).format('$0,0.00'),
    }));
    this.setState({products: data});
  }

  handleAddProduct = product => {
    const {dispatch} = this.props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

  render() {
    const {products} = this.state;

    console.tron.log(this.props);
    return (
      <Container>
        <List
          data={products}
          keyExtractor={p => String(p.id)} // função que vai pegar cada um dos usuarios temos que retornar qual é o item unico dentro desse usuario
          renderItem={({item}) => (
            <Product>
              <ProductImage source={{uri: item.image}} />
              <Title>{item.title}</Title>
              <Price>{item.priceFormatted}</Price>
              <ProductButton onPress={() => this.handleAddProduct(item)}>
                <ProductIconContainer>
                  <IconBasket />
                  <ProducIconText>0</ProducIconText>
                </ProductIconContainer>
                <ProductButtonText>Adicionar</ProductButtonText>
              </ProductButton>
            </Product>
          )}
        />
      </Container>
    );
  }
}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

export default connect()(Home);

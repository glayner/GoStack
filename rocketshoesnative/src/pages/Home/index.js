import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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

import * as CartActions from '../../store/modules/cart/actions';

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

  handleAddProduct = id => {
    const {addToCartRequest} = this.props;

    addToCartRequest(id);
  };

  render() {
    const {products} = this.state;
    const {amount} = this.props;
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
              <ProductButton onPress={() => this.handleAddProduct(item.id)}>
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
}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

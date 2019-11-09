import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import { ProducList } from './styles';

import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((amt, product) => {
      amt[product.id] = product.amount;

      return amt;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(p => ({
        ...p,
        priceFormatted: formatPrice(p.price),
      }));

      setProducts(data);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProducList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />{' '}
              {amount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProducList>
  );
}

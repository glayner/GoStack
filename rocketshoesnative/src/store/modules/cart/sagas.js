import {call, select, put, all, takeLatest} from 'redux-saga/effects';
import {Alert} from 'react-native';
import Numeral from 'numeral';
import 'numeral/locales/pt-br';
import api from '../../../services/api';

import * as NavigationServices from '../../../services/NavigationService';

import {addToCartSuccess, updateAmountSuccess} from './actions';

function* addToCart({id}) {
  Numeral.locale('pt-br');
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Alert.alert(
      'QUANTIDADE INDISPONIVEL',
      'Quantidade solicitada fora de estoque',
      [{text: 'OK', onPress: () => {}}]
    );
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: Numeral(response.data.price).format('$0,0.00'),
    };

    yield put(addToCartSuccess(data));
    NavigationServices.navigate('Cart');
  }
}

function* updateAmount({id, amount}) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Alert.alert(
      'QUANTIDADE INDISPONIVEL',
      'Quantidade solicitada fora de estoque',
      [{text: 'OK', onPress: () => {}}]
    );
    return;
  }
  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);

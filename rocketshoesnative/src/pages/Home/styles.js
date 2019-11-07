import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  background: #141420;
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  horizontal: true,
})``;

export const Product = styled.View`
  background: #fff;
  height: 300px;
  width: 160px;
  margin: 10px;
  padding: 10px;
  border-radius: 4px;
`;

export const ProductImage = styled.Image`
  width: 150px;
  height: 150px;
  background: #eee;
`;

export const Title = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: #333;
  margin-top: 5px;
`;

export const Price = styled.Text`
  font-size: 19px;
  font-weight: bold;
  margin: 5px 0 20px;
`;

export const ProductButtonText = styled(RectButton)`
  background: #7159c1;
  margin-top: auto;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProductIconContainer = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;
  padding: 6px;
  background: rgba(0, 0, 0, 0.1);
`;

export const IconBasket = styled(Icon).attrs({
  name: 'add-shopping-cart',
  size: 15,
  color: '#fff',
})`
  margin-right: 5px;
`;

export const ProducIconText = styled.Text`
  color: #fff;
`;

export const ProductButton = styled.Text`
  flex: 1;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;

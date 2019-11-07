import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import logo from '../../assets/images/logo.png';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  background: #141419;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`;

export const BasketContainer = styled.View`
  position: relative;
  width: 35px;
  height: 24px;
  margin-right: 30px;
`;
export const CardContainer = styled.View`
  background: #7159c1;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: 1;
`;

export const CartAmount = styled.Text`
  font-size: 12px;
  color: #fff;
`;

export const IconBasket = styled(Icon).attrs({
  name: 'shopping-basket',
  size: 30,
  color: '#fff',
})``;

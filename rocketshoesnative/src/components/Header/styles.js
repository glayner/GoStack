import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
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

export const LogoContainer = styled(RectButton)``;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`;

export const BasketContainer = styled(RectButton)`
  position: relative;
  width: 35px;
  height: 24px;
  margin-right: 30px;
`;
export const CartAmount = styled.Text`
  position: absolute;
  min-width: 18px;
  min-height: 18px;
  background: #7159c1;
  color: #fff;
  text-align: center;
  border-radius: 9px;
  right: -8px;
  top: -8px;
  font-size: 12px;
  overflow: hidden;
  padding: 2px;
`;

export const IconBasket = styled(Icon).attrs({
  name: 'shopping-basket',
  size: 30,
  color: '#fff',
})``;

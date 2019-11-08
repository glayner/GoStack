import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  background: #141420;
`;
export const ProductContainer = styled.View`
  margin: 0 30px;
  border-radius: 4px;
  padding: 10px;
  background: #fff;
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  max-height: 400px;
`;

export const Footer = styled.View``;

export const Product = styled.View`
  margin-bottom: 20px;
`;

export const Data = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
  background: #eee;
`;

export const Detail = styled.View`
  max-width: 150px;
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

export const DeleteButton = styled(RectButton)`
  width: 30px;
  height: 30px;
`;

export const DeleteIcon = styled(Icon).attrs({
  name: 'delete-forever',
  size: 30,
})``;

export const AmountContainer = styled.View`
  display: flex;
  flex-direction: row;
  background: #eee;
  padding: 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
`;
export const ProductAmount = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AddAmountButton = styled(RectButton)``;

export const AddAmount = styled(Icon).attrs({
  name: 'add-circle-outline',
  size: 20,
})``;

export const InputAmount = styled.TextInput.attrs({
  readonly: true,
})`
  background: #fff;
  padding: 5px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 52px;
  height: 30px;
`;

export const RemoveAmountButton = styled(RectButton)``;

export const RemoveAmount = styled(Icon).attrs({
  name: 'remove-circle-outline',
  size: 20,
})``;

export const SumAmount = styled.Text`
  color: #333;
  font-weight: bold;
`;

export const IconNoProduct = styled(Icon).attrs({
  name: 'remove-shopping-cart',
  size: 80,
  color: '#ccc',
})`
  align-self: center;
`;

export const TextNoProduct = styled.Text`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

export const TotalText = styled.Text`
  margin-top: 15px;
  color: #333;
  font-size: 14px;
  text-align: center;
`;

export const TotalValue = styled.Text`
  font-weight: bold;
  font-size: 30px;
  text-align: center;
`;

export const FinalButton = styled(RectButton)`
  margin-top: 20px;
  background: #7159c1;
  padding: 8px;
`;

export const FinalButtonText = styled.Text`
  color: #fff;
  text-align: center;
`;

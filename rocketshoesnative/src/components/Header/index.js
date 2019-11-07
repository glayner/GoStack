import React from 'react';

import {
  Container,
  Logo,
  BasketContainer,
  CartAmount,
  IconBasket,
  CardContainer,
} from './styles';

export default function Header() {
  return (
    <Container>
      <Logo />
      <BasketContainer>
        <CardContainer>
          <CartAmount>3</CartAmount>
        </CardContainer>
        <IconBasket />
      </BasketContainer>
    </Container>
  );
}

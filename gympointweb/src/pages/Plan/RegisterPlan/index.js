import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Title, Content, Formcontent } from '~/styles/default';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo é obrigatório'),
  duration: Yup.number()
    .integer('somente numeros inteiros')
    .typeError('Valor inválido')
    .required(),
  price: Yup.number()
    .typeError('Valor inválido')
    .required()
});

export default function RegisterPlan() {
  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    setTotalPrice(formatPrice(price * duration));
  }, [price, duration]);

  async function handleSubmit(data) {
    await api.post('plans', {
      ...data
    });
    history.push('/plan');
  }

  function priceChanged(e) {
    setPrice(e);
  }

  function durationChanged(e) {
    setDuration(e);
  }
  return (
    <Container>
      <Formcontent schema={schema} onSubmit={handleSubmit}>
        <Title>
          <h1>Cadástro de plano</h1>
          <div>
            <Link className="back" to="/plan">
              <MdKeyboardArrowLeft size={20} color="#FFF" />
              <span> VOLTAR</span>
            </Link>
            <button className="register" type="submit">
              <MdCheck size={20} color="#FFF" /> <span> SALVAR</span>
            </button>
          </div>
        </Title>
        <Content>
          <label>
            TÍTULO DO PLANO
            <Input type="text" name="title" placeholder="titulo" />
          </label>
          <div className="formline">
            <label>
              <strong> DURAÇÃO (em meses)</strong>
              <Input
                type="number"
                name="duration"
                onChange={e => durationChanged(e.target.value)}
                placeholder="duração"
              />
            </label>
            <label>
              <strong>PREÇO MENSAL</strong>
              <Input
                type="number"
                step="0.01"
                name="price"
                onChange={e => priceChanged(e.target.value)}
                placeholder="peso"
              />
            </label>
            <label>
              <strong> PREÇO TOTAL</strong>
              <Input
                type="text"
                name="totalPrice"
                readOnly
                className="readOnly"
                value={totalPrice}
              />
            </label>
          </div>
        </Content>
      </Formcontent>
    </Container>
  );
}

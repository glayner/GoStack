import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Formcontent, Title, Content } from '~/styles/default';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo é obrigatório'),
  duration: Yup.number()
    .integer('somente numeros inteiros')
    .positive('não é permitido valores negativos')
    .typeError('Valor inválido')
    .required(),
  price: Yup.number()
    .positive('não é permitido valores negativos')
    .typeError('Valor inválido')
    .required()
});

export default function ManagePlan({ match }) {
  const { id } = match.params;
  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [totalPrice, setTotalPrice] = useState('');
  const [plan, setPlan] = useState();

  useEffect(() => {
    setTotalPrice(formatPrice(price * duration));
  }, [price, duration]);

  useEffect(() => {
    async function loadManagePlan() {
      const response = await api.get('plans');
      const data = response.data.find(p => p.id === Number(id));
      setPlan(data);
      setPrice(data.price);
      setDuration(data.duration);
    }
    loadManagePlan();
  }, [id]);

  async function handleSubmit(data) {
    try {
      await api.put(`plans/${plan.id}`, {
        ...data
      });
      history.push('/plan');
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  function priceChanged(e) {
    setPrice(e);
  }

  function durationChanged(e) {
    setDuration(e);
  }

  return (
    <Container>
      <Formcontent schema={schema} initialData={plan} onSubmit={handleSubmit}>
        <Title>
          <h1>Edição de plano</h1>
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
              <strong> PREÇO MENSAL</strong>
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
ManagePlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  }).isRequired
};

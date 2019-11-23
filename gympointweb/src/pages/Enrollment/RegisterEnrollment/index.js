import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
// import history from '~/services/history';

import InputAsyncSelect from '~/components/InputAsyncSelect';

import { Container, Title, Content, Formcontent } from '~/styles/default';

const schema = Yup.object().shape({
  student: Yup.object()
    .shape({
      value: Yup.number().integer()
    })
    .typeError('Valor inválido'),
  plan: Yup.number()
    .integer('somente numeros inteiros')
    .typeError('Valor inválido')
    .required(),
  start_date: Yup.number()
    .typeError('Valor inválido')
    .required()
});

export default function RegisterEnrollment() {
  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    setTotalPrice(formatPrice(price * duration));
  }, [price, duration]);

  async function handleSubmit(data) {
    // await api.post('entrollments', {
    //   ...data
    // });
    // history.push('/enrollment');

    console.tron.log(data);
  }

  function priceChanged(e) {
    setPrice(e);
  }

  function durationChanged(e) {
    setDuration(e);
  }

  async function loadOptions(inputValue) {
    const response = await api
      .get('students', { params: { name: `${inputValue}` } })
      .then(r => r.data)
      .then(r =>
        r.map(student => ({
          label: student.name,
          value: student.id
        }))
      );
    return response;
  }

  return (
    <Container>
      <Formcontent schema={schema} onSubmit={handleSubmit}>
        <Title>
          <h1>Cadástro de matrículas</h1>
          <div>
            <Link className="back" to="/enrollment">
              <MdKeyboardArrowLeft size={20} color="#FFF" />
              <span> VOLTAR</span>
            </Link>
            <button className="register" type="submit">
              <MdCheck size={20} color="#FFF" /> <span> SALVAR</span>
            </button>
          </div>
        </Title>
        <Content>
          <InputAsyncSelect
            name="student"
            loadOptions={loadOptions}
            label="ALUNO"
          />

          <div>
            <label>
              PLANO
              <Input
                type="number"
                name="plan"
                onChange={e => durationChanged(e.target.value)}
                placeholder="Selecione o plano"
              />
            </label>
            <label>
              DATA DE INÍCIO
              <Input
                type="number"
                step="0.01"
                name="start_date"
                onChange={e => priceChanged(e.target.value)}
                placeholder="Escolha a data"
              />
            </label>
            <label>
              DATA DE TÉRMINO
              <Input
                type="text"
                name="totalPrice"
                readOnly
                className="readOnly"
              />
            </label>
            <label>
              VALOR FINAL
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

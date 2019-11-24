import React from 'react';
import { Link } from 'react-router-dom';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Title, Content, Formcontent } from '~/styles/default';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .integer('somente numeros inteiros')
    .typeError('Valor inválido')
    .required(),
  student_weight: Yup.string().typeError('Valor inválido'),
  student_height: Yup.string().typeError('Valor inválido')
});

export default function RegisterStudent() {
  async function handleSubmit(data) {
    await api.post('students', {
      ...data
    });
    history.push('/student');
  }
  return (
    <Container>
      <Formcontent schema={schema} onSubmit={handleSubmit}>
        <Title>
          <h1>Cadástro de aluno</h1>
          <div>
            <Link className="back" to="/student">
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
            NOME COMPLETO
            <Input type="text" name="name" placeholder="Nome" />
          </label>
          <label>
            ENDEREÇO DE E-MAIL
            <Input type="text" name="email" placeholder="E-mail" />
          </label>
          <div className="formline">
            <label>
              <strong>IDADE </strong>
              <Input type="number" name="age" placeholder="idade" />
            </label>
            <label>
              <strong> PESO (em kg) </strong>
              <Input
                type="number"
                step="0.01"
                name="student_weight"
                placeholder="peso"
              />
            </label>
            <label>
              <strong>ALTURA </strong>
              <Input
                type="number"
                step="0.01"
                name="student_height"
                placeholder="altura"
              />
            </label>
          </div>
        </Content>
      </Formcontent>
    </Container>
  );
}

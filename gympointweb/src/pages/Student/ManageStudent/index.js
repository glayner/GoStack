import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Title,
  Content,
  Formcontent
} from '~/components/Default/styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .typeError('Valor inválido')
    .required(),
  student_weight: Yup.number('Somente valores numéricos').typeError(
    'Valor inválido'
  ),
  student_height: Yup.number('Somente valores numéricos').typeError(
    'Valor inválido'
  )
});

export default function ManageStudent({ match }) {
  const { name } = match.params;
  const [student, setStudent] = useState({});

  useEffect(() => {
    async function loadManageStudent() {
      const response = await api.get('students', { params: { name } });
      const data = response.data[0];
      setStudent({
        ...data
      });
    }
    loadManageStudent();
  }, [name]);

  async function handleSubmit(data) {
    await api.put(`students/${student.id}`, {
      ...data
    });
    history.push('/student');
  }
  return (
    <Container>
      <Formcontent
        schema={schema}
        initialData={student}
        onSubmit={handleSubmit}
      >
        <Title>
          <h1>Edição de aluno</h1>
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
          <div>
            <label>
              IDADE
              <Input type="number" name="age" placeholder="idade" />
            </label>
            <label>
              PESO (em kg)
              <Input
                type="number"
                step="0.01"
                name="student_weight"
                placeholder="peso"
              />
            </label>
            <label>
              ALTURA
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

ManageStudent.propTypes = {
  match: PropTypes.element.isRequired
};

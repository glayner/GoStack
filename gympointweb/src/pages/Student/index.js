import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';
import { Container, Cover, Title, Content } from '~/components/Lists/styles';

import { Search } from './styles';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: { name }
      });
      setStudents(response.data);
    }

    loadStudents();
  }, [name]);

  function handleSearch({ nameSearch }) {
    setName(nameSearch);
  }
  return (
    <Container>
      <Cover>
        <Title>
          <h1>Gerenciar Alunos</h1>
          <Search>
            <Link className="register" to="/studentregister">
              <MdAdd size={20} color="#FFF" /> <span> CADASTRAR</span>
            </Link>
            <Form onSubmit={handleSearch}>
              <button type="submit">
                <MdSearch size={16} color="#999" />
              </button>
              <Input type="text" name="nameSearch" placeholder="Buscar Aluno" />
            </Form>
          </Search>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>NOME</td>
                <td>E-Mail</td>
                <td>IDADE</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <Link to={`/studentmanage/${student.name}`}>editar</Link>
                    <button type="button">apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </Cover>
    </Container>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { Container, Title, Content } from '~/components/Default/styles';

export default function Plan() {
  return (
    <Container>
      <Title>
        <h1>Gerenciando Planos</h1>
        <Link className="register" to="/planregister">
          <MdAdd size={20} color="#FFF" /> <span> CADASTRAR</span>
        </Link>
      </Title>
      <Content>
        <thead>
          <tr>
            <td>titulo 1</td>
            <td>titulo 2</td>
            <td>titulo 3</td>
            <td>titulo 4</td>
            <td>titulo 5</td>
            <td>link</td>
            <td>botão</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>linha 1</td>
            <td>linha 1</td>
            <td>linha 1</td>
            <td>linha 1</td>
            <td>linha 1</td>
            <td>
              <a href="/">Editar</a>
            </td>
            <td>
              <button type="button">Excluir</button>
            </td>
          </tr>
          <tr>
            <td>linha 2</td>
            <td>linha 2</td>
            <td>linha 2</td>
            <td>linha 2</td>
            <td>linha 2</td>
            <td>
              <a href="/">Editar</a>
            </td>
            <td>
              <button type="button">Excluir</button>
            </td>
          </tr>
          <tr>
            <td>linha 3</td>
            <td>linha 3</td>
            <td>linha 3</td>
            <td>linha 3</td>
            <td>linha 3</td>
            <td>
              <a href="/">Editar</a>
            </td>
            <td>
              <button type="button">Excluir</button>
            </td>
          </tr>
          <tr>
            <td>linha 4</td>
            <td>linha 4</td>
            <td>linha 4</td>
            <td>linha 4</td>
            <td>linha 4</td>
            <td>
              <a href="/">Editar</a>
            </td>
            <td>
              <button type="button">Excluir</button>
            </td>
          </tr>
          <tr>
            <td>linha 5</td>
            <td>linha 5</td>
            <td>linha 5</td>
            <td>linha 5</td>
            <td>linha 5</td>
            <td>
              <a href="/">Editar</a>
            </td>
            <td>
              <button type="button">Excluir</button>
            </td>
          </tr>
        </tbody>
      </Content>
    </Container>
  );
}

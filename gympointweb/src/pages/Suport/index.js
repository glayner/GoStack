import React from 'react';

import { Container, Cover, Title, Content } from '~/components/Lists/styles';

export default function Suport() {
  return (
    <Container>
      <Cover>
        <Title>
          <h1>Pedidos de auxílio</h1>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>Aluno</td>
                <td />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Thiago Glayner Cunha Rodrigues 1</td>
                <td>
                  <a href="/">responder</a>
                </td>
              </tr>
              <tr>
                <td>Thiago Glayner Cunha Rodrigues 2</td>

                <td>
                  <a href="/">responder</a>
                </td>
              </tr>
              <tr>
                <td>Thiago Glayner Cunha Rodrigues 3</td>

                <td>
                  <a href="/">responder</a>
                </td>
              </tr>
              <tr>
                <td>Thiago Glayner Cunha Rodrigues 4</td>

                <td>
                  <a href="/">responder</a>
                </td>
              </tr>
              <tr>
                <td>Thiago Glayner Cunha Rodrigues 5</td>

                <td>
                  <a href="/">responder</a>
                </td>
              </tr>
            </tbody>
          </table>
        </Content>
      </Cover>
    </Container>
  );
}

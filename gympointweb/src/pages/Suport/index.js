import React, { useEffect, useState } from 'react';

import api from '~/services/api';
import { Container, Cover, Title, Content } from '~/styles/default';

export default function Suport() {
  const [helpOrder, setHelpOrder] = useState([]);

  useEffect(() => {
    async function loadStuport() {
      const response = await api.get('/students/help-orders');
      setHelpOrder(response.data);
    }
    loadStuport();
  }, []);
  console.tron.log(helpOrder);

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
              {helpOrder.map(suport => (
                <tr key={suport.id}>
                  <td>{suport.student.name}</td>
                  <td>
                    <a href="/">responder</a>
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

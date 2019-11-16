import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import { Container, Cover, Title, Content } from '~/components/Lists/styles';

export default function Plan() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      const data = response.data.map(plan => ({
        ...plan,
        durationFormatted:
          plan.duration === 1
            ? `${plan.duration} mês`
            : `${plan.duration} meses`,
        priceFormatted: formatPrice(plan.price)
      }));
      setPlans(data);
    }
    loadPlans();
  }, []);
  return (
    <Container>
      <Cover>
        <Title>
          <h1>Gerenciando Planos</h1>
          <Link className="register" to="/planregister">
            <MdAdd size={20} color="#FFF" /> <span> CADASTRAR</span>
          </Link>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>Título</td>
                <td>Duração</td>
                <td>Valor p/ mês</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr>
                  <td>{plan.title}</td>
                  <td>{plan.durationFormatted}</td>
                  <td>{plan.priceFormatted}</td>
                  <td>
                    <a href={`/planmanage?id=${plan.id}`}>editar</a>

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

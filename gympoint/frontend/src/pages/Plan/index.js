import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import { Container, Cover, Title, Content } from '~/styles/default';

export default function Plan() {
  const [plans, setPlans] = useState([]);

  async function loadPlans() {
    const response = await api.get('plans');
    const data = response.data.map(plan => ({
      ...plan,
      durationFormatted:
        plan.duration === 1 ? `${plan.duration} mês` : `${plan.duration} meses`,
      priceFormatted: formatPrice(plan.price)
    }));
    setPlans(data);
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Certeza que deseja deletar?');
      if (result) {
        await api.delete(`plans/${id}`);
        toast.success('successfully deleted');
        loadPlans();
      }
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }
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
                <td>TÍTULO</td>
                <td>DURAÇÃO</td>
                <td>VALOR p/ MÊS</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.durationFormatted}</td>
                  <td>{plan.priceFormatted}</td>
                  <td>
                    <a href={`/planmanage/${plan.id}`}>editar</a>

                    <button type="button" onClick={() => handleDelete(plan.id)}>
                      apagar
                    </button>
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

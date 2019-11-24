import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import api from '~/services/api';
import { Container, Cover, Title, Content } from '~/styles/default';

export default function Enrollment() {
  const [enrollments, setEnrollments] = useState([]);

  async function loadEnrollment() {
    const response = await api.get('enrollments');
    const data = response.data.map(enrollment => ({
      ...enrollment,
      startDateFormatted: format(
        parseISO(enrollment.start_date),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt
        }
      ),
      endDateFormatted: format(
        parseISO(enrollment.end_date),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt
        }
      )
    }));
    setEnrollments(data);
  }

  useEffect(() => {
    loadEnrollment();
  }, []);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    const result = window.confirm('Certeza que deseja deletar?');
    if (result) {
      await api.delete(`enrollments/${id}`);
      loadEnrollment();
    }
  }

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Gerenciando matrícula</h1>
          <Link className="register" to="/enrollmentregister">
            <MdAdd size={20} color="#FFF" /> <span> CADASTRAR</span>
          </Link>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>ALUNO</td>
                <td>PLANO</td>
                <td>INICIO</td>
                <td>TÉRMINO</td>
                <td>ATIVA</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {enrollments.map(enrollment => (
                <tr key={enrollment.id}>
                  <td>{enrollment.student.name}</td>
                  <td>{enrollment.plan ? enrollment.plan.title : 'deleted'}</td>
                  <td>{enrollment.startDateFormatted}</td>
                  <td>{enrollment.endDateFormatted}</td>
                  <td>
                    <MdCheckCircle
                      size={20}
                      color={enrollment.active ? '#42cb59' : '#ddd'}
                    />
                  </td>
                  <td>
                    <a href={`/enrollmentmanage/${enrollment.id}`}>editar</a>
                    <button
                      type="button"
                      onClick={() => handleDelete(enrollment.id)}
                    >
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

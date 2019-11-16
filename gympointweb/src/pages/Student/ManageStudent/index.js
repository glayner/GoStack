import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';
import { Container } from '../styles';

export default function ManageStudent({ match }) {
  const { name } = match.params;
  const [student, setStudent] = useState({});

  useEffect(() => {
    async function loadManageStudent() {
      const response = await api.get('students', { params: { name } });
      const data = response.data[0];
      setStudent(data);
    }
    loadManageStudent();
  }, [name]);
  console.tron.log(student);
  return (
    <Container>
      <h1>{student.name}</h1>
    </Container>
  );
}

ManageStudent.propTypes = {
  match: PropTypes.element.isRequired
};

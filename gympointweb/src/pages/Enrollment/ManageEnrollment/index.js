import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  format,
  addMonths,
  // setHours,
  // setMinutes,
  // setSeconds,
  // addSeconds,
  parseISO
} from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
// import history from '~/services/history';

import InputAsyncSelect from '~/components/InputAsyncSelect';
import DatePicker from '~/components/InputDatePicker';
import ReactSelect from '~/components/InputSelect';

import { Container, Title, Content, Formcontent } from '~/styles/default';

const schema = Yup.object().shape({
  student: Yup.object()
    .shape({
      value: Yup.number().integer()
    })
    .typeError('Valor inválido')
    .required('Aluno obrigatório'),
  plan: Yup.object()
    .shape({
      value: Yup.number().integer()
    })
    .typeError('Valor inválido')
    .required('Aluno obrigatório'),
  start_date: Yup.date()
    .typeError('Valor inválido')
    .required('Data obrigatória')
});

export default function ManageEnrollment({ match }) {
  const { id } = match.params;
  const [startDate, setStartDate] = useState();
  const [plans, setPlans] = useState({});
  const [plan, setPlan] = useState({});
  const [newStudent, setNewStudent] = useState();
  const [name, setName] = useState();
  const [enrollment, setEnrollment] = useState({});
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api
        .get('enrollments')
        .then(r => r.data)
        .then(d => d.filter(e => e.id === Number(id)));
      const newName = response[0].student.name;
      setName(newName);
      setEnrollment(response[0]);
      setStartDate(parseISO(response[0].start_date));
    }

    loadEnrollments();
  }, [id]);

  useEffect(() => {
    async function loadStudent() {
      const response = await api
        .get('students', {
          params: { name }
        })
        .then(r => r.data)
        .then(d =>
          d.map(p => ({
            label: p.name,
            value: p.id
          }))
        );

      setNewStudent(response[0]);
    }
    loadStudent();
  }, [name]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api
        .get('plans')
        .then(r => r.data)
        .then(d =>
          d.map(p => ({
            label: p.title,
            value: p.id,
            duration: p.duration,
            price: p.price
          }))
        );

      if (enrollment.plan) {
        const defaultPlan = response.filter(
          p => p.label === enrollment.plan.title
        );
        setPlan(defaultPlan[0]);
      }

      setPlans(response);
    }

    loadPlans();
  }, [enrollment]);

  const end_date = useMemo(() => {
    if (!plan.duration) {
      return '';
    }

    const { duration } = plan;
    console.tron.log(startDate);
    console.tron.log(duration);
    const formattedDate = format(
      addMonths(startDate, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt
      }
    );
    return formattedDate;
  }, [plan, startDate]);

  const totalPrice = useMemo(() => {
    if (!plan.price) return '';

    return formatPrice(Number(plan.duration) * Number(plan.price));
  }, [plan.duration, plan.price]);

  useEffect(() => {
    setInitialData({
      end_date,
      totalPrice
    });
  }, [end_date, newStudent, totalPrice]);

  async function handleSubmit(data) {
    // try {
    //   const dateNow = new Date();
    //   const startDateNow = addSeconds(
    //     setSeconds(
    //       setMinutes(
    //         setHours(data.start_date, dateNow.getHours()),
    //         dateNow.getMinutes()
    //       ),
    //       dateNow.getSeconds()
    //     ),
    //     5
    //   );
    //   await api.post('enrollments', {
    //     student_id: data.student.value,
    //     plan_id: data.plan.value,
    //     start_date: startDateNow
    //   });
    //   history.push('/enrollment');
    // } catch (e) {
    //   console.tron.log(e);
    // }
    console.tron.log(data);
  }

  async function loadOptions(inputValue) {
    const response = await api
      .get('students', { params: { name: `${inputValue}` } })
      .then(r => r.data)
      .then(r =>
        r.map(student => ({
          label: student.name,
          value: student.id
        }))
      );
    return response;
  }

  return (
    <Container>
      <Formcontent
        schema={schema}
        onSubmit={handleSubmit}
        initialData={initialData}
      >
        <Title>
          <h1>Cadástro de matrículas</h1>
          <div>
            <Link className="back" to="/enrollment">
              <MdKeyboardArrowLeft size={20} color="#FFF" />
              <span> VOLTAR</span>
            </Link>
            <button className="register" type="submit">
              <MdCheck size={20} color="#FFF" /> <span> SALVAR</span>
            </button>
          </div>
        </Title>
        <Content>
          <InputAsyncSelect
            name="student"
            loadOptions={loadOptions}
            defaultValue={newStudent}
            label="ALUNO"
          />

          <div className="formline">
            <label>
              <strong> PLANO</strong>
              <ReactSelect name="plan" options={plans} setChange={setPlan} />
            </label>
            <label>
              <strong>DATA DE INÍCIO</strong>
              <DatePicker name="start_date" setChange={setStartDate} />
            </label>
            <label>
              <strong> DATA DE TÉRMINO</strong>
              <Input
                type="data"
                name="end_date"
                readOnly
                className="readOnly"
              />
            </label>
            <label>
              <strong> VALOR FINAL</strong>
              <Input
                type="text"
                name="totalPrice"
                readOnly
                className="readOnly"
              />
            </label>
          </div>
        </Content>
      </Formcontent>
    </Container>
  );
}

ManageEnrollment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  }).isRequired
};

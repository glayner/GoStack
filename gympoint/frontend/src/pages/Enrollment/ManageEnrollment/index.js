import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  format,
  addMonths,
  setHours,
  setMinutes,
  setSeconds,
  endOfSecond,
  parseISO
} from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

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
  const [newDate, setNewDate] = useState();

  const [plans, setPlans] = useState({});
  const [plan, setPlan] = useState({});

  const [newStudent, setNewStudent] = useState();
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    async function loadManageEnrollment() {
      const enrollment = await api
        .get('enrollments')
        .then(r => r.data)
        .then(d => d.filter(e => e.id === Number(id)));

      setStartDate(parseISO(enrollment[0].start_date));

      const { name } = enrollment[0].student;

      const loadStudent = await api
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

      setNewStudent(loadStudent[0]);

      const loadPlans = await api
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

      if (enrollment[0].plan) {
        const defaultPlan = loadPlans.filter(
          p => p.label === enrollment[0].plan.title
        );
        setPlan(defaultPlan[0]);
      }

      setPlans(loadPlans);
    }

    loadManageEnrollment();
  }, [id]);

  const end_date = useMemo(() => {
    const start_date = newDate || startDate;

    if (!plan.duration) {
      return '';
    }

    const { duration } = plan;
    const formattedDate = format(
      addMonths(start_date, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt
      }
    );
    return formattedDate;
  }, [newDate, plan, startDate]);

  const totalPrice = useMemo(() => {
    if (!plan.price) return '';
    return formatPrice(Number(plan.duration) * Number(plan.price));
  }, [plan.duration, plan.price]);

  useEffect(() => {
    setInitialData({
      end_date,
      totalPrice,
      plan,
      start_date: startDate,
      student: newStudent
    });
  }, [end_date, newStudent, plan, startDate, totalPrice]);

  async function handleSubmit(data) {
    try {
      const dateNow = new Date();
      const startDateNow = endOfSecond(
        setSeconds(
          setMinutes(
            setHours(data.start_date, dateNow.getHours()),
            dateNow.getMinutes()
          ),
          dateNow.getSeconds()
        )
      );

      let newData = {};
      if (!newDate) {
        newData = {
          student_id: data.student.value
            ? data.student.value
            : newStudent.value,
          plan_id: data.plan.value ? data.plan.value : plan.value,
          start_date: data.start_date
        };
      } else {
        newData = {
          student_id: data.student.value
            ? data.student.value
            : newStudent.value,
          plan_id: data.plan.value ? data.plan.value : plan.value,
          start_date: startDateNow
        };
      }

      await api.put(`enrollments/${id}`, {
        ...newData
      });
      history.push('/enrollment');
    } catch (e) {
      toast.error(e.response.data.error);
    }
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
            label="ALUNO"
          />

          <div className="formline">
            <label>
              <strong> PLANO</strong>
              <ReactSelect name="plan" options={plans} setChange={setPlan} />
              {console.tron.log(plans)}
            </label>
            <label>
              <strong>DATA DE INÍCIO</strong>
              <DatePicker name="start_date" setChange={setNewDate} />
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

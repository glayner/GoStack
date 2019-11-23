import React from 'react';
import { Link } from 'react-router-dom';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { Container, Cover, Title, Content } from '~/styles/default';

export default function ManageEnrollment() {
  return (
    <Container>
      <Cover>
        <Title>
          <h1>Edição de matrícula</h1>
          <div>
            <Link className="back" to="/student">
              <MdKeyboardArrowLeft size={20} color="#FFF" />
              <span> VOLTAR</span>
            </Link>
            <Link className="register" to="/studentregister">
              <MdCheck size={20} color="#FFF" /> <span> SALVAR</span>
            </Link>
          </div>
        </Title>
        <Content>
          <Form>
            <span>
              ALUNO
              <Input type="text" name="studant" placeholder="Nome" />
            </span>
            <div>
              <span>
                PLANO
                <Input type="text" name="plan" placeholder="plano" />
              </span>
              <span>
                DATA DE INÍCIO
                <Input type="text" name="startDate" placeholder="data inicio" />
              </span>
              <span>
                DATA DE TÉRMINO
                <Input
                  type="text"
                  name="endDate"
                  placeholder="data termino"
                  readOnly
                  className="readOnly"
                />
              </span>
              <span>
                VALOR FINAL
                <Input
                  type="text"
                  name="totalPrice"
                  placeholder="valor final"
                  readOnly
                  className="readOnly"
                />
              </span>
            </div>
          </Form>
        </Content>
      </Cover>
    </Container>
  );
}

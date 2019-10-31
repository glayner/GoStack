import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container/index';

import { Form, SubmitButton, List, LabelError } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    notFound: '',
  };

  // Carregar os dados no localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({
        repositories: JSON.parse(repositories),
      });
    }
  }

  // Salvar os dados no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  // atribui ao state newRepo o valor do input
  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  // carrega ao dar submit dentro do formulario que tem essa função em onSubmit
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, notFound: '' });
    const { newRepo, repositories } = this.state;

    try {
      // verificando duplicidade de repositório
      repositories.map(rep => {
        if (rep.name === newRepo) {
          // interrome e manda erro para o catch
          throw new Error('Repositório duplicado');
        }
        return rep;
      });
      const response = await api.get(`/repos/${newRepo}`).catch(error => {
        // mensagem de erro personalizada caso 404
        if (error.response.status === 404)
          throw Error('Repositório inexistente');
      });
      // pega nome completo: proprietario/repositorio
      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (error) {
      this.setState({ notFound: String(error) });
    }
    this.setState({ loading: false });
  };

  render() {
    const { newRepo, loading, repositories, notFound } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositório
        </h1>
        {/* caso não encontre repositorio input fica com borda vermelha */}
        <Form onSubmit={this.handleSubmit} error={notFound ? 1 : 0}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        {/* caso caia no catch a chamada api o erro surge aqui */}
        <LabelError>
          <p>{notFound}</p>
        </LabelError>
        {/* Listagem dos repositórios */}
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

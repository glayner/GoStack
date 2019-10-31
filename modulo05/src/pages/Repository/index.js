import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSpinner, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import api from '../../services/api';
import Container from '../../components/Container/index';

import {
  Loading,
  Owner,
  IssueList,
  IssuesFilter,
  IssuePagination,
} from './styles';

class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    // state de filtro
    issueState: '',
    // states de paginação
    issuePage: 1,
    prevDesabled: true,
    nextDesabled: true,
    perpage: 5,
  };

  async componentDidMount() {
    // monta repositorio pegando o nome dele pelos parametros passados pelo Main
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const repository = await api.get(`/repos/${repoName}`);

    this.setState({
      repository: repository.data,
      loading: false,
    });
    // pegar filtro do local storage e passar para state quando pagina carrega ou da submit
    const issue = localStorage.getItem('issueState');
    if (issue) {
      this.setState({ issueState: JSON.parse(issue) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { issueState } = this.state;
    // grava filtro no local storage sempre que ele altera
    if (prevState.issueState !== issueState) {
      localStorage.setItem('issueState', JSON.stringify(issueState));
    }
  }

  // carrega ao dar submit dentro do formulario que tem essa função em onSubmit
  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { issueState, repository, issuePage, perpage } = this.state;
    // condição status estilo de botão voltar desabilitado
    if (issuePage === 1) {
      this.setState({ prevDesabled: true });
    } else {
      this.setState({ prevDesabled: false });
    }
    // api pegar os issueres com parametros
    const issue = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: issueState,
        per_page: perpage,
        page: issuePage,
      },
    });
    // condição status estilo de botão avançar desabilitado
    if (issue.data.length < perpage) {
      this.setState({ nextDesabled: true });
    } else {
      this.setState({ nextDesabled: false });
    }

    this.setState({
      issues: issue.data,
      loading: false,
    });
  };

  // função de decremento de pagina
  handlePagePrev() {
    const { issuePage } = this.state;
    // condição para decrementar pagina
    if (issuePage !== 1) {
      this.setState({
        issuePage: Number(issuePage) - 1,
      });
    }
  }

  // função de incremento de pagina
  handlePageNext() {
    const { issuePage, issues, perpage } = this.state;
    // condição para incrementar pagina
    if (issues.length === perpage) {
      this.setState({
        issuePage: Number(issuePage) + 1,
      });
    }
  }

  // função de filtro do state
  handleFilter(e) {
    this.setState({ issueState: e, issuePage: 1 });
  }

  render() {
    const {
      repository,
      issues,
      loading,
      issuePage,
      prevDesabled,
      nextDesabled,
    } = this.state;

    // se status de loadin estiver true só aparece o carregamento
    if (loading) {
      return (
        <Loading>
          Carregando
          <FaSpinner color="#FFF" size={30} />
        </Loading>
      );
    }

    // se array de issues estiver vazio e for a primeira pagina só carrega o Owner e IssuesFilter
    if (issues.length === 0 && issuePage <= 1) {
      return (
        <Container>
          <Owner>
            <Link to="/">Voltar aos repositórios</Link>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>
          {/* ao dar clicar em qualquer botão chama primeiro a função do botão e o formSubmit que recarrega a pagina e preenche o issues */}
          <IssuesFilter onSubmit={this.handleSubmit}>
            <button type="submit" onClick={() => this.handleFilter('all')}>
              All
            </button>
            <button type="submit" onClick={() => this.handleFilter('open')}>
              Open
            </button>
            <button type="submit" onClick={() => this.handleFilter('closed')}>
              Closed
            </button>
          </IssuesFilter>
        </Container>
      );
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        {/* ao dar clicar em qualquer botão chama primeiro a função do botão e o formSubmit que recarrega a pagina e altera o issues com outro filtro */}
        <IssuesFilter onSubmit={this.handleSubmit}>
          <button type="submit" onClick={() => this.handleFilter('all')}>
            All
          </button>
          <button type="submit" onClick={() => this.handleFilter('open')}>
            Open
          </button>
          <button type="submit" onClick={() => this.handleFilter('closed')}>
            Closed
          </button>
        </IssuesFilter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        {/* ao dar clicar em qualquer botão chama primeiro a função do botão e o formSubmit que recarrega a pagina e altera o issues com outra pagina */}
        <IssuePagination
          onSubmit={this.handleSubmit}
          prevDesabled={prevDesabled ? 1 : 0}
          nextDesabled={nextDesabled ? 1 : 0}
        >
          <button
            type="submit"
            onClick={() => this.handlePagePrev()}
            className="prev"
          >
            <FaArrowLeft />
          </button>
          <span>{issuePage}</span>
          <button
            type="submit"
            onClick={() => this.handlePageNext()}
            className="next"
          >
            <FaArrowRight />
          </button>
        </IssuePagination>
      </Container>
    );
  }
}
// para pegar o paremetro passado pelo Main usando o match tem que declara-lo pelo prop-types
Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;

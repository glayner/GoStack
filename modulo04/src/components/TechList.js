import React, {Component} from 'react';
import TechItem from './TechItem';

class TechList extends Component {
  state ={
    newTech:'',
    techs: []
  }

// executado assim que o componente aparece em tela
  componentDidMount(){
    const techs = localStorage.getItem('techs');

    if(techs){
      this.setState({techs: JSON.parse(techs)})
    }
  }
//executado sempre que houver alterações nas props ou estado
  componentDidUpdate(prevProps, prevState){
    //this.props, this.state
    if (prevState.techs !== this.state.techs){
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }
// executado quando componente deixa de existir
  componentWillUnmount(){}


  handleInputChange = e => {
    this.setState({newTech: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ 
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    });
  }

  handleDelete = (index) =>{
    this.setState({techs: this.state.techs.filter((t,i) => i !== index)})
    
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
      <ul>
        {this.state.techs.map((tech,index) =>(
          <TechItem 
            key={index} 
            tech={tech}
            OnDelete={()=>this.handleDelete(index)}
          />
        ))}
      </ul>
      <input 
        type="text" 
        onChange={this.handleInputChange} 
        value={this.state.newTech}
      />
      <button type="submit">Enviar</button>
      </form>
    )
  }
}

export default TechList;

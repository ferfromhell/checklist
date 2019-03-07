import React, { Component } from 'react';
import axios from 'axios';
import { Select } from 'semantic-ui-react';

class MainSelect extends Component {
  constructor(){
    super();
    this.state={
      positionOption: []
    }
  }
  componentDidMount = () =>{
    axios.get('http://laboratorioasesores.com/NewSIIL/Mantenimiento/Development/PNC/getPuesto.php')
      .then(res => {
          // console.log(res.data);
          this.setState({positionOption: res.data}); 
        }
      )
      .catch(err => console.log(err))
  }
  render() {
    return (
        <Select placeholder="Selecciona un puesto" options={this.state.positionOption} style={{width:"100%",margin:"1em auto"}}/>
    )
  }
}
export default MainSelect
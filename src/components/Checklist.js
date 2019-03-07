import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Grid, Button, Input, Dropdown, Header, Table, Icon } from 'semantic-ui-react';

class Checklist extends Component {
  constructor(){
    super();
    this.state = {
      categorySelect: "",
      responseSelect: "",
      activityInput: "",
      table: [],
      rows: [],
      categoryOptions: [],
      responseOptions: [
        {key:"CN",value:"CN",text:"CN"},
        {key:"Numero",value:"Numero",text:"Numero"},
        {key:"Date",value:"Date",text:"Date"},
        {key:"Text",value:"Text",text:"Text"},
      ]
    }
  }
  componentDidMount = () =>{
    axios.get('https://laboratorioasesores.com/NewSIIL/Mantenimiento/Development/PNC/clItems2.php')
      .then(res => {
          console.log(res.data);
          this.setState({categoryOptions: res.data}); 
        }
      )
      .catch(err => console.log(err));

  }
  onChangeCategory = (e, {value}) => {
    e.preventDefault();
    this.setState({categorySelect: value}); 
  }
  onChangeResponse= (e, {value}) => {
    e.preventDefault();
    this.setState({responseSelect: value}); 
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  addRow = (e)=> {
    const typeRow= e.target.name;
    const {rows, categorySelect,responseSelect, activityInput} = this.state;
    // const args = {cat: this.state.categorySelect,colSpan:3}
    const args = {act: activityInput, resp: responseSelect,type:typeRow, category: categorySelect,colSpan:3,text:"Default"}
    rows.push(args);
    this.setState({rows: rows})
    // return(
    //   <Table.Row>
    //     <Table.HeaderCell colSpan='3'>{this.state.categorySelect}</Table.HeaderCell>
    //   </Table.Row>
    // )
  }
  deleteRow = (e) => {

  }
  render() { 
    const {rows} = this.state
    return (
      <div>
        <Segment raised>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column width={9}>
                <Dropdown
                  selection
                  name = "categorySelect" 
                  placeholder="Selecciona una categoria" 
                  options={this.state.categoryOptions}
                  onChange={this.onChangeCategory}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Button 
                  name="category"
                  inverted 
                  color="green" 
                  onClick={this.addRow}
                > Add category</Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Input 
                  name = "activityInput"
                  placeholder='Activity...' 
                  onChange={this.onChange}/>
              </Grid.Column>
              <Grid.Column>
              <Dropdown 
                placeholder='Select type of response' 
                selection 
                options={this.state.responseOptions}
                onChange={this.onChangeResponse} 
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Button 
                  name="activity"
                  inverted 
                  color="green" 
                  onClick={this.addRow}
                > Add activity</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment raised>
          <Header as='h2' dividing>
            Checklist position
          </Header>
          <Table celled striped fixed color="blue">
            <Table.Body>
            {rows.map((r) => {
                if(r.type === "category"){
                  return (
                    <Table.Row>
                      <Table.HeaderCell colSpan='5'>{r.category}</Table.HeaderCell>
                      <Table.HeaderCell colSpan='1'><Icon name="delete"/></Table.HeaderCell>
                    </Table.Row>
                  )
                }else{
                  return (
                    <Table.Row>
                        <Table.Cell colSpan='3'>
                          {r.act}
                        </Table.Cell>
                        <Table.Cell colSpan='2'>
                          {r.resp}
                        </Table.Cell>
                        <Table.Cell colSpan='1'>
                          <Icon name="delete"/>
                        </Table.Cell>
                    </Table.Row>
                  )
                }
            })}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    )
  }
}
export default Checklist
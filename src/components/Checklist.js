import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Grid, Button, Input, Dropdown, Header, Table } from 'semantic-ui-react';

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
  deleteRow = (i) => {
    var rows = this.state.rows;
    //console.log(rows);
    rows.splice(i, 1);
    this.setState({rows});
  }
  addExtraRow = (i) => {
    var rows = this.state.rows;
    //console.log(rows);
    rows.splice( i, 0, {act: 'New activity added', resp: '' ,type:''} );
    console.log(rows);
    this.setState({rows});
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
            {rows.map((r,index) => {
                if(r.type === "category"){
                  if(r.category === "OTRAS"){
                    return (
                      <Table.Row key={index}>
                        <Table.HeaderCell colSpan='12'>
                        <Input 
                          defaultValue={r.category}
                          style={{width:"90%",padding: "1px"}}
                        />
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan='4'>
                          <Button icon='delete' 
                          onClick={this.deleteRow.bind(this, index)}/>
                        </Table.HeaderCell>
                      </Table.Row>
                    )
                  }else{
                    return (
                      <Table.Row key={index}>
                        <Table.HeaderCell colSpan='12'>{r.category}</Table.HeaderCell>
                        <Table.HeaderCell colSpan='4'>
                          <Button icon='delete' 
                          onClick={this.deleteRow.bind(this, index)}/>
                        </Table.HeaderCell>
                      </Table.Row>
                    )
                  }
                }else{
                  return (
                    <Table.Row key={index}>
                        <Table.Cell colSpan='5'>
                          <Input 
                            defaultValue={r.act}
                            style={{width:"90%",padding: "1px"}}
                          />
                        </Table.Cell>
                        <Table.Cell colSpan='5'>
                        <Dropdown 
                          selected={r.resp}
                          selection 
                          options={this.state.responseOptions}
                          onChange={this.onChangeResponse} 
                          />
                          
                        </Table.Cell>
                        <Table.Cell colSpan='3'>
                        <Button icon='delete' 
                          onClick={this.deleteRow.bind(this, index)}/>
                        </Table.Cell>
                        <Table.Cell colSpan='3'>
                        <Button icon='add' 
                          onClick={this.addExtraRow.bind(this, index)}/>
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
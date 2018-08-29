import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import Validator from '../lib/validator';
import * as sv from 'string-validator'

export default class HomePage extends Component {
  
  constructor(props){
    super(props)
  }
  
  componentWillMount() {
    console.log(Validator.validate({name: ["required", {rule: 'int'}, {rule: 'max', params:[60], message: "Edad incorrecta"}]}, {name: 100}))
  }
  
  
  render() {
    return (
      <React.Fragment>
        <h1>Ejemplo1:</h1><hr/>
        <h3>Datos:</h3>
        <pre>{"{edad: 100}"}</pre>
        <h3>Reglas:</h3>
        <pre>{"{name: ['required', {rule: 'int'}, {rule: 'max', params:[60], message: 'Edad incorrecta'}]}"}</pre>
        <h3>Respuesta:</h3>
        <pre>{JSON.stringify(Validator.validate({name: ["required", {rule: 'int'}, {rule: 'max', params:[60], message: "Edad incorrecta"}]}, {name: 100}))}</pre>
        <h1>Ejemplo2:</h1><hr/>
        <h3>Input con validación incluida:</h3>
        <Input label="Edad" reglas={['required', {rule: 'int'}, {rule: 'max', params:[60], message: "Edad incorrecta"}]} />
        <Input label="Ip" reglas={['required', {rule: 'ip'}]} />
      </React.Fragment>
    );
  }
}

class Input extends Component {

  static defaultProps = {
    reglas: [],
    label: ""
  }

  state = {
    value: "",
    validation: {valid: true}
  }

  changeHandler = (e) => {

    console.log(this.props.reglas)
    this.setState({
      value: e.target.value,
      validation: Validator.validate({value: this.props.reglas}, {value: e.target.value})
    })
  }

  
  render() {


    return (
      <React.Fragment>
        <label>{this.props.label}</label>
        <input type="text" value={this.state.value} onChange={this.changeHandler} />
        <h5>{!this.state.validation.valid?this.state.validation.errors.value:''}</h5>
      </React.Fragment>
    )
  }
}

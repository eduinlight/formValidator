import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import HomePage from './home.page';

export default class Pages extends Component {
  render() {

    return (
      <React.Fragment>
        <Route path='/' exact component={HomePage}/>
      </React.Fragment>
    );
  }
}

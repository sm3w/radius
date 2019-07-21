import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

import AppNavbar from './components/AppNavbar';
import Home from './components/Home';
//import AppForm from './components/AppForm';
//import Results from './components/Results';

export default class App extends Component {

    state = {
      member_results: []
    }
    api_call = async (e) => {
        const pcr = {
            postcode: e.target.elements.postcode.value,
            radius: e.target.elements.radius.value
        };
        try {
        const res = await axios.post('/api/records', pcr);
        const data = res.data;
        this.setState({ 
          member_results: data
        });
      } catch (error) {
          if(error.repsonse) {
            console.log(error.response.status);
          }
      }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar/>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
        </Router>
    )
  }
}

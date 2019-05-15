import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
/*
Requesty (wiêcej do debugowania w Controllers)
Post:
http://localhost:63550/api/users/register
{
	"Email":"krilek@gmail.com",
	"Login":"krilek",
	"Password":"pass"
}
Post:
http://localhost:63550/api/users/authenticate
{
	"Login":"krilek",
	"Password":"pass"
}
Response:
{
    "id": 1,
    "email": "krilek@gmail.com",
    "login": "krilek",
    "password": null
}
 */

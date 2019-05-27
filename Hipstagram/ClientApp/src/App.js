import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RegisterPage } from './components/RegisterPage';

import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { PrivateRoute} from './components/PrivateRoute';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { Logs } from './components/Logs';
import "./App.css";
import { Gallery } from './components/ListGallery';
import { SingleGalleryViev } from './components/SingleGalleryViev';
export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/gallery' component={Gallery} />
        <Route path='/singlegallery' component={SingleGalleryViev} />
            <Route path='/logs' component={Logs} />
        </Layout>
    );
  }
}

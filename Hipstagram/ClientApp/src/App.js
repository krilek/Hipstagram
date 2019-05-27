import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RegisterPage } from './components/RegisterPage';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { PrivateRoute} from './components/PrivateRoute';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { Gallery } from './components/ListGallery';
import { SingleGalleryViev } from './components/SingleGalleryViev';
import {populateGallery} from './components/populateGallery';
import "./App.css";
import {photoUpload} from "./components/PhotoUpload";
import { ListOfPhotos } from './components/ListOfPhotos';
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
        <Route path='/singlegallery/:id' component={SingleGalleryViev} />
        <Route path='/photoUpload ' component={photoUpload } />
        <Route path='/list-of-photos' component={ListOfPhotos} />
        <Route path='/populateGallery/:id' component={populateGallery} />


      </Layout>
    );
  }
}


/*
Requesty (wi�cej do debugowania w Controllers)
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

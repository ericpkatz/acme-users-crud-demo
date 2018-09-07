import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Nav from './Nav';
import Users from './Users';
import UserCreateUpdate from './UserCreateUpdate';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      users: []
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  deleteUser(user){
    axios.delete(`/api/users/${user.id}`)
      .then(()=> this.loadUsers());
  }
  createUser(user, history){
    return axios.post('/api/users/', user)
      .then(()=> {
        this.loadUsers()
        history.push('/users');
      });
  }
  updateUser(user, history){
    return axios.put(`/api/users/${user.id}`, user)
      .then(()=> {
        this.loadUsers()
        history.push('/users');
      });
  }
  loadUsers(){
    axios.get('/api/users')
      .then(response => response.data)
      .then( users => this.setState({ users }));
  }
  componentDidMount(){
    this.loadUsers();
  }
  fetchUser(id){
    return axios.get(`/api/users/${id}`)
      .then( response => response.data )
  }
  render(){
    const { users } = this.state;
    const { deleteUser, createUser, fetchUser, updateUser } = this;

    const renderNav = ({ location })=> {
      return (
        <Nav 
          path={ location.pathname }
          users = { users }
        />
      );
    };

    const renderUsers = ()=> {
      return (
        <Users
          users={ users }
          deleteUser = { deleteUser }
        />
      );
    };

    const renderUserCreate = ({ history })=> {
      return (
        <UserCreateUpdate
          save={ createUser }
          history={ history }
        />
      );
    }
    const renderUserUpdate = ({ history, match })=> {
      return (
        <UserCreateUpdate
          save={ updateUser }
          history={ history }
          id={ match.params.id }
          fetchUser = { fetchUser }
        />
      );
    }
    return (
      <Router>
        <div>
          <Route render = { renderNav } />
          <Route path='/users' render = { renderUsers } />
          <Switch>
            <Route path='/users/create' render = { renderUserCreate } />
            <Route path='/users/:id' render = { renderUserUpdate } />
          </Switch>
        </div>
      </Router>
    );
  }
}

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
      users: [],
      loaded: false
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  loadUsers(){
    axios.get('/api/users')
      .then( response => response.data)
      .then( users => this.setState({
        users,
        loaded: true
      }));
  }
  fetchUser(id){
    return axios.get(`/api/users/${id}`)
      .then( response => response.data);
  }
  deleteUser(user, history){
    axios.delete(`/api/users/${user.id}`)
      .then(()=> this.loadUsers())
      .then(()=> history.push('/users'));

  }
  createUser(user, history){
    return axios.post('/api/users', user)
      .then(()=> this.loadUsers())
      .then(()=> history.push('/users'));
  }
  updateUser(user, history){
    return axios.put(`/api/users/${user.id}`, user)
      .then(()=> this.loadUsers())
      .then(()=> history.push('/users'));
  }
  componentDidMount(){
    this.loadUsers();
  }
  render(){
    const { users, loaded } = this.state;
    const { deleteUser, createUser, updateUser, fetchUser } = this;
    const renderNav = ({ location })=> {
      return <Nav
        path={ location.pathname }
        users = { users } 
      />
    };

    const renderUsers = ({ history })=> {
      return (
        <Users
          users={ users }
          deleteUser = { deleteUser }
          history = { history }
        />
      );
    };

    const renderUserCreate = ({ history })=> {
      return (
        <UserCreateUpdate
          save = { createUser }
          history = { history }
        />
      );
    };
    const renderUserUpdate = ({ history, match })=> {
      return (
        <UserCreateUpdate
          loaded = { loaded }
          users = { users }
          fetchUser = { fetchUser }
          save = { updateUser }
          history = { history }
          id = { match.params.id }
        />
      );
    };
    return (
      <Router>
      <div>
        <Route render={ renderNav } />
        <Route path='/users' render={ renderUsers } />
        <Switch>
          <Route path='/users/create' render={ renderUserCreate } />
          <Route path='/users/:id' render={ renderUserUpdate } />
        </Switch>
      </div>
      </Router>
    );
  }
}

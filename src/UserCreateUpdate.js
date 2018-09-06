import React, { Component } from 'react';

export default class UserCreateUpdate extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    if(this.props.id){
      this.fetchUser(this.props.id);
    }
  }
  fetchUser(id){
    console.log(this.props.users);
    const user = this.props.users.find(_user => _user.id === id*1);
    //this.props.fetchUser(this.props.id)
      //.then( user => {
        if(user){
          this.setState({ name : user.name });
        }
      //});

  }
  componentDidUpdate(prevProps){
    if(this.props.id && (this.props.id !== prevProps.id || this.props.loaded && !prevProps.loaded)){
      this.fetchUser(this.props.id);
    }
    if(!this.props.id && prevProps.id){
      this.setState({ name: ''});
    }
  }
  handleChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  onSave(ev){
    ev.preventDefault();
    this.props.save({
      name: this.state.name,
      id: this.props.id
    }, this.props.history)
    .catch(ex => {
      this.setState({ error: ex.response.data.error });
    });
  }
  render(){
    const { handleChange, onSave } = this;
    const { name, error } = this.state;
    const { id } = this.props;
    return (
      <form onSubmit={ onSave }>
        <input value={ name } name='name' onChange={ handleChange } />
        <button>{ id? 'Update' : 'Create' }</button>
        {
          error ? (<div>{ error }</div>) : null 
        }
      </form>
    );
  }
}

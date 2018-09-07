import React, { Component } from 'react';

export default class UserCreateUpdate extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    if(this.props.id){
      this.fetchUser(this.props.id);
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.id && prevProps.id !== this.props.id){
      this.fetchUser(this.props.id);
    }
    if(prevProps.id && !this.props.id){
      this.setState({ name: ''});
    }
  }
  fetchUser(id){
    this.props.fetchUser(id)
      .then( user => this.setState({ name: user.name }));
  }
  save(ev){
    ev.preventDefault();
    this.props.save({
      name: this.state.name,
      id: this.props.id
    }, this.props.history)
    .catch(ex => {
      this.setState({ error: ex.response.data.error});
    });

  }
  handleChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render(){
    const { name, error } = this.state;
    const { handleChange, save } = this;
    const { id } = this.props;
    return (
      <form onSubmit={ save }>
      <input name='name' value={ name } onChange ={ handleChange } />
      { error }
      <button disabled={ !name }>
        {
          id ? 'Update': 'Create'
        }
      </button>
      </form>
    );
  }
}

import React from 'react';
import { Link } from 'react-router-dom';
export default ({ path, users })=> {
  const selected = {
    fontWeight: 'bold'
  };
  return (
    <ul>
      <li style={ path === '/' ? selected: null }>
        <Link to='/'>Home</Link>
      </li>
      <li style={ path === '/users' ? selected: null }>
        <Link to='/users'>Users ({ users.length })</Link>
      </li>
      <li style={ path === '/users/create' ? selected: null }>
        <Link to='/users/create'>Create A User</Link>
      </li>
    </ul>

  );
};

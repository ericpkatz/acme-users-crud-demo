import React from 'react';
import { Link } from 'react-router-dom';

export default ({ path, users })=> {
  const isSelected = (_path)=> _path === path;
  return (
    <ul>
      <li className={ isSelected('/') ? 'selected': ''}>
        <Link to='/'>Home</Link>
      </li>
      <li className={ isSelected('/users') ? 'selected': ''}>
        <Link to='/users'>Users ({ users.length })</Link>
      </li>
      <li className={ isSelected('/users/create') ? 'selected': ''}>
        <Link to='/users/create'>Create A User</Link>
      </li>
    </ul>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default ({ users, deleteUser })=> {
  return (
    <ul>
    {
      users.map( user => {
        return (
          <li key={ user.id }>
            <Link to={`/users/${user.id}`}>{ user.name }</Link>
            <button onClick={()=> deleteUser(user)}>
            x
            </button>
          </li>
        );
      })

    }
    </ul>
  );
}

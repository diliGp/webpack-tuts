import React, { useState } from 'react'
// import Axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);

    const lazeHandle = () => {
        import('axios').then(Axios => {
            Axios.get('https://jsonplaceholder.typicode.com/users').then(({ data }) => {
                setUsers(data)
                console.log('----', data);
            });
        });
    }

    return (
        <div>
            <ul>
                {
                    users && users.length > 0 ? users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    )) : ''
                }
            </ul>
            <button onClick={() => lazeHandle()}>Read Index Content</button>
        </div>
    )
}

export default Users;

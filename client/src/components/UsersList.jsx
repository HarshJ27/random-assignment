// src/components/UsersList.jsx
import React, { useEffect, useState } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b-2">Name</th>
          <th className="py-2 px-4 border-b-2">Email</th>
          <th className="py-2 px-4 border-b-2">Age</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td className="py-2 px-4 border-b">{user.name}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;

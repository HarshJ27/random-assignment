import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <h2 className="text-2xl font-bold mb-6">User List</h2>
      <table className="table-auto border-collapse border border-gray-200 w-3/5 text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

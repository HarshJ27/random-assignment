// src/App.jsx
import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UsersList from './components/UsersList';

const App = () => {
  const [users, setUsers] = useState([]);

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]); // Update the user list when a new user is added
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center text-2xl font-bold mb-6">User Management</h1>
      <div className="flex flex-col items-center">
        <UserForm onUserAdded={handleUserAdded} />
      </div>
      <div className="mt-8">
        <UsersList />
      </div>
    </div>
  );
};

export default App;

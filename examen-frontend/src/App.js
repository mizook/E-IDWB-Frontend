import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserCard from './components/UserCard';
import AddUser from './components/AddUser';
import ReporteUsuariosReservas from './components/ReporteUsuarioReservas';


function App() {
  const [usuarios, setUsuarios] = useState([]);
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline pb-5">
          Lista de Usuarios
        </h1>
        <AddUser fetchUsers={fetchUsuarios}></AddUser>
        <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {usuarios.map(user => (
            <UserCard 
            user={user}
            fetchUsers={fetchUsuarios}
            />
            ))}
        </ul>
        <ReporteUsuariosReservas></ReporteUsuariosReservas>
      </header>
    </div>
  );
}

export default App;
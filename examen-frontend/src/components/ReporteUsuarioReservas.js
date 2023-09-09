import React, { useState } from 'react';
import axios from 'axios';
import BookingCard from './BookingCard';

function ReporteUsuariosReservas() {
  const [ano, setAno] = useState(''); // Estado para el año
  const [reservas, setReservas] = useState([]); // Estado para mostrar las reservas
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar una solicitud al backend para obtener las reservas filtradas por año
      const response = await axios.get(`/reservas?ano=${ano}`);
      // Obtener el resultado y mostrarlo en el estado de reservas
      setReservas(response.data);
      setError(null);
    } catch (error) {
      setError('Error al obtener los datos del servidor.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h2 className="text-2xl font-semibold mb-4 text-white">Reporte de Usuarios y Reservas</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <select
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="">Selecciona un año</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-3 py-2 text-sm hover:bg-blue-600 transition duration-200"
        >
          Filtrar
        </button>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Resultados del Reporte</h3>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {reservas.map((reserva) => (
            <li key={reserva.id}>
              <BookingCard reserva={reserva} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReporteUsuariosReservas;

import React from 'react';

function BookingCard({ reserva }) {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Reserva #{reserva.id}</h3>
      <p>ID de Usuario: {reserva.usuarioId}</p>
      <p>ID de Programa: {reserva.programaId}</p>
      <p>Fecha de Reserva: {new Date(reserva.fechaReserva).toLocaleDateString()}</p>
      <p>Fecha de Vencimiento: {new Date(reserva.fechaVencimiento).toLocaleDateString()}</p>
      <p>Fecha de Creación: {new Date(reserva.createdAt).toLocaleString()}</p>
      <p>Fecha de Actualización: {new Date(reserva.updatedAt).toLocaleString()}</p>
    </div>
  );
}

export default BookingCard;

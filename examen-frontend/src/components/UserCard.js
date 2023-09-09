import React, { useState } from 'react';
import axios from 'axios';

function UserCard({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.nombre);
  const [errors, setErrors] = useState({});

  const mapErrorsToFields = (field, errors) => {
    if (!Array.isArray(errors)) {
      return <p></p>;
    }
  
    return errors.map((error, index) => {
      if (error.path === field) {
        return (
          <p key={index} class="text-sm pt-1 pl-1 text-start">
            {error.msg}
          </p>
        );
      }
      return <p></p>;
    });
  };
  
  const toggleModal = () => {
    setIsOpen(!isOpen);
    setErrors({});
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = {
        nombre: name,
      };
      await axios.put(`/usuarios/${user.id}`, updatedUser);
      console.log("ACTUALIZANDO: ", user.id)

      toggleModal();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.response.data.errors[0].msg);
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/usuarios/${user.id}`);
      console.log("ELIMINANDO: ", user.id);

      toggleModal();
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  
  return (
    <div className="">
      <button
        onClick={toggleModal}
        className="h-48 w-48 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center transform transition-transform duration-200 scale-100 hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <div class="grid grid-cols-1">
          <a class="text-white text-sm font-bold text-start">
            ID: {user.id}
          </a>
          <a class="text-black text-lg font-bold text-start">
            Nombre
          </a>
          <a class="text-">
            {name}
          </a>
        </div>
      </button>

      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
        >
          <div className="relative w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={toggleModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Cerrar</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-start">
                  Editar libro
                </h3>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
                    >
                      Titulo
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                    {mapErrorsToFields("nombre", errors)}
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCard;
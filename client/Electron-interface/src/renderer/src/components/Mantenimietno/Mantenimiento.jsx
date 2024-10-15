import React, { useState } from 'react';
import FormularioMantenimiento from './formularioMantenimiento';
import ListaMantenimiento from './ListaMantenimiento';
import ModalHistorialCompletados from './ModalHistorial';
import { HiOutlinePlusCircle, HiClipboardList } from 'react-icons/hi';

const GestionMantenimiento = () => {
  const [listaMantenimiento, setListaMantenimiento] = useState([]);
  const [detallesMantenimiento, setDetallesMantenimiento] = useState({
    titulo: '',
    fecha: '',
    frecuencia: 'mensual',
    maquina: '',
    completado: false,
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const maquinas = ['Máquina 1', 'Máquina 2', 'Máquina 3', 'Máquina 4'];

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setDetallesMantenimiento({ ...detallesMantenimiento, [name]: value });
  };

  const agregarMantenimiento = () => {
    if (detallesMantenimiento.titulo && detallesMantenimiento.fecha && detallesMantenimiento.maquina) {
      setListaMantenimiento([...listaMantenimiento, detallesMantenimiento]);
      setDetallesMantenimiento({ titulo: '', fecha: '', frecuencia: 'mensual', maquina: '', completado: false });
      setMostrarFormulario(false);
    }
  };

  const alternarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const marcarComoCompletado = (index) => {
    const listaActualizada = listaMantenimiento.map((mantenimiento, idx) =>
      idx === index ? { ...mantenimiento, completado: !mantenimiento.completado } : mantenimiento
    );
    setListaMantenimiento(listaActualizada);
  };

  const alternarHistorial = () => {
    setMostrarHistorial(!mostrarHistorial);
  };

  const mantenimientosCompletados = listaMantenimiento.filter(mantenimiento => mantenimiento.completado);

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Gestión de Mantenimiento</h1>

      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={alternarFormulario}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <HiOutlinePlusCircle className="mr-2" size={24} />
          {mostrarFormulario ? 'Cancelar' : 'Programar Mantenimiento'}
        </button>

        <button
          onClick={alternarHistorial}
          className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
        >
          <HiClipboardList className="mr-2" size={24} />
          Historial
        </button>
      </div>

      {mostrarFormulario && (
        <FormularioMantenimiento
          detallesMantenimiento={detallesMantenimiento}
          manejarCambioInput={manejarCambioInput}
          agregarMantenimiento={agregarMantenimiento}
          maquinas={maquinas}
        />
      )}

      <ListaMantenimiento listaMantenimiento={listaMantenimiento} marcarComoCompletado={marcarComoCompletado} />

      {mostrarHistorial && (
        <ModalHistorialCompletados
          mantenimientosCompletados={mantenimientosCompletados}
          alternarHistorial={alternarHistorial}
        />
      )}
    </div>
  );
};

export default GestionMantenimiento;

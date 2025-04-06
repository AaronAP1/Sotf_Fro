import { MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RiFileExcel2Line } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import NewGastos from "./NewGastos";
import useTipoGasto from "../../../Hooks/useTipoGasto";


function GastosTable() {
  const {fetchTipoGastos, tipoGastos, loading, error, eliminarGasto } = useTipoGasto();
  const [seletedGasto, setSelectedGasto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (gastos) => {
    setSelectedGasto(gastos);
    setIsOpen(true);
  }

  const handleEliminar = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarGasto(id);
          Swal.fire(
            'Eliminado!',
            'El tipo de gasto ha sido eliminado.',
            'success'
          );
        } catch (error) {
          Swal.fire(
            'Error',
            'Hubo un problema al intentar eliminar el tipo de gasto.',
            'error'
          );
          console.error("Error al eliminar el tipo de gasto:", error);
        }
      }
    });
  };

  const filteredtipoGastos = tipoGastos.filter((tipGast) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      tipGast.nombre.toLowerCase().includes(searchLower)
    );
  });


  const openModal = () => {
    setIsOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedGasto(null);
  };

  useEffect(() => {
    fetchTipoGastos();
  }, []);

  return (
    <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
      <div className="h-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="text-black text-lg sm:text-2xl font-normal font-poppins ">
              Tipos de Gastos
            </div>
            <div className="text-black/60 text-[11px] md:text-sm mt-1.5 -ml-1 font-normal font-inter">
              Configuración
            </div>
          </div>
          <div
            className="flex items-center gap-0.5 bg-[#0a9e9a] px-3 py-2 text-sm md:text-md rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
            onClick={openModal}
          >
            <PlusIcon className="w-4 h-4 text-white" />
            <div className="text-white -mt-0.5 text-md font-normal font-inter">
              Nuevo
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3.5 md:mt-5 mb-5">
          <div className="flex items-center gap-1 bg-[#0a9e9a] text-white text-sm md:text-md px-4 py-1.5 rounded-md cursor-pointer hover:scale-105 transition shadow-md">
            <RiFileExcel2Line className="md:w-5 md:h-5 w-4 h-4 text-white" />
            Excel
          </div>

          {/* Input de búsqueda en tabla */}
          <div className="w-auto relative">
            <input
              className="sm:w-80 pl-2.5 text-xs md:text-sm pr-4 p-1.5 border border-[#B0B0B0] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
              placeholder="Buscar en tabla"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin mr-2 text-[#0a9e9a]" />
              <div>Cargando...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-6 text-red-500">
              Error al cargar: {error}
            </div>
          ) : (
            <div className="max-h-[200px] max-w-[50px] md:max-w-screen md:max-h-screen">
              <table className="min-w-full bg-white rounded-lg border-t border-gray-300 table-auto">
                <thead className="bg-[#f4f5fb] border-[1px] border-gray-300">
                  <tr className="text-xs sm:text-sm font-semibold text-[#00535e]">

                    <th className="px-4 py-3 text-left">Origen</th>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Tipo Liquidación</th>
                    <th className="px-4 py-3 text-left">Proveedor</th>
                    <th className="px-4 py-3 text-left">A credito</th>
                    <th className="px-4 py-3 text-left">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-[1px] border-gray-300 divide-gray-200">
                  {filteredtipoGastos.length > 0 ? (
                    filteredtipoGastos
                      .filter((gastos) => gastos.id)
                      .map((gastos) => (
                        <tr
                          key={gastos.id}
                          className="text-xs sm:text-sm text-gray-700"
                        >
                          <td className="px-4 py-3">{gastos.origen}</td>
                          <td className="px-4 py-3">{gastos.nombre}</td>
                          <td className="px-4 py-3">{gastos.fl_no_liquidacion}</td>
                          <td className="px-4 py-3">{gastos.fl_provedor}</td>
                          <td className="px-4 py-3">{gastos.fl_credito}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleEdit(gastos)}
                                className="text-white bg-[#ffd133] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                <PencilIcon className="w-5 h-5" />{" "}
                                Editar
                              </button>
                              <button
                                onClick={() => handleEliminar(gastos.id)}
                                className="text-white bg-[#ff3342] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                <TrashIcon className="w-5 h-5" />{" "}
                                Borrar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-6">
                        No hay datos disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <NewGastos isOpen={isOpen}
            onClose={closeModal}
            gastoExistente={seletedGasto}
            esEdicion={!!seletedGasto} />
        </div>
      </div>
    </div>
  );
}

export default GastosTable;

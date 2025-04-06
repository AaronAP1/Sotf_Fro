import { MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import useLocalesAnexos from '../../../Hooks/useLocalesAnexos';
import NewLocal from "./NewLocal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LocalAnexoTable() {
  const { fetchLocalesAnexos, localesAnexos, loading, error, EliminarLocal } = useLocalesAnexos();
  const [selectedLocalAnexo, setSelectedLocalAnexo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar la edición de un local
  const handleEdit = (local) => {
    setSelectedLocalAnexo(local); // Establece el local que se va a editar
    setIsModalOpen(true); // Abre el modal
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este local?")) {
      try {
        await EliminarLocal(id);
      } catch (error) {
        console.error("Error al eliminar el local:", error);
      }
    }
  };

  const filteredLocalesAnexos = localesAnexos.filter((localA) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      localA.tipo.toLowerCase().includes(searchLower)
    );
  });

  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLocalAnexo(null);
  };

  useEffect(() => {
    fetchLocalesAnexos();
  }, []);
  
  return (
    <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
      <div className="h-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="text-black text-xl sm:text-2xl font-normal font-poppins ">
              Locales Anexos
            </div>
            <div className="text-black/60 text-xs md:text-sm mt-2 -ml-1 font-normal font-inter">
              Configuración
            </div>
          </div>
          <div
            className="flex items-center gap-0.5 bg-[#0a9e9a] px-3 py-2 text-sm md:text-md rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
            onClick={openModal}
          >
            <PlusIcon className="w-4 h-4 text-white" />
            <div className="text-white -mt-0.5 text-md md:text-md font-normal font-inter">
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

        <div className="overflow-x-auto mt-5">
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
            <div className="max-h-[65vh] lg:max-h-[65vh] xl:max-h-[70vh]  overflow-y-auto border border-gray-300 rounded-lg">
              <table className="min-w-full bg-white rounded-lg table-auto">

                <thead className="bg-[#f4f5fb] border-b border-gray-300 sticky top-0 z-10">
                  <tr className="text-xs sm:text-sm text-nowrap font-semibold text-[#00535e]">
                    <th className="px-4 py-3 text-left">Tipo</th>
                    <th className="px-3 py-3 text-left">Nombre</th>
                    <th className="px-3 py-3 text-left">Dirección</th>
                    <th className="px-2 py-3 text-left">Código SUNAT</th>
                    <th className="px-2 py-3 text-left">Token PSE</th>
                    <th className="px-3 py-3">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-gray-300">
                  {filteredLocalesAnexos.length > 0 ? (
                    filteredLocalesAnexos.map((local) => (
                      <tr
                        key={local.id}
                        className="text-xs sm:text-sm text-gray-700"
                      >
                        <td className="px-4 py-2">{local.tipo}</td>
                        <td className="px-3 py-2">{local.name}</td>
                        <td className="px-3 py-2">{local.direction}</td>
                        <td className="px-2 py-2">{local.codigo_sunat || "N/A"}</td>
                        <td className="px-2 py-2">{local.token_pse || "N/A"}</td>
                        <td className="px-3 py-2 flex gap-2 justify-center items-center">
                          <button
                            onClick={() => handleEdit(local)}
                            className="text-white bg-[#ffd133] flex flex-col items-center rounded-lg px-2 py-1 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                            <PencilIcon className="w-5 h-5" />
                            <div>Editar</div>
                          </button>
                          <button
                            onClick={() => handleEliminar(local.id)}
                            className="text-white bg-[#ff3342] flex flex-col items-center rounded-lg px-2 py-1 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                            <TrashIcon className="w-5 h-5" />
                            <div>Borrar</div>
                          </button>
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
          <NewLocal
            isOpen={isModalOpen}
            onClose={closeModal}
            localAnexoExistente={selectedLocalAnexo}
            esEdicion={!!selectedLocalAnexo}
          />
        </div>
      </div>
    </div>
  );
}

export default LocalAnexoTable;

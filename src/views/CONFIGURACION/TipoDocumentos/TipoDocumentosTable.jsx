import {
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import useTipoDocumento from "../../../Hooks/useTipoDocument";
import NewTipoDocumentos from "./NewDocumentos";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function TipoDocumentosTable() {
  const { fetchTipoDocumentos, tipoDocumentos, loading, error, eliminarDocumento } =
    useTipoDocumento();
  const [selectedDocumento, setSelectedDocumento] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (documento) => {
    setSelectedDocumento(documento);
    setIsOpen(true);
  };

  const handleEliminar = async (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este documento?")
    ) {
      try {
        await eliminarDocumento(id);
        window.location.reload();
        // Llamamos directamente al hook para eliminar
      } catch (error) {
        console.error("Error al eliminar el documento:", error);
      }
    }
  };

  const filteredTipoDocumentos = tipoDocumentos.filter((tipDoc) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      tipDoc.nombre.toLowerCase().includes(searchLower)
    );
  });

  const openModal = () => {
    setIsOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedDocumento(null);
  };

  useEffect(() => {
    fetchTipoDocumentos();
  }, []);

  return (
    <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
      <div className="h-auto ">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1.5">
            <div className="text-black text-md sm:text-2xl font-normal font-poppins ">
              Tipos de Documentos
            </div>
            <div className="text-black/60 text-[9px] md:text-sm mt-1.5 -ml-1 font-normal font-inter">
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
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-[1px] border-gray-300 divide-gray-200">
                  {filteredTipoDocumentos.length > 0 ? (
                    filteredTipoDocumentos
                      .filter((documento) => documento.id)
                      .map((documento) => (
                        <tr
                          key={documento.id}
                          className="text-xs sm:text-sm text-gray-700"
                        >
                          <td className="px-4 py-2">{documento.tipo}</td>
                          <td className="px-4 py-2">{documento.nombre}</td>
                          <td className="px-3 py-2 flex gap-2 justify-center items-center">
                            <button
                              onClick={() => handleEdit(documento)}
                              className="text-white bg-[#ffd133] flex flex-col items-center rounded-lg px-2 py-1 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
                            >
                              <PencilIcon className="w-5 h-5" />
                              <div>Editar</div>
                            </button>
                            <button
                              onClick={() => handleEliminar(documento.id)}
                              className="text-white bg-[#ff3342] flex flex-col items-center rounded-lg px-2 py-1 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
                            >
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
          <NewTipoDocumentos
            isOpen={isOpen}
            onClose={closeModal}
            documentoExistente={selectedDocumento}
            esEdicion={!!selectedDocumento}
          />
        </div>
      </div>
    </div>
  );
}

export default TipoDocumentosTable;

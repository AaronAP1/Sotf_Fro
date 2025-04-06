import {
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiFileExcel2Line } from "react-icons/ri";
import useCliente from "../../../Hooks/useCliente";
import ClientDetailsModal from "./ClientsDetailsModal";
import ModalNewClients from "./ModalNewClients";

function ClientsTable() {
  const {fetchCliente, clients, eliminarCliente, loading, error } = useCliente();
  const [selectedClient, setSelectedClient] = useState(null);
  const [isClientDetailsOpen, setIsClientDetailsOpen] = useState(false); // Estado para modal de detalles
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false); // Estado para modal de nuevo cliente
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenDetails = (client) => {
    setSelectedClient(client);
    setIsClientDetailsOpen(true);
  };

  const handleNuevoClick = () => {
    setIsNewClientModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedClient(null);
    setIsClientDetailsOpen(false);
  };

  const closeNewClientModal = () => {
    setIsNewClientModalOpen(false);
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsNewClientModalOpen(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        await eliminarCliente(id);
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    }
  };

  useEffect(() => {
    fetchCliente();
}, []);

  return (
    <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
      <div className="h-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="text-black text-xl sm:text-2xl font-normal font-poppins ">
              Clientes
            </div>
            <div className="text-black/60 text-xs md:text-sm mt-2 -ml-1 font-normal font-inter">
              Configuración
            </div>
          </div>
          <div
            className="flex items-center gap-0.5 bg-[#0a9e9a] px-3 py-2 text-sm md:text-md rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
            onClick={handleNuevoClick}
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
          {loading ? ( // Mostrar estado de carga
            <tr className="flex justify-center items-center">
              <td colSpan="8" className="text-center  py-32 w-full ">
                <div className="flex text-[#0a9e9a] justify-center items-center">
                  <div className="text-lg">
                    <AiOutlineLoading3Quarters className="w-12 h-12  animate-spin mr-2" />
                  </div>
                  <div>Cargando...</div>
                </div>
              </td>
            </tr>
          ) : error ? ( // Mostrar estado de error
            <tr>
              <td colSpan="8" className="text-center py-6">
                <div className="flex justify-center items-center">
                  <div className="text-red-500 text-lg">
                    Error al cargar: {error}
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            <div className="max-h-[65vh] lg:max-h-[65vh] xl:max-h-[70vh]  rounded-lg">
              <table className="min-w-full bg-white rounded-lg border-t border-gray-300 table-auto">
                <thead className="bg-[#f4f5fb] border-[1px] border-gray-300">
                  <tr className="text-xs  sm:text-sm font-semibold text-[#00535e] text-nowrap">
                    <th className="px-4 py-3 text-left">Documento</th>
                    <th className="px-4 py-3 text-left">Razón Social</th>
                    <th className="px-4 py-3 text-left">Dirección</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Encargado</th>
                    <th className="px-4 py-3">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-[1px] border-gray-300 divide-gray-200">
                  {clients.length > 0 ? (
                    clients.map((client) => (
                      <tr
                        key={client.id}
                        className="text-xs sm:text-sm text-gray-700"
                      >
                        <td className="px-4 py-2">{client?.documento || "N/A"}</td>
                        <td className="px-4 py-2">{client?.razon_social || "N/A"}</td>
                        <td className="px-4 py-2">{client?.direccion || "N/A"}</td>
                        <td className="px-4 py-2">{client?.email || "N/A"}</td>
                        <td className="px-4 py-2">{client?.encargado || "N/A"}</td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2 justify-center items-center">
                            <AiOutlineEye
                              className="w-9 h-5 cursor-pointer"
                              onClick={() => handleOpenDetails(client)}
                            />
                            <button
                              onClick={() => handleEdit(client)}
                              className="text-white bg-[#ffd133] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
                            >
                              <PencilIcon className="w-9 h-5" /> Editar
                            </button>
                            <button
                              onClick={() => handleEliminar(client.id)}
                              className="text-white bg-[#ff3342] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
                            >
                              <TrashIcon className="w-9 h-5" /> Borrar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-6">
                        No hay datos disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <ModalNewClients
          isOpen={isNewClientModalOpen}
          onClose={closeNewClientModal}
        />
        <ClientDetailsModal
          isOpen={isClientDetailsOpen}
          onClose={closeDetailsModal}
          client={selectedClient}
        />
      </div>
    </div>
  );
}

export default ClientsTable;

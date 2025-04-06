import { MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import useUsuario from '../../../Hooks/useUsuario';
import ModalNewUsuario from './ModalNewUsuario';
import { RiFileExcel2Line } from 'react-icons/ri';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function UsuarioTable() {
  const { fetchUsuarios, usuarios, EliminarUsuario, loading, error } = useUsuario();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setIsModalOpen(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await EliminarUsuario(id);
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  const filteredUsuarios = usuarios.filter((usu) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      usu.nombre && usu.nombre.toLowerCase().includes(searchLower)
    );
  });
  

  const handleNuevoClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUsuario(null);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
      <div className="h-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="text-black text-xl sm:text-2xl font-normal font-poppins ">
              Usuario
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
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Apellido</th>
                    <th className="px-4 py-3 text-left">Usuario</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Local Anexo</th>
                    <th className="px-4 py-3 text-left">Tipo Persona</th>
                    <th className="px-4 py-3 text-left">Rol Permiso</th>
                    <th className="px-4 py-3  ">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-gray-300">
                  {filteredUsuarios.length > 0 ? (
                    filteredUsuarios.map((usuario) => (
                      <tr
                        key={usuario.id}
                        className="text-xs text-nowrap sm:text-sm text-gray-700"
                      >
                        <td className="px-4 py-2">{usuario.estado ? ("Activo") : ("Inactivo")}</td>
                        <td className="px-4 py-2">{usuario.nombre}</td>
                        <td className="px-4 py-2">{usuario.apellido}</td>
                        <td className="px-4 py-2">{usuario.usuario}</td>
                        <td className="px-4 py-2">{usuario.email}</td>
                        <td className="px-4 py-2">{usuario.id_local || "N/A"}</td>
                        <td className="px-4 py-2">{usuario.tipo_persona}</td>
                        <td className="px-4 py-2">{usuario.id_rol || "N/A"}</td>
                        <td className="px-4 py-2 flex gap-2 justify-center items-center">
                          <button
                            onClick={() => handleEdit(usuario)}
                            className="text-white bg-[#ffd133] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                            <PencilIcon className="w-9 h-5" /> Editar
                          </button>
                          <button
                            onClick={() => handleEliminar(usuario.id)}
                            className="text-white bg-[#ff3342] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                            <TrashIcon className="w-9 h-5" /> Borrar
                          </button>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center py-6">
                        No hay datos disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <ModalNewUsuario
          isOpen={isModalOpen}
          onClose={closeModal}
          usuarioExistente={selectedUsuario}
          esEdicion={!!selectedUsuario}
        />
      </div>
    </div>
  );
}

export default UsuarioTable;

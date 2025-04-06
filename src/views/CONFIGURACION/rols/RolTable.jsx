import { useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/16/solid';
import { PlusIcon } from '@heroicons/react/16/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { TrashIcon } from '@heroicons/react/16/solid';
import NewRoles from './NewRoles';
import { RiFileExcel2Line } from 'react-icons/ri';
import useRoles from '../../../Hooks/useRol';


function RolTable() {
    const {fetchRoles,rols, loading, error, eliminarRoles} = useRoles();
    const [rolData, setRolData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este rol?")) {
            try {
                await eliminarRoles(id);
            } catch (error) {
                console.error("Error al eliminar roles:", error);
            }
        }
    }

    const filteredRols = rols.filter((roles) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            roles.nombre.toLowerCase().includes(searchLower)
        );
    });

    const openModal = () => {
        setIsOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
            <div className="h-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="text-black text-lg sm:text-2xl font-normal font-poppins ">
                            Roles y Permisos
                        </div>
                        <div className="text-black/60 text-xs md:text-sm mt-1.5 sm:mt-2 -ml-1 font-normal font-inter">
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
                <div className="flex overflow-x-auto mt-5 items-center justify-center">
                    <div className="max-h-[1000px] w-full">
                        <table className="min-w-full bg-white rounded-lg border-t border-gray-300 table-auto">
                            <thead className="bg-[#f4f5fb] border-[1px] border-gray-300">
                                <tr className="text-xs sm:text-sm font-semibold text-[#00535e]">
                                    <th className="px-4 py-3 text-left w-3/5">Nombre</th>
                                    <th className="px-4 py-3 text-left w-2/5">Acción</th>
                                    <th className="px-4 py-3 text-left w-2/5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y border-[1px] border-gray-300 divide-gray-200">
                                {filteredRols.length > 0 ? (
                                    filteredRols.map((rol) => (
                                        <tr key={rol.id} className="text-xs sm:text-sm text-gray-700">
                                            <td className="px-4 py-3">{rol.nombre}</td>

                                            <td className="px-4 py-3">
                                                <div className="flex gap-3">
                                                    <button className="text-white bg-[#ffd133] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                                        <PencilIcon className="w-5 h-5" />
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleEliminar(rol.id)}
                                                        className="text-white bg-[#ff3342] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                                        <TrashIcon className="w-5 h-5" />
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
                </div>
                <NewRoles isOpen={isOpen} onClose={closeModal} />
            </div>
        </div>
    )
}

export default RolTable
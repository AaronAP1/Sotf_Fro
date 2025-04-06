import { useState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/16/solid';
import { PlusIcon } from '@heroicons/react/16/solid';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import Swal from "sweetalert2";
import { TrashIcon } from '@heroicons/react/16/solid';
import NewClase from './NewClase';
import { RiFileExcel2Line } from 'react-icons/ri';
import useClaseVehiculo from '../../../../Hooks/useClaseVehiculo';

function ClaseVehiculoTable() {
    const { claseVehiculos, loading, error, eliminarClaseVehiculo } = useClaseVehiculo();
    const [selectedClaseVehiculo, setSelectedClaseVehiculo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (claseVehiculo) => {
        setSelectedClaseVehiculo(claseVehiculo);
        setIsModalOpen(true);
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
                    await eliminarClaseVehiculo(id);
                    Swal.fire(
                        'Eliminado!',
                        'La clase vehiculo ha sido eliminado.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Error',
                        'Hubo un problema al intentar eliminar la clase vehiculo.',
                        'error'
                    );
                    console.error("Error al eliminar la clase vehiculo:", error);
                }
            }
        });
    };

    const filteredClaseVehiculos = claseVehiculos.filter((clasVeh) => {
        const searchLower = searchTerm.toLowerCase();
        return(
            clasVeh.nombre.toLowerCase().includes(searchLower)
        );
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedClaseVehiculo(null)
    }

    return (
        <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
            <div className="h-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="text-black text-xl sm:text-2xl font-normal font-poppins ">
                            Clase de Vehículos
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

                <div className="flex overflow-x-auto mt-5 items-center justify-center">
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
                        <div className="max-h-[1000px] w-full">
                            <table className="min-w-full bg-white rounded-lg border-t border-gray-300 table-auto">
                                <thead className="bg-[#f4f5fb] border-[1px]  border-gray-300">
                                    <tr className="text-xs sm:text-sm font-semibold text-[#00535e]">
                                        <th className="px-4 py-3 text-left w-3/5">Nombre</th> {/* Ajustamos el ancho */}
                                        <th className="px-4 py-3 text-left w-2/5">Acción</th> {/* Ajustamos el ancho */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y border-[1px]  border-gray-300 divide-gray-200">
                                    {filteredClaseVehiculos.length > 0 ? (
                                        filteredClaseVehiculos.map((clase) => (
                                            <tr key={clase.id} className="text-xs sm:text-sm text-gray-700">
                                                <td className="px-4 py-3">{clase.nombre}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => handleEdit(clase)}
                                                            className="text-white bg-[#ffd133] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                                            <PencilIcon className="w-5 h-5" /> {/* Ajustamos el tamaño del icono */}
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleEliminar(clase.id)}
                                                            className="text-white bg-[#ff3342] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                                            <TrashIcon className="w-5 h-5" /> {/* Ajustamos el tamaño del icono */}
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
                </div>
                <NewClase
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    claseExistente={selectedClaseVehiculo}
                    esEdicion={!!selectedClaseVehiculo} />
            </div>
        </div>
    )
}

export default ClaseVehiculoTable
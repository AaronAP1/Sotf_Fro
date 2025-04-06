import { useState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/16/solid';
import { PlusIcon } from '@heroicons/react/16/solid';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { TrashIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import NewMotivo from './NewMotivo';
import { RiFileExcel2Line } from 'react-icons/ri';

function CajaMotivoTable() {
    const [cajaMotivoData, setCajaMotivoData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/personal');
                setCajaMotivoData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);

                setCajaMotivoData([
                    {
                        id: 1,
                        motivo: 'Reunion Empresarial',
                        mostrarDesdeViaje: false, // nuevo campo agregado
                    },
                    {
                        id: 2,
                        motivo: 'Vacaciones',
                        mostrarDesdeViaje: false, // nuevo campo agregado
                    },
                ]);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (id) => {
        setCajaMotivoData((prevData) =>
            prevData.map((item) =>
                item.id === id
                    ? { ...item, mostrarDesdeViaje: !item.mostrarDesdeViaje }
                    : item
            )
        );
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
            <div className="h-auto">
               <div className="flex justify-between items-center mb-6">
                         <div className="flex items-center gap-2">
                           <div className="text-black text-xl sm:text-2xl font-normal font-poppins ">
                             Caja Motivos
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
                           />
                           <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
                         </div>
                       </div>

                <div className="overflow-x-auto mt-5">
                    <div className="max-h-[200px] max-w-auto sm:max-w-screen">
                        <table className="min-w-full bg-white rounded-lg border-t border-gray-300 table-auto">
                            <thead className="bg-[#f4f5fb] text-nowrap border-[1px] border-gray-300">
                                <tr className="text-xs sm:text-sm font-semibold text-[#00535e]">
                                    <th className="px-4 py-3 text-center">Motivo</th>
                                    <th className="px-4 py-3 text-center">Mostrar Desde Viaje</th>
                                    <th className="px-4 py-3 text-left">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y border-[1px] border-gray-300 divide-gray-200">
                                {cajaMotivoData.length > 0 ? (
                                    cajaMotivoData.map((cajamotivo) => (
                                        <tr key={cajamotivo.id} className="text-xs sm:text-sm text-gray-700">
                                            <td className="px-3 py-2 text-center">{cajamotivo.motivo}</td>
                                            <td className="px-5 py-2 text-center">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="appearance-none h-5 w-5 border border-gray-400 rounded-sm absolute opacity-0 peer"
                                                        checked={cajamotivo.mostrarDesdeViaje}
                                                        onChange={() => handleCheckboxChange(cajamotivo.id)}
                                                    />
                                                    <span className="peer-checked:bg-[#0a9e9a] peer-checked:border-[#0a9e9a] peer-checked:text-white flex justify-center items-center h-5 w-5 border border-gray-400 rounded-sm">
                                                        {cajamotivo.mostrarDesdeViaje && <span className="text-white text-sm">✓</span>}
                                                    </span>
                                                </label>
                                            </td>

                                            <td className="px-3 py-2">
                                                <div className="flex gap-3">
                                                    <button className="text-white bg-[#ffd133] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                                        <PencilIcon className="w-9 h-5" /> Editar
                                                    </button>
                                                    <button className="text-white bg-[#ff3342] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                                        <TrashIcon className="w-9 h-5" /> Borrar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-6">
                                            No hay datos disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <NewMotivo isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </div>
    );
}

export default CajaMotivoTable;

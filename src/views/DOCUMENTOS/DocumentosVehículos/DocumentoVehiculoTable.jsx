import { ArchiveBoxArrowDownIcon, MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RiFileExcel2Line } from 'react-icons/ri';
import NewDocumentoVehiculo from './NewDocumentoVehiculo';


function DocumentoVehiculoTable() {
    const [docuvehiculoData, setDocuVehiculoData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/personal');
                setDocuVehiculoData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);

                setDocuVehiculoData([
                    {
                        id: 1,
                        vehiculo: 'Toyota Corolla',
                        tipodocumento: 'Licencia de Conducir',
                        documento: 'A12345678',
                        fecemision: '2025-01-15',
                        fecvencimiento: '2029-01-15',
                        costo: '500.00'
                    },

                ]);
            }
        };

        fetchData();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
            <div className="h-auto">
                <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                          <div className="text-black text-xl sm:text-2xl font-normal font-poppins ">
                          Documentos de Vehículos
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
              
                {/* Contenedor con overflow para hacer scroll horizontal en pantallas pequeñas */}
                <div className="overflow-x-auto w-[350px] sm:w-[720px] md:w-full">
                    <table className="min-w-full bg-white rounded-lg border-t border-gray-300 table-auto">
                        <thead className="bg-[#f4f5fb]  border-[1px] border-gray-300">
                            <tr className="text-xs sm:text-sm font-semibold text-[#00535e]">
                                <th className="px-4 py-3 text-left w-1/4">Vehiculo</th>
                                <th className="px-4 py-3 text-left w-1/4">Tipo Documento</th>
                                <th className="px-4 py-3 text-left w-1/4">Fecha Emisión</th>
                                <th className="px-4 py-3 text-left w-1/4">Fecha de Vencimiento</th>
                                <th className="px-4 py-3 text-left w-1/4">Costo</th>
                                <th className="px-4 py-3 text-left w-1/4">Acciones</th>
                                <th className="px-4 py-3 text-left w-1/4">Archivo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y  border-[1px] border-gray-300 divide-gray-200">
                            {docuvehiculoData.length > 0 ? (
                                docuvehiculoData.map((vehiculo) => (
                                    <tr key={vehiculo.id} className="text-xs sm:text-sm text-gray-700">
                                        <td className="px-4 py-3">{vehiculo.vehiculo}</td>
                                        <td className="px-4 py-3">{vehiculo.tipodocumento}</td>
                                        <td className="px-4 py-3">{vehiculo.documento}</td>
                                        <td className="px-4 py-3">{vehiculo.fecemision}</td>
                                        <td className="px-4 py-3">{vehiculo.costo}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-3">
                                                <button className="text-white bg-[#ffd133] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                                    <PencilIcon className="w-5 h-5" />
                                                    Editar
                                                </button>
                                                <button className="text-white bg-[#ff3342] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                                    <TrashIcon className="w-5 h-5" />
                                                    Borrar
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button className="text-white bg-[#0a9e9a] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                                <ArchiveBoxArrowDownIcon className="w-5 h-5" />
                                                Ver/Descargar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-6">
                                        No hay datos disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <NewDocumentoVehiculo isOpen={isModalOpen} onClose={closeModal}/>
            </div>
        </div>




    )
}

export default DocumentoVehiculoTable
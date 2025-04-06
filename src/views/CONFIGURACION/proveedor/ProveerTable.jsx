import { MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RiFileExcel2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ModalNewProveer from './ModalNewProveer';

function ProveerTable() {

    const [proveerData, setProveerData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNuevoClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/proveedor');
                setProveerData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);

                setProveerData([
                    {
                        id: 1,
                        documento: '2983893',
                        razonSocial: '------',
                        cuentaBancaria: '34tgew3',
                        direccion: '12345678',
                        correo: '@gmail.com',
                        apellido: 'Pérez',
                        buenContribuyente: '2023w',
                        agenteRetencion: '2025',
                        agentePercepcion: 'Siempreviva Adolfo'
                    },

                ]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex-1 bg-[#F4F5FB] h-full px-1 md:px-2">
            <div className="h-auto">
                <div className="flex justify-between items-center mb-4 ml-1">
                <div className='flex gap-3'>
                    <div className="flex items-center gap-2 py-1 px-2">
                        <Link to="/personal" className=""> 
                        <div className="text-black hover:text-[#0a9e9a] text-md sm:text-xl  font-normal font-poppins ">Personal</div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 py-1.5 border-b-[3px] border-[#0A9E9A] px-2">
                        <Link to="/proveedor" className=""> 
                        <div className="text-black hover:text-[#0a9e9a] text-md sm:text-xl  font-medium font-poppins ">Proveedor</div>
                        </Link>
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
                          />
                          <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
                        </div>
                      </div>

                <div className="overflow-x-auto mt-5 ">
                    <div className="max-h-[200px] max-w-[50px] lg:max-w-auto xl:max-w-auto 2xl:max-w-auto">
                        <table className="min-w-full bg-white rounded-lg border-t border-gray-300 table-auto">
                            <thead className="bg-[#f4f5fb] border-[1px]  border-gray-300">
                                <tr className="text-xs sm:text-sm font-semibold text-[#00535e] text-nowrap">
                                    <th className="px-4 py-3 text-left">Documento</th>
                                    <th className="px-4 py-3 text-left">Razón Social</th>
                                    <th className="px-4 py-3 text-left">Cuenta Bancaria</th>
                                    <th className="px-4 py-3 text-left">Dirección</th>
                                    <th className="px-4 py-3 text-left">Correo</th>
                                    <th className="px-4 py-3 text-left">Buen Contribuyente</th>
                                    <th className="px-4 py-3 text-left">Agente Retención</th>
                                    <th className="px-4 py-3 text-left">Agente Percepción</th>
                                    <th className="px-4 py-3 text-left">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y border-[1px] border-gray-300 divide-gray-200">
                                {proveerData.length > 0 ? (
                                    proveerData.map((proveer) => (
                                        <tr key={proveer.id} className="text-xs sm:text-sm text-gray-700">
                                            <td className="px-3 py-2">{proveer.documento}</td>
                                            <td className="px-3 py-2">{proveer.razonSocial}</td>
                                            <td className="px-3 py-2">{proveer.cuentaBancaria}</td>
                                            <td className="px-3 py-2">{proveer.direccion}</td>
                                            <td className="px-3 py-2">{proveer.correo}</td>
                                            <td className="px-3 py-2">{proveer.buenContribuyente}</td>
                                            <td className="px-3 py-2">{proveer.agenteRetencion}</td>
                                            <td className="px-3 py-2">{proveer.agentePercepcion}</td>
                                            <td className="px-3 py-2">
                                                <div className="flex gap-3">
                                                    <button className="text-white bg-[#ffd133]   rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
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
                                        <td colSpan="13" className="text-center py-6">
                                            No hay datos disponibles.
                                        </td>  
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
            
                </div>
                <ModalNewProveer isOpen={isModalOpen} onClose={closeModal} />
            </div>
            
        </div>

    );
}

export default ProveerTable;
    
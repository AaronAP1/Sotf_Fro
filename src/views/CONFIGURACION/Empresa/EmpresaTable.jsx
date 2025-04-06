import { MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RiFileExcel2Line } from 'react-icons/ri';
import useEmpresa from '../../../Hooks/useEmpresa';
import NewEmpresa from './NewEmpresa';


function EmpresaTable() {
    const {fetchEmpresa, empresa, loading, error, EliminarEmpresa } = useEmpresa();
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (emp) => {
        setSelectedEmpresa(emp);
        setIsModalOpen(true);
    }

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta empresa?")) {
            try {
                await EliminarEmpresa(id);
            } catch (error) {
                console.error("Error al eliminar la empresa:", error);
            }
        }
    }

    const filteredEmpresas = empresa.filter((emp) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            emp.nombre_comercial.toLowerCase().includes(searchLower) ||
            emp.razon_social.toLowerCase().includes(searchLower)
        );
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmpresa(null);
    }
    useEffect(() => {
        fetchEmpresa();
    }, []);
    return (
        <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
            <div className="h-auto">
                <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-2">
                    <div className="text-black text-xl sm:text-2xl font-normal font-poppins ">
                              Empresa
                            </div>
                            <div className="text-black/60 text-xs md:text-sm mt-2 -ml-1 font-normal font-inter">
                              Configuración
                            </div>
                          </div>
                    <div
                        onClick={openModal}
                        className="flex items-center gap-2 bg-[#0a9e9a] px-3 py-2 text-sm md:text-md rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                        <PlusIcon className="w-4 h-4 text-white" />
                        <div className="text-white -mt-0.5 text-md md:text-md font-normal font-inter">Nuevo</div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-3.5 md:mt-5 mb-5">
                          <div className="flex items-center gap-1 bg-[#0a9e9a] text-white text-sm md:text-md px-4 py-1.5 rounded-md cursor-pointer hover:scale-105 transition shadow-md">
                            <RiFileExcel2Line className="md:w-5 md:h-5 w-4 h-4 text-white" />
                            Excel
                          </div>
                
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
                                    <th className="px-4 py-3 text-left">Logo</th>
                                    <th className="px-3 py-3 text-left">Nombre Comercial</th>
                                    <th className="px-4 py-3 text-left">Razón Social</th>
                                    <th className="px-3 py-3 text-left">RUC</th>
                                    <th className="px-3 py-3 text-left">Telefono</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-2 py-3 text-left">Dirección</th>
                                    <th className="px-4 py-3 text-left">Ubigeo</th>
                                    <th className="px-4 py-3 text-left">Orig. Fecha Impresion</th>
                                    <th className="px-4 py-3">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y border-[1px] border-gray-300 divide-gray-200">
                                {filteredEmpresas.length > 0 ? (
                                    filteredEmpresas
                                        .filter((empresa) => empresa.id)
                                        .map((empresa) => (
                                            <tr key={empresa.id} className="text-xs sm:text-sm text-gray-700">
                                                <td className="px-4 py-2">
                                                    <img src={empresa.logo} alt="Logo" className="w-10 h-10 object-cover rounded-full" />
                                                </td>
                                                <td className="px-3 py-2">{empresa.nombre_comercial}</td>
                                                <td className="px-4 py-2">{empresa.razon_social}</td>
                                                <td className="px-3 py-2">{empresa.numero_documento}</td>
                                                <td className="px-3 py-2">{empresa.telefono}</td>
                                                <td className="px-4 py-2">{empresa.email}</td>
                                                <td className="px-2 py-2 text-nowrap">{empresa.direccion}</td>
                                                <td className="px-4 py-2">{empresa.id_ubigeo}</td>
                                                <td className="px-4 py-2">{empresa.origen_factura}</td>
                                                <td className="px-4 py-2">
                                                <div className="flex gap-2">
                                                    <button 
                                                    onClick={() => handleEdit(empresa)}
                                                    className="text-white bg-[#ffd133] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl cursor-pointer">
                                                        <PencilIcon className="w-9 h-5" /> Editar
                                                        </button>
                                                    <button 
                                                    onClick={() => handleEliminar(empresa.id)}
                                                    className="text-white bg-[#ff3342] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl cursor-pointer">
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
                  )}
                    <NewEmpresa isOpen={isModalOpen}
                        onClose={closeModal}
                        empresaExistente={selectedEmpresa}
                        esEdicion={!!selectedEmpresa} />
                </div>
            </div>
        </div>
    )
}

export default EmpresaTable
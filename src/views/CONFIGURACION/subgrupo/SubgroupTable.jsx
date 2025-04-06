import { MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { RiFileExcel2Line } from 'react-icons/ri';
import useSubGroup from '../../../Hooks/useSubGroup';
import useUsuario from '../../../Hooks/useUsuario';
import NewSubgroup from './NewSubgroup';

function SubgroupTable() {
    const { fetchSubGroups, subGroups,  eliminarSubgrupo } = useSubGroup();
    const { fetchUsuarios, usuarios } = useUsuario();
    const [userMap, setUserMap] = useState({});
    const [selectSubGrupo, setSelectSubGrupo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const userMapping = usuarios.reduce((acc, usuario) => {
            acc[usuario.id] = usuario.nombre;
            return acc;
        }, {});

        setUserMap(userMapping);
    }, [usuarios]);

    const handleEdit = (subgrupo) => {
        setSelectSubGrupo(subgrupo);
        setIsModalOpen(true);
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este documento?")) {
            try {
                await eliminarSubgrupo(id);
            } catch (error) {
                console.error("Error al eliminar el subgrupo:", error);
            }
        }
    }

    const filteredSubGroups = subGroups.filter((subG) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            subG.nombre.toLowerCase().includes(searchLower)
        );
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchSubGroups();
    }, []);
    
    useEffect(() => {
        fetchUsuarios();
    }, []);

    
    console.log("Datos de subgrupo:", subGroups);


    return (
        <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
            <div className="h-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="text-black text-xl sm:text-2xl font-normal font-poppins ">
                            SubGrupo
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


                <div className="overflow-x-auto mt-5 ">
                    <div className="max-h-[200px] max-w-auto sm:max-w-screen md:max-h-screen   ">
                        <table className="min-w-full bg-white rounded-lg border-t border-gray-300 table-auto">
                            <thead className="bg-[#f4f5fb] border-[1px]  border-gray-300">
                                <tr className="text-xs sm:text-sm font-semibold text-[#00535e]">
                                    <th className="px-4 py-3 text-left">Nombre</th>
                                    <th className="px-4 py-3 text-left">Usuarios</th>
                                    <th className="px-4 py-3">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y border-[1px]  border-gray-300 divide-gray-200">
                                {filteredSubGroups.length > 0 ? (
                                    filteredSubGroups
                                        .filter((subgroup) => subgroup.id)
                                        .map((subgroup) => (
                                            <tr key={subgroup.id} className="text-xs sm:text-sm text-gray-700">
                                                <td className="px-3 py-2">{subgroup.nombre}</td>
                                                <td className="px-3 py-2">{userMap[subgroup.id_usuario] || 'Usuario no encontrado'}</td>
                                                <td className="px-3 py-2">
                                                    <div className="flex gap-2 justify-center items-center">
                                                        <button
                                                            onClick={() => handleEdit(subgroup)}
                                                            className="text-white bg-[#ffd133]   rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                                                            <PencilIcon className="w-9 h-5" /> Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleEliminar(subgroup.id)}
                                                            className="text-white bg-[#ff3342] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
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
                    <NewSubgroup isOpen={isModalOpen}
                        onClose={closeModal}
                        subgrupoExistente={selectSubGrupo}
                        esEdicion={!!selectSubGrupo} />
                </div>
            </div>
        </div>
    )
}

export default SubgroupTable
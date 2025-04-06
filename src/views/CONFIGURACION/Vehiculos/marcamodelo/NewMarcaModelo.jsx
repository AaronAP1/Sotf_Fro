import { useState, useEffect } from 'react';
import { UserPlusIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { GoX } from 'react-icons/go';
import { BiSave } from 'react-icons/bi';
import useMarcaModelos from '../../../../Hooks/UseMarcaModeloVeh';

function NewMarcaModelo({ isOpen, onClose, marcaExistente = null, esEdicion = false }) {
    const { agregarNuevoMarcaModelo, editarMarcaModelo } = useMarcaModelos();
    const [nombre, setNombre] = useState("");
    const [modelo, setModelo] = useState("");
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        if (esEdicion && marcaExistente) {
            setNombre(marcaExistente.nombre);
            setModelo(marcaExistente.modelo ? marcaExistente.modelo.dde : ""); 
            setShowInput(!!marcaExistente.modelo);
        } else {
            setNombre("");
            setModelo("");
            setShowInput(false);
        }
    }, [esEdicion, marcaExistente]);

    const handleAddUserClick = () => {
        setShowInput(true);
    };

    const handleRemoveUserClick = () => {
        setShowInput(false);
        setModelo(""); 
    };
    
    const handleSave = () => {
        const data = {
            nombre,
            modelo: {
                dde: modelo,
            },
            estado: true
        };

        if (esEdicion && marcaExistente) {
            editarMarcaModelo(marcaExistente.id, data);
            console.log("Editar marca:", data);
        } else {
            agregarNuevoMarcaModelo(data);
            console.log("Nueva marca:", data);
        }

        setNombre("");
        setModelo("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-5 lg:min-w-md md:min-w-3/6 min-w-11/12 max-h-[90vh] shadow-lg">
                <div className="flex justify-between mt-2">
                    <h2 className="text-lg font-semibold mb-4 ml-1 text-[#0A9E9A]">
                        {esEdicion ? 'Editar Marca' : 'Nueva Marca'}
                    </h2>
                    <GoX
                        className="w-6 h-6 hover:text-gray-400 transition cursor-pointer"
                        onClick={onClose}
                    />
                </div>

                <form className="flex flex-col h-full px-1">
                    <div className="flex-grow mb-4">
                        <div className="mb-6">
                            <label className="text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
                                placeholder="Ingrese el nombre"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700">Modelo</label>
                        {!showInput ? (
                            <button
                                type="button"
                                className="mt-1 flex gap-2 px-2 py-2 bg-[#0a9e9a] text-sm items-center text-white rounded-lg hover:bg-[#098785] transition cursor-pointer"
                                onClick={handleAddUserClick}
                            >
                                <UserPlusIcon className="w-5 h-5 text-white" />
                                Agregar
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={modelo}
                                    onChange={(e) => setModelo(e.target.value)}
                                    className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
                                    placeholder="Ingrese el modelo"
                                />
                                <button
                                    type="button"
                                    className="px-2 py-2 mt-0.5 bg-[#EF4141] text-white rounded-lg hover:bg-red-600 cursor-pointer"
                                    onClick={handleRemoveUserClick}
                                >
                                    <XMarkIcon className="w-7 h-6 text-white" />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex md:flex-row justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-[#0a9e9a] text-white rounded-sm px-6 py-2 text-sm flex items-center hover:bg-[#098785] transition cursor-pointer"
                        >
                            <BiSave className="mr-2" />
                            {esEdicion ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewMarcaModelo;

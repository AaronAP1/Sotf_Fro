import { useState, useEffect } from 'react';
import { GoX } from 'react-icons/go';
import { BiSave } from 'react-icons/bi';
import useTipoDocumento from '../../../Hooks/useTipoDocument';

function NewDocumentos({ isOpen, onClose, documentoExistente = null, esEdicion = false }) {
    const { agregarNuevoDocumento, editarDocumento } = useTipoDocumento();

    const [tipo, setTipo] = useState('');
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (esEdicion && documentoExistente) {
            setTipo(documentoExistente.tipo);
            setNombre(documentoExistente.nombre);
        }
    }, [esEdicion, documentoExistente]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tipo || !nombre) {
            alert('Todos los campos son obligatorios');
            return;
        }

        if (esEdicion) {
            editarDocumento(documentoExistente.id, { tipo, nombre });
        } else {
            agregarNuevoDocumento({ tipo, nombre });
        }
        setTipo('');
        setNombre('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-5 lg:min-w-md sm:min-w-3/6 min-w-11/12 max-h-[90vh] shadow-lg">
                <div className="flex justify-between mt-2">
                    <h2 className="text-lg font-semibold mb-4 ml-1 text-[#0A9E9A]">
                        {esEdicion ? 'Editar Tipo de Documento' : 'Nuevo Tipo de Documento'}
                    </h2>
                    <GoX
                        className="w-6 h-6 hover:text-gray-400 transition cursor-pointer"
                        onClick={onClose}
                    />
                </div>
                <form className="flex flex-col h-full px-1" onSubmit={handleSubmit}>
                    <div className="flex-grow mb-4">
                        <div className="mb-3">
                            <label className="text-sm  text-gray-700">
                                Tipo 
                            </label>
                            <select
                                className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value="" disabled>Seleccione</option>
                                <option value="DNI">DNI</option>
                                <option value="RUC">RUC</option>
                                <option value="Carnet de Extrangeria">Carnet de Extrangeria</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="text-sm text-gray-700">Nombre</label>
                            <input
                                type="text"
                                className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
                                placeholder="Ingrese el nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Botón de guardar */}
                    <div className="flex justify-end py-3">
                        <button
                            type="submit"
                            className="flex gap-1 px-5 py-2.5 text-sm bg-[#0a9e9a] text-white rounded-lg hover:bg-[#098785] transition cursor-pointer"
                        >
                            <BiSave className="w-5 h-5 text-white" />
                            {esEdicion ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewDocumentos;

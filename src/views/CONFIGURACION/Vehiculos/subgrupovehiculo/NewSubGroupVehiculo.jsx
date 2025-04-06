import { useState, useEffect } from 'react';
import { UserPlusIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { GoX } from 'react-icons/go';
import { BiSave } from 'react-icons/bi';
import useSubGrupoVeh from '../../../../Hooks/useSubGrupVeh';
import useUsuario from '../../../../Hooks/useUsuario';

function NewSubGroupVehiculo({ isOpen, onClose, subgrupoExistente = null, esEdicion = false }) {
    const { agregarNuevoSubVeh, editarSubVeh } = useSubGrupoVeh();
    const { usuarios, loading } = useUsuario();
    const [nombre, setNombre] = useState('');
    const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([{ id: Date.now(), idUsuario: '' }]);

    useEffect(() => {
        if (esEdicion && subgrupoExistente) {
            setNombre(subgrupoExistente.nombre || '');

            const usuariosConId = subgrupoExistente.subgrupopersonal?.map((usuario, index) => ({
                id: Date.now() + index,
                idUsuario: usuario.id_usuario
            })) || [{ id: Date.now(), idUsuario: '' }];
            setUsuariosSeleccionados(usuariosConId);

            console.log('Editando:', subgrupoExistente);
            console.log('Usuarios:', subgrupoExistente.subgrupopersonal);

        }
    }, [esEdicion, subgrupoExistente]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre) {
            alert('Todos los campos son obligatorios');
            return;
        }

        const nuevoSubgrupoVeh = {
            nombre,
            usuarios: usuariosSeleccionados.map((u) => u.idUsuario)
        };

        try {
            if (esEdicion) {
                await editarSubVeh(subgrupoExistente.id, nuevoSubgrupoVeh);
            } else {
                await agregarNuevoSubVeh(nuevoSubgrupoVeh);
            }

            setNombre('');
            setUsuariosSeleccionados([{ id: Date.now(), idUsuario: '' }]);
            onClose();
        } catch (error) {
            console.error(error);
            alert(error.message || 'Hubo un error al guardar');
        }
    };

    const handleAddUserClick = () => {
        if (usuariosSeleccionados.length < 5) {
            setUsuariosSeleccionados([...usuariosSeleccionados, { id: Date.now(), idUsuario: '' }]);
        }
    };

    const handleRemoveUserClick = (id) => {
        setUsuariosSeleccionados(usuariosSeleccionados.filter((usuario) => usuario.id !== id));
    };

    const handleUserChange = (id, e) => {
        const updatedUsuarios = usuariosSeleccionados.map((usuario) =>
            usuario.id === id ? { ...usuario, idUsuario: e.target.value } : usuario
        );
        setUsuariosSeleccionados(updatedUsuarios);
    };

    const handleClose = () => {
        setNombre('');
        setUsuariosSeleccionados([{ id: Date.now(), idUsuario: '' }]);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-5 lg:min-w-md md:min-w-3/6 min-w-11/12 max-h-[90vh] shadow-lg">
                <div className="flex justify-between mt-2">
                    <h2 className="text-lg font-semibold mb-4 ml-1 text-[#0A9E9A]">
                        {esEdicion ? 'Editar Subgrupo de Vehículos' : 'Nuevo Subgrupo de Vehículos'}
                    </h2>
                    <GoX
                        className="w-6 h-6 hover:text-gray-400 transition cursor-pointer"
                        onClick={handleClose}
                    />
                </div>
                <form className="flex flex-col h-full px-1" onSubmit={handleSubmit}>
                    <div className="flex-grow mb-4">
                        <div className="mb-6">
                            <label className="text-sm font-medium text-gray-700">Nombre del Subgrupo de Vehículos</label>
                            <input
                                type="text"
                                className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
                                placeholder="Ingrese el nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="text-sm font-medium text-gray-700">Usuarios</label>
                            {usuariosSeleccionados.map((usuarioSeleccionado) => (
                                <div key={usuarioSeleccionado.id} className="flex items-center gap-2 mb-3">
                                    {loading ? (
                                        <p>Cargando usuarios...</p>
                                    ) : (
                                        <select
                                            className="w-full border-gray-400 text-gray-600 mt-1 border rounded-sm text-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
                                            value={usuarioSeleccionado.idUsuario}
                                            onChange={(e) => handleUserChange(usuarioSeleccionado.id, e)}
                                        >
                                            <option value="" disabled>Seleccione un usuario</option>
                                            {usuarios.map((usuario) => (
                                                <option key={usuario.id} value={usuario.id}>
                                                    {usuario.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    <button
                                        type="button"
                                        className="px-2 py-2 mt-0.5 bg-[#EF4141] text-white rounded-lg hover:bg-red-600 cursor-pointer"
                                        onClick={() => handleRemoveUserClick(usuarioSeleccionado.id)}
                                    >
                                        <XMarkIcon className="w-7 h-6 text-white" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="mt-1 flex gap-2 px-2 py-2 bg-[#0a9e9a] text-sm items-center text-white rounded-lg hover:bg-[#098785] transition cursor-pointer"
                                onClick={handleAddUserClick}
                            >
                                <UserPlusIcon className="w-5 h-5 text-white" />
                                Agregar usuario
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 py-3">
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

export default NewSubGroupVehiculo;

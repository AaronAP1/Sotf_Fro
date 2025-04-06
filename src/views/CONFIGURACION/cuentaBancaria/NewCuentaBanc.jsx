import { useState, useEffect } from 'react';
import { BiSave } from "react-icons/bi";
import { GoX } from 'react-icons/go';
import useCuentaBancariaEmpresa from '../../../Hooks/useCuentaBancariaEmpresa';

function NewCuentaBanc({ isOpen, onClose, cuentaEmpresaExistente = null, esEdicion = false }) {
    const { agregarNuevaCuentaBancariaEmpresa, editarCuentaBancariaEmpresa } = useCuentaBancariaEmpresa();
    
    // Estados para los campos del formulario
    const [banco, setBanco] = useState('');
    const [tipo, setTipo] = useState('');
    const [tipo_moneda, setTipo_moneda] = useState('');
    const [numero, setNumero] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fl_publico, setFl_publico] = useState(false);
    const [fl_detraccion, setFl_detraccion] = useState(false);


    // Cargar datos existentes si estamos en modo edición
    useEffect(() => {
        if (esEdicion && cuentaEmpresaExistente) {
            setBanco(cuentaEmpresaExistente.banco);
            setTipo(cuentaEmpresaExistente.tipo);
            setTipo_moneda(cuentaEmpresaExistente.tipo_moneda);
            setNumero(cuentaEmpresaExistente.numero);
            setDescripcion(cuentaEmpresaExistente.descripcion);
            setFl_publico(cuentaEmpresaExistente.fl_publico);
            setFl_detraccion(cuentaEmpresaExistente.fl_detraccion);
        }
    }, [esEdicion, cuentaEmpresaExistente]);

    // Si el modal no está abierto, no renderizar nada
    if (!isOpen) return null;

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (!banco || !tipo || !tipo_moneda || !numero) {
            alert('Todos los campos marcados con (*) son obligatorios');
            return;
        }

        // Crear el objeto con los datos de la cuenta
        const nuevaCuentaBancariaEmpresa = {
            banco,
            tipo,
            tipo_moneda,
            numero,
            descripcion,
            fl_publico,
            fl_detraccion,
        };

        // Si estamos en modo edición, llamar a la función de editar
        if (esEdicion) {
            editarCuentaBancariaEmpresa(cuentaEmpresaExistente.id, nuevaCuentaBancariaEmpresa);
        } else {
            // Si no, llamar a la función de agregar
            agregarNuevaCuentaBancariaEmpresa(nuevaCuentaBancariaEmpresa);
        }

        // Limpiar el formulario y cerrar el modal
        setBanco('');
        setTipo('');
        setTipo_moneda('');
        setNumero('');
        setDescripcion('');
        setFl_publico(false);
        setFl_detraccion(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 backdrop-blur-sm bg-black opacity-40"></div>
            <div className="w-78 sm:max-h-screen h-100 md:h-auto md:w-auto lg:max-h-screen lg:max-w-screen bg-white rounded-lg border-collapse overflow-y-auto p-7 pt-0 relative">
                <div className="flex justify-between sticky top-0 bg-white pt-5 p-1">
                    <h2 className="text-lg font-bold mb-4 text-[#0A9E9A]">
                        {esEdicion ? 'Editar Cuenta Bancaria' : 'Nueva Cuenta Bancaria'}
                    </h2>
                    <GoX
                        className="w-6 h-6  hover:text-gray-400 transition"
                        onClick={onClose}
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full">
                        <div className="w-full">
                            {/* Campo: Entidad Financiera */}
                            <div className='mb-4'>
                                <label className="block text-sm font-normal text-gray-700">
                                    Entidad Financiera <label className="text-[#DA0000]">(*)</label>
                                </label>
                                <select
                                    className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                                    value={banco}
                                    onChange={(e) => setBanco(e.target.value)}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="INTERBANK">INTERBANK</option>
                                    <option value="BBVA">BBVA</option>
                                    <option value="BCP">BCP</option>
                                </select>
                            </div>

                            {/* Campos: Tipo de Cuenta y Moneda */}
                            <div className="md:flex gap-10 mb-3">
                                <div className="flex flex-col w-full mb-2 md:mb-0">
                                    <label className="block text-sm font-normal text-gray-700">
                                        Tipo Cuenta <label className="text-[#DA0000]">(*)</label>
                                    </label>
                                    <select
                                        className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600"
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                                    >
                                        <option value="">Selecciona</option>
                                        <option value="Ahorro">Ahorro</option>
                                        <option value="Credito">Crédito</option>
                                    </select>
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="block text-sm font-normal text-gray-700">
                                        Moneda <label className="text-[#DA0000]">(*)</label>
                                    </label>
                                    <select
                                        className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600"
                                        value={tipo_moneda}
                                        onChange={(e) => setTipo_moneda(e.target.value)}
                                    >
                                        <option>Seleccione</option>
                                        <option>Soles</option>
                                        <option>Dólares</option>
                                        <option>Euros</option>

                                    </select>
                                </div>
                            </div>

                            {/* Campo: Número de Cuenta y Opciones de Publicidad */}
                            <div className="md:flex gap-10 mb-3 items-center">
                                <div className="flex flex-col w-full mb-1 md:mb-0">
                                    <label className="block text-sm font-normal text-gray-700">
                                        Número de Cuenta <label className="text-[#DA0000]">(*)</label>
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                                        value={numero}
                                        onChange={(e) => setNumero(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col w-full mt-3">
                                    <div className="">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-[#0a9e9a] h-3.5 w-3.5 border border-gray-400 rounded-xs"
                                                checked={fl_publico}
                                                onChange={(e) => setFl_publico(e.target.checked)}
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Mostrar Públicamente</span>
                                        </label>
                                    </div>

                                    <div className="">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-[#0a9e9a] h-3.5 w-3.5 border border-gray-400 rounded-xs"
                                                checked={fl_detraccion}
                                                onChange={(e) => setFl_detraccion(e.target.checked)}
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Detracciones</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Campo: Descripción */}
                            <div className="flex flex-col w-full mb-1 md:mb-0">
                                <label className="block text-sm font-normal text-gray-700">Descripción</label>
                                <textarea
                                    className="w-full h-[100px] mt-1 border rounded-sm p-1.5 text-sm border-gray-400 resize-none"
                                    rows="4"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>

                            {/* Botón de Guardar/Actualizar */}
                            <div className="flex md:flex-row justify-end gap-2 md:gap-20 mt-8">
                                <button
                                    type="submit"
                                    className="bg-[#0a9e9a] text-white rounded-sm px-6 py-2 text-sm flex items-center hover:bg-[#098785] transition cursor-pointer"
                                >
                                    <BiSave className="w-5 h-5 mr-1" />
                                    {esEdicion ? 'Actualizar' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewCuentaBanc;
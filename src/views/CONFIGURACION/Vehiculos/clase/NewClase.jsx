import React, { useState, useEffect } from 'react';
import { GoX } from 'react-icons/go';
import { BiSave } from "react-icons/bi";
import useClaseVehiculo from '../../../../Hooks/useClaseVehiculo';

function NewClase({ isOpen, onClose, claseExistente = null, esEdicion = false }) {
    const { agregarNuevaClaseVehiculo, editarClaseVehiculo } = useClaseVehiculo();

    // Estados del formulario
    const [nombre, setNombre] = useState('');
    const [requiere_remolcador, setRequiere_Remolcador] = useState(false);
    const [lleva_compartimiento, setLleva_Compartimiento] = useState(false);
    const [identificador_placas, setPlaca] = useState(false);
    const [identificador_serie_chasis, setSerieChasis] = useState(false);

    const secciones = [
        "Año de Fabricación", "Año de Modelo", "Placa", "Marca", "Modelo", "Tipo de Capacidad de Carga", "Galones", "Conductor", "Numero de Motor", "Serie de Chasis", "Color", "Cantidad de Ruedas",
        "Cantidad de Cilindros", "Cantidad de Asientos", "Cantidad de Pasajeros", "Cantidad de Ejes", "MTC", "Peso Seco", "Peso Bruto", "Carga Util", "HP de Motor", "Longitud", "Altura",
        "Ancho", "Cantidad de Piñas", "Carroceria", "Region", "Planta", "Plan de Contingencia", "Ruta", "Vencimiento de Tarjeta de Circulacion(Tracto)", "Vencimiento de Tarjeta de Circulacion(Cisterna)",
        "Empresa(Cubicacion)", "Numero de Tarjeta(Cubicacion)", "Vencimiento(Cubicacion)", "Tabla a Foro", "Tabla Manhole", "Scull Valvula Fondo", "Vencimiento SOAT", "Vencimiento Inspeccion(Tracto)",
        "Vencimiento Inspeccion(Cisterna)", "Numero DGH", "Vencimiento Matpel", "Empresa Aseguradora", "Vencimiento Poliza Millon Anual", "Vencimiento Poliza Millon Mensual", "Tipologia de Unidad",
        "Unidad Dedicada", "Vencimiento IQBF", "Proveedor GPS", "Plataforma GPS", "Ultimo Mantenimiento", "Fecha Fabricacion GPS", "Modelo GPS", "Tablet S/N", "Care Dive", "Camara", "Balones",
        "Lanzas", "Parches", "Pagina Web GPS", "Usuario Pagina", "Contraseña Pagina"
    ];

    // Precargar datos si es edición
    useEffect(() => {
        if (esEdicion && claseExistente) {
            setNombre(claseExistente.nombre);
            setRequiere_Remolcador(claseExistente.requiere_remolcador || false);
            setLleva_Compartimiento(claseExistente.lleva_compartimiento || false);
            setPlaca(claseExistente.identificador_placas || false);
            setSerieChasis(claseExistente.identificador_serie_chasis || false);
        } else {
            setNombre('');
            setRequiere_Remolcador(false);
            setLleva_Compartimiento(false);
            setPlaca(false);
            setSerieChasis(false);
        }
    }, [esEdicion, claseExistente]);

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Construir el objeto con los datos del formulario
        const nuevaClase = {
            nombre,
            requiere_remolcador,
            lleva_compartimiento,
            identificador_placas,
            identificador_serie_chasis
        };

        // Verificar si es edición o creación
        if (esEdicion && claseExistente) {
            editarClaseVehiculo(claseExistente.id, nuevaClase);
            console.log("Editar clase:", nuevaClase);
        } else {
            agregarNuevaClaseVehiculo(nuevaClase);
            console.log("Nueva clase:", nuevaClase);
        }

        // Limpiar campos
        setNombre("");
        setRequiere_Remolcador(false);
        setLleva_Compartimiento(false);
        setPlaca(false);
        setSerieChasis(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-5 top-10 md:max-h-screen max-w-[90%] max-h-[80%] shadow-lg overflow-y-auto">
                <div className="flex justify-between mt-2">
                    <h2 className="text-lg font-semibold mb-4 ml-1 text-[#0A9E9A]">
                        {esEdicion ? 'Editar Clase' : 'Nueva Clase'}
                    </h2>
                    <GoX
                        className="w-6 h-6 hover:text-gray-400 transition"
                        onClick={onClose}
                    />
                </div>

                {/* Contenido */}
                <div className="md:flex gap-10 mb-2">
                    <div className="flex flex-col w-full mb-1 md:mb-0">
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={requiere_remolcador}
                                    onChange={(e) => setRequiere_Remolcador(e.target.checked)}
                                    className="form-checkbox text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                                />
                                <span className="ml-2 text-sm text-gray-700">Requiere un Remolcador</span>
                            </label>
                        </div>

                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={lleva_compartimiento}
                                    onChange={(e) => setLleva_Compartimiento(e.target.checked)}
                                    className="form-checkbox text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                                />
                                <span className="ml-2 text-sm text-gray-700">Lleva Compartimientos</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label>Identificador de Vehículo</label>
                    <div className="flex gap-6 mb-5 mt-1">
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={identificador_placas}
                                    onChange={(e) => setPlaca(e.target.checked)}
                                    className="form-checkbox text-[#0a9e9a] h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                                />
                                <span className="ml-2 text-sm text-gray-700">Placa</span>
                            </label>
                        </div>
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={identificador_serie_chasis}
                                    onChange={(e) => setSerieChasis(e.target.checked)}
                                    className="form-checkbox text-[#0a9e9a] h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                                />
                                <span className="ml-2 text-sm text-gray-700">Serie de Chasis</span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* Tabla */}
                <div className="overflow-auto max-h-[50vh]">
                    <table className="table-auto w-full text-left border-sm rounded-lg border-collapse">
                        <thead className="bg-[#f4f5fb] border-[1px]  border-[#B0B0B0] rounded-t-lg sticky top-0">
                            <tr>
                                <th className="px-4 py-2">SECCIONES</th>
                                <th className="px-4 py-2">REQUERIDO</th>
                                <th className="px-4 py-2">OPCIONAL</th>
                                <th className="px-4 py-2">DESHABILITADO</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y border-[1px]  border-[#B0B0B0] divide-[#6B7280]">
                            {secciones.map((seccion, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2">{seccion}</td>
                                    <td className="px-4 py-2 text-center">
                                        <input
                                            type="radio"
                                            name={`seccion_${index}`}
                                            value="requerido"
                                            className="form-radio text-[#0a9e9a] h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <input
                                            type="radio"
                                            name={`seccion_${index}`}
                                            value="opcional"
                                            className="form-radio text-[#0a9e9a] h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <input
                                            type="radio"
                                            name={`seccion_${index}`}
                                            value="deshabilitado"
                                            className="form-radio text-[#0a9e9a] h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Botón de guardar */}
                <div className="flex justify-end gap-5 mt-4">
                    <button
                        type="submit"
                        className="text-white flex items-center gap-1 justify-center px-5 py-2 bg-[#0a9e9a] rounded-md hover:bg-[#098785] transition"
                    >
                        <BiSave />
                        {esEdicion ? 'Actualizar' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewClase;

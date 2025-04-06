import { useState, useEffect } from "react";
import { PencilIcon, PlusIcon, ArchiveBoxIcon, MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import NewCaja from "./NewCaja";
import NewImportacionCaja from "./NewImportacionCaja";

function CajaTable() {
    const [cajaData, setCajaData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isImportacionOpen, setIsImportacionOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/Caja");
                setCajaData(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setCajaData([]);
            }
        };
        fetchData();
    }, []);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="flex-1 bg-[#F4F5FB] h-full p-4">
            <div className="h-auto mt-3">

                <div className="flex justify-between items-center mb-4 gap-3">
                    <div className="flex items-center gap-2">
                        <div className="text-black text-lg sm:text-2xl font-normal font-poppins">
                            Caja
                        </div>
                        <div className="text-black/60 text-xs sm:text-sm mt-1 sm:mt-0 font-normal font-inter">
                            Tesorería
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        <button className="bg-[#0a9e9a] text-white px-3 py-2 text-xs sm:text-sm rounded-lg shadow-md hover:scale-105 transition-all" onClick={() => setIsImportacionOpen(true)} >
                            + Importación
                        </button>
                        <button className="bg-[#0a9e9a] text-white px-3 py-2 text-xs sm:text-sm rounded-lg shadow-md hover:scale-105 transition-all" onClick={openModal}>
                            + Nuevo
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-gray-700 mb-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="flex flex-col">
                            <label className="text-gray-700 text-sm mb-1">Fecha desde</label>
                            <input type="date" className="p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 text-sm mb-1">Fecha hasta</label>
                            <input type="date" className="p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 text-sm mb-1">Estado</label>
                            <select className="p-2 border border-gray-300 rounded-lg">
                                <option>Todos</option>
                                <option>Aprobado</option>
                                <option>Pendiente</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="flex items-center gap-2 bg-[#0a9e9a] text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all">
                                <MagnifyingGlassIcon className="w-4 h-4" /> Buscar
                            </button>
                        </div>

                    </div>
                </div>

                <div className="mb-4 flex justify-between">
                    <button className="flex items-center gap-2 bg-[#0a9e9a] text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all text-xs sm:text-sm">
                        <ArchiveBoxIcon className="w-5 h-5" /> Excel
                    </button>
                    <div className="relative max-w-xs">
                        <input className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a9e9a] text-xs sm:text-sm" placeholder="Buscar en tabla" />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg border-t border-gray-300">
                        <thead className="bg-[#f4f5fb] border-b border-gray-300">
                            <tr className="text-xs sm:text-sm font-semibold text-[#00535e]">
                                <th className="px-4 py-2">Acción</th>
                                <th className="px-4 py-2">Fecha</th>
                                <th className="px-4 py-2">Estado</th>
                                <th className="px-4 py-2">Número</th>
                                <th className="px-4 py-2">Viaje</th>
                                <th className="px-4 py-2">Motivo</th>
                                <th className="px-4 py-2">Submotivo</th>
                                <th className="px-4 py-2">Modalidad</th>
                                <th className="px-4 py-2">Descripción</th>
                                <th className="px-4 py-2">Tipo Persona</th>
                                <th className="px-4 py-2">Persona</th>
                                <th className="px-4 py-2">Tipo</th>
                                <th className="px-4 py-2">Subtotal</th>
                                <th className="px-4 py-2">Retención/Detracción</th>
                                <th className="px-4 py-2">Importe</th>
                                <th className="px-4 py-2">Tipo Cambio</th>
                                <th className="px-4 py-2">Tipo Documento</th>
                                <th className="px-4 py-2">Archivo</th>
                                <th className="px-4 py-2">Usuario Creación</th>
                                <th className="px-4 py-2">Comentario</th>
                                <th className="px-4 py-2">Usuario Aprobación</th>
                                <th className="px-4 py-2">Fecha Aprobación</th>
                                <th className="px-4 py-2">Banco</th>
                                <th className="px-4 py-2">Factura</th>
                                <th className="px-4 py-2">Fecha Valuta</th>
                                <th className="px-4 py-2">Motivo Anulación</th>
                                <th className="px-4 py-2">Sustento</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {cajaData.length > 0 ? cajaData.map((caja) => (
                                <tr key={caja.id} className="text-xs sm:text-sm text-gray-700">
                                    <td className="px-4 py-2 flex gap-2">
                                        <button className="bg-[#ffd133] text-white rounded-lg px-2 py-1">Editar</button>
                                        <button className="bg-[#ff3342] text-white rounded-lg px-2 py-1">Borrar</button>
                                    </td>
                                    <td className="px-4 py-2">{caja.fecha}</td>
                                    <td className="px-4 py-2">{caja.estado}</td>
                                    <td className="px-4 py-2">{caja.numero}</td>
                                    <td className="px-4 py-2">{caja.viaje}</td>
                                    <td className="px-4 py-2">{caja.motivo}</td>
                                    <td className="px-4 py-2">{caja.submotivo}</td>
                                    <td className="px-4 py-2">{caja.modalidad}</td>
                                    <td className="px-4 py-2">{caja.descripcion}</td>
                                    <td className="px-4 py-2">{caja.tipoPersona}</td>
                                    <td className="px-4 py-2">{caja.perona}</td>
                                    <td className="px-4 py-2">{caja.tipo}</td>
                                    <td className="px-4 py-2">{caja.subtotal}</td>
                                    <td className="px-4 py-2">{caja.retencionDetraccion}</td>
                                    <td className="px-4 py-2">{caja.importe}</td>
                                    <td className="px-4 py-2">{caja.tipoCambio}</td>
                                    <td className="px-4 py-2">{caja.tipoDocumento}</td>
                                    <td className="px-4 py-2">{caja.archivo}</td>
                                    <td className="px-4 py-2">{caja.usuarioCreacion}</td>
                                    <td className="px-4 py-2">{caja.comentario}</td>
                                    <td className="px-4 py-2">{caja.usuarioAprobacion}</td>
                                    <td className="px-4 py-2">{caja.fechaAprobacion}</td>
                                    <td className="px-4 py-2">{caja.banco}</td>
                                    <td className="px-4 py-2">{caja.factura}</td>
                                    <td className="px-4 py-2">{caja.fechaValuta}</td>
                                    <td className="px-4 py-2">{caja.motivoAnulacion}</td>
                                    <td className="px-4 py-2">{caja.sustento}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="10" className="text-center py-6">No hay datos disponibles.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <NewCaja isOpen={isOpen} onClose={closeModal} />
            <NewImportacionCaja isOpen={isImportacionOpen} onClose={() => setIsImportacionOpen(false)} />
        </div>
    );
}

export default CajaTable;


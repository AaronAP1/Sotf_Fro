import { useState, useEffect } from "react";
import { PencilIcon, PlusIcon, ArchiveBoxIcon, MagnifyingGlassIcon, TrashIcon, ArrowPathIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import NewPagoRequerimientos from "./NewPagoRequerimientos";

function PagoRequerimientosTable() {
    const [pagoRequerimientosData, setPagoRequerimientosData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/PagoRequerimientos");
                setPagoRequerimientosData(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setPagoRequerimientosData([]);
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
                            Pago de Requerimientos
                        </div>
                        <div className="text-black/60 text-xs sm:text-sm mt-1 sm:mt-0 font-normal font-inter">
                            Tesorería
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <button className="bg-[#0a9e9a] text-white px-3 py-2 text-xs sm:text-sm rounded-lg shadow-md hover:scale-105 transition-all" onClick={openModal}>
                            + Nuevo
                        </button>
                    </div>
                </div>
                <div className="mb-4 flex justify-between ">
                    <button className="flex items-center gap-2 bg-[#0a9e9a] text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all text-xs sm:text-sm">
                        <ArrowPathIcon className="w-4 h-4 " /> Actualizar
                    </button>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs ">
                    <div>
                        <label className="text-gray-700 text-sm font-medium">Ingresar Motivo Caja o los 8 dígitos del número de viaje</label>
                        <input className="w-full text-gray-700 bg-white p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]" placeholder="Ingrese motivo o número" />
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-medium">Ingresar nombre completo del beneficiario</label>
                        <input className="w-full text-gray-700 bg-white p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]" placeholder="Ingrese nombre" />
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-medium">Filtrar</label>
                        <select className="w-full text-gray-700 bg-white p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]">
                            <option>Mostrar Todos</option>
                            <option>Área 1</option>
                            <option>Área 2</option>
                            <option>Área 3</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm font-medium">Importe total</label>
                        <input className="w-full text-gray-700 bg-white p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]" placeholder="S/ 0.00" disabled />
                    </div>
                </div>


                <div className="flex justify-between items-center mt-3.5 md:mt-5">
                    <div className="flex items-center gap-1 bg-[#0a9e9a] text-white text-sm md:text-md px-4 py-1.5 rounded-md cursor-pointer hover:scale-105 transition shadow-md">
                        <ArchiveBoxIcon className="md:w-5 md:h-5 w-4 h-4 text-white" />
                        Excel
                    </div>
                    <div className="w-auto relative">
                        <input
                            className="md:w-80 pl-2.5 text-xs md:text-sm pr-4 p-1.5 border border-[#B0B0B0] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
                            placeholder="Buscar en tabla"
                        />
                        <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
                    </div>
                </div>
                <div className="flex overflow-x-auto mt-5 items-center justify-center">
                    <table className="min-w-full bg-white rounded-lg border-t border-gray-300">
                        <thead className="bg-[#f4f5fb] border-b border-gray-300">
                            <tr className="text-xs sm:text-sm font-semibold text-[#00535e]">
                                <th className="px-4 py-2">Acción</th>
                                <th className="px-4 py-2">Monto a Proceder</th>
                                <th className="px-4 py-2">Beneficiario</th>
                                <th className="px-4 py-2">Motivo Caja</th>
                                <th className="px-4 py-2">Submotivo</th>
                                <th className="px-4 py-2">Orden de Viaje</th>
                                <th className="px-4 py-2">Número de Caja</th>
                                <th className="px-4 py-2">Usuario</th>
                                <th className="px-4 py-2">Fecha</th>
                                <th className="px-4 py-2">Tipo</th>
                                <th className="px-4 py-2">Usuario Aprobación</th>
                                <th className="px-4 py-2">Comentario Aprobación</th>
                                <th className="px-4 py-2">Fecha Aprobación</th>
                                <th className="px-4 py-2">Detalle</th>
                                <th className="px-4 py-2">Sustento</th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pagoRequerimientosData.length > 0 ? pagoRequerimientosData.map((pagoRequerimientos) => (
                                <tr key={pagoRequerimientos.id} className="text-xs sm:text-sm text-gray-700">
                                    <td className="px-4 py-2 flex gap-2">
                                        <button className="bg-[#ffd133] text-white rounded-lg px-2 py-1">Editar</button>
                                        <button className="bg-[#ff3342] text-white rounded-lg px-2 py-1">Borrar</button>
                                    </td>
                                    <td className="px-4 py-2">{pagoRequerimientos.montoProceder}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.beneficiario}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.motivoCaja}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.submotivo}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.ordenViaje}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.numeroCaja}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.usuario}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.fecha}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.tipo}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.usuarioAprobacion}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.comentarioAprobacion}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.fechaAprobacion}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.detalle}</td>
                                    <td className="px-4 py-2">{pagoRequerimientos.sustento}</td>
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
            <NewPagoRequerimientos isOpen={isOpen} onClose={closeModal} />
        </div>
    );
}

export default PagoRequerimientosTable;

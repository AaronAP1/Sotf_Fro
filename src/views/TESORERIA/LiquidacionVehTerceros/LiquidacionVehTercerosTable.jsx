import { useState, useEffect } from "react";
import { PencilIcon, PlusIcon, ArchiveBoxIcon, MagnifyingGlassIcon, TrashIcon, CurrencyDollarIcon } from "@heroicons/react/16/solid";
import axios from "axios";

function LiquidacionVehTercerosTable() {
    const [liquidacionVehTercerosData, setLiquidacionVehTercerosData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/LiquidacionVehTerceros");
                setLiquidacionVehTercerosData(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setLiquidacionVehTercerosData([]);
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
                            Liquidación de Vehículos de Terceros
                        </div>
                        <div className="text-black/60 text-xs sm:text-sm mt-1 sm:mt-0 font-normal font-inter">
                            Tesorería
                        </div>
                    </div>

                </div>

                <div className="bg-white p-4 rounded-lg shadow-md border-gray-700 mb-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                        <div className="flex flex-col">
                            <label className="text-gray-700 text-sm mb-1">Fecha desde</label>
                            <input type="date" className="p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 text-sm mb-1">Fecha hasta</label>
                            <input type="date" className="p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 text-sm mb-1">Tipo </label>
                            <select className="p-2 border border-gray-300 rounded-lg">
                                <option>Sin liquidar</option>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="flex items-center gap-2 bg-[#0a9e9a] text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all text-xs sm:text-sm">
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
                                <th className="px-4 py-2">Proveedor</th>
                                <th className="px-4 py-2">Vehículo</th>
                                <th className="px-4 py-2">Viaje</th>
                                <th className="px-4 py-2">Remolque</th>
                                <th className="px-4 py-2">Conductor</th>
                                <th className="px-4 py-2">Total Servicio</th>
                                <th className="px-4 py-2">Total Gastos Operativos</th>
                                <th className="px-4 py-2">Total a Pagar</th>
                                <th className="px-4 py-2">Fecha Detracción</th>
                                <th className="px-4 py-2">Total Detracción</th>
                                <th className="px-4 py-2">% Detracción</th>
                                <th className="px-4 py-2">Bancho Detracción</th>
                                <th className="px-4 py-2">Archivo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {liquidacionVehTercerosData.length > 0 ? liquidacionVehTercerosData.map((liquidacionVehTerceros) => (
                                <tr key={liquidacionVehTerceros.id} className="text-xs sm:text-sm text-gray-700">
                                    <td className="px-4 py-2 flex gap-2">
                                        <button className="bg-[#ffd133] text-white rounded-lg px-2 py-1">Editar</button>
                                        <button className="bg-[#ff3342] text-white rounded-lg px-2 py-1">Borrar</button>
                                    </td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.fecha}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.estado}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.proveedor}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.vehículo}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.viaje}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.remolque}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.conductor}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.totalServicio}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.totalGastosOperativos}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.totalPagar}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.fechaDetraccion}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.totalDetraccion}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.detraccion}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.bancoDetraccion}</td>
                                    <td className="px-4 py-2">{liquidacionVehTerceros.archivo}</td>

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

        </div>
    );
}

export default LiquidacionVehTercerosTable;
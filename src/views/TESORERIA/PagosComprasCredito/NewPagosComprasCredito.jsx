import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { useRef, useState } from "react";

export default function NewPagosComprasCredito({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center px-2 z-50">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative bg-white p-6 rounded-2xl w-full max-w-2xl text-sm shadow-lg z-10 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between">
                    <h2 className="text-lg font-bold text-[#0A9E9A]">Nuevo Pago</h2>
                    <GoX className="w-6 h-6 hover:text-gray-400 transition cursor-pointer" onClick={onClose} />
                </div>

                <h3 className="text-base font-semibold mt-4">Datos del Pago</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Fecha <span className="text-red-500">(*)</span></label>
                        <input type="date" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Tipo Canal <span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Medio Pago <span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Número Operación / Referencia <span className="text-red-500">(*)</span></label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Monto a pagar <span className="text-red-500">(*)</span></label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Cuenta bancaria de destino Empresa <span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-sm text-gray-700">Observación / Detalle</label>
                    <textarea className="border border-gray-300 rounded-md p-2 w-full" rows="2"></textarea>
                </div>

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Fecha</th>
                                <th className="border border-gray-300 p-2">Orden</th>
                                <th className="border border-gray-300 p-2">Factura</th>
                                <th className="border border-gray-300 p-2">Cliente</th>
                                <th className="border border-gray-300 p-2">Ruta</th>
                                <th className="border border-gray-300 p-2">Total Orden</th>
                                <th className="border border-gray-300 p-2">Total Deuda</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2 text-center" colSpan="7">No hay datos disponibles</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <button className="bg-[#0A9E9A] text-white px-4 py-2 rounded-md text-sm flex items-center hover:bg-[#098b89] transition">
                        + Agregar
                    </button>
                    <div className="flex flex-col w-1/3">
                        <label className="text-sm text-gray-700">Importe Total de Deuda (*)</label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                <div className="flex justify-end mt-5">
                    <button className="bg-[#0A9E9A] text-white px-6 py-2 rounded-md text-sm flex items-center hover:bg-[#098b89] transition" onClick={onClose}>
                        <BiSave className="mr-2 w-5 h-5" /> Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

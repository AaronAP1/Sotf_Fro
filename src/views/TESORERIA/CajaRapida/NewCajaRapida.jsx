import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { useRef, useState } from "react";

export default function NewCajaRapida({ isOpen, onClose }) {
    if (!isOpen) return null;

    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const [fileName1, setFileName1] = useState("Ningún archivo seleccionado");
    const [fileName2, setFileName2] = useState("Ningún archivo seleccionado");

    const handleFileChange = (event, setFileName) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName("Ningún archivo seleccionado");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative bg-white p-7 rounded-2xl w-full max-w-4xl text-sm shadow-lg z-10 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between">
                    <h2 className="text-lg font-bold text-[#0A9E9A]">Nueva Caja</h2>
                    <GoX className="w-6 h-6 hover:text-gray-400 transition cursor-pointer" onClick={onClose} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Fecha (*)</label>
                        <input type="date" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Hora (*)</label>
                        <input type="time" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Fecha Valuta (*)</label>
                        <input type="date" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Número Constancia Depósito</label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Número Factura</label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Serie</label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Número (*)</label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Autoriza (*)</label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Motivo (*)</label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Submotivo (*)</label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-sm text-gray-700">Descripción (*)</label>
                    <textarea className="border border-gray-300 rounded-md p-2 w-full" rows="3"></textarea>
                </div>

                <div className="mt-4 flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <label className="text-sm text-gray-700 ml-2">No aplica para liquidación de viaje</label>
                </div>

                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    <p>ATENCIÓN: Esta solicitud de caja será evaluada y autorizada por un usuario encargado.</p>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="bg-[#0A9E9A] text-white px-6 py-2 rounded-md text-sm flex items-center hover:bg-[#098b89] transition" onClick={onClose}>
                        <BiSave className="mr-2 w-5 h-5" /> Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}


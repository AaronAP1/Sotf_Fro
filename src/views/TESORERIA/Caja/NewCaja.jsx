import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { useRef, useState } from "react";

export default function NewCaja({ isOpen, onClose }) {
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
            <div className="relative bg-white p-5 rounded-2xl w-full max-w-2xl text-xs shadow-lg z-10 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between">
                    <h2 className="text-base font-bold text-[#0A9E9A]">Nueva Caja</h2>
                    <GoX className="w-6 h-6 hover:text-gray-400 transition cursor-pointer" onClick={onClose} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-4">
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Fecha <span className="text-red-500">(*)</span></label>
                        <input type="date" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Hora <span className="text-red-500">(*)</span></label>
                        <input type="time" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Fecha Valuta <span className="text-red-500">(*)</span></label>
                        <input type="date" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Hora <span className="text-red-500">(*)</span></label>
                        <input type="time" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Constancia Depósito</label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Número Factura</label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Serie <span className="text-red-500">(*)</span></label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Número <span className="text-red-500">(*)</span></label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Órden de Viaje <span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Conductor</label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Ruta de Viaje</label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full">
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Autoriza<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Motivo<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Submotivo<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Modalidad de Pago<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Moneda<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Tipo persona<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Persona<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Importe Total<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Descripción<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Tipo de Comprobante<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Cuenta Bancaria de Persona<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-700">Cuenta Bancaria de empresa<span className="text-red-500">(*)</span></label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                </div>



                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {/* Subir Voucher */}
                    <div>
                        <label className="text-xs text-gray-700">
                            Subir Voucher
                        </label>
                        <div className="flex items-center gap-2 border border-gray-300 mt-1 rounded-md p-2">
                            <button
                                className="bg-[#F3F2F2] border border-gray-300 text-nowrap px-3 py-1 rounded-md text-xs"
                                onClick={() => fileInputRef1.current.click()}
                            >
                                Seleccionar archivo
                            </button>
                            <span className="text-gray-500 text-xs">{fileName1}</span>
                            <input
                                type="file"
                                ref={fileInputRef1}
                                className="hidden"
                                onChange={(e) => handleFileChange(e, setFileName1)}
                            />
                        </div>
                    </div>

                    {/* Subir Sustento */}
                    <div>
                        <label className="text-xs text-gray-700">
                            Subir Sustento
                        </label>
                        <div className="flex items-center gap-2 border border-gray-300 mt-1 rounded-md p-2">
                            <button
                                className="bg-[#F3F2F2] border border-gray-300 text-nowrap px-3 py-1 rounded-md text-xs"
                                onClick={() => fileInputRef2.current.click()}
                            >
                                Seleccionar archivo
                            </button>
                            <span className="text-gray-500 text-xs">{fileName2}</span>
                            <input
                                type="file"
                                ref={fileInputRef2}
                                className="hidden"
                                onChange={(e) => handleFileChange(e, setFileName2)}
                            />
                        </div>
                    </div>
                </div>


                <div className="mt-4">
                    <label className="text-xs text-gray-700">Descripción <span className="text-red-500">(*)</span></label>
                    <textarea className="border border-gray-300 rounded-md p-2 w-full" rows="3"></textarea>
                </div>

                <div className="mt-4 flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <label className="text-xs text-gray-700 ml-2">No aplica para liquidación de viaje</label>
                </div>

                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    <p>ATENCIÓN: Esta solicitud de caja será evaluada y autorizada por un usuario encargado.</p>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="bg-[#0A9E9A] text-white px-6 py-2 rounded-md text-xs flex items-center hover:bg-[#098b89] transition" onClick={onClose}>
                        <BiSave className="mr-2 w-5 h-5" /> Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}






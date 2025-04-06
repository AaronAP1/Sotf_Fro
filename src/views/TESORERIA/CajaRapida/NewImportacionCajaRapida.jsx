import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { useRef, useState } from "react";

export default function NewImportacionCajaRapida({ isOpen, onClose }) {
    if (!isOpen) return null;

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("Ningún archivo seleccionado");

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName("Ningún archivo seleccionado");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative bg-white p-7 rounded-2xl w-full max-w-md text-sm shadow-lg z-10 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between">
                    <h2 className="text-lg font-bold text-[#0A9E9A]">Nueva Importación</h2>
                    <GoX className="w-6 h-6 hover:text-gray-400 transition cursor-pointer" onClick={onClose} />
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Tipo Caja (*)</label>
                        <input type="text" className="border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Autoriza (*)</label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Cuenta Bancaria Empresa (*)</label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Proveedor (*)</label>
                        <select className="border border-gray-300 rounded-md p-2">
                            <option>Seleccione</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-700">Seleccionar archivo de excel (.XLSX)</label>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                            <button className="bg-gray-200 border border-gray-300 px-3 py-1 rounded-md text-sm" onClick={() => fileInputRef.current.click()}>
                                Seleccionar archivo
                            </button>
                            <span className="text-gray-500 text-xs">{fileName}</span>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="bg-[#0A9E9A] text-white px-6 py-2 rounded-md text-sm flex items-center hover:bg-[#098b89] transition" onClick={onClose}>
                        <BiSave className="mr-2 w-5 h-5" /> Importar
                    </button>
                </div>
            </div>
        </div>
    );
}

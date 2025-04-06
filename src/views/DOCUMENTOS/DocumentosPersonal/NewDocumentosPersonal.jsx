import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { useRef, useState } from "react";

export default function NewDocumentPersonal({ isOpen, onClose }) {
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
      {/* Fondo semi-transparente */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative bg-white p-7 rounded-2xl w-full max-w-lg text-sm shadow-lg z-10">
        {/* Título y botón de cierre */}
        <div className="flex justify-between">
          <div className="w-full h-full flex items-center">
            <h2 className="text-lg font-bold mb-4 ml-1 text-[#0A9E9A]">
              Nuevo Documento Personal
            </h2>
          </div>
          <GoX
            className="w-6 h-6 hover:text-gray-400 transition cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Formulario */}
        <div className="space-y-4 p-0.5 max-h-[400px] overflow-y-auto">
          <div className="flex flex-col ">
            <label className="text-sm text-gray-700">
              Personal <span className="text-red-500">(*)</span>
            </label>
            <select className="w-full text-gray-700 border border-gray-300 mt-1 rounded-md p-1.5">
              <option>Seleccione</option>
              <option>one</option>
              <option>Selne</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm  text-gray-700">
              Tipo de Documento <span className="text-red-500">(*)</span>
            </label>
            <select className="w-full text-gray-700 border border-gray-300 mt-1 rounded-md p-1.5">
              <option>Seleccione</option>
              <option>cie</option>
              <option>Selone</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700">
              Documento <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 mt-1 rounded-md p-2"
              placeholder="Ingrese el nombre del documento"
            />
          </div>

          <div className="md:flex items-center gap-3">
            <div className="md:max-w-9/12">
              <label className="text-sm text-gray-700">
                Archivo <span className="text-red-500">(*)</span>
              </label>
              <div className="flex items-center bg- gap-2 border border-[#B0B0B0] mt-1 rounded-md p-1.5">
                <button
                  className="bg-[#F3F2F2] border border-[#B0B0B0] text-nowrap px-3 py-1 rounded-md text-sm"
                  onClick={() => fileInputRef.current.click()}
                >
                  Seleccionar archivo
                </button>
                <span className="text-gray-500 text-xs">{fileName}</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="md:mt-6 mt-2 ml-2 md:ml-0 flex">
              <label className="flex items-center gap-1 text-sm">
                <input type="checkbox" className="form-checkbox" /><div className="-mt-0.5">No Caduca</div> 
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm  text-gray-700">
                Fecha de Emisión <span className="text-red-500">(*)</span>
              </label>
              <input
                type="date"
                className="w-full border text-gray-700 border-gray-300 mt-1 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">
                Fecha de Vencimiento <span className="text-red-500">(*)</span>
              </label>
              <input
                type="date"
                className="w-full border text-gray-700 border-gray-300 mt-1 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-[#0A9E9A] text-white px-6 py-2 rounded-md text-sm flex items-center hover:bg-[#098b89] transition"
            onClick={onClose}
          >
            <BiSave className="mr-2 w-5 h-5" /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

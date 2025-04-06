import { useState } from "react";
import { GoX } from "react-icons/go";

function NewImportation({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  return (
    <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-5 min-w-xs md:min-w-sm max-h-[90vh] shadow-lg">
        <div className="flex justify-between mt-3">
          <h2 className="text-lg font-semibold mb-4 ml-1 text-[#0A9E9A]">
            Nueva Importación
          </h2>
          <GoX
            className="w-6 h-6  hover:text-gray-400 transition cursor-pointer"
            onClick={onClose}
          />
        </div>
        <form className="flex flex-col h-full px-1 ">
          <div className="flex-grow mb-4">
            <div className="mb-6">
              <label className="text-sm text-gray-700 ">
                Seleccionar archivo Excel
              </label>
              <div className="flex items-end mt-4 ml-1">
                <label className="relative cursor-pointer bg-gray-100 border-[1px] text-black border-[#B0B0B0] px-3 py-1 rounded-sm hover:bg-gray-200 transition text-sm flex items-center gap-2">
                  <span>Seleccionar Archivo</span>
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </label>
                {fileName && (
                  <p className="text-xs text-gray-500 p-1 mt-1">{fileName}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mb-0.5 py-3 mt-5">
            <button
              type="submit"
              className="flex gap-1 px-6 py-2.5 text-sm bg-[#0a9e9a] text-white rounded-lg hover:bg-[#098785] transition cursor-pointer"
            >
              Importar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewImportation;

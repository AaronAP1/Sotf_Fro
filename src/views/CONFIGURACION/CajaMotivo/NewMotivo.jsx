import { BiSave } from 'react-icons/bi';
import { GoX } from 'react-icons/go';

function NewMotivo({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
  <div className="bg-white rounded-lg p-5 w-[560px] md:w-[500px] shadow-lg">
  <div className="flex justify-between mt-1">
                    <div className='w-full h-full flex items-center'>
                        <h2 className="text-lg font-bold mb-4 ml-1 text-[#0A9E9A]">Nuevo Motivo </h2>
                    </div>
                    <GoX className="w-6 h-6 hover:text-gray-400 transition cursor-pointer" onClick={onClose} />
                </div>
    <form className="flex flex-col h-full px-1">
      <div className="flex-grow mb-4">
        <div className="md:flex gap-7 mb-3 items-center">
          {/* Input de motivo */}
          <div className="flex flex-col w-full mb-1 md:mb-0">
            <label className="block text-sm font-normal text-gray-700">
              Motivo
            </label>
            <input
              type="text"
              className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
            />
          </div>

          {/* Checkbox alineado al lado del input */}
          <div className="flex flex-col w-full md:w-3/6 mt-5 md:mt-6 mr-10">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="option"
                value="detracciones"
                className="form-radio text-[#0a9e9a] appearance-none h-3.5 w-3.5 border border-gray-400 rounded-xs checked:bg-[#0a9e9a]"
              />
              <span className="ml-2 text-xs text-gray-700">Mostrar desde viaje</span>
            </label>
          </div>
        </div>
      </div>

      {/* Botón de guardar, en la parte inferior */}
      <div className="flex justify-end gap-4 py-1 mt-3">
        <button
          type="submit"
          className="flex gap-1 px-5 py-2.5 text-sm bg-[#0a9e9a] text-white rounded-lg hover:bg-[#098785] transition cursor-pointer"
          onClick={onClose}
        >
          <BiSave className="w-5 h-5 text-white" />
          Guardar
        </button>
      </div>
    </form>
  </div>
</div>

    )
}

export default NewMotivo
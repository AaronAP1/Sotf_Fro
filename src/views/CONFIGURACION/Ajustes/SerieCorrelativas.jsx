import { BiSave } from "react-icons/bi";

function SerieCorrelativas() {
  return (
    <div className="relative max-h-screen max-w-full md:max-w-auto overflow-auto box-border bg-white rounded-lg border border-gray-300 p-4 mt-10">
      <div className="font-bold text-center md:text-start text-md mb-4 mt-1 font-['inter']">
        SERIES DE CORRELATIVOS INTERNOS DEL SISTEMA
      </div>
      <div className="w-full">
        <div className="grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-6 mb-3 items-center">
          <div className="flex flex-col w-full mb-1 md:mb-0">
            <label className="block text-sm font-normal text-gray-700">
              Órden de Trabajo
            </label>
            <input
              type="text"
              className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
            />
          </div>
          <div className="flex flex-col w-full mb-1 md:mb-0">
            <label className="block text-sm font-normal text-gray-700">
              Órden de Viaje
            </label>
            <input
              type="text"
              className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
            />
          </div>
          <div className="flex flex-col w-full mb-1 md:mb-0">
            <label className="block text-sm font-normal text-gray-700">
              Vales de Combustible
            </label>
            <input
              type="text"
              className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
            />
          </div>
          <div className="flex flex-col w-full mb-1 md:mb-0">
            <label className="block text-sm font-normal text-gray-700">
              Vales de Pago
            </label>
            <input
              type="text"
              className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
            />
          </div>

          <div className="flex flex-col w-full mb-1 md:mb-0">
            <label className="block text-sm font-normal text-gray-700">
              TesorerÍa (Caja)
            </label>
            <input
              type="text"
              className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
            />
          </div>
          <div className="flex flex-col w-full mb-1 md:mb-0">
            <label className="block text-sm font-normal text-gray-700">
              Almacen (Órden de Compra)
            </label>
            <input
              type="text"
              className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
            />
          </div>
        </div>
        <div className="flex md:flex-row justify-end gap-2 md:gap-20 mt-8 mb-2">
          <button className="bg-[#0a9e9a] text-white rounded-md px-6 py-2 text-sm flex items-center hover:bg-[#098785] transition cursor-pointer">
            <BiSave className="w-5 h-5 mr-1" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SerieCorrelativas;

import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiFileExcel2Line } from "react-icons/ri";


function CostosTable() {
  const [costosData, setCostosData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/costos");
        setCostosData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 bg-[#F4F5FB] h-full p-1.5 px-1 md:px-2">
      <div className="h-auto mt-1 ">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">

            <div className="text-black text-xl md:text-2xl font-normal font-poppins ">
              Centros de Costos
            </div>
            <div className="text-black/60 text-xs mt-2 -ml-1 font-normal font-inter">
              Configuración
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-5">
          {/* Primera fila: Buscar por área con icono */}
          <div className=" grid xl:grid-cols-3 md:grid-cols-2 w-full">
           <div className="flex items-center gap-1">
            <select className="w-full text-[#807E7E] p-1.5 text-sm border border-[#B0B0B0] rounded-lg pl-2 text-left focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]">
              <option>Buscar por área</option>
              <option>Área 1</option>
              <option>Área 2</option>
              <option>Área 3</option>
            </select>

            <button className="bg-[#0a9e9a] p-1.5 rounded-lg text-white hover:scale-105 transition">
              <AiOutlineSearch className="w-5 h-5" />
            </button>
            </div>
          </div>



          {/* Segunda fila: Botón Excel e Input de búsqueda en tabla */}
          <div className="flex justify-between items-center mt-3.5 md:mt-5">

            <div className="flex items-center gap-1 bg-[#0a9e9a] text-white text-sm md:text-md px-4 py-1.5 rounded-md cursor-pointer hover:scale-105 transition shadow-md">
              <RiFileExcel2Line className="md:w-5 md:h-5 w-4 h-4 text-white" />
              Excel
            </div>

            {/* Input de búsqueda en tabla */}
            <div className="w-auto relative">
              <input
                className="md:w-80 pl-2.5 text-xs md:text-sm pr-4 p-1.5 border border-[#B0B0B0] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
                placeholder="Buscar en tabla"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
            </div>
          </div>
        </div>


        <div className="flex overflow-x-auto mt-5 items-center justify-center">
          <div className="max-h-[1000px] w-full">
            <table className="min-w-full bg-white rounded-lg border-t border-gray-300 table-auto">
              <thead className="bg-[#f4f5fb] border-[1px] border-gray-300">
                <tr className="text-xs sm:text-sm font-semibold text-[#00535e]">

                  <th className="px-4 py-3 text-left">Estado</th>
                  <th className="px-4 py-3 text-left">CECO</th>
                  <th className="px-4 py-3 text-left">Área</th>
                  <th className="px-4 py-3 text-left">Abreviado</th>
                  <th className="px-4 py-3 text-left">Renombre</th>
                  <th className="px-4 py-3 text-left">Importe</th>
                  <th className="px-4 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y border-[1px] border-gray-300 divide-gray-200">
                {costosData.length > 0 ? (
                  costosData.map((costos) => (
                    <tr
                      key={costos.id}
                      className="text-xs sm:text-sm text-gray-700"
                    >
                      <td className="px-3 py-2">{costos.estado}</td>
                      <td className="px-3 py-2">{costos.ceco}</td>
                      <td className="px-3 py-2">{costos.area}</td>
                      <td className="px-3 py-2">{costos.abreviado}</td>
                      <td className="px-3 py-2">{costos.renombre}</td>
                      <td className="px-3 py-2">{costos.importe}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-3">
                          <button className="text-white bg-[#ffd133] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                            <PencilIcon className="w-5 h-5" />{" "}
                            {/* Ajustamos el tamaño del icono */}
                            Editar
                          </button>
                          <button className="text-white bg-[#ff3342] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                            <TrashIcon className="w-5 h-5" />{" "}
                            {/* Ajustamos el tamaño del icono */}
                            Borrar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center py-6">
                      No hay datos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostosTable;

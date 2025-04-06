import {
  ArrowDownTrayIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import NewDocumentosPersonal from "./NewDocumentosPersonal";

function DocumentosPersonalTable() {
  const [docPersonalData, setDocPersonalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/DocumentosPersonal"
        );
        setDocPersonalData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);

        setDocPersonalData([
          {
            id: 1,
            accion: "Banco",
            personal: "Ahorros",
            tipoDocumento: "PEN",
            documento: "123456789012",
            fechaEmision: "07/02/2025",
            fechaVencimiento: "Sí",
            archivo: "No",
          },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
      <div className="h-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="text-black text-xl md:text-2xl font-normal font-poppins ">
              Personal
            </div>
            <div className="text-black/60 text-xs mt-2 -ml-1 font-normal font-inter">
              Documentos
            </div>
          </div>
          <div
            className="flex items-center gap-0.5 bg-[#0a9e9a] px-3 py-2 text-sm md:text-md rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
            onClick={openModal}
          >
            <PlusIcon className="w-4 h-4 text-white" />
            <div className="text-white -mt-0.5 text-md font-normal font-inter">
              Nuevo
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-5">
          {/* Primera fila: Buscar por área con icono */}
          <div className="md:w-3/6 w-full">
            <label className="text-gray-700 ml-0.5 text-sm font-medium">
              Filtrar Personal
            </label>
            <div className="flex items-center gap-1 mt-0.5">
              <select className="w-full text-[#807E7E] bg-white p-1.5 text-sm border border-[#B0B0B0] rounded-lg pl-2 text-left focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]">
                <option>Seleccione</option>
                <option>Área 1</option>
                <option>Área 2</option>
                <option>Área 3</option>
              </select>
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
                <tr className="text-xs sm:text-sm font-semibold  text-[#00535e]">
                  <th className="px-4 py-3 text-left">Personal</th>
                  <th className="px-4 py-3 text-left">Tipo Documento</th>
                  <th className="px-4 py-3 text-left">Documento</th>
                  <th className="px-4 py-3 text-left">Fecha de Emisión</th>
                  <th className="px-4 py-3 text-left">Fecha de vencimiento</th>
                  <th className="px-4 py-3 text-left">Archivo</th>
                  <th className="px-4 py-3 text-left">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y border-[1px] border-gray-300 divide-gray-200">
                {docPersonalData.length > 0 ? (
                  docPersonalData.map((docPersonal) => (
                    <tr
                      key={docPersonal.id}
                      className="text-xs sm:text-sm text-gray-700"
                    >
                      <td className="px-4 py-3">{docPersonal.personal}</td>
                      <td className="px-4 py-3">{docPersonal.tipoDocumento}</td>
                      <td className="px-4 py-3">{docPersonal.documento}</td>
                      <td className="px-4 py-3">{docPersonal.fechaEmision}</td>
                      <td className="px-4 py-3">
                        {docPersonal.fechaVencimiento}
                      </td>
                      <td className="px-4 py-3">{docPersonal.archivo}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button className="text-white bg-[#ffd133] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                            <EyeIcon className="w-5 h-5" />{" "}
                            {/* Ajustamos el tamaño del icono */}
                            Ver
                          </button>
                          <button className="text-white bg-[#ff3342] rounded-lg px-3 py-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                            <ArrowDownTrayIcon className="w-5 h-5" />{" "}
                            {/* Ajustamos el tamaño del icono */}
                            Descargar
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
        <NewDocumentosPersonal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
}

export default DocumentosPersonalTable;

import {
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { RiFileExcel2Line } from "react-icons/ri";
import ConfigurationVehicle from "./ConfigurationVehicle";
import ModalNewVehiculo from "./ModalNewVehicle";
import NewImportation from "./NewImportation";

function VehiculosTable() {
  const [vehiculoData, setVehiculoData] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]); // Estado para las columnas seleccionadas

  // Función para manejar la configuración guardada
  const handleSaveConfiguration = (columns) => {
    setSelectedColumns(columns);
    localStorage.setItem("selectedColumns", JSON.stringify(columns));
  };

  useEffect(() => {
    const savedColumns = localStorage.getItem("selectedColumns");
    if (savedColumns) {
      setSelectedColumns(JSON.parse(savedColumns));
    }
  }, []);

  const handleNuevoClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNuevoClickImportation = () => {
    setShowImportModal(true);
  };

  const closeModalImportation = () => {
    setShowImportModal(false);
  };

  const handleNuevoClickConfiguration = () => {
    setShowConfigModal(true);
  };

  const closeModalConfiguration = () => {
    setShowConfigModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/vehiculos");
        setVehiculoData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);

        setVehiculoData([
          {
            id: 1,
            estado: "Operativo",
            contratacion: "Propietario",
            subgrupo: "Transporte",
            clase: "Camión",
            placa: "ABC-123",
            serieGRT: "GRT-456789",
            serieChasis: "CHS-987654",
            capacidadM3Real: 20,
            capacidadM3Cliente: 18,
            capacidadPaletas: 10,
            mtc: "Habilitado",
            confVehicular: "4x2",
            marca: "Volvo",
            modelo: "FH16",
            capacidadCarga: "30 toneladas",
            pesoSeco: "8 toneladas",
            pesoBruto: "38 toneladas",
            cargaUtil: "30 toneladas",
            tanqueCombustible1: "200 litros",
            tanqueCombustible2: "150 litros",
            combustibleTotal: "350 litros",
            reservaCombustible: "50 litros",
            glUtiles: "300 litros",
            semirremolque: "15 toneladas",
            conductor: "Carlos Fernández",
          },
          {
            id: 2,
            estado: "En mantenimiento",
            contratacion: "Arrendado",
            subgrupo: "Logística",
            clase: "Furgón",
            placa: "XYZ-789",
            serieGRT: "GRT-112233",
            serieChasis: "CHS-445566",
            capacidadM3Real: 15,
            capacidadM3Cliente: 14,
            capacidadPaletas: 8,
            mtc: "Pendiente",
            confVehicular: "6x4",
            marca: "Scania",
            modelo: "R500",
            capacidadCarga: "25 toneladas",
            pesoSeco: "9 toneladas",
            pesoBruto: "34 toneladas",
            cargaUtil: "25 toneladas",
            tanqueCombustible1: "180 litros",
            tanqueCombustible2: "120 litros",
            combustibleTotal: "300 litros",
            reservaCombustible: "40 litros",
            glUtiles: "260 litros",
            semirremolque: "12 toneladas",
            conductor: "Luis Ramírez",
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
            <div className="text-black text-xl sm:text-2xl font-normal font-poppins ">
              Vehículos
            </div>
            <div className="text-black/60 text-xs md:text-sm mt-2 -ml-1 font-normal font-inter">
              Configuración
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <div
              onClick={handleNuevoClickConfiguration}
              className="flex items-center gap-1 bg-white px-1 py-2 rounded-lg border-[1px] border-[#B0B0B0] cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
            >
              <HiOutlineCog8Tooth className=" w-3 h-3 md:w-4 md:h-4 text-black" />
              <div className="text-black -mt-0.5 text-sm md:text-md font-normal font-inter">
                Configuración
              </div>
            </div>
            <div
              onClick={handleNuevoClickImportation}
              className="flex items-center gap-0.5 bg-[#0a9e9a] px-3 py-2 rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
            >
              <PlusIcon className=" w-3 h-3 md:w-4 md:h-4 text-white" />
              <div className="text-white -mt-0.5 text-sm md:text-md font-normal font-inter">
                Importación
              </div>
            </div>
            <div
              onClick={handleNuevoClick}
              className="flex items-center justify-center gap-0.5 bg-[#0a9e9a] px-3 py-1.5 text-sm md:text-md  rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
            >
              <PlusIcon className="w-3 h-3 md:w-4 md:h-4 text-white" />
              <div className="text-white -mt-0.5 text-sm md:text-md font-normal font-inter">
                Nuevo
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3.5 md:mt-5 mb-5">
          <div className="flex items-center gap-1 bg-[#0a9e9a] text-white text-sm md:text-md px-4 py-1.5 rounded-md cursor-pointer hover:scale-105 transition shadow-md">
            <RiFileExcel2Line className="md:w-5 md:h-5 w-4 h-4 text-white" />
            Excel
          </div>

          {/* Input de búsqueda en tabla */}
          <div className="w-auto relative">
            <input
              className="sm:w-80 pl-2.5 text-xs md:text-sm pr-4 p-1.5 border border-[#B0B0B0] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
              placeholder="Buscar en tabla"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
          </div>
        </div>

        <div className="overflow-x-auto mt-5 ">
          <div className="max-h-[200px] max-w-[50px] lg:max-w-auto xl:max-w-auto 2xl:max-w-auto">
            <table className="min-w-full bg-white rounded-lg border-t border-gray-300 table-auto">
              <thead className="bg-[#f4f5fb] border-[1px] border-gray-300">
                <tr className="text-xs sm:text-sm font-semibold text-[#00535e] text-nowrap">
                  {selectedColumns.map((column) => (
                    <th key={column.id} className="px-4 py-3 text-left">
                      {column.name}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left">Acción</th>{" "}
                  {/* Columna de acciones siempre visible */}
                </tr>
              </thead>
              <tbody className="divide-y border-[1px] border-gray-300 divide-gray-200">
                {vehiculoData.length > 0 ? (
                  vehiculoData.map((vehiculo) => (
                    <tr
                      key={vehiculo.id}
                      className="text-nowrap text-xs sm:text-sm text-gray-700"
                    >
                      {selectedColumns.map((column) => (
                        <td key={column.id} className="px-3 py-2">
                          {vehiculo[column.id]}
                        </td>
                      ))}
                      <td className="px-3 py-2">
                        <div className="flex gap-3">
                          <button className="text-white bg-[#ffd133] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                            <PencilIcon className="w-9 h-5" /> Editar
                          </button>
                          <button className="text-white bg-[#ff3342] rounded-lg px-2 py-1 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
                            <TrashIcon className="w-9 h-5" /> Borrar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={selectedColumns.length + 1}
                      className="text-center py-6"
                    >
                      No hay datos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ModalNewVehiculo isOpen={isModalOpen} onClose={closeModal} />
        <ConfigurationVehicle
          isOpen={showConfigModal}
          onClose={closeModalConfiguration}
          onSave={handleSaveConfiguration}
          initialSelectedColumns={selectedColumns || []} // Asegura que sea un array
        />

        <NewImportation
          isOpen={showImportModal}
          onClose={closeModalImportation}
        />
      </div>
    </div>
  );
}

export default VehiculosTable;

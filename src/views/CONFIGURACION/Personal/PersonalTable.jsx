import {
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiFileExcel2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import usePersonal from "../../../Hooks/usePersonal";
import useSubGroup from "../../../Hooks/useSubGroup";
import ModalNewPersonal from "./ModalNewPersonal";

function PersonalTable() {
  const {fetchPersonal, personals, loading, error, eliminarPersonal } = usePersonal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMap, setUserMap] = useState({});
  const { subGroups } = useSubGroup();
  const [selectPersonal, setSelectPersonal] = useState(null);

  useEffect(() => {
    const userMapping = subGroups.reduce((acc, subgroup) => {
      acc[subgroup.id] = subgroup.nombre;
      return acc;
    }, {});

    setUserMap(userMapping);
  }, [subGroups]);

  const handleEdit = (personal) => {
    setSelectPersonal(personal);
    setIsModalOpen(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este personal?")) {
      try {
        await eliminarPersonal(id);
      } catch (error) {
        console.error("Error al eliminar el personal:", error);
      }
    }
  };

  const handleNuevoClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchPersonal();
  }, [fetchPersonal]);

  /* console.log("Datos de personals:", personals);
console.log("Datos de subgrupos:", subGroups);
console.log("Mapa de subgrupos:", userMap); */

  return (
    <div className="flex-1 bg-[#F4F5FB] h-full px-1 md:px-2">
      <div className="h-auto">
        <div className="flex justify-between items-center mb-4 ml-1">
          <div className="flex gap-3">
            <div className="flex items-center gap-2 py-1.5 border-b-[3px] border-[#0A9E9A] px-2">
              <Link to="/personal" className="">
                <div className="text-black hover:text-[#0a9e9a] text-md sm:text-xl  font-medium font-poppins ">
                  Personal
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-2 py-1 px-2">
              <Link to="/proveedor" className="">
                <div className="text-black hover:text-[#0a9e9a] text-md sm:text-xl  font-normal font-poppins ">
                  Proveedor
                </div>
              </Link>
            </div>
          </div>
          <div
            className="flex items-center gap-0.5 bg-[#0a9e9a] px-3 py-2 text-sm md:text-md rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
            onClick={handleNuevoClick}
          >
            <PlusIcon className="w-4 h-4 text-white" />
            <div className="text-white -mt-0.5 text-md md:text-md font-normal font-inter">
              Nuevo
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

        <div className="overflow-x-auto mt-5">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin mr-2 text-[#0a9e9a]" />
              <div>Cargando...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-6 text-red-500">
              Error al cargar: {error}
            </div>
          ) : (
            <div className="max-h-[65vh] lg:max-h-[65vh] xl:max-h-[70vh]  overflow-y-auto border border-gray-300 rounded-lg">
              <table className="min-w-full bg-white rounded-lg table-auto">
                <thead className="bg-[#f4f5fb] border-b border-gray-300 sticky top-0 z-10">
                  <tr className="text-xs sm:text-sm text-nowrap font-semibold text-[#00535e]">
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-left">Subgrupo</th>
                    <th className="px-4 py-3 text-left">Tipo Personal</th>
                    <th className="px-4 py-3 text-left">Tipo Contratación</th>
                    <th className="px-4 py-3 text-left">Documento</th>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Apellido</th>
                    <th className="px-4 py-3 text-left">Fecha de ingreso</th>
                    <th className="px-4 py-3 text-left">Fecha de salida</th>
                    <th className="px-4 py-3 text-left">Dirección</th>
                    <th className="px-4 py-3 text-left">Teléfono</th>
                    <th className="px-4 py-3 text-left">Cuenta Bancaria</th>
                    <th className="px-4 py-3 text-left">Documento Vencidos </th>
                    <th className="px-4 py-3">Acción</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 border-gray-300">
                  {personals && personals.length > 0 ? (
                    personals
                      .filter((personal) => personal.id)
                      .map((personal) => (
                        <tr
                          key={personal.id}
                          className="text-xs sm:text-sm text-gray-700"
                        >
                          <td className="px-4 py-2">
                            {personal.estado_personal}
                          </td>
                          <td className="px-4 py-2">
                            {userMap[personal.id_subgrupo]}
                          </td>
                          <td className="px-4 py-2">
                            {personal.tipo_personal}
                          </td>
                          <td className="px-4 py-2">
                            {personal.tipo_contratacion}
                          </td>
                          <td className="px-4 py-2">
                            {personal.tipo_documento}
                          </td>
                          <td className="px-4 py-2">{personal.nombres}</td>
                          <td className="px-4 py-2">{personal.apellidos}</td>
                          <td className="px-4 py-2">
                            {personal.fecha_ingreso}
                          </td>
                          <td className="px-4 py-2">{personal.fecha_salida}</td>
                          <td className="px-4 py-2 text-nowrap">{personal.direccion}</td>
                          <td className="px-4 py-2">{personal.telefono}</td>
                          <td className="px-4 py-2">
                            {personal.cuenta_bancaria}
                          </td>{" "}
                          {/*<--- falta crear en el postman */}
                          <td className="px-4 py-2">
                            {personal.estado_documentos_vencidos}
                          </td>
                          <td className="px-3 py-2 flex gap-2 justify-center items-center">
                            <button
                              onClick={() => handleEdit(personal)}
                              className="text-white bg-[#ffd133] flex flex-col items-center rounded-lg px-2 py-1 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
                            >
                              <PencilIcon className="w-5 h-5" />
                              <div>Editar</div>
                            </button>
                            <button
                              onClick={() => handleEliminar(personal.id)}
                              className="text-white bg-[#ff3342] flex flex-col items-center rounded-lg px-2 py-1 cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
                            >
                              <TrashIcon className="w-5 h-5" />
                              <div>Borrar</div>
                            </button>
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
          )}

          <ModalNewPersonal
            isOpen={isModalOpen}
            onClose={closeModal}
            personalExistente={selectPersonal}
            esEdicion={!!selectPersonal}
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalTable;

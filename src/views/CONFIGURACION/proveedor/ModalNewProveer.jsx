import { useState } from "react";
import { AiOutlinePlus, AiOutlineRight, AiOutlineUpload } from "react-icons/ai";
import { GoX } from "react-icons/go";

function ModalNewProveer({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState("Datos Personales");

  // Estado para los campos obligatorios de Datos Personales
  const [document, setDocument] = useState("");
  const [docNumber, setDocNumber] = useState("");

  const [fields, setFields] = useState([]);

  // Validación del botón
  const isDatosPersonalesComplete =
    document &&
    docNumber;

  const isCuentasBancariasComplete =
    fields.length > 0 &&
    fields.every(
      (field) => field.banco && field.tipoCuenta && field.numeroCuenta
    );

  const tabs = [
    "Datos Personales",
    "Cuentas Bancarias",
  ];

  const addField = (e) => {
    e.preventDefault(); // Evita el refresh o cierre del modal
    e.stopPropagation(); // Evita propagación del evento si el modal se cierra por un onClick externo

    setFields([
      ...fields,
      {
        banco: "",
        tipoCuenta: "",
        numeroCuenta: "",
        detraccion: false,
        estado: true,
      },
    ]);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Datos Personales":
        return (
          <div>
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full">
              <div className=" flex md:flex-col gap-4 md:gap-0 items-center bg-gr md:w-2/6 -ml-1 mr-1">
                <div className="w-40 h-48 bg-gray-200 flex items-center justify-center">
                  Sin Imagen
                </div>
                <div className="flex flex-col">
                  <button className="bg-[#0a9e9a] text-white px-4 mr-2 md:mr-0 md:px-7 ml-0 md:ml-1 py-1 text-sm flex items-center">
                    <AiOutlineUpload className="mr-1 w-5 h-5 md:w-auto md:h-auto" />
                    Subir imagen
                  </button>
                </div>
              </div>
              <div className="w-full md:px-2 lg:px-1">
                <div className="md:flex gap-4 md:mb-3 mb-1 w-full">
                  <div className="flex flex-col w-full mb-1 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                      Documento <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                      value={document}
                      onChange={(e) => setDocument(e.target.value)}
                    >
                      <option>Tipo de documento</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Número Doc. <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese N° documento"
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className=" gap-4 mb-2 ">
                  <div className="flex flex-col w-full mb-1 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                    Razón Social
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese razón social"
                    />
                  </div>
                  <div className="flex flex-col w-full mt-2.5">
                    <label className="block text-sm font-medium text-gray-700">
                    Dirección
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese dirección"
                    />  
                  </div>
                </div>
                <div className="md:col-span-2 mb-3">
                  <label className="block text-sm font-medium text-gray-700 ">
                    UBIGEO - (Departamento - Provincia - Distrito)
                  </label>
                  <select className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600">
                    <option>Departamento - Provincia - Distrito</option>
                    <option>q</option>
                    <option>e...</option>
                  </select>
                </div>
                <div className=" gap-4 mb-2 ">
                  <div className="flex flex-col w-full mb-1 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese nombres"

                    />
                  </div>
                  <div className="flex flex-col w-full mt-2.5">
                    <label className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese N° telefónico"

                    />
                  </div>
                  <div className="flex flex-col w-full mt-2.5">
                    <label className="block text-sm font-medium text-gray-700">
                    Correo Electrónico
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese correo"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-5 lg:px-1 space-y-2">
               <div className="flex w-full ">
                 <div className="flex justify-center items-center">
                   <input
                     type="checkbox"
                     className=" mr-2  border rounded-sm text-sm text-gray-400 h-4 w-3 "
                   />
                 </div>
                 <label className="block text-xs text-gray-700">
                   Visualizar sin restricción de subgrupos
                 </label>
               </div>
               <div className="flex w-full">
                 <div className="flex justify-center items-center">
                   <input
                     type="checkbox"
                     className=" mr-2  border rounded-sm text-sm text-gray-400 h-4 w-3 "
                   />
                 </div>
                 <label className="block text-xs text-gray-700">
                   Autoriza gasto
                 </label>
               </div>
               <div className="flex w-full">
                 <div className="flex justify-center items-center">
                   <input
                     type="checkbox"
                     className=" mr-2  border rounded-sm text-sm text-gray-400 h-4 w-3 "
                   />
                 </div>
                 <label className="block text-xs text-gray-700">
                   Iniciar y Finalizar Viaje
                 </label>
               </div>
             
              
             </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8 mb-5">
              <button
                type="submit"
                className={`bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition ${
                  !isDatosPersonalesComplete ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isDatosPersonalesComplete}
                onClick={() => setActiveTab("Cuentas Bancarias")}
              >
                Continuar
                <AiOutlineRight className="ml-1" />
              </button>
            </div>
          </div>
        );
      case "Cuentas Bancarias":
        return (
          <div className="p-0.5">
            <button
              onClick={addField}
              className="flex items-center mb-3 px-4 py-2 bg-[#0A9E9A] text-white rounded-lg hover:bg-[#0B8B87] transition"
            >
              <AiOutlinePlus className="mr-2" /> Agregar
            </button>

            <div className="md:space-y-3">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="grid space-y-2.5 md:grid-cols-4 lg:gap-4 md:gap-2 items-center  border-b-2 py-2 mt-4 md:mt-0 border-gray-300 "
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      BANCO
                    </label>
                    <input
                      type="text"
                      placeholder="Banco"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      value={field.banco}
                      onChange={(e) =>
                        handleFieldChange(index, "banco", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      TIPO DE CUENTA
                    </label>
                    <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                      value={field.tipoCuenta}
                      onChange={(e) =>
                        handleFieldChange(index, "tipoCuenta", e.target.value)
                      }
                    >
                      <option value="">Seleccione</option>
                      <option value="Ahorro">Ahorro</option>
                      <option value="Corriente">Corriente</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      N° DE CUENTA
                    </label>
                    <input
                      type="text"
                      placeholder="Número de cuenta"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      value={field.numeroCuenta}
                      onChange={(e) =>
                        handleFieldChange(index, "numeroCuenta", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex lg:gap-4 md:gap-2 gap-8  w-full justify-center md:justify-normal">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        DETRACCIÓN
                      </label>
                      <input
                        type="checkbox"
                        className="w-full mt-2 border rounded-sm p-1.5 text-sm text-gray-400 h-5 "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        ESTADO
                      </label>
                      <input
                        type="checkbox"
                        className="w-full mt-2 border rounded-sm p-1.5 text-sm text-gray-400 h-5 "
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-8 mb-2">
              <button
                type="submit"
                className={`bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition ${
                  !isCuentasBancariasComplete
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!isCuentasBancariasComplete}
                 onClick={onClose}
              >
                Continuar
                <AiOutlineRight className="ml-1" />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 lg:min-w-3xl md:min-w-2xl w-96 max-w-xl max-h-[90vh] shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-4 ml-1 text-[#0A9E9A]">
            Nuevo Proveedor
          </h2>
          <GoX
            className="w-6 h-6  hover:text-gray-400 transition"
            onClick={onClose}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto mb-4 pb-2 items-center md:items-start">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={` px-1 py-1 text-sm font-medium ${
                activeTab === tab
                  ? "text-black border-b-2 border-[#0a9e9a]"
                  : "text-gray-500"
              } ${
                (tab !== "Datos Personales" && !isDatosPersonalesComplete) ||
                (tab !== "Cuentas Bancarias" && !isCuentasBancariasComplete)
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {}}
              disabled={
                (tab !== "Datos personales" && !isDatosPersonalesComplete) ||

                (tab !== "Cuentas Bancarias" && !isCuentasBancariasComplete)
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <form className=" max-h-[70vh] overflow-y-auto">{renderContent()}</form>
      </div>
    </div>
  );
}

export default ModalNewProveer;

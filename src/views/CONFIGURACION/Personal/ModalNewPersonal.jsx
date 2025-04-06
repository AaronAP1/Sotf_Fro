import { BiSave } from "react-icons/bi"; 
import { AiOutlinePlus } from "react-icons/ai";
import { GoX } from "react-icons/go";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";
import { useState } from "react";
import usePersonal from "../../../Hooks/usePersonal";

function ModalNewPersonal({ isOpen, onClose, personalExistente = null, esEdicion = false }) {
 
  const { agregarNuevoPersonal, editarPersonal } = usePersonal();
    const [activeTab, setActiveTab] = useState("Datos 1");

  // Estado para los campos obligatorios de Datos 1
  const [personalType, setPersonalType] = useState("");
  const [document, setDocument] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contractType, setContractType] = useState("");

  // Estado para los campos obligatorios de Datos 2
  const [driverLicense, setDriverLicense] = useState("");
  const [categoryLicense, setCategoryLicense] = useState("");

  // Estado para los campos obligatorios de Datos 3
  const [birthdate, setBirthdate] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [departureDay, setDepartureDay] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [viaticum, setViaticum] = useState("");
  const [bond, setBond] = useState("");
  const [typeOfTransport, setTypeOfTransport] = useState("");
  const [bondCategory, setBondCategory] = useState("");

  const [fields, setFields] = useState([]);

if (!isOpen) return null;

  // Validación del botón
  const isDatos1Complete =
    personalType &&
    document &&
    docNumber &&
    firstName &&
    lastName &&
    contractType;

  const isDatos2Complete = driverLicense && categoryLicense;

  const isDatos3Complete =
    birthdate &&
    entryDate &&
    departureDay &&
    basicSalary &&
    coordinator &&
    viaticum &&
    bond &&
    typeOfTransport &&
    bondCategory;

  const isCuentasBancariasComplete =
    fields.length > 0 &&
    fields.every(
      (field) => field.banco && field.tipoCuenta && field.numeroCuenta
    );

  const tabs = [
    "Datos 1",
    "Datos 2",
    "Datos 3",
    "Cuentas Bancarias",
    "Datos 4",
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
      case "Datos 1":
        return (
          <div>
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full">
              <div className=" flex md:flex-col gap-4 md:gap-0 items-center bg-gr md:w-2/6 -ml-1 mr-1">
                <div className="w-40 h-48 bg-gray-200 flex items-center justify-center">
                  Sin Imagen
                </div>
                <div className="flex flex-col">
                  <button className="bg-[#0a9e9a] text-white px-8 md:px-6 lg:px-8 py-0.5 text-sm flex items-center">
                    <AiOutlineUpload className="mr-1 w-5 h-5 md:w-auto md:h-auto" />
                    Subir imagen
                  </button>
                  <button className="mt-2 bg-[#0a9e9a] text-white px-8 text-sm md:px-6 lg:px-8 flex items-center py-0.5">
                    <AiOutlineSearch className="mr-1 w-4 h-4 md:w-auto md:h-auto" />
                    Firma Virtual
                  </button>
                </div>
              </div>
              <div className="w-full">
                <div className="md:flex gap-4 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-1">
                    <div className="flex flex-col ">
                      <label className=" text-sm font-medium text-gray-700">
                        Tipo de personal <label className="text-[#DA0000]">(*)</label>
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese tipo de p."
                      value={personalType}
                      onChange={(e) => setPersonalType(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full mb-1 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                      Documento <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                      value={document}
                      onChange={(e) => setDocument(e.target.value)}
                    >
                      <option>Seleccione...</option>
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
                <div className="md:flex gap-4 mb-2">
                  <div className="flex flex-col w-full mb-1 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                      Nombres <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese nombres"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Apellidos <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                      placeholder="Ingrese apellidos"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:flex gap-4 md:mb-3 mb-2">
                  <div className="flex flex-col w-full mb-1 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700">
                      Tipo de contratación <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600"
                      value={contractType}
                      onChange={(e) => setContractType(e.target.value)}
                    >
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subgrupo
                  </label>
                  <select className="w-full mt-1 border border-gray-400 rounded-sm text-sm p-1.5 text-gray-600">
                    <option className="">Seleccione...</option>
                    <option>q</option>
                    <option>e...</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8 mb-5">
              <button
                type="submit"
                className={`bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition ${
                  !isDatos1Complete ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isDatos1Complete}
                onClick={() => setActiveTab("Datos 2")}
              >
                Continuar
                <AiOutlineRight className="ml-1" />
              </button>
            </div>
          </div>
        );
      case "Datos 2":
        return (
          <>
            <div className="md:flex gap-4 md:mb-5 mb-2.5 w-full">
              <div className="flex flex-col w-full mb-1.5 md:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Modalidad de contrato
                </label>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>seleccionar</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Género
                </label>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
            </div>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 md:mb-5 mb-3 w-full">
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese N° Telefónico"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                    Nº de Lic. de Conducir <label className="text-[#DA0000]">(*)</label>
                  </label>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese tipo de p."
                  value={driverLicense}
                  onChange={(e) => setDriverLicense(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Cat. Lic. de Conducir <label className="text-[#DA0000]">(*)</label>
                </label>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese Cat. de Licencia"
                  value={categoryLicense}
                  onChange={(e) => setCategoryLicense(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex gap-4 mb-3 w-full">
              <div className="w-full mb-1.5 md:mb-0">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                    2DA Cat. Lic. de Conducir
                  </label>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese segunda Cat."
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Proveedor
                </label>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione proveedor...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8  mb-4">
              <button
                type="submit"
                className={`bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition ${
                  !isDatos2Complete ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isDatos2Complete}
                onClick={() => setActiveTab("Datos 3")}
              >
                Continuar
                <AiOutlineRight className="ml-1" />
              </button>
            </div>
          </>
        );
      case "Datos 3":
        return (
          <>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 md:mb-5 mb-3 w-full">
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                    Fecha de nacimiento <label className="text-[#DA0000]">(*)</label>
                  </label>
                </div>
                <input
                  type="date"
                  className="w-full text-gray-600 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                    Fecha de ingreso <label className="text-[#DA0000]">(*)</label>
                  </label>
                </div>
                <input
                  type="date"
                  className="w-full text-gray-600 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de planilla
                </label>
                <input
                  type="date"
                  className="w-full text-gray-600 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                />
              </div>
            </div>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 md:mb-5 mb-2.5 w-full">
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                    Fecha de Salida <label className="text-[#DA0000]">(*)</label>
                  </label>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese fecha de salida"
                  value={departureDay}
                  onChange={(e) => setDepartureDay(e.target.value)}
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                    Sueldo Básico <label className="text-[#DA0000]">(*)</label>
                  </label>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese sueldo básico"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Sueldo Variable
                </label>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese sueldo variable"
                />
              </div>
            </div>
            <div className="md:flex gap-4 md:mb-5 mb-2.5 w-full">
              <div className="flex flex-col w-full mb-2 md:mb-0  ">
                <label className="block text-sm font-medium text-gray-700">
                  Sueldo Interno
                </label>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese cantidad de sueldo interno"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Coordinador <label className="text-[#DA0000]">(*)</label>
                </label>
                <select
                  className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                  value={coordinator}
                  onChange={(e) => setCoordinator(e.target.value)}
                >
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
            </div>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 md:mb-5 mb-3 w-full">
              <div className="w-full flex gap-3">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col ">
                    <label className=" text-sm font-medium text-gray-700">
                      Viático <label className="text-[#DA0000]">(*)</label>
                    </label>
                  </div>
                  <input
                    type="text"
                    className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    placeholder="Ingrese Viático"
                    value={viaticum}
                    onChange={(e) => setViaticum(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-col ">
                    <label className=" text-sm font-medium text-gray-700">
                      Bono <label className="text-[#DA0000]">(*)</label>
                    </label>
                  </div>
                  <input
                    type="text"
                    className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    placeholder="Ingrese Bono"
                    value={bond}
                    onChange={(e) => setBond(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                    Tipo Unidad de Transporte <label className="text-[#DA0000]">(*)</label>
                  </label>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese tipo de Unidad"
                  value={typeOfTransport}
                  onChange={(e) => setTypeOfTransport(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Categoría de bono <label className="text-[#DA0000]">(*)</label>
                </label>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese Cat. de bono"
                  value={bondCategory}
                  onChange={(e) => setBondCategory(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4 md:mb-5 mb-2.5 w-full">
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Nº de Seguro
                </label>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese N° de seguro"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Seguro complementerio de trabajo y riesgo
                </label>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese nombre del seguro de trabajo"
                />
              </div>
            </div>
            <div className="flex gap-4 md:mb-5 mb-2.5 w-full">
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Seguro de Salud
                </label>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese nombre de su seguro"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Seguro vida ley
                </label>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese su seguro Vida ley"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8 mb-5">
              <button
                type="submit"
                className={`bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition ${
                  !isDatos3Complete ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isDatos3Complete}
                onClick={() => setActiveTab("Cuentas Bancarias")}
              >
                Continuar
                <AiOutlineRight className="ml-1" />
              </button>
            </div>
          </>
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
                onClick={() => setActiveTab("Datos 4")}
              >
                Continuar
                <AiOutlineRight className="ml-1" />
              </button>
            </div>
          </div>
        );
      case "Datos 4":
        return (
          <>
          <div className="px-2">
           <div className="md:flex gap-4 -mt-1 mb-3 w-full">
              <div className="w-full mb-1.5 md:mb-0">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Cliente
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                Código SAP
                </label>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese código"
                />
              </div>
            </div>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 lg:mb-5 md:mb-4 mb-3 w-full">
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                   País
                  </label>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese país"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Filtro Security
                  </label>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese filtro"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                Vigencia Filtro
                </label>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese vigencia"
                />
              </div>
            </div>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 lg:mb-5 md:mb-4 mb-3 w-full">
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                    Foto Check
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                    Licencia Interna
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Hazmat I
                </label>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
            </div>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 lg:mb-5 md:mb-4 mb-3 w-full">
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                   Hazmat II
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Capacitación MTC
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                Certificados Primeros Auxilios
                </label>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
            </div>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 lg:mb-5 md:mb-4 mb-3 w-full">
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Certificado Manejo Defensivo
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Certificiado Manejo Extintores
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                Portuaria Seguridad
                </label>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
            </div>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 lg:mb-5 md:mb-4 mb-3 w-full">
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Protección Portuaria
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Curriculum
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                Record
                </label>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
            </div>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 lg:mb-5 md:mb-4 mb-3 w-full">
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Otros
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Antecedentes Policiales
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-sm font-medium text-gray-700">
                Antecedentes Penales
                </label>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
            </div>
            <div className="md:flex gap-4 space-y-2.5 md:space-y-0 md:mb-5 mb-3 w-full">
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Trabajo en Altura
                  </label>
                </div>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>Seleccione...</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="w-full">
                <div className="flex flex-col ">
                  <label className=" text-sm font-medium text-gray-700">
                  Status/Observación
                  </label>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                  placeholder="Ingrese status"
                  value={driverLicense}
                  onChange={(e) => setDriverLicense(e.target.value)}
                />
              </div>
              
            </div>
            <div className="flex justify-end items-center gap-4 md:mt-7 mt-6 mb-4">
              <button
                type="submit"
                className="bg-[#0a9e9a] text-sm text-white px-6 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition "
                onClick={onClose}
              >
               <BiSave  className="mr-1" /> Guardar
                
              </button>
            </div>  
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 lg:min-w-4xl max-w-2xl max-h-[90vh] shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-4 ml-1 text-[#0A9E9A]">
            Nuevo Personal
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
                  ? "text-gray-600 border-b-2 border-[#0a9e9a]"
                  : "text-gray-600"
              } ${
                (tab !== "Datos 1" && !isDatos1Complete) ||
                (tab !== "Datos 2" && !isDatos2Complete) ||
                (tab !== "Datos 3" && !isDatos3Complete) ||
                (tab !== "Cuentas Bancarias" && !isCuentasBancariasComplete)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {}}
              disabled={
                (tab !== "Datos 1" && !isDatos1Complete) ||
                (tab !== "Datos 2" && !isDatos2Complete) ||
                (tab !== "Datos 3" && !isDatos3Complete) ||
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

export default ModalNewPersonal;

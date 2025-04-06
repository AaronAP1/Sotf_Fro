import { useState } from "react";
import { AiOutlineClose, AiOutlinePlus, AiOutlineRight, AiOutlineUpload } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";

function ModalNewVehiculo({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState("Datos 1");

  // Estado para los campos obligatorios de Datos 1
  const [classVehicle, setClassVehicle] = useState("");
  const [typeContract, setTypeContract] = useState("");
  const [plate, setPlate] = useState("");
  const [yearManufacture, setYearManufacture] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [currentKilometers, setCurrentKilometers] = useState("");
  const [typeLoadCapacity, setTypeLoadCapacity] = useState("");
  const [loadCapacity, setLoadCapacity] = useState("");
  const [gallons, setGallons] = useState("");
  const [motorNumber, setMotorNumber] = useState("");
  const [proveer, setProveer] = useState("");
  const [driver, setDriver] = useState("");

  // Estados para los campos de listas
  const [fields1, setFields1] = useState([]);
  const [fields2, setFields2] = useState([]);
  const [fields3, setFields3] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);

  // Validación del botón
  const isDatos1Complete =
    classVehicle &&
    typeContract &&
    plate &&
    yearManufacture &&
    modelYear &&
    brand &&
    model &&
    currentKilometers &&
    typeLoadCapacity &&
    loadCapacity &&
    gallons &&
    motorNumber &&
    proveer &&
    driver;

  const tabs = [
    "Datos 1",
    "Datos 2",
    "Datos 3",
    "Compartimientos",
    "Mantenimientos",
    "Llantas",
  ];

  const addField1 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newField = { id: Date.now() }; // Genera un ID único
    setFields1([...fields1, newField]);
  };

  const removeField1 = (id) => {
    const newFields = fields1.filter((field) => field.id !== id);
    setFields1(newFields);
    // Eliminar el valor del input eliminado del estado de cantidades
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[id];
    setQuantities(updatedQuantities);
    // Recalcular total
    const newTotal = Object.values(updatedQuantities).reduce(
      (acc, num) => acc + num,
      0
    );
    setTotal(newTotal);
  };

  const handleQuantityChange = (id, value) => {
    const newQuantities = {
      ...quantities,
      [id]: value ? parseInt(value, 10) || 0 : 0,
    };
    setQuantities(newQuantities);
    // Calcular el total
    const newTotal = Object.values(newQuantities).reduce(
      (acc, num) => acc + num,
      0
    );
    setTotal(newTotal);
  };

  const addField2 = (e) => {
    e.preventDefault(); // Evita el refresh o cierre del modal
    e.stopPropagation();
    setFields2([...fields2, { id: Date.now() }]); // Agrega un objeto con un ID único
  };

  const removeField2 = (id) => {
    setFields2(fields2.filter((field2) => field2.id !== id)); // Filtra por ID único
  };

  const addField3 = (e) => {
    e.preventDefault(); // Evita el refresh o cierre del modal
    e.stopPropagation();
    setFields3([...fields3, { id: Date.now() }]); // Agrega un objeto con un ID único
  };

  const removeField3 = (id) => {
    setFields3(fields3.filter((field3) => field3.id !== id)); // Filtra por ID único
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Datos 1":
        return (
          <div>
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full">
              <div className=" flex flex-col items-center bg-gr lg:w-4/12 md:w-9/12 lg:ml-1 mr-1">
                <div className="w-72 lg:w-60 md:w-72 md:h-52 lg:h-44 h-40 bg-gray-200 flex items-center justify-center">
                  Sin Imagen
                </div>
                <div className="flex flex-col">
                  <button className="bg-[#0a9e9a] text-white px-[91px] md:px-[89px] lg:px-[67.5px] text-nowrap py-1 text-sm flex items-center">
                    <AiOutlineUpload className="mr-1 w-5 h-5" />
                    Subir imagen
                  </button>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col lg:flex-row lg:gap-4 md:gap-1 md:mb-1.5 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Clase <label className="text-[#DA0000]">(*)</label>
                      </label>
                    </div>
                    <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                      value={classVehicle}
                      onChange={(e) => setClassVehicle(e.target.value)}
                    >
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">
                        Tipo Contratación{" "}
                        <label className="text-[#DA0000]">(*)</label>
                      </label>
                    </div>
                    <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                      value={typeContract}
                      onChange={(e) => setTypeContract(e.target.value)}
                    >
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Placa <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese placa"
                      value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Año Fabricación{" "}
                      <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el año"
                      value={yearManufacture}
                      onChange={(e) => setYearManufacture(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 md:gap-1 md:mb-1.5 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Año Modelo <label className="text-[#DA0000]">(*)</label>
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el año"
                      value={modelYear}
                      onChange={(e) => setModelYear(e.target.value)}
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Marca <label className="text-[#DA0000]">(*)</label>
                      </label>
                    </div>
                    <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Modelo <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese modelo"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Kilómetros Actual{" "}
                      <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese kilometraje"
                      value={currentKilometers}
                      onChange={(e) => setCurrentKilometers(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 md:gap-1 md:mb-1.5 mb-1  w-full">
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Tipo de Capacidad{" "}
                        <label className="text-[#DA0000]">(*)</label>
                      </label>
                    </div>
                    <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                      value={typeLoadCapacity}
                      onChange={(e) => setTypeLoadCapacity(e.target.value)}
                    >
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5 ">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Capacidad de Carga{" "}
                        <label className="text-[#DA0000]">(*)</label>
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese capacidad"
                      value={loadCapacity}
                      onChange={(e) => setLoadCapacity(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm text-black">
                      Galones <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese cantidad"
                      value={gallons}
                      onChange={(e) => setGallons(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Número de Motor{" "}
                      <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el número"
                      value={motorNumber}
                      onChange={(e) => setMotorNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-4 md:gap-1 md:mb-1.5 mb-1  w-full">
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Serie Chasis{" "}
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese serie"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">Color</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese color"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm text-black">
                      Semirremolque{" "}
                    </label>
                    <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Subgrupo
                    </label>
                    <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                </div>
                <div className="md:flex gap-4 md:mb-1.5 mb-1 ">
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm text-black">
                      Proveedor <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                      value={proveer}
                      onChange={(e) => setProveer(e.target.value)}
                    >
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm text-black">
                      Conductor <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                      value={driver}
                      onChange={(e) => setDriver(e.target.value)}
                    >
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
                </div>
                <div className="md:grid grid-cols-2">
                  <div className=" mt-2">
                    <label className="block text-sm  text-black ">
                      Serie Guía Transportista
                    </label>
                    <select className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400 text-gray-600">
                      <option>Seleccionar</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                  </div>
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
                onClick={(e) => {
                  e.preventDefault(); // Previene la acción predeterminada
                  e.stopPropagation(); // Evita propagación del evento
                  setActiveTab("Datos 2");
                }}
              >
                Continuar
                <AiOutlineRight className="ml-1" />
              </button>
            </div>
          </div>
        );
      case "Datos 2":
        return (
          <div className="px-3">
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full">
              <div className="w-full">
                <div className="grid md:grid-cols-2 lg:grid-cols-4  lg:gap-4 md:gap-3 md:mb-1.5 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">Ruedas</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese cantidad"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">Cilindros</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese cantidad"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Asientos
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese cantidad de asientos"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Año Fabricación
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el año"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4  lg:gap-4 md:gap-3 md:mb-1.5 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">Ejes</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese ejes"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">MTC</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese MTC"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Configuración Vehicular
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese su configuración"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Peso Seco
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el peso"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4  lg:gap-4 md:gap-3 md:mb-1.5 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">Peso Bruto</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese cantidad de peso"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">Carga Útil</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese carga útil"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      HP Motor
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el dato"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Longitud
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese la longitud"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4  lg:gap-4 md:gap-3 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">Altura</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese altura"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">Ancho</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el ancho"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-3.5 md:mb-1.5">
                    <label className="block text-sm  text-black">Piñas</label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese la cantidad"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Capacidad de Tanque Combustible 1
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese la capacidad 1"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4  lg:gap-4 md:gap-3 md:mb-1.5 mb-1 w-full">
                  <div className="w-full mb-3.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Capacidad de Tanque Combustible 2
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese la capacidad 2"
                    />
                  </div>
                  <div className="w-full mb-3 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">
                        Capacidad de Máxima M3 real
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el M3 real"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-3 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Capacidad M3 cliente
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el M3 cliente"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Capacidad Paletas
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese la capacidad"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8 mb-5">
              <button
                type="submit"
                className="bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition"
                onClick={(e) => {
                  e.preventDefault(); // Previene la acción predeterminada
                  e.stopPropagation(); // Evita propagación del evento
                  setActiveTab("Datos 3");
                }}
              >
                Continuar
                <AiOutlineRight className="ml-1" />
              </button>
            </div>
          </div>
        );
      case "Datos 3":
        return (
          <div className="px-2">
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full">
              <div className="lg:w-5xl ">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">Región</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese la región"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">
                        Nombre Terminal / Planta / Origen
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el nombre"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Plan de Contingencia Aprobado
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el plan"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">Ruta</label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese ruta"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Venc. Tarjeta de Circulación Tracto
                      </label>
                    </div>
                    <input
                      type="date"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese ejes"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">
                        Venc. Tarjeta Circula. Cisterna/Tracto
                      </label>
                    </div>
                    <input
                      type="date"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Empresa de Cubicación
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese nombre de la empresa"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Vencimiento de Cubicación
                    </label>
                    <input
                      type="date"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Tabla de Aforo
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese aforo"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">
                        Tapas Manhole Soldadas
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese cantidad de tapas"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Scully y Valvulas de FondoHP Motor
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese extras"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Vencimiento de SOAT
                    </label>
                    <input
                      type="date"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Fecha de Vencimiento de Inspección Técnica V. Tracto
                      </label>
                    </div>
                    <input
                      type="date"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">
                        Fecha de Vencimiento de Inspección Técnica V. Cisterna
                      </label>
                    </div>
                    <input
                      type="date"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-3.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      N° de DGH (Dirección General de Hidrocarburos)
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el N°"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Fecha de Vencimiento de Resolución MATPEL MTC
                    </label>
                    <input
                      type="date"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese la capacidad 1"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Nombre Empresa Aseguradora
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese nombre"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">
                        Fecha Vencim. Poliza Millón anual
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese MTC"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Vencim. Poliza Millón pago mensual
                    </label>
                    <input
                      type="date"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Tipologia de unidades
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese tipología"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        ¿Unidad dedicada a Corp. Primax?
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese Si o No"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">
                        Fecha Vencimiento IQBF
                      </label>
                    </div>
                    <input
                      type="date"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Nombre Proveedor GPS
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese nombre proveedor"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      ¿Está en Plataforma?
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese Si o No"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Ultimo Mantenimiento GPS
                      </label>
                    </div>
                    <input
                      type="date"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">
                        Fecha de Fabricacion de GPS
                      </label>
                    </div>
                    <input
                      type="date"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Modelo de GPS
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese el modelo"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Lleva tablet S/N
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese información"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-2.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Care Drive S/N
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese Care"
                    />
                  </div>
                  <div className="w-full mb-2.5 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">Camara S/N</label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese dato"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-3.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Camara S/N
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese dato"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Lanzas S/N
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese dato"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:mb-3 mb-1 w-full">
                  <div className="w-full mb-3.5 md:mb-0 lg:mb-2">
                    <div className="flex flex-col ">
                      <label className=" text-sm  text-black">
                        Parches S/N
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese dato"
                    />
                  </div>
                  <div className="w-full mb-3 md:mb-1.5">
                    <div className="flex flex-col ">
                      <label className=" text-sm text-black">
                        Página web GPS
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese página web"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-3 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Página Usuario
                    </label>
                    <input
                      type="text"
                      className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese página de usuario"
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2.5 md:mb-1.5">
                    <label className="block text-sm  text-black">
                      Página Contraseña
                    </label>
                    <input
                      type="text"
                      className="w-full text-gray-700 border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      placeholder="Ingrese página contraseña"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-5 mb-5">
              <button
                type="submit"
                className="bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition"
                onClick={(e) => {
                  e.preventDefault(); // Previene la acción predeterminada
                  e.stopPropagation(); // Evita propagación del evento
                  setActiveTab("Compartimientos");
                }}
              >
                Continuar
                <AiOutlineRight className="ml-1" />
              </button>
            </div>
          </div>
        );
      case "Compartimientos":
        return (
          <>
            <div className="p-0.5 ">
              <label className="block text-sm font-medium text-gray-700">
                NÚMERO O NOMBRE DEL COMPARTIMIENTO
              </label>

              <div className="md:space-y-3">
                {fields1.map((field1) => (
                  <div
                    key={field1.id}
                    className="flex w-full space-y-2.5 gap-2 md:gap-4 border-b-2 py-2 border-gray-300 "
                  >
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Ingrese el nombre"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="w-4/6 md:w-2/6">
                      <input
                        type="number"
                        placeholder="Cantidad"
                        onChange={(e) =>
                          handleQuantityChange(field1.id, e.target.value)
                        }
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <button
                      type="button" // Evita que actúe como submit
                      onClick={() => removeField1(field1.id)}
                      className="bg-[#EF4141] text-white mt-0.5 px-2 h-9 rounded-sm hover:bg-red-600 flex items-center transition"
                    >
                      <AiOutlineClose className="w-5 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={addField1}
                  className="flex items-center mb-3 px-4 py-2 mt-3 bg-[#0A9E9A] text-white rounded-lg hover:bg-[#0B8B87] transition"
                >
                  <AiOutlinePlus className="mr-2" /> Agregar
                </button>
                <div className="w-2/6">
                  <div className="flex gap-12 justify-center items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Total
                    </label>
                    <input
                      type="text"
                      className="border-gray-400 w-20 text-sm p-1.5"
                      placeholder="0"
                      value={total}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 mb-2">
                <button
                  type="submit"
                  className="bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition"
                  onClick={(e) => {
                    e.preventDefault(); // Previene la acción predeterminada
                    e.stopPropagation(); // Evita propagación del evento
                    setActiveTab("Mantenimientos");
                  }}
                >
                  Continuar
                  <AiOutlineRight className="ml-1" />
                </button>
              </div>
            </div>
          </>
        );
      case "Mantenimientos":
        return (
          <>
            <div className="p-0.5 ">
              <div className="md:space-y-3">
                {fields2.map((field2) => (
                  <div
                    key={field2.id}
                    className="md:flex w-full space-y-2.5 gap-2 md:gap-4 border-b-2 py-2 border-gray-300 "
                  >
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        MANTENIMIENTOS
                      </label>
                      <select
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400"
                    >
                      <option>Seleccione...</option>
                      <option>q</option>
                      <option>e...</option>
                    </select>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        CICLOS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese los ciclos"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        ALERTAS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese la alerta"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="flex items-center justify-center mt-3">
                    <button
                      type="button" // Evita que actúe como submit
                      onClick={() => removeField2(field2.id)}
                      className="bg-[#EF4141] text-white md:mt-0.5 mb-1.5 md:mb-0 px-2 h-9 rounded-sm hover:bg-red-600 flex items-center transition"
                    >
                      <AiOutlineClose className="w-5 h-4" /><label className="md:hidden block"> Eliminar </label> 
                    </button></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={addField2}
                  className="flex items-center mb-3 px-4 py-2 mt-3 bg-[#0A9E9A] text-white rounded-lg hover:bg-[#0B8B87] transition"
                >
                  <AiOutlinePlus className="mr-2" /> Agregar
                </button>
              </div>

              <div className="flex justify-end gap-4 mt-8 mb-2">
                <button
                  type="submit"
                  className="bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition"
                  onClick={(e) => {
                    e.preventDefault(); // Previene la acción predeterminada
                    e.stopPropagation(); // Evita propagación del evento
                    setActiveTab("Llantas");
                  }}
                >
                  Continuar
                  <AiOutlineRight className="ml-1" />
                </button>
              </div>
            </div>
          </>
        );
      case "Llantas":
        return (
          <>
            <div className="p-0.5 ">
              <div className="md:space-y-3">
                {fields3.map((field3) => (
                  <div
                    key={field3.id}
                    className="flex flex-col md:grid  md:grid-cols-4 lg:grid-cols-5 -mt-2 text-nowrap md:max-w-2xl  lg:max-w-4xl  w-full space-y-2.5 md:space-y-2 lg:space-y-1 mb-2 gap-2 md:gap-4 border-b-2 py-3 border-gray-300 "
                  >
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        CICLOS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese los ciclos"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        ALERTAS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese la alerta"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        CICLOS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese los ciclos"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        ALERTAS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese la alerta"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div> <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        CICLOS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese los ciclos"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        ALERTAS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese la alerta"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div> <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        CICLOS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese los ciclos"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        ALERTAS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese la alerta"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div> <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        CICLOS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese los ciclos"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        ALERTAS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese la alerta"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        CICLOS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese los ciclos"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">
                        ALERTAS KM
                      </label>
                      <input
                        type="text"
                        placeholder="Ingrese la alerta"
                        className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                      />
                    </div>
                    <div className=" grid col-span-4 lg:col-span-2 lg:flex items-center justify-center lg:justify-start lg:mt-3">
                    <button
                      type="button" // Evita que actúe como submit
                      onClick={() => removeField3(field3.id)}
                      className="bg-[#EF4141] text-white md:-mt-1.5 lg:px-5 lg:mt-0.5 mb-1.5 md:mb-2 lg:mb-0 px-2 h-9 rounded-sm hover:bg-red-600 flex items-center transition"
                    >
                      <AiOutlineClose className="w-5 h-4 lg:mt-0.5" /><label> Eliminar </label> 
                    </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={addField3}
                  className="flex items-center mb-3 px-4 py-2 mt-3 bg-[#0A9E9A] text-white rounded-lg hover:bg-[#0B8B87] transition"
                >
                  <AiOutlinePlus className="mr-2" /> Agregar
                </button>
              </div>

              <div className="flex justify-end gap-4 mt-8 mb-8">
                <button
                  type="submit"
                  className="bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition"
                  onClick={onClose}
                  >
                  <BiSave  className=" w-5 h-5 mr-1" /> Guardar                  
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
      <div className="bg-white rounded-lg p-6 lg:min-w-2xl md:min-w-2xl max-h-[90vh] shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mt-2 mb-4 ml-1 text-[#0A9E9A]">
            Nuevo Vehículo
          </h2>
          <GoX
            className="w-6 h-6  hover:text-gray-400 transition"
            onClick={onClose}
          />
        </div>
        <div className="flex gap-2 text-nowrap overflow-x-auto w-80 md:w-auto mb-4 pb-2 items-center md:items-start">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={` px-1 py-1 text-sm font-medium ${
                activeTab === tab
                  ? "text-gray-600 border-b-2 border-[#0a9e9a]"
                  : "text-gray-600"
              } ${
                tab !== "Datos 1" && !isDatos1Complete
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {}}
              disabled={tab !== "Datos 1" && !isDatos1Complete}
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

export default ModalNewVehiculo;

import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { GoX } from "react-icons/go";

function ConfigurationVehicle({ isOpen, onClose, onSave, initialSelectedColumns }) {
  if (!isOpen) return null;

  const availableFields = [
    { id: "estado", name: "Estado" },
    { id: "contratacion", name: "Contratación" },
    { id: "subgrupo", name: "Subgrupo" },
    { id: "clase", name: "Clase" },
    { id: "placa", name: "Placa" },
    { id: "serieGRT", name: "Serie GRT" },
    { id: "serieChasis", name: "Serie Chasis" },
    { id: "capacidadM3Real", name: "Capacidad M3 Real" },
    { id: "capacidadM3Cliente", name: "Capacidad M3 Cliente" },
    { id: "capacidadPaletas", name: "Capacidad Paletas" },
    { id: "mtc", name: "MTC" },
    { id: "confVehicular", name: "Conf. Vehicular" },
    { id: "marca", name: "Marca" },
    { id: "modelo", name: "Modelo" },
    { id: "capacidadCarga", name: "Capacidad de Carga" },
    { id: "pesoSeco", name: "Peso Seco" },
    { id: "pesoBruto", name: "Peso Bruto" },
    { id: "cargaUtil", name: "Carga Útil" },
    { id: "tanqueCombustible1", name: "Tanque Combustible 1" },
    { id: "tanqueCombustible2", name: "Tanque Combustible 2" },
    { id: "combustibleTotal", name: "Combustible total" },
    { id: "reservaCombustible", name: "Reserva Combustible" },
    { id: "glUtiles", name: "GL Utiles" },
    { id: "semirremolque", name: "Semirremolque" },
    { id: "conductor", name: "Conductor" },
    { id: "proveedor", name: "Proveedor" },
    { id: "compartimientos", name: "Compartimientos" },
  ];

  const [rightList, setRightList] = useState(initialSelectedColumns || []);

  // Inicializa leftList con los campos que no están en rightList
  const [leftList, setLeftList] = useState(
    availableFields.filter(
      (field) => !initialSelectedColumns.some((col) => col.id === field.id)
    )
  );

  const [selectedLeft, setSelectedLeft] = useState([]);
  const [selectedRight, setSelectedRight] = useState([]);

   // Mover elementos de izquierda a derecha
   const handleMoveRight = () => {
    const movingItems = leftList.filter((item) =>
      selectedLeft.includes(item.name)
    );
    setRightList([...rightList, ...movingItems]);
    setLeftList(leftList.filter((item) => !selectedLeft.includes(item.name)));
    setSelectedLeft([]);
  };

  // Mover elementos de derecha a izquierda
  const handleMoveLeft = () => {
    const movingItems = rightList.filter((item) =>
      selectedRight.includes(item.name)
    );
    setLeftList([...leftList, ...movingItems]);
    setRightList(
      rightList.filter((item) => !selectedRight.includes(item.name))
    );
    setSelectedRight([]);
  };

// Seleccionar/Deseleccionar todos los checkboxes de la izquierda
const toggleSelectAllLeft = () => {
    if (selectedLeft.length === leftList.length) {
      setSelectedLeft([]);
    } else {
      setSelectedLeft(leftList.map((item) => item.name));
    }
  };

  // Seleccionar/Deseleccionar todos los checkboxes de la derecha
  const toggleSelectAllRight = () => {
    if (selectedRight.length === rightList.length) {
      setSelectedRight([]);
    } else {
      setSelectedRight(rightList.map((item) => item.name));
    }
  };

    // Guardar la configuración
    const handleSave = () => {
        onSave(rightList); // Envía la lista de campos seleccionados al padre
        onClose(); // Cierra el modal
      };
    

  return (
<div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
<div className="bg-white rounded-lg p-5 top-10 md:max-h-screen min-w-sm max-w-[90%] max-h-[80%] shadow-lg overflow-y-auto">
        <div className="flex justify-between mt-2">
          <h2 className="text-lg font-semibold mb-2 md:mb-4 ml-1 text-[#0A9E9A]">
            Configuración
          </h2>
          <GoX
            className="w-6 h-6 hover:text-gray-400 transition cursor-pointer"
            onClick={onClose}
          />
        </div>
        
        <label className="text-sm text-gray-700 ml-1.5">
        Vista de Tabla
              </label>
        <div className="grid grid-cols-1 md:grid-cols-3 h-80 md:h-auto overflow-auto mt-3 md:mt-4 ml-2">
          <div className="mb-1 md:mb-0">
            <div className="flex items-center border-b-[1.5px] border-[#B0B0B0]">
            <input
              type="checkbox"
               className="w-3.5 h-3.5 -mt-0.5"
              checked={
                selectedLeft.length === leftList.length && leftList.length > 0
              }
              onChange={toggleSelectAllLeft}
              /><h3 className="font-semibold text-sm mb-1 ml-1">CAMPOS DISPONIBLES</h3>
            </div>
            <div className=" p-1 mt-1 md:mt-3 h-[96px] md:h-96 overflow-y-auto space-y-2">
              {leftList.map((item) => (
                <label key={item.id} className="flex text-xs items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={selectedLeft.includes(item.name)}
                    className="w-3.5 h-3.5"
                    onChange={() =>
                      setSelectedLeft(
                        selectedLeft.includes(item.name)
                          ? selectedLeft.filter((i) => i !== item.name)
                          : [...selectedLeft, item.name]
                      )
                    }
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </div>

          <div className="flex md:flex-col justify-center items-center mb-2.5 gap-5 md:gap-3 md:mr-2 xl:mr-6">
            <button
              onClick={handleMoveRight}
              className="bg-[#00B19D] font-normal text-white text-sm px-4 py-2 flex justify-center items-center rounded-md hover:bg-[#1FA091]"
            >
              Agregar
              <AiFillCaretDown className="md:hidden block ml-1.5 w-5 h-4 mt-0.5"/>
              <FaGreaterThan className="hidden md:block ml-1.5 w-2 h-3 mt-0.5" /> 
            </button>
            <button
              onClick={handleMoveLeft}
              className="bg-[#EF4141] font-normal text-white text-sm px-5 py-2 flex justify-center items-center rounded-md hover:bg-[#CE2A2A]"
            >
                <AiFillCaretUp className="md:hidden block ml-1.5 w-5 h-4 mt-0.5"/>
              <FaLessThan className="hidden md:block ml-1.5 w-2 h-3 mt-0.5"/>Quitar
            </button>
          </div>

          <div className="md:-ml-3 md:px-2">
          <div className="flex items-center border-b-[1.5px] border-[#B0B0B0]">
          <input
              type="checkbox"
               className="w-3.5 h-3.5 -mt-0.5"
               checked={
                 selectedRight.length === rightList.length &&
                 rightList.length > 0
               }
               onChange={toggleSelectAllRight}
              />
            <h3 className="font-semibold text-sm mb-1 ml-1">MOSTRAR EN TABLA</h3>
            </div>
            <div className="p-1 mt-1 md:mt-3 h-[96px]  md:h-96 overflow-y-auto space-y-2">
              {rightList.map((item) => (
                <label key={item.id} className="flex text-xs items-center gap-1.5">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5"
                    checked={selectedRight.includes(item.name)}
                    onChange={() =>
                      setSelectedRight(
                        selectedRight.includes(item.name)
                          ? selectedRight.filter((i) => i !== item.name)
                          : [...selectedRight, item.name]
                      )
                    }
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end mb-3">
          <button 
            onClick={handleSave}// Cambia esto para usar handleSave
            className="bg-[#0a9e9a] text-white rounded-md px-4 py-2 text-sm flex items-center hover:bg-[#098785] transition"
          >
            <BiSave className="mr-1 w-4 h-4" />
            Guardar configuración
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationVehicle;

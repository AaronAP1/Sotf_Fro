import React from "react";
import {
  AiOutlineDelete,
  AiOutlineLeft,
  AiOutlinePlus,
  AiOutlineRight,
} from "react-icons/ai";

const Contacto = ({
  dtTab2,
  setDtTab2,
  setActiveTab,
  addTab2,
  deleteTab2Item,
  handleTabChange,
}) => {
  // Función para manejar cambios en los inputs
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newFields = dtTab2.map((field) => {
      if (field.id === id) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setDtTab2(newFields);
  };

  return (
    <div className="p-0.5">
      <div className="max-h-[50vh] overflow-y-auto px-2 md:space-y-3">
        {dtTab2.map((i) => (
          <div
            key={i.id}
            className="relative mt-4 grid items-center space-y-2.5 border-b-2 border-gray-300 py-2 md:mt-0 md:grid-cols-4 md:gap-2 lg:gap-4"
          >
            <div className="absolute top-0 right-0 cursor-pointer">
              <button onClick={() => deleteTab2Item(i.id)}>
                <AiOutlineDelete className="hover:text-red-500" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                NOMBRE
              </label>
              <input
                type="text"
                value={i.nombre}
                name="nombre"
                placeholder="Ingrese nombre"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => handleChange(e, i.id)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                TELÉFONO
              </label>
              <input
                type="number"
                value={i.telefono}
                name="telefono"
                placeholder="N° telefónico"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => handleChange(e, i.id)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                EMAIL
              </label>
              <input
                type="text"
                value={i.email}
                name="email"
                placeholder="correo"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => handleChange(e, i.id)}
              />
            </div>
            <div className="-mt-0.5 mb-3 md:-mt-3 md:mb-0">
              <label className="block text-sm font-medium text-gray-700">
                OTROS
              </label>
              <input
                type="text"
                value={i.otros}
                name="otros"
                placeholder="otra información"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => handleChange(e, i.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addTab2}
        className="mt-2 mb-3 flex items-center rounded-lg bg-[#0A9E9A] px-4 py-2 text-white transition hover:bg-[#0B8B87]"
      >
        <AiOutlinePlus className="mr-2" /> Agregar
      </button>

      <div className="flex justify-between">
        <div className="mt-8 mb-2 flex justify-end gap-4">
          <button
            value="Datos Personales"
            className="flex items-center rounded-lg bg-[#0a9e9a] px-4 py-2 text-sm text-white transition hover:bg-[#098b89]"
            onClick={handleTabChange}
          >
            <AiOutlineLeft className="ml-1" />
            Retroceder
          </button>
        </div>
        <div className="mt-8 mb-2 flex justify-end gap-4">
          <button
            value="Cuentas Bancarias"
            className="flex items-center rounded-lg bg-[#0a9e9a] px-4 py-2 text-sm text-white transition hover:bg-[#098b89]"
            onClick={handleTabChange}
          >
            Continuar
            <AiOutlineRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacto;

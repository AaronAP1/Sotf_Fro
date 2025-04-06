import React from "react";
import {
  AiOutlineDelete,
  AiOutlineLeft,
  AiOutlinePlus,
  AiOutlineRight,
} from "react-icons/ai";

const SubcCliente = ({
  dtTab5,
  setDtTab5,
  addTab5,
  deleteTab5Item,
  handleTabChange,
}) => {
  // Función para manejar cambios en los inputs
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newFields = dtTab5.map((field) => {
      if (field.id === id) {
        if ("numero_documento" === name) {
          return { ...field, [name]: Number(value) };
        }
        return { ...field, [name]: value };
      }
      return field;
    });
    setDtTab5(newFields);
  };

  return (
    <div className="p-0.5">
      <div className="max-h-[50vh] overflow-y-auto px-2 md:space-y-3">
        {dtTab5.map((i) => (
          <div
            key={i.id}
            className="relative mt-1 grid items-center space-y-2.5 border-b-2 border-gray-300 py-4 md:mt-0 md:grid-cols-3 md:gap-2 md:space-y-0 lg:gap-4"
          >
            <div className="absolute top-0 right-0 cursor-pointer">
              <button onClick={() => deleteTab5Item(i.id)}>
                <AiOutlineDelete className="hover:text-red-500" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                DOCUMENTO
              </label>
              <select
                name="documento"
                value={i.documento}
                onChange={(e) => handleChange(e, i.id)}
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm text-gray-600"
              >
                <option value="">Seleccione</option>
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
                <option value="CARNET_EXTRANJERIA">CARNET_EXTRANJERIA</option>
                <option value="CEDULA_IDENTIDAD">CEDULA_IDENTIDAD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                N° DE DOCUMENTO
              </label>
              <input
                type="text"
                name="numero_documento"
                value={i.numero_documento}
                placeholder="Ingrese n° de documento"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => {
                  const valorNumerico = e.target.value.replace(/[^0-9]/g, "");
                  handleChange(
                    {
                      target: {
                        name: "numero_documento",
                        value: valorNumerico,
                      },
                    },
                    i.id,
                  );
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                RAZÓN SOCIAL
              </label>
              <input
                type="text"
                name="razon_social"
                value={i.razon_social}
                placeholder="ingrese razón social"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => handleChange(e, i.id)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                DIRECCIÓN
              </label>
              <input
                type="text"
                name="direccion"
                value={i.direccion}
                placeholder="Ingrese dirección"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => handleChange(e, i.id)}
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                EMAIL
              </label>
              <input
                type="text"
                name="email"
                placeholder="Ingrese Correo"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => handleChange(e, i.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addTab5}
        className="mt-2 mb-3 flex items-center rounded-lg bg-[#0A9E9A] px-4 py-2 text-white transition hover:bg-[#0B8B87] md:mb-1"
      >
        <AiOutlinePlus className="mr-2" /> Agregar
      </button>
      <div className="flex justify-between">
        <div className="mt-8 mb-2 flex justify-end gap-4">
          <button
            value="Tarifas"
            className="flex items-center rounded-lg bg-[#0a9e9a] px-4 py-2 text-sm text-white transition hover:bg-[#098b89]"
            onClick={handleTabChange}
          >
            <AiOutlineLeft className="ml-1" />
            Retroceder
          </button>
        </div>
        <div className="mt-8 mb-2 flex justify-end gap-4">
          <button
            value="Direcciones"
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

export default SubcCliente;

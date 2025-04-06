import React from "react";
import {
  AiOutlineDelete,
  AiOutlineLeft,
  AiOutlinePlus,
  AiOutlineRight,
} from "react-icons/ai";

const Tarifa = ({
  dtTab4,
  setDtTab4,
  addTab4,
  deleteTab4Item,
  handleTabChange,
}) => {
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newFields = dtTab4.map((field) => {
      if (field.id === id) {
        if (name === "costo") {
          return { ...field, [name]: parseFloat(value) };
        }
        if (name === "id_ruta" || name === "id_vehiculo") {
          return { ...field, [name]: Number(value) };
        }
        return { ...field, [name]: value };
      }
      return field;
    });
    setDtTab4(newFields);
  };

  return (
    <div className="p-0.5">
      <div className="max-h-[50vh] overflow-y-auto px-2 md:space-y-3">
        {dtTab4.map((i) => (
          <div
            key={i.id}
            className="relative mt-1 grid items-center space-y-2.5 border-b-2 border-gray-300 py-4 md:mt-0 md:grid-cols-3 md:gap-2 md:space-y-0 lg:gap-4"
          >
            <div className="absolute top-0 right-0 cursor-pointer">
              <button onClick={() => deleteTab4Item(i.id)}>
                <AiOutlineDelete className="hover:text-red-500" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                RUTA
              </label>
              <select
                name="id_ruta"
                value={i.documento}
                onChange={(e) => handleChange(e, i.id)}
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm text-gray-600"
              >
                <option value="">Seleccione</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                TIPO DE SERVICIO
              </label>
              <select
                name="tipo_servicio"
                value={i.tipo_servicio}
                onChange={(e) => handleChange(e, i.id)}
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm text-gray-600"
              >
                <option value="">Seleccione</option>
                <option value="Flete">Flete</option>
                <option value="Combustible">Combustible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                MODELO VEHÍCULO
              </label>
              <input
                type="text"
                name="id_vehiculo"
                value={i.id_vehiculo}
                placeholder="ingrese modelo"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => handleChange(e, i.id)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                TIPO MEDIDA
              </label>
              <select
                name="tipo_medida"
                value={i.tipo_medida}
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm text-gray-600"
                onChange={(e) => handleChange(e, i.id)}
              >
                <option value="">Seleccione</option>
                <option value="FLETE">FLETE</option>
                <option value="KILOGRAMOS">KILOGRAMOS</option>
                <option value="TONELADAS">TONELADAS</option>
                <option value="GALONES">GALONES</option>
                <option value="BOLSAS">BOLSAS</option>
                <option value="M3">M3</option>
              </select>
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                COSTO
              </label>
              <input
                type="number"
                name="costo"
                value={i.costo}
                placeholder="ingrese costo"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => handleChange(e, i.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addTab4}
        className="mt-2 mb-3 flex items-center rounded-lg bg-[#0A9E9A] px-4 py-2 text-white transition hover:bg-[#0B8B87] md:mb-1"
      >
        <AiOutlinePlus className="mr-2" /> Agregar
      </button>
      <div className="flex justify-between">
        <div className="mt-8 mb-2 flex justify-end gap-4">
          <button
            value="Cuentas Bancarias"
            className="flex items-center rounded-lg bg-[#0a9e9a] px-4 py-2 text-sm text-white transition hover:bg-[#098b89]"
            onClick={handleTabChange}
          >
            <AiOutlineLeft className="ml-1" />
            Retroceder
          </button>
        </div>
        <div className="mt-8 mb-2 flex justify-end gap-4">
          <button
            value="Subclientes"
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

export default Tarifa;

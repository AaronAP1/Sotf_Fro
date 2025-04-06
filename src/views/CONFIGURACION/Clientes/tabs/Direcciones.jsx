import React from "react";
import { AiOutlineLeft, AiOutlinePlus } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import InputUbigeoArray from "../components/InputUbigeoArray";

const Direcciones = ({
  dtTab6,
  setDtTab6,
  addTab6,
  deleteTab6Item,
  handleTabChange,
}) => {
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newFields = dtTab6.map((field) => {
      if (field.id === id) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setDtTab6(newFields);
  };
  return (
    <div className="p-0.5">
      <div className="max-h-[50vh] overflow-y-auto px-2 md:space-y-3" y>
        {dtTab6.length > 0 &&
          dtTab6.map((i) => (
            <div
              key={i.id}
              className="mt-1 grid items-center space-y-2.5 border-b-2 border-gray-300 py-4 md:mt-0 md:grid-cols-2 md:gap-2 md:space-y-0 lg:gap-4"
            >
              <InputUbigeoArray setDtTab={setDtTab6} dtTab={dtTab6} id={i.id} />
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
            </div>
          ))}
      </div>
      <button
        onClick={addTab6}
        className="mt-2 mb-3 flex items-center rounded-lg bg-[#0A9E9A] px-4 py-2 text-white transition hover:bg-[#0B8B87] md:mb-1"
      >
        <AiOutlinePlus className="mr-2" /> Agregar
      </button>
      <div className="flex justify-between">
        <div className="mt-8 mb-2 flex justify-end gap-4">
          <button
            value="Subclientes"
            className="flex items-center rounded-lg bg-[#0a9e9a] px-4 py-2 text-sm text-white transition hover:bg-[#098b89]"
            onClick={handleTabChange}
          >
            <AiOutlineLeft className="ml-1" />
            Retroceder
          </button>
        </div>
        <div className="mt-6 mb-2 flex items-center justify-end gap-4 md:mt-7">
          <button
            type="submit"
            className="flex items-center rounded-lg bg-[#0a9e9a] px-6 py-2 text-sm text-white transition hover:bg-[#098b89]"
          >
            <BiSave className="mr-1 h-5 w-5" /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Direcciones;

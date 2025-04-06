import React from "react";
import {
  AiOutlineDelete,
  AiOutlineLeft,
  AiOutlinePlus,
  AiOutlineRight,
} from "react-icons/ai";

const CuentasBancarias = ({
  dtTab3,
  setDtTab3,
  addTab3,
  deleteTab3Item,
  handleTabChange,
}) => {
  // Función para manejar cambios en los inputs
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newFields = dtTab3.map((field) => {
      if (field.id === id) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setDtTab3(newFields);
  };
  return (
    <div className="p-0.5">
      <div className="max-h-[50vh] overflow-y-auto px-2 md:space-y-3">
        {dtTab3.map((i) => (
          <div
            key={i.id}
            className="relative mt-4 mb-2 grid items-center space-y-2.5 border-b-2 border-gray-300 px-3 py-2 md:mt-0 md:grid-cols-4 md:gap-2 lg:gap-4"
          >
            <div className="absolute top-0 right-0 cursor-pointer">
              <button onClick={() => deleteTab3Item(i.id)}>
                <AiOutlineDelete className="hover:text-red-500" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                BANCO
              </label>
              <select
                name="banco"
                value={i.banco}
                onChange={(e) => handleChange(e, i.id)}
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm text-gray-600"
              >
                <option value="Banco de Crédito del Perú (BCP)">
                  Banco de Crédito del Perú - BCP{" "}
                </option>
                <option value="">Seleccione</option>
                <option value="Interbank">Interbank</option>
                <option value="Scotiabank">Scotiabank</option>
                <option value="BBVA Perú">BBVA Perú</option>
                <option value="Banco Pichincha">Banco Pichincha</option>
                <option value="Banco GNB">Banco GNB</option>
                <option value="Banco Falabella">Banco Falabella</option>
                <option value="MiBanco">MiBanco</option>
                <option value="Banco Ripley">Banco Ripley</option>
                <option value="Caja Arequipa">Caja Arequipa</option>
                <option value="Caja Huancayo">Caja Huancayo</option>
                <option value="Caja Piura">Caja Piura</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                TIPO DE CUENTA
              </label>
              <select
                name="tipo"
                value={i.tipo}
                onChange={(e) => handleChange(e, i.id)}
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm text-gray-600"
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
                name="numero"
                value={i.numero}
                placeholder="Número de cuenta"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                onChange={(e) => {
                  const valorNumerico = e.target.value.replace(/[^0-9]/g, ""); // Solo números
                  handleChange(
                    {
                      target: { name: "numero", value: valorNumerico },
                    },
                    i.id,
                  );
                }}
              />
            </div>

            <div className="flex w-full justify-center gap-8 md:justify-normal md:gap-2 lg:gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  DETRACCIÓN
                </label>
                <input
                  type="checkbox"
                  name="fl_detraccion"
                  checked={i.detraccion}
                  className="mt-2 h-5 w-5 rounded-sm border"
                  onChange={(e) =>
                    handleChange(
                      {
                        target: { name: "fl_detraccion", value: e.target.checked },
                      },
                      i.id,
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ESTADO
                </label>
                <input
                  type="checkbox"
                  name="estado"
                  checked={i.estado}
                  className="mt-2 h-5 w-5 rounded-sm border"
                  onChange={(e) =>
                    handleChange(
                      { target: { name: "estado", value: e.target.checked } },
                      i.id,
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addTab3}
        className="mt-2 mb-3 flex items-center rounded-lg bg-[#0A9E9A] px-4 py-2 text-white transition hover:bg-[#0B8B87]"
      >
        <AiOutlinePlus className="mr-2" /> Agregar
      </button>
      <div className="flex justify-between">
        <div className="mt-8 mb-2 flex justify-end gap-4">
          <button
            value="Contactos"
            className="flex items-center rounded-lg bg-[#0a9e9a] px-4 py-2 text-sm text-white transition hover:bg-[#098b89]"
            onClick={handleTabChange}
          >
            <AiOutlineLeft className="ml-1" />
            Retroceder
          </button>
        </div>
        <div className="mt-8 mb-2 flex justify-end gap-4">
          <button
            value="Tarifas"
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

export default CuentasBancarias;

import React from "react";
import { AiOutlineRight, AiOutlineUpload } from "react-icons/ai";
import InputUbigeo from "../components/InputUbigeo";

const DatosPeronales = ({ dtTab1, setDtTab1, handleTabChange }) => {
  const {
    documento,
    numero_documento,
    razon_social,
    direccion,
    telefono,
    email,
    id_ubigeo,
    encargado,
  } = dtTab1;

  // Unificar handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDtTab1({ ...dtTab1, [name]: value });
  };

  const isValid = documento !== 0 && numero_documento !== "" && razon_social !== "" && direccion !== "" && telefono !== ""

  return (
    <div>
      <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-start">
        <div className="mr-1 -ml-1 flex items-center gap-4 md:w-2/6 md:flex-col md:gap-0">
          <div className="flex h-44 w-40 items-center justify-center bg-gray-200">
            Sin Imagen
          </div>
          <div className="flex flex-col">
            <button className="flex items-center bg-[#0a9e9a] px-8 py-0.5 text-sm text-white md:px-6 lg:px-7">
              <AiOutlineUpload className="mr-1 h-5 w-5 md:h-auto md:w-auto" />
              Subir imagen
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="mb-1 w-full gap-4 md:mb-3 md:flex">
            <div className="mb-1 flex w-full flex-col md:mb-0">
              <label className="block text-sm text-gray-700">
                Documento <label className="text-[#DA0000]">(*)</label>
              </label>
              <select
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm text-gray-600"
                value={documento}
                onChange={(e) =>
                  setDtTab1({ ...dtTab1, documento: e.target.value })
                }
              >
                <option>Seleccione...</option>
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
                <option value="CARNET_EXTRANJERIA">CARNET EXTRANJERIA</option>
                <option value="CEDULA_IDENTIDAD">CEDULA IDENTIDAD</option>
              </select>
            </div>
            <div className="flex w-full flex-col">
              <label className="block text-sm text-gray-700">
                Número de Documento{" "}
                <label className="text-[#DA0000]">(*)</label>
              </label>
              <input
                type="text"
                name="numero_documento"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                placeholder="Ingrese N° documento"
                value={numero_documento}
                onChange={(e) => {
                  const valorNumerico = e.target.value.replace(/[^0-9]/g, "");
                  handleInputChange({
                    target: { name: "numero_documento", value: valorNumerico },
                  });
                }}
              />
            </div>
          </div>
          <div className="mb-2 gap-4">
            <div className="mb-1 flex w-full flex-col md:mb-3">
              <label className="block text-sm text-gray-700">
                Razón Social <label className="text-[#DA0000]">(*)</label>
              </label>
              <input
                type="text"
                name="razon_social"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                placeholder="Ingrese razón social"
                value={razon_social}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label className="block text-sm text-gray-700">
                Dirección <label className="text-[#DA0000]">(*)</label>
              </label>
              <input
                type="text"
                name="direccion"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                placeholder="Ingrese su dirección"
                value={direccion}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-2 gap-4 md:mb-3 md:flex">
            <div className="mb-1 flex w-full flex-col md:mb-0">
              <label className="block text-sm text-gray-700">
                Teléfono <label className="text-[#DA0000]">(*)</label>
              </label>
              <input
                type="text"
                name="telefono"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                placeholder="Ingrese N° telefónico"
                value={telefono}
                onChange={(e) => {
                  const valorNumerico = e.target.value.replace(/[^0-9]/g, "");
                  handleInputChange({
                    target: { name: "telefono", value: valorNumerico },
                  });
                }}
              />
            </div>
            <div className="flex w-full flex-col">
              <label className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
                placeholder="Ingrese su correo"
                value={email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <InputUbigeo setDtTab1={setDtTab1} dtTab1={dtTab1} />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="mt-8 mb-2 flex justify-end gap-4">
          <button
            value="Contactos"
            className={`flex items-center rounded-lg bg-[#0a9e9a] px-4 py-2 text-sm text-white transition hover:bg-[#098b89] ${
              !isValid ? "opacity-50 cursor-not-allowed " : ""
            }`}
            disabled={!isValid}
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

export default DatosPeronales;

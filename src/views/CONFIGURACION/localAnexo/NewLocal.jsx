import { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";
import useLocalesAnexos from "../../../Hooks/useLocalesAnexos";

function NewLocal({isOpen, onClose, localAnexoExistente = null, esEdicion = false }) {
  const { AgregarNuevoLocalAnexo, EditarLocal } = useLocalesAnexos();
  const [tipo, setTipo] = useState("");
  const [name, setName] = useState("");
  const [direction, setDirection] = useState("");
  const [codigo_sunat, setCodigo_sunat] = useState("");
  const [token_pse, setToken_pse] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    if (esEdicion && localAnexoExistente) {
      setTipo(localAnexoExistente.tipo ?? "");
      setName(localAnexoExistente.name ?? "");
      setDirection(localAnexoExistente.direction ?? "");
      setIsChecked(localAnexoExistente.isChecked ?? false);
      setCodigo_sunat(localAnexoExistente.codigo_sunat ?? "");
      setToken_pse(localAnexoExistente.token_pse ?? "");
    } else {
      // Limpiar los estados si no estamos en modo edición
      setTipo("");
      setName("");
      setDirection("");
      setIsChecked(false);
      setCodigo_sunat("");
      setToken_pse("");
    }
  }, [esEdicion, localAnexoExistente]);
  
  const handleClose = () => {
    setTipo("");
    setName("");
    setDirection("");
    setCodigo_sunat("");
    setToken_pse("");
    setIsChecked(false);
    onClose();
  };

  if (!isOpen) return null;

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar campos obligatorios
    if (!tipo || !name) {
      alert('Los campos "Tipo" y "Nombre" son obligatorios');
      return;
    }
  
    // Validar campos adicionales si el checkbox está activado
    if (isChecked && (!codigo_sunat || !token_pse)) {
      alert(
        'Los campos "Código Sunat" y "Token PSE" son obligatorios cuando la facturación está activada'
      );
      return;
    }
  
    // Crear el objeto con los datos del local
    const nuevoLocal = {
      tipo,
      name,
      direction,
      codigo_sunat,
      token_pse,
    };
  
    try {
      // Si estamos en modo edición, llamar a la función de editar
      if (esEdicion) {
        await EditarLocal(localAnexoExistente.id, nuevoLocal);
      } else {
        // Si no, llamar a la función de agregar
        await AgregarNuevoLocalAnexo(nuevoLocal);
      }
  
      // Limpiar el formulario y cerrar el modal
      handleClose();
    } catch (error) {
      console.error("Error completo:", error);
  
      let serverMessage = "Error al guardar el local";
  
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        serverMessage = error.response.data?.message || "Error en la respuesta del servidor";
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        serverMessage = "No se recibió respuesta del servidor";
      } else {
        // Algo más causó el error
        serverMessage = error.message || "Error desconocido";
      }
  
      alert(`Error: ${serverMessage}`);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 lg:min-w-md md:min-w-sm min-w-xs max-h-[90vh] shadow-lg">
        <div className="flex justify-between">
          <div className="w-full h-full flex items-center">
            <h2 className="text-lg font-bold mb-4 ml-1 text-[#0A9E9A]">
              {esEdicion ? "Editar Local Anexo" : "Nuevo Local Anexo"}
            </h2>
          </div>
          <GoX
            className="w-6 h-6 hover:text-gray-400 transition cursor-pointer"
            onClick={onClose}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-center md:items-start w-full">
            <div className="w-full">
              <div className="md:flex gap-4 md:mb-3 mb-2 w-full">
                <div className="flex flex-col w-full mb-2 md:mb-0">
                  <label className="block text-sm font-normal text-gray-700">
                    Tipo <label className="text-[#DA0000]">(*)</label>
                  </label>
                  <input
                    type="text"
                    name="tipo"
                    className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    placeholder="Ingrese tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="block text-sm font-normal text-gray-700">
                    Nombre <label className="text-[#DA0000]">(*)</label>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5"
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-normal text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direction"
                  className="w-full mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                  placeholder="Ingrese direccion"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                />
              </div>

              <div className="md:flex gap-2 mb-2 items-center">
                <div className="flex flex-col w-full">
                  <div className="mt-6 ml-1">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        name="isChecked"
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                      />
                      <span
                        className={`absolute text-white ml-0.5 ${
                          isChecked ? "block" : "hidden"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="ml-1.5 text-gray-700 text-xs">
                        Usar En Facturación
                      </span>
                    </label>
                  </div>
                </div>
                {isChecked && (
                  <div className="flex flex-col w-full mb-1 md:mb-0 mt-2">
                    <label className="block text-sm font-normal text-gray-700">
                      Código SUNAT <label className="text-[#DA0000]">(*)</label>
                    </label>
                    <input
                      type="text"
                      name="codigo_sunat"
                      value={codigo_sunat}
                      onChange={(e) => setCodigo_sunat(e.target.value)}
                      className="w-full mt-1 border rounded-sm p-1.5 text-sm bg-white text-black border-gray-400"
                    />
                  </div>
                )}
              </div>

              {isChecked && (
                <div className="flex flex-col w-full mb-1 md:mb-0">
                  <label className="block text-sm font-normal text-gray-700">
                    Token PSE <label className="text-[#DA0000]">(*)</label>
                  </label>
                  <input
                    type="text"
                    name="token_pse"
                    value={token_pse}
                    onChange={(e) => setToken_pse(e.target.value)}
                    className="w-full mt-1 border rounded-sm p-1.5 text-sm bg-white text-black border-gray-400"
                  />
                </div>
              )}

              <div className="flex md:flex-row justify-end gap-2 md:gap-20 mt-10">
                <button
                  type="submit"
                  className={`bg-[#0a9e9a] text-sm text-white px-4 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition cursor-pointer`}
                >
                  <BiSave className="mr-1 w-5 h-5" />
                  {esEdicion ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewLocal;

import { useEffect, useRef, useState } from "react";
import { buscarUbigeo } from "../../../../services/UbigeoService";

const InputUbigeoArray = ({ dtTab, setDtTab, id }) => {
  // Encontrar el objeto con el ID en la lista
  const objeto = dtTab.find((item) => item.id === id) || {};

  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  // Función para buscar el ubigeo
  const buscarUbicacion = async (prompt) => {
    if (!prompt || prompt.trim() === "") {
      setResultados([]);
      return;
    }
    setLoading(true);
    try {
      const data = await buscarUbigeo(prompt);
      setResultados(data);
    } catch (error) {
      console.error("Error al buscar ubigeo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Buscar cuando cambia el input (con debounce)
  useEffect(() => {
    if (typeof objeto.id_ubigeo === "string") {
      const delayDebounce = setTimeout(() => {
        buscarUbicacion(objeto.id_ubigeo);
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [objeto.id_ubigeo]);

  // Manejar cambios en el input y actualizar el objeto correcto en el array
  const handleInputChange = (e) => {
    const { value } = e.target;
    setDtTab((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, id_ubigeo: value.toUpperCase() } : item
      )
    );
  };

  // Seleccionar Ubigeo y actualizar el objeto correcto en el array
  const seleccionarUbigeo = (ubigeo) => {
    setDtTab((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, id_ubigeo: ubigeo } : item
      )
    );
    setResultados([]);
  };

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setResultados([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div  ref={inputRef}>
      <label className="block text-sm text-gray-700 font-medium">
        UBIGEO - (Departamento-Provincia-Distrito)
      </label>
      <input
        type="text"
        className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
        placeholder="Ingrese ubicación"
        value={
          objeto.id_ubigeo && typeof objeto.id_ubigeo === "object"
            ? `${objeto.id_ubigeo.id} ${objeto.id_ubigeo.department}-${objeto.id_ubigeo.province}-${objeto.id_ubigeo.district}`
            : objeto.id_ubigeo || ""
        }
        onChange={handleInputChange}
      />

      {resultados.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-30 w-auto overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {resultados.map((ubigeo) => (
            <li
              key={ubigeo.id}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => seleccionarUbigeo(ubigeo)}
            >
              {ubigeo.id} {ubigeo.department} - {ubigeo.province} -{" "}
              {ubigeo.district}
            </li>
          ))}
        </ul>
      )}

      {loading && <p className="mt-1 text-sm text-gray-500">Buscando...</p>}
    </div>
  );
};

export default InputUbigeoArray;

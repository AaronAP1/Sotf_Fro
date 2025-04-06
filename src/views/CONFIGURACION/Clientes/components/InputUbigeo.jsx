import { useEffect, useRef, useState } from "react";
import { buscarUbigeo } from "../../../../services/UbigeoService";

const InputUbigeo = ({ setDtTab1, dtTab1 }) => {
  const { id_ubigeo } = dtTab1;

  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  // Unificar handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDtTab1({ ...dtTab1, [name]: value });
  };

  // Función para buscar el ubigeo
  const buscarUbicacion = async (prompt) => {
    if (prompt.trim() === "") {
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
    const delayDebounce = setTimeout(() => {
      buscarUbicacion(id_ubigeo);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [id_ubigeo]);

  // Seleccionar Ubigeo
  const seleccionarUbigeo = (ubigeo) => {
    setDtTab1({
      ...dtTab1,
      id_ubigeo: ubigeo,
    });
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-3 md:col-span-2" ref={inputRef}>
      <label className="block text-sm text-gray-700">
        UBIGEO - (Departamento - Provincia - Distrito)
      </label>
      <input
        type="text"
        name="id_ubigeo"
        className="mt-1 w-full rounded-sm border border-gray-400 p-1.5 text-sm"
        placeholder="Ingrese ubicación"
        value={
          id_ubigeo.id ||
          id_ubigeo.department ||
          id_ubigeo.province ||
          id_ubigeo.district
            ? id_ubigeo.id +
              " " +
              id_ubigeo.department +
              "-" +
              id_ubigeo.province +
              "-" +
              id_ubigeo.district
            : id_ubigeo
        }
        onChange={(e) => {
          const valorMayuscula = e.target.value.toUpperCase();
          handleInputChange({
            target: { name: "id_ubigeo", value: valorMayuscula },
          });
        }}
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

export default InputUbigeo;

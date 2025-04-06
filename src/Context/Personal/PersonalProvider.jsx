import { useEffect, useState } from "react";
import {
  createPersonal,
  deletePersonal,
  listPersonal,
  updatedPersonal,
} from "../../services/PersonalService";
import PersonalContext from "./PersonalContext";

const PersonalProvider = ({ children }) => {
  const [personals, setPersonals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPersonal = async () => {
    try {
      const response = await listPersonal();
       setPersonals(response.result);
    } catch (error) {
      setError(error);
      console.error("Error al obtener datos", error);
    } finally {
      setLoading(false);
    }
  };

  const agregarNuevoPersonal = async (nuevoPersonal) => {
    try {
      const response = await createPersonal(nuevoPersonal);
      const PersonalCreado = response.result;
      setPersonals((prevPersonal) => [...prevPersonal, PersonalCreado]);
    } catch (error) {
      console.error("Error al crear el nuevo personal:", error);
      setError(error);
    }
  };

  const editarPersonal = async (id, personalActualizado) => {
    try {
      const response = await updatedPersonal(id, personalActualizado);
      const personalEditado = response.result;
      if (personalEditado) {
        setPersonals((prevPersonal) =>
          prevPersonal.map((personal) =>
            personal.id === id ? { ...personal, ...personalEditado } : personal
          )
        );
      }
    } catch (error) {
      console.error("Error al editar el personal:", error);
      setError(error);
    }
  };

  const eliminarPersonal = async (id) => {
    try {
      const resultado = await deletePersonal(id);
      if (resultado) {
        setPersonals((prevPersonal) =>
          prevPersonal.filter((personal) => personal.id !== id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar el personal:", error);
      setError(error);
    }
  };


  return (
    <PersonalContext.Provider
      value={{
        fetchPersonal,
        personals,
        agregarNuevoPersonal,
        editarPersonal,
        eliminarPersonal,
      }}
    >
      {children}
    </PersonalContext.Provider>
  );
};

export default PersonalProvider;

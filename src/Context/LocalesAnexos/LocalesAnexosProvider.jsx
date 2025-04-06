import { useState, useEffect } from "react";
import LocalesAnexosContext from "./LocalesAnexosContext";
import { listLocalesAnexos, createLocalAnexo, updatedLocalAnexo, deleteLocalAnexo } from "../../services/LocalesAnexosService";

const LocalesAnexosProvider = ({ children }) => {
    const [localesAnexos, setLocalesAnexos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLocalesAnexos = async () => { 
        try {
            const response = await listLocalesAnexos();
            setLocalesAnexos(response.result);
        } catch (error) {
            setError(error);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    }

    const AgregarNuevoLocalAnexo = async (nuevoLocalAnexo) => {
        try {
            const response = await createLocalAnexo(nuevoLocalAnexo);
            const localCreado = response.result;
            setLocalesAnexos((prevLocal) => [...prevLocal, localCreado]);
        } catch (error) {
            console.error("Error al crear el nuevo local:", error)
            setError(error);
        }
    }

    const EditarLocal = async (id, localActualizado) => {
        try {
        //   localActualizado.full_data = `${localActualizado.tipo} 
        //   - ${localActualizado.name} - ${localActualizado.direction} 
        //   - ${localActualizado.codigo_sunat} - ${localActualizado.token_pse}`;
            
          console.log("Local actualizado a enviar pro:", localActualizado);
          const response = await updatedLocalAnexo(id, localActualizado);
      
          // Verifica si la respuesta tiene el formato esperado
          if (response && response.mensaje === 'Local actualizado correctamente') {
            setLocalesAnexos((prevLocal) =>
              prevLocal.map((local) =>
                local.id === id ? { ...local, ...localActualizado } : local
              )
            );
          } else {
            console.error("Respuesta inesperada del servidor:", response);
            throw new Error("Respuesta inesperada del servidor");
          }
        } catch (error) {
          console.error("Error al editar el local:", error);
          setError(error);
          throw error; // Lanza el error para que sea manejado en el componente
        }
      };
    
    const EliminarLocal = async (id) => {
        try {
            const resultado = await deleteLocalAnexo(id);
            if (resultado) {
                setLocalesAnexos((prevLocal) =>
                    prevLocal.filter((local) => local.id !== id)
                );
            }
        } catch (error) {
            console.error("Error al eliminar el local:", error);
            setError(error);
        }
    }


    return (
        <LocalesAnexosContext.Provider value={{ localesAnexos, loading, error,fetchLocalesAnexos, AgregarNuevoLocalAnexo, EditarLocal, EliminarLocal }}>
            {children}
        </LocalesAnexosContext.Provider>
    );
};


export default LocalesAnexosProvider
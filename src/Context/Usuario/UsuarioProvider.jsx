import { useState, useEffect } from "react";
import UsuarioContext from "./UsuarioContext";
import { listUsuario, createUsuario, updatedUsuario, deleteUsuario } from "../../services/UsuarioService";

const UsuarioProvider = ({children}) => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsuarios = async () => {
        try {
            const response = await listUsuario();
            setUsuarios(response.result);
        } catch (error) {
            setError(error);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    }

    const AgregarNuevoUsuario = async (nuevoUsuario) => {
        try {
            const response = await createUsuario(nuevoUsuario);
            const usuarioCreado = response.result;
            setUsuarios((prevUsuario) => [...prevUsuario, usuarioCreado]);
        } catch (error) {
            console.error("Error al crear el nuevo local:", error)
            setError(error);
        }
    }

    const EditarUsuario = async (id, usuarioActualizado) => {
        try {
          console.log("Usuario actualizado a enviar:", usuarioActualizado);
          const response = await updatedUsuario(id, usuarioActualizado);
      
          // Verifica si la respuesta tiene el formato esperado
          if (response && response.mensaje === 'Usuario actualizado correctamente') {
            setUsuarios((prevUsuario) =>
              prevUsuario.map((usuario) =>
                usuario.id === id ? { ...usuario, ...usuarioActualizado } : usuario
              )
            );
          }
        } catch (error) {
          console.error("Error al editar el local:", error);
          setError(error);
          throw error; // Lanza el error para que sea manejado en el componente
        }
      };
    
    const EliminarUsuario = async (id) => {
        try {
            const resultado = await deleteUsuario(id);
            if (resultado) {
                setUsuarios((prevUsuario) =>
                    prevUsuario.filter((usuario) => usuario.id !== id)
                )
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            setError(error);
        }
    }


    return (
        <UsuarioContext.Provider value={{ usuarios, loading, error,fetchUsuarios, AgregarNuevoUsuario, EliminarUsuario, EditarUsuario }}>
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioProvider;
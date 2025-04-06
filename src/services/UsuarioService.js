import api from "../Api/AxiosConfig";

const listUsuario = async () => {
    try {
        const {data, status} = await api.get(`api/usuario/`);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar los usuarios", error)
        throw error;
    }
}

const createUsuario = async (nuevoUsuario) => {
    try {
        const {data, status} = await api.post(`api/usuario/`, nuevoUsuario);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al crear el local:", error);
        throw error;
    }
}

const updatedUsuario = async (id, UsuarioActualizado) => {
    try {
      console.log("Usuario actualizado a enviar:", UsuarioActualizado);
      const { data, status } = await api.put(`api/usuario/${id}`, UsuarioActualizado);
      console.log("dwadwad",data)
      if (status === 200) {
        return data;
      }
    } catch (error) {
      console.error("Error al actualizar Usuario:", error);
      throw error; // Lanza el error para que sea manejado en el componente
    }
  };
  
const deleteUsuario = async (id) => {
    try {
        const {status} = await api.delete(`api/usuario/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
}

export {listUsuario, deleteUsuario, createUsuario, updatedUsuario }
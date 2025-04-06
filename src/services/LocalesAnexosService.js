import api from "../Api/AxiosConfig";

const listLocalesAnexos = async () => {
    try {
        const{data,status} = await api.get(`api/local/`);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar los locales:", error)
        throw error;
    }
}

const createLocalAnexo = async (nuevoLocalAnexo) => {
    try {
        const {data, status} = await api.post(`api/local/`, nuevoLocalAnexo);
        if (status === 200) {
            return data;    
        }
    } catch (error) {
        console.error("Error al crear el local:", error);
        throw error;
    }
}

const updatedLocalAnexo = async (id, localActualizado) => {
    try {
      console.log("Local actualizado a enviar:", localActualizado);
      const { data, status } = await api.put(`api/local/${id}`, localActualizado);
      console.log("dwadwad",data)
      if (status === 200) {
        return data;
      }
    } catch (error) {
      console.error("Error al actualizar el local:", error);
      throw error; // Lanza el error para que sea manejado en el componente
    }
  };

const deleteLocalAnexo = async (id) => {
    try {
        const {status} = await api.delete(`api/local/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar el local:", error);
        throw error;
    }
}

export {listLocalesAnexos, createLocalAnexo, updatedLocalAnexo, deleteLocalAnexo};
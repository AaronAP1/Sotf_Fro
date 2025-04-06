import api from "../Api/AxiosConfig";

const listEmpresa = async () => {
    try {
        const {data, status} = await api.get(`api/empresa/`);
        if (status === 200) {
            return data
        }
    } catch (error) {
        console.error("Error al listar las empresas:", error)
        throw error;
    }
}

const createEmpresa = async (nuevaEmpresa) => {
    try {
        const {data, status} = await api.post(`api/empresa/`, nuevaEmpresa);
        if (status === 200) {
            console.log("Respuesta del servidor:", data);
            return data;
        } else {
            console.error("Error en la respuesta del servidor:", data);
        }
    } catch (error) {
        console.error("Error al crear la empresa:", error.response ? error.response.data : error.message);
        throw error;
    }
}


const updatedEmpresa = async (id, empresaActualizada) => {
    try {
        const {data, status} = await api.put(`api/empresa/${id}/`, empresaActualizada);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al actualizar la empresa:", error);
        throw error;
    }
}

const deleteEmpresa = async (id) => {
    try {
        const {status} = await api.delete(`api/empresa/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar la empresa:", error);
        throw error;
    }
}

export {listEmpresa, createEmpresa, updatedEmpresa, deleteEmpresa}
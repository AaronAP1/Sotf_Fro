import api from "../Api/AxiosConfig";

const listSubgroupsVec = async () => {
    try {
        const { data, status } = await api.get(`/api/sub-grupo/`);
        if( status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar los subgrupos vehiculo", error)
        throw error;
    }
}

const createSubrupoVeh = async (nuevoSubVeh) => {
    try {
        const {data, status} = await api.post(`/api/sub-grupo/`, nuevoSubVeh);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al crear el subgrupo vehiculo:", error);
        throw error;
    }
}

const updatedSubrupoVeh = async (id, subVehActualizado) => {
    try {
        const {data, status} = await api.put(`/api/sub-grupo/${id}/`, subVehActualizado);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al actualizar el subgrupo vehiculo:", error);
        throw error;
    }
}

const deleteSubgroupsVec = async (id) => {
    try {
        const {status} = await api.delete(`/api/sub-grupo/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar los subgrupos vehiculo:", error);
        throw error;
    }
}

export {listSubgroupsVec, createSubrupoVeh, updatedSubrupoVeh, deleteSubgroupsVec};  
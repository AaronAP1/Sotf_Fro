import api from "../Api/AxiosConfig";

const listRols = async () => {
    try {
        const {data, status} = await api.get(`api/rol/`)
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar los roles", error)
        throw error;
    }
}

const deleteRoles = async (id) => {
    try {
        const {status} =await api.delete(`api/rol/${id}/`)
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar roles:", error);
        throw error;
    }
}

export {listRols, deleteRoles}
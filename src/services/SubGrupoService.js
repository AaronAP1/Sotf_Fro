import api from "../Api/AxiosConfig";

const listSubgroup = async () => {
    try {
        const { data,status} = await api.get(`api/sub-grupo/`);

        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar los subgrupos", error)
        throw error;
    }
}

const createSubGroup = async (nuevoSubgrupo) => {
    try {
        const {data, status} = await api.post(`api/sub-grupo/`, nuevoSubgrupo);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al crear el subgrupo:", error);
        throw error;
    }
}

const updatedSubgrupo = async (id, subGrupoActualizado) => {
    try {
        const {data, status} = await api.put(`api/sub-grupo/${id}/`,subGrupoActualizado);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al actualizar el subgrupo:", error);
        throw error;
    }
}

const deleteSubgrupo = async (id) => {
    try {
        const {status} = await api.delete(`api/sub-grupo/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar el subgrupo:", error);
        throw error;
    }
}

export {listSubgroup, createSubGroup, updatedSubgrupo, deleteSubgrupo};
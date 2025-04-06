import api from "../Api/AxiosConfig";

const listPersonal= async () => {
    try {
        const{data,status} = await api.get(`api/personal/`);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar el personal:", error)
        throw error;
    }
}

const createPersonal = async (nuevoPersonal) => {
    try {
        const {data, status} = await api.post(`api/personal/`, nuevoPersonal);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al crear el personal:", error);
        throw error;
    }
}

const updatedPersonal = async (id, personalActualizado) => {
    try {
        console.log("Local actualizado a enviar:",personalActualizado);
        const {data, status} = await api.put(`api/personal/${id}/`, personalActualizado);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al actualizar el personal:", error);
        throw error;
    }
}

const deletePersonal = async (id) => {
    try {
        const {status} = await api.delete(`api/personal/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar el personal:", error);
        throw error;
    }
}

export {listPersonal, createPersonal, updatedPersonal, deletePersonal};
import api from "../Api/AxiosConfig";

const listTipoDocument = async () => {
    try {
        const { data, status } = await api.get(`api/tipo-documento/`);

        if (status === 200) {
            return data;
        }
    }
    catch (error) {
        console.error("Error al listar los tipos de documento:", error)
        throw error;
    }
}

const createTipoDocument = async (nuevoDocumento) => {
    try {
        const { data, status } = await api.post(`api/tipo-documento/`, nuevoDocumento);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al crear el tipo de documento:", error);
        throw error;
    }
};

const updateTipoDocument = async (id, documentoActualizado) => {
    try {
        console.log("ID:", id);
        const { data, status } = await api.put(`api/tipo-documento/${id}/`, documentoActualizado);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al actualizar el tipo de documento:", error);
        throw error;
    }
};

const deleteTipoDocument = async (id) => {
    try {
        const {status} = await api.delete(`api/tipo-documento/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar el tipo de documento:", error);
        throw error;
    }
};

export { listTipoDocument, createTipoDocument, updateTipoDocument, deleteTipoDocument };
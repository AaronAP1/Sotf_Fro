import api from "../Api/AxiosConfig";

const listSeries = async () => {
    try {
        const { data, status } = await api.get(`api/gestor-serie/`);
        if (status === 200) {
            return data
        }
    } catch (error) {
        console.error("Error al listar las series:", error)
        throw error;
    }
}

const createSerie = async (nuevaSerie) => {
    try {
        nuevaSerie.correlativo_inicial = parseInt(nuevaSerie.correlativo_inicial, 10);
        const { data, status } = await api.post(`api/gestor-serie/`, nuevaSerie);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al crear la serie:", error);
        throw error;
    }
}

const updatedSerie = async (id,serieActualizada) => {
    try {
        const {data, status} =await api.put(`api/gestor-serie/${id}/`, serieActualizada);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al actualizar la serie:", error);
        throw error;
    }
}

const deleteSerie = async (id) => {
    try {
        const {status} = await api.delete(`api/gestor-serie/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar la serie:", error);
        throw error;
    }
}

export {listSeries, createSerie, updatedSerie, deleteSerie}
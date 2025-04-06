import api from "../Api/AxiosConfig";

const buscarUbigeo = async (prompt) => {
    try {
        const {data, status} = await api.get(`api/ubigeo/${prompt}`);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar los ubigeos", error)
        throw error;
    }
}

export {buscarUbigeo}
import api from "../Api/AxiosConfig";

const listGastos = async () => {
    try {
        const {data, status} = await api.get(`api/tipo-gasto-operativo/`);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar los tipos de gastos", error)
        throw error;
    }
}

const createTipoGastos = async (nuevoGasto) => {
    try {
        const {data, status} = await api.post(`api/tipo-gasto-operativo/`, nuevoGasto);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al crear los tipos de gastos", error)
        throw error;
    }
}


const updateTipoGastos = async (id, tipoGastoActualizado) => {
    try {
        const {data, status} = await api.put(`api/tipo-gasto-operativo/${id}/`, tipoGastoActualizado);
        if (status === 200){
            return data;
        }
    } catch (error) {
        console.error("Error al actualizar el tipo de gasto:", error);
        throw error;
    }
}

const deleteTipoGasto = async (id) => {
    try {
        const {status} = await api.delete(`api/tipo-gasto-operativo/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar el tipo de gasto:", error);
        throw error;
    }
}

export {listGastos, createTipoGastos, updateTipoGastos, deleteTipoGasto};

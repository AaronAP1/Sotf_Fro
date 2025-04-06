import api from "../Api/AxiosConfig";

const listMarcaModeloVeh = async () => {
    try {
        const { data, status } = await api.get(`api/vehiculo-marca-modelo/`);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar las marcas y modelos de vehículos:", error);
        throw error;
    }
}

const createMarcaModeloVeh = async (nuevoMarcaModeloVeh) => {
    try {
        const { data, status } = await api.post(`api/vehiculo-marca-modelo/`, nuevoMarcaModeloVeh);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al crear la marca o modelo de vehículo:", error);
        throw error;
    }
}

const updatedMarcaModeloVeh = async (id, marcaModeloVehActualizado) => {
    try {
        const { data, status } = await api.put(`api/vehiculo-marca-modelo/${id}/`, marcaModeloVehActualizado);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al actualizar la marca o modelo de vehículo:", error);
        throw error;
    }
}

const deleteMarcaModeloVeh = async (id) => {
    try {
        const { status } = await api.delete(`api/vehiculo-marca-modelo/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar la marca o modelo de vehículo:", error);
        throw error;
    }
}

export { listMarcaModeloVeh, createMarcaModeloVeh, updatedMarcaModeloVeh, deleteMarcaModeloVeh };

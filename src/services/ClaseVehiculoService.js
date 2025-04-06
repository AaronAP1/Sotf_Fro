import api from "../Api/AxiosConfig";

const listClaseVehiculo = async () => {
    try {
        const {data,status} = await api.get(`api/vehiculo-clase/`);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar las clases de vehículos:", error);
        throw error;
    }
}

const createClaseVehiculo = async (nuevaClaseVehiculo) => {
    try {
        console.log(nuevaClaseVehiculo);  // Verificar los datos que se envían
        const { data, status } = await api.post(`api/vehiculo-clase/`, nuevaClaseVehiculo);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al crear la clase de vehículo:", error);
        throw error;
    }
}

const updateClaseVehiculo = async (id, claseVehiculoActualizada) => {
    try {
        const { data, status } = await api.put(`api/vehiculo-clase/${id}/`, claseVehiculoActualizada);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al actualizar la clase de vehículo:", error);
        throw error;
    }
}

const deleteClaseVehiculo = async (id) => {
    try {
        const { status } = await api.delete(`api/vehiculo-clase/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar la clase de vehículo:", error);
        throw error;
    }
}

export { listClaseVehiculo, createClaseVehiculo, updateClaseVehiculo, deleteClaseVehiculo };

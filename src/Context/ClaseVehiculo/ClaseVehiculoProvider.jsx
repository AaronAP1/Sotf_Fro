import { useState, useEffect } from "react";
import ClaseVehiculoContext from "./ClaseVehiculoContext";
import { listClaseVehiculo, createClaseVehiculo, updateClaseVehiculo, deleteClaseVehiculo } from "../../services/ClaseVehiculoService";

const ClaseVehiculoProvider = ({children}) => {
    const [claseVehiculos, setClaseVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClaseVehiculos = async () => {
        try {
            const response = await listClaseVehiculo();
            setClaseVehiculos(response.result);
        } catch (error) {
            setError(error);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const agregarNuevaClaseVehiculo = async (nuevaClaseVehiculo) => {
        try {
            const response = await createClaseVehiculo(nuevaClaseVehiculo);
            
            // Verifica la estructura de la respuesta
            console.log("Respuesta del servidor:", response);
            
            // Si response.data contiene los datos esperados
            const claseVehiculoCreado = response.result; // Ajusta según la estructura
            setClaseVehiculos((prevClaseVehiculos) => [...prevClaseVehiculos, claseVehiculoCreado]);
        } catch (error) {
            console.error("Error al crear la nueva clase de vehículo:", error);
            setError(error);
        }
    };
    

    const editarClaseVehiculo = async (id, claseVehiculoActualizado) => {
        try {
            const response = await updateClaseVehiculo(id, claseVehiculoActualizado);
            const claseVehiculoEditado = response.result;
            if (claseVehiculoEditado) {
                setClaseVehiculos((prevClaseVehiculos) =>
                    prevClaseVehiculos.map((cv) =>
                        cv.id === id ? { ...cv, ...claseVehiculoEditado } : cv
                    )
                );
            }
        } catch (error) {
            console.error("Error al editar la clase de vehículo:", error);
            setError(error);
        }
    };

    const eliminarClaseVehiculo = async (id) => {
        try {
            const resultado = await deleteClaseVehiculo(id);
            if (resultado) {
                setClaseVehiculos((prevClaseVehiculos) =>
                    prevClaseVehiculos.filter((cv) => cv.id !== id)
                );
            }
        } catch (error) {
            console.error("Error al eliminar la clase de vehículo:", error);
            setError(error);
        }
    };


    return (
        <ClaseVehiculoContext.Provider value={{ claseVehiculos, loading, error, fetchClaseVehiculos, agregarNuevaClaseVehiculo, editarClaseVehiculo, eliminarClaseVehiculo }}>
            {children}
        </ClaseVehiculoContext.Provider>
    );
};

export default ClaseVehiculoProvider;

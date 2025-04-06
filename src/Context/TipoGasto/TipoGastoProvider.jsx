import { useState, useEffect } from "react";
import tipoGastoContext from "./TipoGastoContext";
import { listGastos, createTipoGastos, updateTipoGastos, deleteTipoGasto } from "../../services/TipoGastoService";

const TipoGastoProvider = ({ children }) => {
    const [tipoGastos, setTipoGastos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTipoGastos = async () => {
        try {
            const response = await listGastos();
            setTipoGastos(response.result)
        } catch (error) {
            setError(error);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    }

    const agregarNuevoGasto = async (nuevoGasto) => {
        try {
            const response = await createTipoGastos(nuevoGasto);
            const gastoCreado = response.result;
            setTipoGastos((prevGastos) => [...prevGastos, gastoCreado]);
        } catch (error) {
            console.error("Error al crear el nuevo tipo gasto:", error);
            setError(error);
        }
    }

    const editarGasto = async (id, gastoActualizado) => {
        try {
            const response = await updateTipoGastos(id, gastoActualizado);
            const gastoEditado = response.result;
            if (gastoEditado) {
                setTipoGastos((prevGastos) =>
                    prevGastos.map((gast) =>
                        gast.id === id ? { ...gast, ...gastoEditado } : gast
                    )
                )
            }
        } catch (error) {
            console.error("Error al editar el tipo gasto:", error);
            setError(error);
        }
    }

    const eliminarGasto = async (id) => {
        try {
            const resultado = await deleteTipoGasto(id);
            if (resultado) {
                setTipoGastos((prevGastos) =>
                    prevGastos.filter((gast) => gast.id !== id)
                );
            }
        } catch (error) {

        }
    }


    return(
        <tipoGastoContext.Provider value={{tipoGastos, loading, error, fetchTipoGastos, agregarNuevoGasto, editarGasto, eliminarGasto}}>
            {children}
        </tipoGastoContext.Provider>
    )
}

export default TipoGastoProvider;
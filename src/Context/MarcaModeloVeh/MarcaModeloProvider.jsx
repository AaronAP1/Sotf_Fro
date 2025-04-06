import { useState, useEffect } from "react";
import MarcaModeloContext from "./MarcaModeloContext";
import { listMarcaModeloVeh, createMarcaModeloVeh, updatedMarcaModeloVeh, deleteMarcaModeloVeh } from "../../services/MarcaModeloVehService";

const MarcaModeloProvider = ({ children }) => {
    const [marcaModelos, setMarcaModelos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMarcaModelos = async () => {
        try {
            const response = await listMarcaModeloVeh();
            setMarcaModelos(response.result);
        } catch (error) {
            setError(error);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const agregarNuevoMarcaModelo = async (nuevoMarcaModelo) => {
        try {
            const response = await createMarcaModeloVeh(nuevoMarcaModelo);
            const marcaModeloCreado = response.result;
            setMarcaModelos((prevMarcaModelos) => [...prevMarcaModelos, marcaModeloCreado]);
        } catch (error) {
            console.error("Error al crear el nuevo marca o modelo:", error);
            setError(error);
        }
    };

    const editarMarcaModelo = async (id, marcaModeloActualizado) => {
        try {
            const response = await updatedMarcaModeloVeh(id, marcaModeloActualizado);
            const marcaModeloEditado = response.result;
            if (marcaModeloEditado) {
                setMarcaModelos((prevMarcaModelos) =>
                    prevMarcaModelos.map((mm) =>
                        mm.id === id ? { ...mm, ...marcaModeloEditado } : mm
                    )
                );
            }
        } catch (error) {
            console.error("Error al editar el marca o modelo:", error);
            setError(error);
        }
    };

    const eliminarMarcaModelo = async (id) => {
        try {
            const resultado = await deleteMarcaModeloVeh(id);
            if (resultado) {
                setMarcaModelos((prevMarcaModelos) =>
                    prevMarcaModelos.filter((mm) => mm.id !== id)
                );
            }
        } catch (error) {
            console.error("Error al eliminar el marca o modelo:", error);
            setError(error);
        }
    };



    return (
        <MarcaModeloContext.Provider
            value={{ marcaModelos, loading, error,fetchMarcaModelos, agregarNuevoMarcaModelo, editarMarcaModelo, eliminarMarcaModelo}}>
            {children}
        </MarcaModeloContext.Provider>
    );
};

export default MarcaModeloProvider;

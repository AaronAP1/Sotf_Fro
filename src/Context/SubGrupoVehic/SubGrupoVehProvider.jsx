import { useState, useEffect } from "react";
import SubGrupoVecContext from "./SubGrupoVehContext";
import { listSubgroupsVec, createSubrupoVeh, updatedSubrupoVeh, deleteSubgroupsVec } from "../../services/SubGrupoVecService";

const SubGrupoVecProvider = ({ children }) => {
    const [subVehiculo, setSubVehiculo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSubVehiculo = async () => {
        try {
            const response = await listSubgroupsVec();
            setSubVehiculo(response.result);
        } catch (error) {
            setError(error);
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    }

    const agregarNuevoSubVeh = async (nuevoSubVeh) => {
        try {
            const response = await createSubrupoVeh(nuevoSubVeh);
            const subGrupoVehCreado = response.result;
            setSubVehiculo((prevSubVehiculo) => [...prevSubVehiculo, subGrupoVehCreado]);
        } catch (error) {
            console.error("Error al crear el nuevo subgrupo vehiculo:", error)
            setError(error);
        }
    }

    const editarSubVeh = async (id, subVehActualizado) => {
        try {
            const response = await updatedSubrupoVeh(id, subVehActualizado);
            const subgrupVehEditado = response.result;
            if (subgrupVehEditado) {
                setSubVehiculo((prevSubVehiculo) =>
                    prevSubVehiculo.map((subVeh) =>
                        subVeh.id === id ? { ...subVeh, ...subgrupVehEditado } : subVeh
                    )
                )
            }
        } catch (error) {
            console.error("Error al editar el subgrupo vehiculo:", error);
            setError(error);
        }
    }

    const eliminarSubVehiculo = async (id) => {
        try {
            const resultado = await deleteSubgroupsVec(id);
            if (resultado) {
                setSubVehiculo((prevSubVehiculo) =>
                    prevSubVehiculo.filter((subVec) => subVec.id !== id)
                )
            }
        } catch (error) {
            console.error("Error al eliminar el subgrupo de vehiculo:", error);
            setError(error);
        }
    }



    return (
        <SubGrupoVecContext.Provider value={{ subVehiculo, loading, error,fetchSubVehiculo, agregarNuevoSubVeh, editarSubVeh, eliminarSubVehiculo }}>
            {children}
        </SubGrupoVecContext.Provider>
    )
}

export default SubGrupoVecProvider;
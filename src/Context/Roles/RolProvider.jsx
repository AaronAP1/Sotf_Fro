import { useState, useEffect } from "react";
import RolContext from "./RolContext";
import { deleteRoles, listRols } from "../../services/RolService";

const RolProvider = ({ children }) => {
    const [rols, setRols] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRoles = async () => {
        try {
            const response = await listRols();
            setRols(response);
        } catch (error) {
            setError(error)
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    }

    const eliminarRoles = async (id) => {
        try {
            const resultado = await deleteRoles(id);
            if (resultado) {
                setRols((prevRoles) =>
                    prevRoles.filter((rols) => rols.id !== id)
                )
            }
        } catch (error) {
            console.error("Error al eliminar roles:", error);
            setError(error);
        }
    }


    return (
        <RolContext.Provider value={{ rols, loading, error,fetchRoles,eliminarRoles }}>
            {children}
        </RolContext.Provider>
    )
}

export default RolProvider;
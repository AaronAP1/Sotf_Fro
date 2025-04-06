import { useEffect, useState } from "react";
import { createEmpresa, listEmpresa, updatedEmpresa, deleteEmpresa } from "../../services/EmpresaService";
import EmpresaContext from "./EmpresaContext";

const EmpresaProvider = ({ children }) => {
    const [empresa, setEmpresa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEmpresa = async () => {
        try {
            const response = await listEmpresa();
            setEmpresa(response.result);
        } catch (error) {
            setError(error);
            console.error("Error al obtener datos", error);
        } finally {
            setLoading(false);
        }
    }

    const AgregarEmpresa = async (nuevaEmpresa, logoFile) => {
        try {
            const formData = new FormData();
            formData.append("razon_social", nuevaEmpresa.razon_social);
            formData.append("nombre_comercial", nuevaEmpresa.nombre_comercial);
            formData.append("numero_documento", nuevaEmpresa.numero_documento);
            formData.append("direccion", nuevaEmpresa.direccion);
            formData.append("telefono", nuevaEmpresa.telefono);
            formData.append("email", nuevaEmpresa.email);
            formData.append("logo", logoFile); 

            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            const response = await createEmpresa(formData);
            const empresaCreada = response.result
            setEmpresa((prevEmpresa) => [...prevEmpresa, empresaCreada]); 
        } catch (error) {
            setError(error);
            console.error("Error al agregar empresa", error);
        } 
    };

    const EditarEmpresa = async (id, empresaActualizada, logo) => {
        try {
            const formData = new FormData();
            Object.keys(empresaActualizada).forEach((key) => {
                formData.append(key, empresaActualizada[key]);
            });
            if (logo) {
                formData.append('logo', logo);
            }

            const response = await updatedEmpresa(id, formData);
            const empresaEditado = response;
            if (empresaEditado) {
                setEmpresa((prevEmpresa) =>
                    prevEmpresa.map((emp) =>
                        emp.id === id ? { ...emp, ...empresaEditado } : emp
                    )
                );
            }
        } catch (error) {
            console.error("Error al editar la empresa:", error);
            setError(error);
        }
    };


    const EliminarEmpresa = async (id) => {
        try {
            const resultado = await deleteEmpresa(id);
            if (resultado) {
                setEmpresa((prevEmpresa) =>
                    prevEmpresa.filter((emp) => emp.id !== id)
                );
            }
        } catch (error) {
            console.error("Error al eliminar la empresa:", error);
            setError(error);
        }
    }




    return (
        <EmpresaContext.Provider value={{ empresa, loading, error, fetchEmpresa, AgregarEmpresa, EditarEmpresa, EliminarEmpresa }}>
            {children}
        </EmpresaContext.Provider>
    )
}

export default EmpresaProvider
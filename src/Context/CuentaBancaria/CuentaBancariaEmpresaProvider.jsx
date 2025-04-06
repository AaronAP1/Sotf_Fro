import { useEffect, useState } from "react";
import CuentaBancariaEmpresaContext from "./CuentaBancariaEmpresaContext";
import { listCuentaBancariaEmpresa, createCuentaBancariaEmpresa, updatedCuentaBancariaEmpresa, deleteCuentaBancariaEmpresa } from '../../services/CuentaBancariaEmpresaService';

const CuentaBancariaEmpresaProvider = ({ children }) => {
    const [cuentaBancariaEmpresas, setCuentaBancariaEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    const fetchCuentaBancariaEmpresa = async () => {
        try {
            const response = await listCuentaBancariaEmpresa();
            setCuentaBancariaEmpresas(response.result);
        } catch (error) {
            setError(error);
            console.error("Error al obtener las cuentas bancarias:", error);
        } finally {
            setLoading(false);
        }
    };

    const agregarNuevaCuentaBancariaEmpresa = async (nuevaCuenta) => {
        try {
            const response = await createCuentaBancariaEmpresa(nuevaCuenta);
            const cuentaCreada = response;
            setCuentaBancariaEmpresas((prevCuenta) => [...prevCuenta, cuentaCreada]);
        } catch (error) {
            console.error("Error al crear la nueva cuenta:", error);
            setError(error);
        }
    };


    const editarCuentaBancariaEmpresa = async (id, cuentaEmpresaActualizada) => {
    try {
        cuentaEmpresaActualizada.full_data = `${cuentaEmpresaActualizada.tipo} - ${cuentaEmpresaActualizada.tipo_moneda}
        - ${cuentaEmpresaActualizada.numero} - ${cuentaEmpresaActualizada.numero}
        - ${cuentaEmpresaActualizada.fl_publico} - ${cuentaEmpresaActualizada.fl_detraccion}`;
        console.log('Datos que se envían a la API:', cuentaEmpresaActualizada);

        const response = await updatedCuentaBancariaEmpresa(id, cuentaEmpresaActualizada);

        if (response.mensaje === 'Cuenta bancaria persona actualizada correctamente') {
            setCuentaBancariaEmpresas((prevCuenta) =>
                prevCuenta.map((cuent) =>
                    cuent.id === id ? { ...cuent, ...cuentaEmpresaActualizada } : cuent
                )
            );
        }
    } catch (error) {
        console.error("Error al editar la cuenta:", error);
        setError(error);
    }
};
    

    const eliminarCuentaBancariaEmpresa = async (id) => {
        try {
            const resultado = await deleteCuentaBancariaEmpresa(id);
            if (resultado) {
                setCuentaBancariaEmpresas((prevCuentaBancariaEmpresa) =>
                    prevCuentaBancariaEmpresa.filter((cuentaBancariaEmpresa) => cuentaBancariaEmpresa.id !== id)
                )
            }
        } catch (error) {
            console.error("Error al eliminar la cuenta de empresa:", error);
            setError(error);
        }
    }



    return (
        <CuentaBancariaEmpresaContext.Provider value={{ cuentaBancariaEmpresas, loading, error,fetchCuentaBancariaEmpresa, agregarNuevaCuentaBancariaEmpresa, editarCuentaBancariaEmpresa, eliminarCuentaBancariaEmpresa }}>
            {children}
        </CuentaBancariaEmpresaContext.Provider>
    )
}

export default CuentaBancariaEmpresaProvider;
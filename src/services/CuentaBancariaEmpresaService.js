import api from "../Api/AxiosConfig";

const listCuentaBancariaEmpresa = async () => {
    try {
        const{data,status} = await api.get(`api/cuenta-bancaria-empresa/`);
        if(status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar las cuentas bancarias:", error)
        throw error;
    }
}

const createCuentaBancariaEmpresa = async (nuevaCuentaBancariaEmpresa) => {
    try {
        const {data, status} = await api.post(`api/cuenta-bancaria-empresa/`, nuevaCuentaBancariaEmpresa);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al crear la cuenta bancaria:", error);
        throw error;
    }
}

const updatedCuentaBancariaEmpresa = async(id, cuentaEmpresaActualizada) => {
    try {
        const{data, status} = await api.put(`api/cuenta-bancaria-empresa/${id}/`, cuentaEmpresaActualizada);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al actualizar la cuenta bancaria:", error);
        throw error;
    }
}

const deleteCuentaBancariaEmpresa = async (id) => {
    try {
        const {status} = await api.delete(`api/cuenta-bancaria-empresa/${id}/`);
        if (status === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error al eliminar la cuenta bancaria:", error);
        throw error;
    }
}

export {listCuentaBancariaEmpresa, createCuentaBancariaEmpresa, updatedCuentaBancariaEmpresa, deleteCuentaBancariaEmpresa}
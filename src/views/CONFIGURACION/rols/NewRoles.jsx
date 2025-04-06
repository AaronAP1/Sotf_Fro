import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";

export default function NewRoles({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] text-xs md:text-sm z-10">
        <div className="flex justify-between">
                      <h2 className="text-lg font-semibold mb-4 text-[#0A9E9A]">
                        Nuevo Rol
                      </h2>
                      <GoX
                        className="w-6 h-6  hover:text-gray-400 transition"
                        onClick={onClose}
                      />
                    </div>  
        <div className=" md:flex">
          <div className="flex-col flex w-full">
          <label className="text-sm font-medium text-gray-700">Nombre</label>
          <input 
          type="text" 
          className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5" 
          placeholder="Ingrese el nombre del rol" 
          />
          </div>
          <div className="mt-3 ml-1 md:ml-0 md:mt-2 flex flex-col w-auto justify-center text-nowrap md:px-6">
           
          <label className="font-medium text-white md:block hidden">a</label> 
          <div className="flex items-center">
            <input type="checkbox" id="ocultarDashboard" className="mr-1" />
            <label htmlFor="ocultarDashboard">Ocultar Dashboard</label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="sticky top-0 bg-white z-10 flex mb-4">
            <button className="px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm font-medium text-black border-b-2 border-[#0A9E9A]">Configuración</button>
            <button className="px-4 py-2 text-xs md:px-4 md:py-2 md:text-sm font-medium text-gray-500">Documentos</button>
          </div>
          <div className=" max-h-[40vh] lg:min-h-[30vh] overflow-y-auto ">
            <table className="w-full mt-4 table-auto">
              <thead className="border border-[#B0B0B0]">
                <tr className="bg-[#F4F5FB]">
                  <th className="p-2"></th>
                  <th className="p-2 font-medium">Ver</th>
                  <th className="p-2 font-medium">Crear</th>
                  <th className="p-2 font-medium">Editar</th>
                  <th className="p-2 font-medium">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Usuarios", "Roles y Permisos", "Empresa", "Centros de costo",
                  "Locales Anexos", "Gestor de Series", "Cuenta bancaria de la empresa",
                  "Personales", "Proveedores", "Clientes", "Vehículos", "Tipos de Gastos",
                  "Tipo de Documentos", "Ajustes Avanzados", "Moneda/Tipo de Cambio", "Caja Motivo"
                ].map((modulo, index) => (
                  <tr key={index} className="border border-[#B0B0B0]">
                    <td className="p-2">{modulo}</td>
                    <td className="p-2 text-center"><input type="checkbox" /></td>
                    <td className="p-2  text-center"><input type="checkbox" /></td>
                    <td className="p-2  text-center"><input type="checkbox" /></td>
                    <td className="p-2 text-center"><input type="checkbox" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 md:mt-7 mt-6 mb-1 ">
                      <button
                        type="submit"
                        className="bg-[#0a9e9a] text-sm text-white px-6 py-2 rounded-lg hover:bg-[#098b89] flex items-center transition "
                        onClick={onClose}
                      >
                       <BiSave  className="mr-1 w-4 h-4" /> Guardar
                        
                      </button>
                    </div>  
      </div>
    </div>
  );
}
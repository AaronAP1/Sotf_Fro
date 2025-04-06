import { useState, useEffect } from "react";
import { GoX } from "react-icons/go";
import { BiSave } from "react-icons/bi";
import useTipoGasto from "../../../Hooks/useTipoGasto";

function NewGastos({ isOpen, onClose, gastoExistente = null, esEdicion = false }) {
  const { agregarNuevoGasto, editarGasto } = useTipoGasto();
  const [nombre, setNombre] = useState('');
  const [fl_no_liquidacion, set_Fl_no_Liquidacion] = useState(false);
  const [fl_provedor, set_Fl_Provedor] = useState(false);
  const [fl_credito, set_Fl_Credito] = useState(false);

  useEffect(() => {
    if (esEdicion && gastoExistente) {
      setNombre(gastoExistente.nombre);
      set_Fl_no_Liquidacion(gastoExistente.fl_no_liquidacion || false);
      set_Fl_Provedor(gastoExistente.fl_provedor || false);
      set_Fl_Credito(gastoExistente.fl_credito || false);
    }
  }, [esEdicion, gastoExistente]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const gastoData = {
      nombre,
      fl_no_liquidacion,
      fl_provedor,
      fl_credito,
    };

    if (esEdicion) {
      editarGasto(gastoExistente.id, gastoData);
    } else {
      agregarNuevoGasto(gastoData);
    }

    setNombre('');
    set_Fl_no_Liquidacion(false);
    set_Fl_Provedor(false);
    set_Fl_Credito(false);
    onClose();
  };

  const handleClose = () => {
    setNombre('');
    set_Fl_no_Liquidacion(false);
    set_Fl_Provedor(false);
    set_Fl_Credito(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-[#00000089] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-5 lg:min-w-md sm:min-w-3/6 min-w-11/12 max-h-[90vh] shadow-lg">
        <div className="flex justify-between mt-2">
          <h2 className="text-lg font-semibold mb-4 ml-1 text-[#0A9E9A]">
            {esEdicion ? 'Editar Tipo de Documento' : 'Nuevo Tipo de Documento'}
          </h2>
          <GoX
            className="w-6 h-6 hover:text-gray-400 transition cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <form className="flex flex-col h-full px-1" onSubmit={handleSubmit}>
          <div className="flex-grow mb-4">
          <div className="mb-3">
              <label className="text-sm  text-gray-700">
                Modalidad de Pago <span className="text-red-500">(*)</span>
              </label>
              <select className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]">
                <option value="" disabled selected>
                  Seleccione
                </option>
                <option value="tarjeta">Tarjeta</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="text-sm text-gray-700">Nombre</label>
              <input
                type="text"
                className="w-full border-gray-400 mt-1 border rounded-sm text-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
                placeholder="Ingrese el nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mb-6 flex flex-col gap-2 ml-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={fl_no_liquidacion}
                  onChange={(e) => set_Fl_no_Liquidacion(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">No liquidable</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={fl_provedor}
                  onChange={(e) => set_Fl_Provedor(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Requiere Proveedor</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={fl_credito}
                  onChange={(e) => set_Fl_Credito(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Permitir Crédito</label>
              </div>
            </div>
          </div>

          {/* Botón de guardar */}
          <div className="flex justify-end py-3">
            <button
              type="submit"
              className="flex gap-1 px-5 py-2.5 text-sm bg-[#0a9e9a] text-white rounded-lg hover:bg-[#098785] transition cursor-pointer"
            >
              <BiSave className="w-5 h-5 text-white" />
              {esEdicion ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewGastos;

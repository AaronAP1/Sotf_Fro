import { useState, useEffect } from 'react';
import { BiSave } from "react-icons/bi";
import { GoX } from "react-icons/go";
import useSerie from '../../../Hooks/useSerie';

function NewSeries({ isOpen, onClose, serieExistente = null, esEdicion = false }) {
    const { agregarNuevaSerie, editarSerie } = useSerie();

    const [tipo_modulo, setTipo_Modulo] = useState("");
    const [comprobante, setComprobante] = useState("");
    const [serie, setSerie] = useState("");
    const [correlativo_inicial, setCorrelativo_Inicial] = useState("");

    useEffect(() => {
        if (esEdicion && serieExistente) {
            // Si estamos en modo edición, inicializamos el formulario con los valores existentes
            setTipo_Modulo(serieExistente.tipo_modulo);
            setComprobante(serieExistente.comprobante);
            setSerie(serieExistente.serie);
            setCorrelativo_Inicial(serieExistente.correlativo_inicial);
        } else {
            setTipo_Modulo("");
            setComprobante("");
            setSerie("");
            setCorrelativo_Inicial("");
        }
    }, [esEdicion, serieExistente]);

    const handleTipoModuloChange = (e) => {
        const value = e.target.value;
        setTipo_Modulo(value);

        if (value === 'proforma') {
            setComprobante('Cotización');
        } else if (value === 'operaciones') {
            setComprobante('Guía Transportista');
        } else {
            setComprobante('');
        }
    };

    const handleSave = () => {
        const data = {
            tipo_modulo,
            comprobante,
            serie,
            correlativo_inicial,
        };

        if (esEdicion && serieExistente) {
            // Llamar a la función para editar serie
            editarSerie(serieExistente.id, data);
        } else {
            // Llamar a la función para agregar nueva serie
            agregarNuevaSerie(data);
        }
        setTipo_Modulo("");
        setComprobante("");
        setSerie("");
        setCorrelativo_Inicial("");
        onClose(); // Cerrar modal después de guardar
    };

    const renderComprobanteInput = () => {
        if (tipo_modulo === 'proforma') {
            return (
                <input
                    type="text"
                    value="Cotización"
                    readOnly
                    className="w-full border-gray-400 text-gray-600 mt-1 border rounded-sm text-sm p-1.5"
                />
            );
        } else if (tipo_modulo === 'operaciones') {
            return (
                <input
                    type="text"
                    value="Guía Transportista"
                    readOnly
                    className="w-full border-gray-400 text-gray-600 mt-1 border rounded-sm text-sm p-1.5"
                />
            );
        } else {
            return (
                <select
                    className="w-full border-gray-400 text-gray-600 mt-1 border rounded-sm text-sm p-1.5"
                    value={comprobante}
                    onChange={(e) => setComprobante(e.target.value)}
                >
                    <option value="" disabled>
                        Seleccione
                    </option>
                    {tipo_modulo === 'facturacion' && (
                        <>
                            <option value="boleta">Boleta de Venta</option>
                            <option value="factura">Factura</option>
                            <option value="nota_credito">Nota de Crédito</option>
                            <option value="nota_debito">Nota de Débito</option>
                            <option value="recibo_interno">Recibo Interno</option>
                        </>
                    )}
                    {tipo_modulo === 'operaciones' && (
                        <>
                            <option value="guia_transportista">Guía Transportista</option>
                        </>
                    )}
                </select>
            );
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 backdrop-blur-sm bg-black opacity-40"></div>
            <div className="w-[90%] h-auto sm:w-[60%] md:w-[45%] lg:w-[34%] xl:w-[375px] bg-white rounded-lg border-collapse overflow-y-auto p-8 pt-0 pr-0 pl-0 relative">
                <div className="flex justify-between sticky top-0 bg-white p-1 pl-4 ">
                    <h2 className="text-lg font-bold mb-2 mt-4 text-[#0A9E9A]">
                        {esEdicion ? 'Editar Serie' : 'Nueva Serie'}
                    </h2>
                    <GoX
                        className="w-6 h-6 mt-2 mr-2  hover:text-gray-400 transition"
                        onClick={onClose}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full px-4 sm:px-5">
                    <div className="w-full">
                        <div className="mb-3">
                            <label className="block text-sm text-gray-700">
                                Tipo/Modulo
                            </label>
                            <select
                                className="w-full border-gray-400 text-gray-600 mt-1 border rounded-sm text-sm p-1.5 focus:outline-none focus:ring-2 focus:ring-[#0a9e9a]"
                                value={tipo_modulo}
                                onChange={handleTipoModuloChange}
                            >
                                <option value="" disabled>
                                    Seleccione
                                </option>
                                <option value="facturacion">Facturación Electrónica</option>
                                <option value="proforma">Proforma/Cotizaciones</option>
                                <option value="almacen">Almacén/Taller</option>
                                <option value="operaciones">Operaciones</option>
                            </select>
                        </div>

                        <div className="mb-2.5">
                            <label className="block text-sm text-gray-700">
                                Comprobante
                            </label>
                            {renderComprobanteInput()}
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-5 mb-5 ">
                            <div className="flex flex-col w-full mb-2 md:mb-0">
                                <label className="text-sm  text-gray-700">
                                    Serie
                                </label>
                                <input
                                    type="text"
                                    value={serie}
                                    onChange={(e) => setSerie(e.target.value)}
                                    className=" mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="text-sm  text-gray-700">
                                    Correlativo Inicial
                                </label>
                                <input
                                    type="text"
                                    value={correlativo_inicial}
                                    onChange={(e) => setCorrelativo_Inicial(e.target.value)}
                                    className=" mt-1 border rounded-sm p-1.5 text-sm border-gray-400"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-[130px] w-5 sm:w-1/13 bg-red-500"></div>
                            <div className="flex flex-col">
                                <div className="text-red-500 text-md font-bold">IMPORTANTE:</div>
                                <p className="text-gray-600 text-sm">
                                    No utilices las series registradas en este sistema para emitir en otros sistemas,
                                    ya que tendrás que modificar el correlativo en este formulario cada vez que rebote
                                    la facturación por documento ya existente.
                                </p>
                            </div>
                        </div>

                        <div className="flex md:flex-row justify-end gap-2 mt-8">
                            <button
                                onClick={handleSave}
                                className="bg-[#0a9e9a] text-white rounded-sm px-6 py-2 text-sm flex items-center hover:bg-[#098785] transition cursor-pointer"
                            >
                                <BiSave className="mr-2" />
                                {esEdicion ? 'Actualizar' : 'Guardar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewSeries;

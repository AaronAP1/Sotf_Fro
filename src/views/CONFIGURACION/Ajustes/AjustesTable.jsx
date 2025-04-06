import { useState, useRef, useEffect } from "react";
import { BiSave } from "react-icons/bi";
import SerieCorrelativas from "./SerieCorrelativas";

function AjustesTable() {
  const [isMonitoreoSelected, setIsMonitoreoSelected] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const circleRef = useRef(null);

  const handleRadioChange = () => {
    setIsMonitoreoSelected(!isMonitoreoSelected);
  };

  const handleCircleClick = (event) => {
    const circle = circleRef.current;
    const ctx = circle.getContext("2d");
    const rect = circle.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const pixel = ctx.getImageData(x, y, 1, 1).data; // Obtiene el pixel clicado
    const hexColor = `#${(
      (1 << 24) +
      (pixel[0] << 16) +
      (pixel[1] << 8) +
      pixel[2]
    )
      .toString(16)
      .slice(1)}`;
    setSelectedColor(hexColor); // Actualiza el estado con el color hexadecimal
  };

  useEffect(() => {
    const canvas = circleRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const toRad = (deg) => (Math.PI / 180) * deg;

    // Dibuja el círculo de colores
    for (let angle = 0; angle <= 360; angle++) {
      const startAngle = toRad(angle);
      const endAngle = toRad(angle + 1);
      const gradient = ctx.createRadialGradient(
        radius,
        radius,
        0,
        radius,
        radius,
        radius
      );

      gradient.addColorStop(0, "hsl(" + angle + ", 100%, 50%)");
      gradient.addColorStop(1, "#ffffff"); // Blanco en el centro

      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }, []);

  return (
    <div className="flex-1 bg-[#F4F5FB] p-1 md:p-2 md:px-2 ">
      <div className="h-auto mt- bg-transparent">
        <div className="ml-1 flex items-center gap-2 lg:gap-3 flex-wrap mb-5">
          <div className="text-black text-xl md:text-2xl font-normal font-poppins">
            Ajustes Avanzados
          </div>
          <div className="text-black/60 text-xs mt-2 -ml-2 font-normal font-inter">
            Configuración
          </div>
        </div>
        <div className="overflow-y-auto">
        <div className=" bg-white w-full box-border rounded-lg border border-gray-300 p-4 ">
          {/* Sección: Orden de Trabajo */}
          <div className="">
          <div className="mt-2 mb-6">
            <div className="font-bold text-md font-['inter']">
              ORDEN DE TRABAJO
            </div>
            <div className="flex items-center mt-2 gap-1.5 ml-1">
              <input
                type="checkbox"
                name="option"
                value="detracciones"
                className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
              />
              <label className="text-sm sm:text-base lg:text-sm">
                Seleccionar Automáticamente Crear Viaje
              </label>
            </div>
          </div>

          {/* Sección: Orden de Viaje */}
          <div className="md:mt-8 md:mb-10">
            <div className="font-bold text-md font-['inter']">
              ORDEN DE VIAJE
            </div>
            <div className="flex flex-wrap items-center mt-2 mb-6 gap-2 md:gap-8 ">
              <div className="flex items-center gap-1.5 ml-1">
                <input
                  type="checkbox"
                  name="cantidad"
                  value="cantidad"
                  className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                />
                <label className="text-sm">Cantidad (No Obligatorio)</label>
              </div>
              <div className="flex items-center gap-1.5 ml-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="monitoreo"
                    value="monitoreo"
                    className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm absolute opacity-0 peer"
                    onChange={handleRadioChange}
                    checked={isMonitoreoSelected}
                  />
                  <span className="peer-checked:bg-[#0a9e9a] peer-checked:border-[#0a9e9a] peer-checked:text-white flex justify-center items-center h-4 w-4 border border-gray-400 rounded-sm">
                    {isMonitoreoSelected && (
                      <span className="text-white text-sm">✓</span>
                    )}
                  </span>
                  <span className="ml-1.5 text-sm">
                    Iniciar o Finalizar Viaje Según Estados de Monitoreo
                  </span>
                </label>
              </div>
            </div>

            <div className="md:flex gap-4 mt-6 md:mt-8 space-y-2 md:space-y-0 xl:w-11/12">
              <div className="flex flex-col items-start gap-0.5 w-full">
                <label className="text-sm">
                  Estado Para Habilitar Inicio de Viaje
                </label>
                <select
                  className={`w-full mt-1 border-[#B0B0B0] border-[1px] rounded-sm p-1.5 text-sm ${
                    isMonitoreoSelected
                      ? "text-gray-600 border-[#B0B0B0]"
                      : "text-[#333333] bg-[#D9D9D9] border-[#B0B0B0] border-[1px]"
                  }`}
                  disabled={!isMonitoreoSelected}
                >
                  <option>Seleccione</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="flex flex-col items-start gap-0.5 w-full">
                <label className="text-sm">Estado Para Retornar Viaje</label>
                <select
                  className={`w-full mt-1 border-[#B0B0B0] border-[1px] rounded-sm p-1.5 text-sm ${
                    isMonitoreoSelected
                      ? "text-gray-600 border-[#B0B0B0]"
                      : "text-[#333333] bg-[#D9D9D9] border-[#B0B0B0] border-[1px]"
                  }`}
                  disabled={!isMonitoreoSelected}
                >
                  <option>Seleccione</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="flex flex-col items-start gap-0.5 w-full">
                <label className="text-sm">
                  Estado Para Habilitar Finalizar Viaje
                </label>
                <select
                  className={`w-full mt-1 border-[#B0B0B0] border-[1px] rounded-sm p-1.5 text-sm ${
                    isMonitoreoSelected
                      ? "text-gray-600 border-[#B0B0B0]"
                      : "text-[#333333] bg-[#D9D9D9] border-[#B0B0B0] border-[1px]"
                  }`}
                  disabled={!isMonitoreoSelected}
                >
                  <option>Seleccione</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
            </div>

            <div className="md:flex mt-2.5 md:mt-5 gap-4 space-y-2 md:space-y-0 lg:w-11/12">
              <div className="flex flex-col items-start gap-0.5 w-full ">
                <label className="text-sm">
                  Porcentaje de Detracción (Servicios Terceros)
                </label>
                <select className="w-full mt-1 border rounded-sm p-1.5 text-sm text-gray-600 border-gray-400">
                  <option>
                    Ocultar y Establecer Automáticamente Según La Configuración
                  </option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
              <div className="flex flex-col items-start gap-0.5 w-full">
                <label className="text-sm">Tipo IGV (Servicios Terceros)</label>
                <select className="w-full mt-1 rounded-sm p-1.5 text-sm border-[#B0B0B0] text-gray-600 border-[1px]">
                  <option>Seleccionar en Formulario Cada Vez</option>
                  <option>q</option>
                  <option>e...</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección: Facturación Electrónica */}
          <div className="mt-7 md:mt-6 ml-1 mb-6 md:mb-8">
            <div className="font-bold text-md font-['inter']">
              FACTURACIÓN ELECTRÓNICA
            </div>
            <div className="flex items-center mt-1.5 md:mt-2 gap-1.5">
              <input
                type="checkbox"
                name="option"
                value="detracciones"
                className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
              />
              <label className="text-sm">
                Formato De Impresión Personalizado
              </label>
            </div>
          </div>

          {/* Sección: Proforma */}
          <div className="md:mt-10 ml-1 mb-6">
            <div className="font-bold text-md font-['inter']">PROFORMA</div>
            <div className="flex items-center mt-1.5 md:mt-2 gap-1.5">
              <input
                type="checkbox"
                name="option"
                value="detracciones"
                className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
              />
              <label className="text-sm">
                Formato De Impresión Personalizado
              </label>
            </div>
          </div>

          {/* Sección: Tesorería */}
          <div className="ml-1 mt-7 md:mt-10">
            <div className="font-bold text-md font-['inter']">TESORERÍA</div>

            {/* Grid para radio buttons en columnas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-1.5 md:mt-2">
              <div className="flex items-center gap-1.5">
                <div>
                  <input
                    type="checkbox"
                    name="option"
                    value="caja"
                    className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                  />
                </div>
                <label className="text-sm ">
                  <strong className="font-bold">Caja</strong> Bloquear Viajes
                  que tengan órdenes de trabajo facturadas.
                </label>
              </div>

              <div className="flex items-center gap-1.5">
                <div>
                  <input
                   type="checkbox"
                    name="option"
                    value="formato"
                    className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                  />
                </div>
                <label className="text-sm">
                  <strong className="font-bold">Liquidación De Tercero</strong>{" "}
                  Formato de impresión personalizado.
                </label>
              </div>

              <div className="flex items-center gap-1.5">
                <div>
                  <input
                    type="checkbox"
                    name="option"
                    value="detraccion"
                    className="form-radio text-[#0a9e9a] appearance-none h-4 w-4  border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                  />
                </div>
                <label className="text-sm">
                  <strong className="font-bold">Liquidación De Tercero</strong>{" "}
                  Descontar Detracción.
                </label>
              </div>

              <div className="flex items-center gap-1.5">
                <div>
                  <input
                   type="checkbox"
                    name="option"
                    value="escolta"
                    className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                  />
                </div>
                <label className="text-sm">
                  <strong className="font-bold">Liquidación De Escolta</strong>{" "}
                  Descontar detracción.
                </label>
              </div>
              
              <div className="flex items-center gap-1.5">
                <div>
                  <input
                    type="checkbox"
                    name="option"
                    value="pago-facturas"
                    className="form-radio text-[#0a9e9a] appearance-none h-4 w-4  border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                  />
                </div>
                <label className="text-sm">
                  <strong className="font-bold">
                    Pago de Ordenes/Facturas
                  </strong>{" "}
                  Pago de orden según importe registrado y no de factura.
                </label>
              </div>

              <div className="flex items-center gap-1.5">
                <div>
                  <input
                   type="checkbox"
                    name="option"
                    value="transferencia"
                    className="form-radio text-[#0a9e9a] appearance-none h-4 w-4  border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                  />
                </div>
                <label className="text-sm">
                  <strong className="font-bold">
                    Pago de Ordenes/Facturas
                  </strong>{" "}
                  No descontar monto de detracción.
                </label>
              </div>
              
            </div>
          </div>

          {/* Sección: Sistema */}
          <div className="ml-1 mt-8">
            <div className="font-bold text-md font-['inter']">
              SISTEMA
            </div>
            <div className="md:flex items-center mt-1.5 md:mt-3 gap-6 space-y-2 md:space-y-0">
              <div className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  name="option"
                  value="detracciones"
                  className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                />
                <label className="text-sm">
                  Cambiar el color de la barra superior
                </label>
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  name="option"
                  value="detracciones"
                  className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
                />
                <label className="text-sm">
                  Mostrar logotipo de la empresa en lugar de TitanicSoft
                </label>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-6">
              <label className="text-center text-sm sm:text-base lg:text-md">
                Color:
              </label>
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                style={{ backgroundColor: selectedColor }}
                className="w-32 sm:w-40 lg:w-48 mt-1 border rounded-sm p-1.5 text-sm  border-gray-300"
              />
            </div>

            {/* Círculo de colores */}
            <div className="flex md:justify-start justify-center mt-5 md:ml-10">
              <canvas
                ref={circleRef}
                width={200}
                height={200}
                onClick={handleCircleClick}
              />
            </div>
          </div>

          {/* Sección: REPORTES */}
          <div className="ml-1 mt-8">
            <div className="font-bold text-md font-['inter']">
              REPORTES
            </div>

            <div className="flex items-center mt-1.5 md:mt-2 gap-1.5">
              <input
                type="radio"
                name="option"
                value="detracciones"
                className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
              />
              <label className="text-sm">
                <strong className="font-bold">Ordenes de Viaje</strong> formato
                personalizado
              </label>
            </div>
          </div>

          {/* Sección: Configuracion */}
          <div className="ml-1 mt-8">
            <div className="font-bold text-md font-['inter']">
              CONFIGURACION
            </div>

            <div className="flex items-center mt-1.5 md:mt-2 gap-1.5">
              <input
                type="radio"
                name="option"
                value="detracciones"
                className="form-radio text-[#0a9e9a] appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#0a9e9a]"
              />
              <label className="text-sm">
                <strong className="font-bold">Vehiculos</strong> No validar
                duplicidad
              </label>
            </div>
          </div>

          <div className="flex  md:flex-row justify-end gap-2 md:gap-20 mt-8 px-4 md:px-0 mb-3">
            <button className="bg-[#0a9e9a] text-white rounded-md px-6 py-2 text-sm flex items-center hover:bg-[#098785] transition cursor-pointer">
              <BiSave className="w-5 h-5 mr-1" />
              Guardar
            </button>
          </div>
        </div>
        
        </div><SerieCorrelativas />
        </div>
      </div>
    </div>
  );
}

export default AjustesTable;

import { AiFillRightCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import useDashboard from "../../../Hooks/useDashboard";
import { useEffect } from "react";

function DashboardPanel() {
  const { ObtenerInformacionPanel ,loading, error, dashboard } = useDashboard();

  // Definir los colores en orden
  const colors = ["bg-blue-400", "bg-green-400", "bg-yellow-400"];

  useEffect(() => {
    ObtenerInformacionPanel();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Hola "usuario", te damos la bienvenida a NameSoft.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <div className="pt-4 col-span-1 md:col-span-2 lg:col-span-3  flex items-start justify-center h-screen">
            <div className="flex w-full items-center justify-center ">
              <div>
              <AiOutlineLoading3Quarters className="w-12 h-12  animate-spin mr-4" /></div>
              <div>
              <h1 className="text-2xl font-semibold">Loading</h1></div>
            </div>
          </div>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          dashboard &&
          Object.entries(dashboard).map(([key, value], index) => (
            <div
              key={index}
              className={`pt-3 rounded-sm text-white shadow-md ${
                colors[index % colors.length]
              }`}
            >
              <h1 className="px-4 text-3xl">{value.total}</h1>
              <h2 className="px-4 pb-2 text-xl font-semibold">
                {value.titulo}
              </h2>
              <p className="px-4 rounded-b-sm text-md bg-zinc-300/75 flex items-center justify-center gap-3">
                Ver más <AiFillRightCircle />
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardPanel;

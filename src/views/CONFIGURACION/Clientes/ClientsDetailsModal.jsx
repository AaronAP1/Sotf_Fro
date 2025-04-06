import { IoClose } from "react-icons/io5";

const ClientDetailsModal = ({ isOpen, onClose, client }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-[#1817176a]  bg-opacity-50">
      <div className="bg-[#F4F5FB] w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] p-4 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute w-6 h-6 top-3 right-2 text-gray-600 hover:text-gray-900">
          <IoClose size={18} />
        </button>

        <h2 className="text-xl font-bold ml-1 mt-4 text-teal-600">NOMBRE DE RAZÓN SOCIAL</h2>
        <p className="text-gray-700 font-semibold ml-1">RUC: 00000000</p>
        <div className="bg-white border-[1px] border-[#0000003b] p-3 py-3 mt-4 rounded-md">
        {client ? (
          <div className="space-y-2">
            <p className="flex"><p className="font-semibold mr-1">Documento:</p>{client.documento}</p>
            <p className="flex"><p className="font-semibold mr-1">Razón Social:</p>{client.razonSocial}</p>
            <p className="flex"><p className="font-semibold mr-1">Dirección:</p>{client.direccion}</p>
            <p className="flex"><p className="font-semibold mr-1">Email:</p>{client.email}</p>
            <p className="flex"><p className="font-semibold mr-1">Encargado:</p>{client.encargado}</p>
          </div>
        ) : (
          <p className="text-gray-500">Información no disponible.</p>
        )}
        </div>
      </div>
    </div>
  );
};
export default ClientDetailsModal;

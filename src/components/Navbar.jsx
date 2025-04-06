import { FaBars } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white p-4 h-18 text-black border-b-[1px] border-[#D3D2D2]">
      <div className="flex justify-between items-center h-8 ">
        {/* Botón hamburguesa visible solo en pantallas pequeñas */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-800"
        >
          <FaBars size={24} />
        </button>
        <div className="space-x-4">
          {/* Otros botones o enlaces del navbar */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

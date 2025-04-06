import { useState } from 'react'
import { BiSave } from "react-icons/bi";

function MonedaTipoCambio() {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({
        USD: false,
        NULL1: false,
        NULL2: false,
        NULL3: false,
    });

    const handleCheckboxChange = (currency) => {
        setSelectedCheckboxes((prevState) => ({
            ...prevState,
            [currency]: !prevState[currency],
        }));
    };

    return (
        <div className="flex-1 bg-[#F4F5FB] h-full p-2 px-1 md:px-2">
    <div className="h-auto">
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                <div className="text-black text-lg sm:text-2xl font-normal font-poppins">
                    Moneda/Tipo Cambio
                </div>
                <div className="text-black/60 text-sm sm:text-xs mt-2 -ml-1 font-normal font-inter">
                    Configuración
                </div>
            </div>
        </div>

        <div className="overflow-hidden">
            {/* Contenedor de tabla y botón */}
            <div className="bg-white rounded-lg  border-[1px] border-gray-300 p-2 max-w-full">
                <div className='overflow-x-auto -mt-1'>
                <table className="min-w-full bg-white table-auto">
                    <thead>
                        <tr className="text-xs sm:text-sm text-nowrap font-semibold font-[Inter] border-b-[1px] border-gray-200">
                            <th className="px-4 py-3 text-left">MONEDA</th>
                            <th className="px-4 py-3 text-left">SIMBOLO</th>
                            <th className="px-4 py-3 text-left">CODIGO</th>
                            <th className="px-4 py-3 text-left">TIPO CAMBIO</th>
                            <th className="px-4 py-3 text-center">VISTA PANEL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-4 py-3">DOLARES</td>
                            <td className="px-4 py-3">US$</td>
                            <td className="px-4 py-3">USD</td>
                            <td className="px-4 py-3">
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded p-2 w-full "
                                    value="3.7210"
                                    readOnly
                                />
                            </td>
                            <td className="px-4 py-3 text-center">
                                <input
                                    type="checkbox"
                                    className="rounded-full appearance-none w-4 h-4 border border-gray-600 checked:bg-[#0a9e9a] checked:border-transparent focus:outline-none cursor-pointer"
                                    checked={selectedCheckboxes['USD']}
                                    onChange={() => handleCheckboxChange('USD')}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">NULL</td>
                            <td className="px-4 py-3">NULL</td>
                            <td className="px-4 py-3">NULL</td>
                            <td className="px-4 py-3">
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded p-2 md:w-full "
                                    value="4.0900"
                                    readOnly
                                />
                            </td>
                            <td className="px-4 py-3 text-center">
                                <input
                                    type="checkbox"
                                    className="rounded-full appearance-none w-4 h-4 border border-gray-600 checked:bg-[#0a9e9a] checked:border-transparent focus:outline-none cursor-pointer"
                                    checked={selectedCheckboxes['NULL1']}
                                    onChange={() => handleCheckboxChange('NULL1')}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">NULL</td>
                            <td className="px-4 py-3">NULL</td>
                            <td className="px-4 py-3">NULL</td>
                            <td className="px-4 py-3">
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded p-2 w-full "
                                    value="4.0900"
                                    readOnly
                                />
                            </td>
                            <td className="px-4 py-3 text-center">
                                <input
                                    type="checkbox"
                                    className="rounded-full appearance-none w-4 h-4 border border-gray-600 checked:bg-[#0a9e9a] checked:border-transparent focus:outline-none cursor-pointer"
                                    checked={selectedCheckboxes['NULL2']}
                                    onChange={() => handleCheckboxChange('NULL2')}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">NULL</td>
                            <td className="px-4 py-3">NULL</td>
                            <td className="px-4 py-3">NULL</td>
                            <td className="px-4 py-3">
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    value="3.2800"
                                    readOnly
                                />
                            </td>
                            <td className="px-4 py-3 text-center">
                                <input
                                    type="checkbox"
                                    className="rounded-full appearance-none w-4 h-4 border border-gray-600 checked:bg-[#0a9e9a] checked:border-transparent focus:outline-none cursor-pointer"
                                    checked={selectedCheckboxes['NULL3']}
                                    onChange={() => handleCheckboxChange('NULL3')}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                {/* Botón dentro del mismo div que la tabla */}
                <div className="flex justify-end mt-3 mb-3 mr-2 ">
                    <button className="bg-[#0a9e9a] text-white rounded-md px-6 py-2 text-sm flex items-center hover:bg-[#098785] transition cursor-pointer">
                        <BiSave className="w-5 h-5 mr-1" />
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>



    )
}

export default MonedaTipoCambio
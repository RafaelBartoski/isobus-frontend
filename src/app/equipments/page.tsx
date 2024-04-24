
'use client'
import {User as UserIcon} from 'lucide-react';
import { useEffect, useState } from 'react';
import { TEInput, TERipple } from "tw-elements-react";

export default function Login() {

    const [equipments, setEquipments] = useState([]);
    const [listSingleEquipment, setListSingleEquipment] = useState({});
    const [listSingleEquipmentIsoBusData, setListSingleEquipmentIsoBusData] = useState([]);

    useEffect(() => {
      // Função para buscar os equipamentos do servidor
      const fetchEquipments = async () => {
        try {
          const response = await fetch('http://localhost:3000/get-equipments');
          if (!response.ok) {
            throw new Error('Não foi possível obter os equipamentos.');
          }
          const data = await response.json();
          setEquipments(data); // Define os equipamentos no estado
        } catch (error) {
          console.error('Erro ao buscar equipamentos:', error);
        }
      };

      fetchEquipments()
    }, []);

    async function fetchSingleEquipment(id:string){
      try {
         const response = await fetch(`http://localhost:3000/get-equipments/${id}`);
         if (!response.ok) {
           throw new Error('Não foi possível obter os equipamentos.');
         }
         const data = await response.json();
         setListSingleEquipment(data); // Define os equipamentos no estado

         fetchEquipmentIsoBusData(id)
       } catch (error) {
         console.error('Erro ao buscar equipamentos:', error);
       }
    }

    async function fetchEquipmentIsoBusData(id:string){
      try {
         const response = await fetch(`http://localhost:3000/get-dados/${id}`);
         if (!response.ok) {
           throw new Error('Não foi possível obter os equipamentos.');
         }
         const data = await response.json();
         setListSingleEquipmentIsoBusData(data); // Define os equipamentos no estado
      } catch (error) {
         console.error('Erro ao buscar equipamentos:', error);
      }
    }


  return (
      
      <div className="flex w-full min-w-screen min-h-screen h-full">
         <aside className='w-[300px] bg-green-300 '>
            <div className="w-6/12 sm:w-4/12 px-4">
               <img src="/logo.png" alt="..." className="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
            </div>
            <nav>
               <ul>
                  {equipments.map( (equipment) => {
                     return (
                        <li
                        className='p-3 bg-green-800 cursor-pointer hover:bg-green-500'
                        key={equipment.idEquipament}
                        onClick={() => fetchSingleEquipment(equipment.idEquipament)}
                        >
                           {equipment.name}
                        </li>
                     )
                  })}
               </ul>
            </nav>
         </aside>
         <div>
            <div className='flex flex-col gap-4'>

               <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                  <tr>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Endereço Mac
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Versão do Firmware
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Versão do Hardware
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data de Criação
                     </th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                     <tr>
                     <td className="px-6 py-4 whitespace-nowrap">{listSingleEquipment.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{listSingleEquipment.macHardware}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{listSingleEquipment.firmwareVersion}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{listSingleEquipment.hardwareVersion}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{listSingleEquipment.createdAt}</td>
                     </tr>
                  </tbody>
               </table>

               <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                  <tr>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data de Criação
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data de Envio
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Latitude Envio
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Longitude Envio
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Latitude Dado
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Longitude Dado
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Velocidade Dado
                     </th>
                     <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Endereço ISObus
                     </th>
                     {[0, 1, 2, 3, 4, 5, 6, 7].map((byte) => (
                        <th
                        key={byte}
                        scope="col"
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Byte {byte}
                        </th>
                     ))}
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {listSingleEquipmentIsoBusData.map((item, index) => (
                     <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.dataDadoIsobus}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.latitudeEnvio}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.longitudeEnvio}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.latitudeDado}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.longitudeDado}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.velocidadeDado}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.idCanIsobus}</td>
                        <td
                           className="px-6 py-4 whitespace-nowrap"
                        >
                           {item.dadoIsobusByte1}
                        </td>
                        <td
                           className="px-6 py-4 whitespace-nowrap"
                        >
                           {item.dadoIsobusByte2}
                        </td>
                        <td
                           className="px-6 py-4 whitespace-nowrap"
                        >
                           {item.dadoIsobusByte3}
                        </td>
                        <td
                           className="px-6 py-4 whitespace-nowrap"
                        >
                           {item.dadoIsobusByte4}
                        </td>
                        <td
                           className="px-6 py-4 whitespace-nowrap"
                        >
                           {item.dadoIsobusByte5}
                        </td>
                        <td
                           className="px-6 py-4 whitespace-nowrap"
                        >
                           {item.dadoIsobusByte6}
                        </td>
                        <td
                           className="px-6 py-4 whitespace-nowrap"
                        >
                           {item.dadoIsobusByte7}
                        </td>
                        <td
                           className="px-6 py-4 whitespace-nowrap"
                        >
                           {item.dadoIsobusByte8}
                        </td>
                     </tr>
                  ))}
                  </tbody>
               </table>

            </div>
         </div>
      </div>
  );
}
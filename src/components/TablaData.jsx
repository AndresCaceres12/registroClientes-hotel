import React from 'react';
import { useData } from './ContextData';
import dayjs from "dayjs";
import { servicesData } from '../Data/FormData';
const TablaData = () => {
  const { Data } = useData();



  return (
    <div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Número de Cédula</th>
            <th>Número de Teléfono</th>
            <th>Fecha de Entrada</th>
            <th>Fecha de Salida</th>
          <th>Servicios</th>
          </tr>
        </thead>
        <tbody>
       
            <tr >
              <td>{Data.nombre}</td>
              <td>{Data.apellido}</td>
              <td>{Data.documento}</td>
              <td>{Data.telefono}</td>
             
            <td>{Data.fechainicial && dayjs(Data.fechainicial.$d).format("DD-MM-YYYY")}</td>
            <td>{Data.fechafinal && dayjs(Data.fechafinal.$d).format("DD-MM-YYYY")}</td>
           
 


          </tr>
            
          
        </tbody>
      </table>
    </div>
  );
};

export default TablaData;

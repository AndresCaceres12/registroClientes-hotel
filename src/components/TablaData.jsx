import React from 'react';
import { useData } from './ContextData';
import TableCell from './Tablecell';

const TablaData = () => {
  const { Data, setData } = useData();
  
console.log(Data)
  return (
    <div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            {/* <th className="nombre">Dato adicional</th> */}
          </tr>
        </thead>
        <tbody>
         
        </tbody>
      </table>
    </div>
  );
};

export default TablaData;

import React,{useState} from 'react';

const DataContext = React.createContext();

export function useData() {
  return React.useContext(DataContext); 
}

const ContextData = ({ children }) => {
  const [Data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ Data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export default ContextData;

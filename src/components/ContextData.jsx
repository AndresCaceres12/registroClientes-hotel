import React, { useState } from "react";

const DataContext = React.createContext();

export function useData() {
  return React.useContext(DataContext);
}

const ContextData = ({ children }) => {
  const [Data, setData] = useState({ user: [] });
  const [submittedRooms, setSubmittedRooms] = useState([]);
  const [documento, setdocumento] = useState([]);

  return (
    <DataContext.Provider
      value={{
        Data,
        setData,
        submittedRooms,
        documento,
        setSubmittedRooms,
        setdocumento,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default ContextData;

import React, { useState } from "react";
import { useData } from "./ContextData";
import dayjs from "dayjs";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Edit from "./Edit";
const TablaData = () => {
  const { Data, setData } = useData();
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const editUser = (index) => {
    setSelectedUser(Data.user[index]);
    setEditFormVisible(true);
  };
  console.log(selectedUser);

  const removeService = (index) => {
    const newUserArray = [...Data.user];
    newUserArray.splice(index, 1);
    setData({ ...Data, user: newUserArray });
  };
  const handleSave = (editedData) => {
    const newUserArray = [...Data.user];
    const editedIndex = newUserArray.findIndex(user => user.documento === editedData.documento); // Assuming "documento" is a unique identifier
    if (editedIndex !== -1) {
      newUserArray[editedIndex] = editedData;
      setData({ ...Data, user: newUserArray });
      setEditFormVisible(false);
      setSelectedUser(null);
    }
  };
 
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Número de Cédula",
      dataIndex: "documento",
      key: "documento",
    },
    {
      title: "Número de Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Fecha de Entrada",
      dataIndex: "fechainicial",
      key: "fechainicial",
      render: (text) => (text ? dayjs(text.$d).format("DD-MM-YYYY") : ""),
    },
    {
      title: "Fecha de Salida",
      dataIndex: "fechafinal",
      key: "fechafinal",
      render: (text) => (text ? dayjs(text.$d).format("DD-MM-YYYY") : ""),
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (_, record, index) => (
        <>
          <Button danger onClick={() => removeService(index)}>
            <DeleteOutlined />
          </Button> {"   "}
          <Button onClick={() => editUser(index)}>
            <EditOutlined />
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={Data?.user} columns={columns} />
      <Edit
        selectedUser={selectedUser}
        visible={editFormVisible}
        handleSave={handleSave}
        onClose={() => setEditFormVisible(false)}
        onSave={(editedData) => {
          handleSave(editedData);
        }}
      />
    </div>
  );
};

export default TablaData;

import React, { useState } from "react";
import { useData } from "./ContextData";
import dayjs from "dayjs";
import "../styles/Form.css";
import { Table, Button, Tooltip, Modal, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MenuUnfoldOutlined,
  ExclamationCircleTwoTone 
} from "@ant-design/icons";
import { servicesData } from "../Data/FormData";
import Edit from "./Edit";
const TablaData = () => {
  const {
    Data,
    setData,
    documento,
    setSubmittedRooms,
    setdocumento,
    submittedRooms,
  } = useData();
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const editUser = (index) => {
    setSelectedUser(Data.user[index]);
    setEditFormVisible(true);
  };
  const [selectedServices, setSelectedServices] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [servicesModalVisible, setServicesModalVisible] = useState(false);
  const showConfirmModal = (index) => {
    setConfirmModalVisible(true);
    setSelectedUserIndex(index);
  };

  const removeUser = () => {
    if (selectedUserIndex !== null) {
      const newUserArray = [...Data.user];
      const newSubmittedRooms = [...submittedRooms];
      const newDocumentoArray = [...documento];

      const removedUser = newUserArray[selectedUserIndex];

      if (removedUser) {
        const habitacionIndex = newSubmittedRooms.indexOf(
          removedUser.habitacion
        );
        if (habitacionIndex !== -1) {
          newSubmittedRooms.splice(habitacionIndex, 1);
        }
        newDocumentoArray.splice(selectedUserIndex, 1);
        newUserArray.splice(selectedUserIndex, 1);
        setData({ ...Data, user: newUserArray });
        setSubmittedRooms(newSubmittedRooms);
        setdocumento(newDocumentoArray);
      }

      setConfirmModalVisible(false);
      setSelectedUserIndex(null);
    }
  };
  const handleSave = (editedData) => {
    const newUserArray = [...Data.user];
    const editedIndex = newUserArray.findIndex(
      (user) => user.idUser === editedData.idUser
    );
    if (editedIndex !== -1) {
      newUserArray[editedIndex] = editedData;
      setData({ ...Data, user: newUserArray });
      setEditFormVisible(false);
      setSelectedUser(null);
    }
  };
  const getServiceNames = (serviceCards) => {
    const serviceIds = serviceCards.map((service) => service.servicio);
    const selectedServiceNames = [];

    servicesData.forEach((room) => {
      room.servicios.forEach((service) => {
        if (serviceIds.includes(service.uui)) {
          selectedServiceNames.push(service.name);
        }
      });
    });

    return selectedServiceNames;
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
      title: "Servicios",
      dataIndex: "serviceCards",
      key: "servicios",
      render: (serviceCards) => (
        <Tooltip
          title={
            selectedServices.length > 0
              ? selectedServices.join(", ")
              : "No hay servicios seleccionados"
          }
        >
          <Button
            icon={<MenuUnfoldOutlined />}
            onClick={() => {
              const serviceNames = getServiceNames(serviceCards);
              setSelectedServices(serviceNames);
              setServicesModalVisible(true);
            }}
            onMouseOver={() => {
              const serviceNames = getServiceNames(serviceCards);
              setSelectedServices(serviceNames);
            }}
          />
        </Tooltip>
      ),
    },

    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      fixed: "right",

      render: (_, record, index) => (
        <>
          <Tooltip title="Eliminar">
            <Tooltip title="Eliminar">
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                danger
                onClick={() => showConfirmModal(index)}
              />
            </Tooltip>
          </Tooltip>
          {"   "}
          <Tooltip title="Editar">
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => editUser(index)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <Typography.Title
        className="registrados"
        level={4}
        style={{
          margin: 0,
        }}
      >
        Usuarios registrados
      </Typography.Title>

      <Table
        locale={{
          emptyText: (
            <span>
              No hay registros disponibles {"  "} <ExclamationCircleTwoTone />
            </span>
          ),
        }}
        dataSource={Data?.user}
        columns={columns}
        pagination={false}
        size="middle"
        scroll={{
          x: 1300,
        }}
      />
      <Edit
        selectedUser={selectedUser}
        visible={editFormVisible}
        handleSave={handleSave}
        onClose={() => setEditFormVisible(false)}
        onSave={(editedData) => {
          handleSave(editedData);
        }}
      />
      <Modal
        title="Servicios Seleccionados"
        open={servicesModalVisible}
        onCancel={() => setServicesModalVisible(false)}
        footer={null}
      >
        <ul style={{ listStyle: "none" }}>
          {selectedServices.map((service, index) => (
            <li style={{ marginBottom: "10px" }} key={index}>
              {" "}
              <Tag color="cyan">{service} </Tag>
            </li>
          ))}
        </ul>
      </Modal>
      <Modal
        title="Confirmar Eliminación"
        open={confirmModalVisible}
        onOk={removeUser}
        onCancel={() => setConfirmModalVisible(false)}
      >
        <p>¿Estás seguro de que deseas eliminar este registro?</p>
      </Modal>
    </div>
  );
};

export default TablaData;

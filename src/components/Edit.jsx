import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useData } from "./ContextData";
import { Drawer, Form, Input, Button, DatePicker, Modal, Row, Col } from "antd";
const Edit = ({ selectedUser, visible, onClose, onSave }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ mode: "all" });
  const { setdocumento, documento, setData, Data } = useData();
  useEffect(() => {
    if (selectedUser) {
      setValue("nombre", selectedUser.nombre);
      setValue("apellido", selectedUser.apellido);
      setValue("documento", selectedUser.documento);
      setValue("telefono", selectedUser.telefono);
      setValue("fechainicial", selectedUser?.fechainicial);
      setValue("fechafinal", selectedUser?.fechafinal);
    }
  }, [selectedUser]);

  const handleSave = (data) => {
    if (selectedUser) {
      const isUnchanged =
        data.nombre === selectedUser.nombre &&
        data.apellido === selectedUser.apellido &&
        data.documento === selectedUser.documento &&
        data.telefono === selectedUser.telefono &&
        new Date(data.fechainicial).getTime() ===
          new Date(selectedUser.fechainicial).getTime() &&
        new Date(data.fechafinal).getTime() ===
          new Date(selectedUser.fechafinal).getTime();

      if (isUnchanged) {
        Modal.info({
          title: "No se han realizado cambios",
          content: "No se han realizado cambios en los campos.",
        });
        return;
      }
    }

    const editedUser = { ...selectedUser, ...data };
    const editedIndex = Data.user.findIndex(
      (user) => user.idUser === editedUser.idUser
    );

    if (editedIndex !== -1) {
      const newUserArray = [...Data.user];
      newUserArray[editedIndex] = editedUser;

      const newDocumentoArray = [...documento];
      newDocumentoArray[editedIndex] = data.documento;

      setData({ ...Data, user: newUserArray });
      setdocumento(newDocumentoArray);
    }
    onClose();
  };

  return (
    <Drawer
      title="Editar Usuario"
      open={visible}
      onClose={onClose}
      width={400}
      extra={<Button onClick={onClose}>Cancel</Button>}
    >
      <form onSubmit={handleSubmit(handleSave)} style={{ maxWidth: "330px" }}>
        <div style={{ maxWidth: "100%" }}>
          <Col span={24}>
            <Controller
              name="nombre"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Su nombre es requerido !",
                },
                pattern: {
                  value: /^[A-ZÁÉÍÓÚÜÑ\s]+$/i,
                  message: "Un nombre válido sin números",
                },
                minLength: {
                  value: 2,
                  message: " ¿ Es tu apellido ? ",
                },
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.nombre ? "error" : "success"}
                  help={errors.nombre && errors.nombre.message}
                  labelCol={{ span: 24 }}
                  label="Nombre "
                >
                  <Input {...field} placeholder="Nombre" />
                </Form.Item>
              )}
            />
          </Col>

          <Col span={24}>
            <Controller
              name="apellido"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Su apellido es requerido !",
                },
                pattern: {
                  value: /^[A-ZÁÉÍÓÚÜÑ\s]+$/i,
                  message: "Un apellido válido sin números",
                },
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.apellido ? "error" : "success"}
                  help={errors.apellido && errors.apellido.message}
                  labelCol={{ span: 24 }}
                  label="Apellido "
                >
                  <Input {...field} placeholder="Apellido" />
                </Form.Item>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="documento"
              control={control}
              rules={{
                minLength: {
                  value: 8,
                  message: "Un Número de documento válido por favor!",
                },
                maxLength: {
                  value: 11,
                  message: "Un Número de documento válido por favor!",
                },
                required: {
                  value: true,
                  message: "Número de documento requerido!",
                },
                validate: (value) => value % 1 == 0 ||  "Solo numeros !",
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.documento ? "error" : "success"}
                  help={errors.documento && errors.documento.message}
                  labelCol={{ span: 24 }}
                  label="Documento"
                >
                  <Input {...field} placeholder="Número de cédula" />
                </Form.Item>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="telefono"
              control={control}
              rules={{
                minLength: {
                  value: 10,
                  message: "Un Número de telefono válido por favor!",
                },
                maxLength: {
                  value: 11,
                  message: "Un Número de telefono válido por favor!",
                },
                required: {
                  value: true,
                  message: "Número de telefono requerido!",
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: "Esto no es un número de telefono",
                },
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.telefono ? "error" : "success"}
                  help={errors.telefono && errors.telefono.message}
                  labelCol={{ span: 24 }}
                  label="Número de teléfono "
                >
                  <Input {...field} placeholder="Número de teléfono" />
                </Form.Item>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="fechainicial"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Fecha de entrada es requerida!",
                },
                deps: ["fechafinal"],
                validate: {
                  notGreaterThan: (value) => {
                    const startDate = new Date(value);
                    const endDate = new Date(getValues("fechafinal"));

                    if (endDate && startDate > endDate) {
                      return "La fecha de entrada no puede ser después de la fecha de salida";
                    }

                    return true;
                  },
                },
              }}
              render={({ field }) => (
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Número de entrada"
                  validateStatus={errors.fechainicial ? "error" : "success"}
                  help={errors?.fechainicial && errors?.fechafinal?.message}
                >
                  <DatePicker {...field} />
                </Form.Item>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="fechafinal"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Fecha de salida es requerida!",
                },
                deps: ["fechainicial"],

                validate: {
                  notLessThan: (value) => {
                    const endDate = new Date(value);
                    const startDate = new Date(getValues("fechainicial"));

                    if (startDate && endDate < startDate) {
                      return "La fecha de salida no puede ser antes de la fecha de entrada";
                    }

                    return true;
                  },
                },
              }}
              render={({ field }) => (
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Fecha de salida"
                  validateStatus={errors.fechafinal ? "error" : "success"}
                  help={errors?.fechafinal && errors?.fechafinal?.message}
                >
                  <DatePicker {...field} />
                </Form.Item>
              )}
            />
          </Col>
        </div>

        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </form>
    </Drawer>
  );
};

export default Edit;

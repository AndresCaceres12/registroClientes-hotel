import React,{useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Drawer, Form, Input, Button,DatePicker, Modal } from 'antd';
const Edit = ({ selectedUser, visible, onClose, onSave}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue, 
    getValues
  } = useForm();

  useEffect(() => {
    if (selectedUser) {
      setValue('nombre', selectedUser.nombre);
      setValue('apellido', selectedUser.apellido);
      setValue('documento', selectedUser.documento);
      setValue('telefono', selectedUser.telefono);
      setValue("fechainicial",selectedUser?.fechainicial)
      setValue("fechafinal",selectedUser?.fechafinal)

    }
  }, [selectedUser]);

  const handleSave = (data) => {
    const isUnchanged =
    data.nombre === selectedUser.nombre &&
    data.apellido === selectedUser.apellido &&
    data.documento === selectedUser.documento &&
    data.telefono === selectedUser.telefono &&
    data.fechainicial === selectedUser.fechainicial &&
    data.fechafinal === selectedUser.fechafinal;

  // If no changes have been made, show an alert
  if (isUnchanged) {
    Modal.info({
      title: 'No se han realizado cambios',
      content: 'No se han realizado cambios en los campos.',
    });
    return;
  }
    onSave(data); 
    onClose();
    console.log(data)
  };

  return (
    <Drawer title="Editar Usuario" visible={visible} onClose={onClose} width={400}>
      <form onSubmit={handleSubmit(handleSave)}>
        <Controller
          name="nombre"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Item
            
            labelCol={{span:24}}
            label="Nombre ">
              <Input {...field} placeholder="Nombre" />
            </Form.Item>
          )}
        />

        <Controller
          name="apellido"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Item 
            labelCol={{span:24}}
            label="Apellido ">
              <Input {...field} placeholder="Apellido" />
            </Form.Item>
          )}
        />

        <Controller
          name="documento"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Item
            labelCol={{span:24}}
            label="Documento">
              <Input {...field} placeholder="Número de cédula" />
            </Form.Item>
          )}
        />

        <Controller
          name="telefono"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Item
            labelCol={{span:24}}
            label="Número de teléfono ">
              <Input {...field} placeholder="Número de teléfono" />
            </Form.Item>
          )}
        />
        <Controller
          name="fechainicial"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Fecha de entrada es requerida!",
            },
            deps:["fechafinal"],
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
            labelCol={{span:24}}
            label="Número de entrada"
            validateStatus={errors.fechainicial ? "error" : "success"}
            help={errors?.fechainicial && errors?.fechafinal?.message}>
              <DatePicker {...field} />
            </Form.Item>
          )}
        />
                <Controller
          name="fechafinal"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Fecha de salida es requerida!",
            },
            deps:["fechainicial"],

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
            labelCol={{span:24}}
            label="Fecha de salida"
            validateStatus={errors.fechafinal ? "error" : "success"}
            help={errors?.fechafinal && errors?.fechafinal?.message}>
              <DatePicker {...field} />
            </Form.Item>
          )}
        />
        <Button type="primary" htmlType="submit" >
          Guardar
        </Button>
      </form>
    </Drawer>
  );
};

export default Edit;

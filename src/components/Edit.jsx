import React,{useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Drawer, Form, Input, Button,DatePicker } from 'antd';

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
  }, [selectedUser, setValue]);

  const handleSave = (data) => {
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
            <Form.Item>
              <Input {...field} placeholder="Nombre" />
            </Form.Item>
          )}
        />

        <Controller
          name="apellido"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Item>
              <Input {...field} placeholder="Apellido" />
            </Form.Item>
          )}
        />

        <Controller
          name="documento"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Item>
              <Input {...field} placeholder="Número de cédula" />
            </Form.Item>
          )}
        />

        <Controller
          name="telefono"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Form.Item>
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
            validateStatus={errors.fechainicial ? "error" : "success"}
            help={errors?.fechainicial && errors?.fechafinal?.message}>
              <DatePicker {...field} placeholder="Número de teléfono" />
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
            
            validateStatus={errors.fechafinal ? "error" : "success"}
            help={errors?.fechafinal && errors?.fechafinal?.message}>
              <DatePicker {...field} placeholder="Número de teléfono" />
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

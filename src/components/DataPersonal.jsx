import React, { useEffect, useState } from "react";
import "../styles/Form.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { roomsData, servicesData } from "../Data/FormData";
import { DeleteOutlined } from "@ant-design/icons";
import Pagoform from "./pagoform";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Card,
  notification,
  Carousel,
  DatePicker,
} from "antd";
const Formhotel = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    mode: "all",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "servicios",
  });
const [visa, setvisa] = useState(false)
const [masterCard, setmasterCard] = useState(false)
const [paypal, setpaypal] = useState(false)
const showvisa = ()=>{
  setvisa(!visa)
  setmasterCard(false)
  setpaypal(false)
}
const showmastercard = ()=>{
  setvisa(false)
  setmasterCard(!masterCard)
  setpaypal(false)
}
const showpaypal = ()=>{
  setvisa(false)
  setmasterCard(false)
  setpaypal(!paypal)
}
  const [api, contextHolder] = notification.useNotification();
  const openN = (type) => {
    api[type]({
      message: "Hotel dice",
      description: "Maximo de servicios por habitación alcanzado.",
    });
  };
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  const [selectedRoom, setSelectedRoom] = useState("");
  useEffect(() => {
    remove();
  }, [selectedRoom]);

  return (
    <div>
      <div className="Inicio">
        <span>Reserva por habitación</span>
        <Button
          type="primary"
          onClick={() => {
            showDrawer();
          }}
        >
          Apartar
        </Button>
      </div>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {contextHolder}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <Col span={12}>
              <Controller
                name="nombre"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Su nombre es requerido !",
                  },
                }}
                render={({ field }) => (
                  <Form.Item
                    label="Nombre"
                    validateStatus={errors.nombre ? "error" : "success"}
                    help={errors.nombre && errors.nombre.message}
                  >
                    <Input {...field} />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="apellido"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Su apellido es requerido !",
                  },
                }}
                render={({ field }) => (
                  <Form.Item
                    label="Apellido"
                    validateStatus={errors.apellido ? "error" : "success"}
                    help={errors.apellido && errors.apellido.message}
                  >
                    <Input {...field} />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
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
                    label="Numero de telefono"
                    validateStatus={errors.telefono ? "error" : "success"}
                    help={errors.telefono && errors.telefono.message}
                  >
                    <Input {...field} />
                  </Form.Item>
                )}
              />
            </Col>

            <Col span={12}>
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
                  validate: (value) => {
                    if (value % 1 == 0) {
                      return true;
                    } else {
                      return "Solo numeros !";
                    }
                  },
                }}
                render={({ field }) => (
                  <Form.Item
                    label="Numero de documento"
                    validateStatus={errors.documento ? "error" : "success"}
                    help={errors.documento && errors.documento.message}
                  >
                    <Input {...field} />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="habitacion"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.Item label="Habitación" labelCol={{ span: 24 }}>
                    <Select
                      onChange={(selectedValue) => {
                        setSelectedRoom(selectedValue);
                        onChange(selectedValue);
                      }}
                      placeholder="Seleccione una habitación"
                      value={value}
                    >
                      {roomsData.map((room) => (
                        <Select.Option key={room.id} value={room.id}>
                          Habitación {room.id}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              />
            </Col>

            <Col span={24}>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Controller
                    name={`servicios.${index}.data.servicio`}
                    control={control}
                    render={({ field }) => (
                      <Form.Item label="Servicios">
                        <Select
                          placeholder="Seleccione los servicios"
                          {...field}
                        >
                          {servicesData
                            .find(
                              (roomServices) =>
                                roomServices.id === watch(`habitacion`)
                            )
                            ?.servicios?.map((service) => (
                              <Select.Option
                                key={service.uui}
                                value={service.uui}
                              >
                                {service.name}
                              </Select.Option>
                            ))}
                        </Select>
                      </Form.Item>
                    )}
                  />

                  <span
                    className="remove"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <DeleteOutlined />
                  </span>
                </div>
              ))}
            </Col>
            {fields.length < 3 && (
              <Col span={24}>
                {watch(`habitacion`) && (
                  <Button
                    onClick={() => {
                      fields.length < 3
                        ? append({ value: "" })
                        : openN("error");
                    }}
                  >
                    Añadir servicios
                  </Button>
                )}
              </Col>
            )}
            {fields.map((item, index) => (
              <Col span={24} key={item.id}>
                {watch(`servicios.${index}.data.servicio`) && (
                  <div>
                    <Card
                      title={
                        servicesData
                          .find(
                            (roomServices) =>
                              roomServices.id === getValues(`habitacion`)
                          )
                          ?.servicios.find(
                            (s) =>
                              s.uui ===
                              getValues(`servicios.${index}.data.servicio`)
                          )?.name
                      }
                    >
                      <p>
                        Descripción:{" "}
                        {
                          servicesData
                            .find(
                              (roomServices) =>
                                roomServices.id === getValues(`habitacion`)
                            )
                            ?.servicios.find(
                              (s) =>
                                s.uui ===
                                getValues(`servicios.${index}.data.servicio`)
                            )?.description
                        }
                      </p>
                      <p>
                        Precio:{" "}
                        {
                          servicesData
                            .find(
                              (roomServices) =>
                                roomServices.id === getValues(`habitacion`)
                            )
                            ?.servicios.find(
                              (s) =>
                                s.uui ===
                                getValues(`servicios.${index}.data.servicio`)
                            )?.cost
                        }
                      </p>
                      <Button
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        Remover
                      </Button>
                      <Button>Añadir </Button>
                    </Card>
                  </div>
                )}
              </Col>
            ))}
            <Col span={12}>
              <Controller
                name="fechainicial"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Fecha de entrada es requerida!",
                  },
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
                shouldUnregister={false}
                render={({ field }) => (
                  <Form.Item
                    label="Fecha Inicial"
                    validateStatus={errors.fechainicial ? "error" : "success"}
                    help={errors.fechainicial && errors.fechainicial.message}
                  >
                    <DatePicker {...field} format="DD/MM/YYYY" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="fechafinal"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Fecha de salida es requerida!",
                  },
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
                shouldUnregister={false}
                render={({ field }) => (
                  <Form.Item
                    label="Fecha de salida"
                    validateStatus={errors.fechafinal ? "error" : "success"}
                    help={errors.fechafinal && errors.fechafinal.message}
                  >
                    <DatePicker {...field} format="DD/MM/YYYY" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="personasTotal"
                control={control}
                rules={{
                  minLength: {
                    value: 0,
                    message: "Un Número de personas válido por favor!",
                  },
                  maxLength: {
                    value: 4,
                    message: "Un Número de personas válido por favor!",
                  },
                  required: {
                    value: true,
                    message: "Número de personas requerido!",
                  },
                  pattern: {
                    value: /^[0-4]$/,
                    message: "Por favor ingrese un número del 0 al 4",
                  },
                }}
                render={({ field }) => (
                  <Form.Item
                    label="Numero de personas total "
                    validateStatus={errors.personasTotal ? "error" : "success"}
                    help={errors.personasTotal && errors.personasTotal.message}
                  >
                    <Input {...field} />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Button type="primary" onClick={showChildrenDrawer}>
          Proceder al pago 
        </Button>
        <Drawer
          title="Metodos de pago"
          width={320} 
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
        <div className="img">
           <img width={"40px"} height={"20px"} onClick={showvisa}  src="data:image/png;base64,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" alt=""  />
<img width={"40px"} height={"20px"} onClick={showmastercard}  src="data:image/png;base64,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" alt=""  />
<img width={"30px"} height={"30px"} onClick={showpaypal} src="data:image/png;base64,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" alt="" />
        </div>
       

<Pagoform control={control} Controller={Controller} errors={errors}/>
       
        </Drawer>
            <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </Drawer>
    </div>
  );
};
export default Formhotel;

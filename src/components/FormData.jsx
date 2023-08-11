import React, { useEffect, useState } from "react";
import "../styles/Form.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { roomsData, servicesData } from "../Data/FormData";
import { useData } from "./ContextData";
import { FormDataPersonal } from "./FormDataPersonal";
import TablaData from "./TablaData";
import ImgPagos from "./ImgPagos";
import FechasForms from "./FechasForms";
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
  Alert,
} from "antd";
const Formhotel = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useForm({
    mode: "all",
  });
  const {
    fields: serviceCards,
    append: appendServiceCard,
    remove,
  } = useFieldArray({
    control,
    name: "serviceCards",
  });
  const [submittedRooms, setSubmittedRooms] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  console.log(selectedServices);

  const removeService = (index) => {
    const newServices = [...selectedServices];
    newServices.splice(index, 1);
    setSelectedServices(newServices);
  };
  const [api, contextHolder] = notification.useNotification();
  const openN = (type) => {
    api[type]({
      message: "Hotel dice",
      description: mensaje,
    });
  };
  const openN2 = (type) => {
    api[type]({
      message: "Hotel dice",
      description: "Servicio ya añadico",
    });
  };
  const { Data, setData } = useData();
  const [open, setOpen] = useState(false);
  const [detalles, setdetalles] = useState(false);
  const [isvalid, setisvalid] = useState(false);
  const [mensaje, setmensaje] = useState("");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    if (!submittedRooms.includes(data.habitacion)) {
      setData({ ...Data, user: [...Data.user, data] });
      setSubmittedRooms([...submittedRooms, data.habitacion]);
      console.log(data, "submit");
      reset();
      setOpen(false);
      removeService();
    } else {
      setmensaje("Esta habitación ya ha sido enviada.");
    }
    openN("error");
  };

  console.log(Data);

  const [selectedRoom, setSelectedRoom] = useState("");
  useEffect(() => {
    setisvalid(false);
    setValue("servicio", null);
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
        title="Regitro"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        {contextHolder}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <FormDataPersonal control={control} errors={errors} />
            <Col span={24}>
              <Controller
                name="habitacion"
                control={control}
                rules={{
                  required: "No olvides tu habitación !",
                }}
                render={({ field: { onChange, value } }) => (
                  <Form.Item
                    validateStatus={errors.habitacion ? "error" : "success"}
                    help={errors.habitacion && errors.habitacion.message}
                    label="Habitación"
                    labelCol={{ span: 24 }}
                  >
                    <Select
                      onChange={(selectedValue) => {
                        setSelectedRoom(selectedValue);
                        onChange(selectedValue);
                        remove();
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
              <Col span={24}>
                <Controller
                  name={`servicio`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Form.Item label="Servicios" labelCol={{ span: 24 }}>
                      <Select
                        placeholder="Seleccione los servicios"
                        disabled={isvalid}
                        value={value}
                        onChange={(selectedValue) => {
                          setdetalles(true);
                          if (!selectedServices.includes(selectedValue)) {
                            onChange(selectedValue);
                            setSelectedServices([
                              ...selectedServices,
                              selectedValue,
                            ]);
                          } else {
                            onChange(selectedValue);

                            setSelectedServices(
                              selectedServices.filter(
                                (service) => service !== selectedValue
                              )
                            );
                          }
                        }}
                      >
                        {servicesData
                          .find(
                            (roomServices) =>
                              roomServices.id === watch("habitacion")
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
              </Col>
            </Col>
            
            {detalles && (
           <>
                      {watch(`servicio`) && (
              <>
                
                  <Col span={24}>
                    <div className="service-container">
                      <div className="service-info">
                        <p className="service-description">
                          <Form.Item
                            label="Descripción"
                            labelCol={{ span: 24 }}
                          >
                            {
                              servicesData
                                .find(
                                  (roomServices) =>
                                    roomServices.id === getValues(`habitacion`)
                                )
                                ?.servicios.find(
                                  (s) => s.uui === watch(`servicio`)
                                )?.description
                            }
                          </Form.Item>
                        </p>
                        <p className="service-price">
                          <Form.Item label="Precio" labelCol={{ span: 24 }}>
                            {
                              servicesData
                                .find(
                                  (roomServices) =>
                                    roomServices.id === getValues(`habitacion`)
                                )
                                ?.servicios.find(
                                  (s) => s.uui === watch(`servicio`)
                                )?.cost
                            }
                          </Form.Item>
                        </p>
                      </div>

                      <div className="service-buttons">
                        <Button
                          onClick={() => {
                            setdetalles(true);

                          }}
                        >
                          Remover
                        </Button>
                        <Button
                          onClick={() => {
                            const selectedService = watch("servicio");
                            

                            const serviceAlreadyAdded = serviceCards.some(
                              (card) => card.servicio === selectedService
                            );

                            if (selectedService && !serviceAlreadyAdded) {
                              appendServiceCard({
                                servicio: selectedService,
                                description: servicesData
                                  .find(
                                    (roomServices) =>
                                      roomServices.id ===
                                      getValues(`habitacion`)
                                  )
                                  ?.servicios.find(
                                    (s) => s.uui === selectedService
                                  )?.description,
                                price: servicesData
                                  .find(
                                    (roomServices) =>
                                      roomServices.id ===
                                      getValues(`habitacion`)
                                  )
                                  ?.servicios.find(
                                    (s) => s.uui === selectedService
                                  )?.cost,
                              });
                              

                              setValue("servicio", null);
                              setisvalid(false);
                            }
                            else{
                              openN2("error");
                            }
                          }}
                        >
                          Añadir
                        </Button>
                      </div>
                    </div>
                  </Col>
             
              </>
            )} 
           </>
  )}
            {serviceCards.map((card, cardIndex) => (
              <Card key={card.id}>
                <p>Descripción: {card.description}</p>
                <p>Precio: {card.price}</p>
                <Button
                  onClick={() => {
                    remove(cardIndex);
                    setisvalid(false);
                  }}
                >
                  Remover
                </Button>
              </Card>
            ))}
            <FechasForms
              control={control}
              errors={errors}
              getValues={getValues}
            />
          </Row>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </Drawer>
      <TablaData Data={Data} />
    </div>
  );
};
export default Formhotel;

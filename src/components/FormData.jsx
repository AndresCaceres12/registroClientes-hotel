import React, { useEffect, useState } from "react";
import "../styles/Form.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { roomsData, servicesData } from "../Data/FormData";
import { useData } from "./ContextData";
import { FormDataPersonal } from "./FormDataPersonal";
import TablaData from "./TablaData";
import { DeleteOutlined } from "@ant-design/icons";
import FechasForms from "./FechasForms";
import { v4 as uuidv4 } from "uuid";

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
  Pagination,
  message,
  Typography,
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

  const [messageApi2, contextHolder2] = message.useMessage();
  const success = () => {
    messageApi2.open({
      type: "success",
      content: "Registro exitoso ",
    });
  };

  const {
    fields: serviceCards,
    append: appendServiceCard,
    remove,
  } = useFieldArray({
    control,
    name: "serviceCards",
  });

  const [selectedServices, setSelectedServices] = useState([]);

  const removeService = (index) => {
    const newServices = [...selectedServices];
    newServices.splice(index, 1);
    setSelectedServices(newServices);
  };
  const [api, contextHolder] = notification.useNotification();

  const openN2 = (type) => {
    api[type]({
      message: "Hotel dice",
      description: "Servicio ya añadico",
    });
  };
  const {
    Data,
    setData,
    setSubmittedRooms,
    submittedRooms,
    setdocumento,
    documento,
  } = useData();
  const [open, setOpen] = useState(false);
  const [detalles, setdetalles] = useState(false);
  const [isvalid, setisvalid] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    const habitacionExiste = submittedRooms.includes(data.habitacion);
    const documentoExiste = documento.includes(data.documento);
    if (!habitacionExiste && !documentoExiste) {
      const idUser = uuidv4();
      const newUser = { ...data, idUser };
      setData({ ...Data, user: [...Data.user, newUser] });
      setSubmittedRooms([...submittedRooms, data.habitacion]);
      setdocumento([...documento, data.documento]);
      reset();
      setOpen(false);
      removeService();
      remove();
      success();
      console.log(Data, "submit");
    }
    if (documentoExiste) {
      messageApi2.open({
        type: "error",
        content: `El documento ${getValues(
          "documento"
        )} ya ha sido registrado.`,
      });
    }
    if (habitacionExiste) {
      messageApi2.open({
        type: "error",
        content: `La habitación ${getValues("habitacion")} ya ha sido ocupada.`,
      });
    }
  };
  const ShowDrawer2 = () => {
    messageApi2.open({
      type: "error",
      content: `No hay habitaciones disponibles en este momento `,
    });
  };
  const [selectedRoom, setSelectedRoom] = useState("");
  useEffect(() => {
    setisvalid(false);
    setValue("servicio", null);
  }, [selectedRoom]);

  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={4}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Reserva por habitación
          </Typography.Title>
        </Col>
        <Col span={8}>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                Data?.user?.length < 4 ? showDrawer() : ShowDrawer2();
              }}
            >
              Apartar
            </Button>
          </Space>
        </Col>
      </Row>

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
        {contextHolder2}
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
                          <Select.Option key={service.uui} value={service.uui}>
                            {service.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                )}
              />
            </Col>

            {detalles && (
              <>
                {watch(`servicio`) && (
                  <>
                    <Col span={24}>
                      <div className="service-info">
                        <p className="service-description">
                          <Form.Item
                            label="Descripción Del servicio"
                            labelCol={{ span: 24 }}
                          >
                            <p className="service-price">
                              {
                                servicesData
                                  .find(
                                    (roomServices) =>
                                      roomServices.id ===
                                      getValues(`habitacion`)
                                  )
                                  ?.servicios.find(
                                    (s) => s.uui === watch(`servicio`)
                                  )?.description
                              }
                            </p>
                          </Form.Item>
                        </p>
                        <b className="service-price">
                          <Form.Item label="" labelCol={{ span: 24 }}>
                            Precio :{" "}
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
                        </b>
                      </div>

                      <div className="service-buttons">
                        <Button
                          onClick={() => {
                            setdetalles(false);
                          }}
                          danger
                          type="primary"
                        >
                          <DeleteOutlined />
                        </Button>
                        {"  "}
                        <Button
                          type="primary"
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
                                name: servicesData
                                  .find(
                                    (roomServices) =>
                                      roomServices.id ===
                                      getValues(`habitacion`)
                                  )
                                  ?.servicios.find(
                                    (s) => s.uui === selectedService
                                  )?.name,
                              });

                              setValue("servicio", null);
                              setisvalid(false);
                            } else {
                              openN2("error");
                            }
                          }}
                        >
                          Añadir
                        </Button>
                      </div>
                    </Col>
                  </>
                )}
              </>
            )}
            {serviceCards
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((card, cardIndex) => (
                <Col span={24}>
                  <Card key={card.id} title={` ${card.name}`}>
                    <p>Descripción: {card.description}</p>
                    <p>Precio: {card.price}</p>
                    <Button
                      danger
                      type="primary"
                      onClick={() => {
                        remove(cardIndex + (currentPage - 1) * itemsPerPage);
                        setisvalid(false);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Card>
                </Col>
              ))}
            {serviceCards.length > 0 && (
              <Pagination
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                total={serviceCards.length}
                pageSize={itemsPerPage}
              />
            )}

            <FechasForms
              control={control}
              errors={errors}
              getValues={getValues}
            />
            <Col span={24}>
              <Controller
                name="Data.pago"
                control={control}
                rules={{
                  required: "Es requerido el metoco de pago ",
                }}
                label="Seleccione metodo de pago"
                defaultValue=""
                render={({ field }) => (
                  <Form.Item
                    label="Metodo de pago "
                    labelCol={{ span: 24 }}
                    help={errors.Data?.pago && errors.Data?.pago.message}
                    validateStatus={errors.Data?.pago ? "error" : "success"}
                  >
                    <Select {...field} placeholder="Seleccione metodo de pago ">
                      <Select.Option value="efectivo">Efectivo</Select.Option>
                      <Select.Option value="tarjeta">Tarjeta</Select.Option>
                      <Select.Option value="otro">Otro</Select.Option>
                    </Select>
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="Data.infoAdicional"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label="Comentarios o solicitudes"
                    labelCol={{ span: 24 }}
                  >
                    <Input.TextArea {...field} />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </Drawer>

      <TablaData />
    </div>
  );
};
export default Formhotel;

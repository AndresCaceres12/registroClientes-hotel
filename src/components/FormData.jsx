import React, { useEffect, useState } from "react";
import "../styles/Form.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { roomsData, servicesData } from "../Data/FormData";
import { useData } from "./ContextData";
import { FormDataPersonal } from "./FormDataPersonal";
import Visa from "./Visa";
import TablaData from "./TablaData";
import ImgPagos from "./ImgPagos";
import FechasForms from "./FechasForms";
import { DeleteOutlined } from "@ant-design/icons";
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
  } = useForm({
    mode: "all",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "servicios",
  });
  const {
    fields: fields2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    control,
    name: "dato",
  });
  const [visa, setvisa] = useState(true);
  const [masterCard, setmasterCard] = useState(false);
  const [paypal, setpaypal] = useState(false);
  const [pago, setpago] = useState(false);
  const [detalles, setdetalles] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const showvisa = () => {
    setvisa(true);
    setmasterCard(false);
    setpaypal(false);
  };
  const showmastercard = () => {
    setvisa(false);
    setmasterCard(true);
    setpaypal(false);
  };
  const showpaypal = () => {
    setvisa(false);
    setmasterCard(false);
    setpaypal(true);
  };
  const [api, contextHolder] = notification.useNotification();
  const openN = (type) => {
    api[type]({
      message: "Hotel dice",
      description: "Maximo de servicios por habitación alcanzado.",
    });
  };
  const { Data, setData } = useData();
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [isvalid, setisvalid] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    setData( Data);
  };
  console.log(Data);
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  const [selectedRoom, setSelectedRoom] = useState("");
  useEffect(() => {
    remove();
    setValue("servicio", null);
    setisvalid(false);
  }, [selectedRoom]);
  const [cardData, setCardData] = useState([]);

  // ...
  
  useEffect(() => {
    // Update card data when servicios field array changes
    const updatedCardData = fields.map((item, index) => ({
      description: getValues(`servicios.${index}.prueba`),
      price: getValues(`servicios.${index}.precio`),
    }));
    setCardData(updatedCardData);
  }, [fields, getValues]);
  
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
            <Button onClick={() => append()} type="primary">
              Submit
            </Button>
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
          
          {/* <Col span={24}>
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
            ))} */}
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
                        onChange(selectedValue);
                        setdetalles(true);
                        append();
                      }}
                    >
                      {servicesData
                        .find(
                          (roomServices) =>
                            roomServices.id === watch(`habitacion`)
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
            {fields.map((item, index) => (
              <Col span={24} key={item.id}>
                <div className="service-container">
                  <div className="service-info">
                    <p className="service-description">
                      <Controller
                        name={`servicios.${index}.prueba`}
                        control={control}
                        rules={{
                          required: "No olvides tu habitación !",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <Form.Item
                            disabled
                            label="Habitación"
                            labelCol={{ span: 24 }}
                          >
                            <Input
                              onChange={(selectedValue) => {
                                onChange(selectedValue);
                              }}
                              value={value}
                            />
                          </Form.Item>
                        )}
                        defaultValue={
                          servicesData
                            .find(
                              (roomServices) =>
                                roomServices.id === getValues(`habitacion`)
                            )
                            ?.servicios.find(
                              (s) => s.uui === getValues(`servicio`)
                            )?.description
                        }
                      />
                      <Controller
                        name={`servicios.${index}.precio`}
                        control={control}
                        rules={{
                          required: "No olvides tu habitación !",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <Form.Item
                            disabled
                            label="Habitación"
                            labelCol={{ span: 24 }}
                          >
                            <Input
                              onChange={(selectedValue) => {
                                onChange(selectedValue);
                              }}
                              value={value}
                            />
                          </Form.Item>
                        )}
                        defaultValue={
                          servicesData
                            .find(
                              (roomServices) =>
                                roomServices.id === watch(`habitacion`)
                            )
                            ?.servicios.find(
                              (s) => s.uui === watch(`servicio`)
                            )?.cost
                        }
                      />
                    </p>
                  </div>

                  <div className="service-buttons">
                    <Button
                      onClick={() => {
                        remove(index);
                        setisvalid(false);
                      }}
                    >
                      Remover
                    </Button>
                    <Button
                      onClick={() => {
                        append2({item:""});
                      }}
                    >
                      Añadir
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
            {cardData.map((card, index) => (
  <div key={index}>
    <Card >
      <p>Descripción: {card.description}</p>
      <p>Precio: {card.price}</p>
      <Button
        onClick={() => {
          remove(index); // Remove the corresponding servicios field array item
        }}
      >
        Remover
      </Button>
      <Button>Añadir </Button>
    </Card>
  </div>
))}
            <FechasForms
              control={control}
              errors={errors}
              getValues={getValues}
            />
          </Row>

          <Button
            type="primary"
            onClick={() => {
              showChildrenDrawer();
              setTimeout(() => {
                setpago(true);
              }, 5000);
            }}
          >
            Proceder al pago
          </Button>

          <Drawer
            title="Metodos de pago"
            width={320}
            closable={false}
            onClose={onChildrenDrawerClose}
            open={childrenDrawer}
          >
            <ImgPagos
              showvisa={showvisa}
              showpaypal={showpaypal}
              card={showmastercard}
            />

            {visa && (
              <>
                <Visa
                  control={control}
                  Controller={Controller}
                  errors={errors}
                />
              </>
            )}
            {masterCard && (
              <Visa control={control} Controller={Controller} errors={errors} />
            )}
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => {
                  onChildrenDrawerClose();
                }}
              >
                Estoy listo
              </Button>
            </Col>
          </Drawer>
          {pago && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </form>
      </Drawer>
      <TablaData Data={Data} />
    </div>
  );
};
export default Formhotel;

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
    setData(data);
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== "" && value !== undefined
      )
    );
    setData(filteredData);

    setTimeout(() => {
      console.log(filteredData);
    }, 2000);
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
                        name={`prueba`}
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
                        name={`precio`}
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
                        append2();
                      }}
                    >
                      Añadir
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
            {fields2.map((item, index) => (
              <div key={item.id}>
                <Card
                  title={
                    servicesData
                      .find(
                        (roomServices) =>
                          roomServices.id === getValues(`habitacion`)
                      )
                      ?.servicios.find((s) => s.uui === getValues(`servicio`))
                      ?.name
                  }
                >
                  <p>Descripción: {getValues(`prueba`)}</p>
                  <p>Precio: {getValues(`precio`)}</p>
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
{
  /* {detalles && (
              <Col span={24}>
                <div className="service-container">
                  {getValues("servicio") && (
                    <div className="service-info">
                      <p className="service-description">
                        {
                          servicesData
                            .find(
                              (roomServices) =>
                                roomServices.id === getValues(`habitacion`)
                            )
                            ?.servicios.find(
                              (s) => s.uui === getValues(`servicio`)
                            )?.description
                        }
                      </p>
                      <p className="service-price">
                        $ :{" "}
                        {
                          servicesData
                            .find(
                              (roomServices) =>
                                roomServices.id === getValues(`habitacion`)
                            )
                            ?.servicios.find(
                              (s) => s.uui === getValues(`servicio`)
                            )?.cost
                        }
                      </p>
                    </div>
                  )}
                  <div className="service-buttons">
                    <Button
                      onClick={() => {
                        setdetalles(false);
                        setValue("servicio", null);
                        setisvalid(false);
                      }}
                    >
                      Remover
                    </Button>
                    <Button
                      onClick={() => {
                        append({item:""});
                        setdetalles(false);
                      }}
                    >
                      Añadir{" "}
                    </Button>
                  </div>
                </div>
              </Col>
            )}  */
}

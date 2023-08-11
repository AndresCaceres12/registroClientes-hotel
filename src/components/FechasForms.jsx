import React from 'react'
import { Controller, } from 'react-hook-form';
import { Input,Form,DatePicker,Col,Row } from 'antd';

const FechasForms = ({control,errors,getValues}) => {
    return (
    <Row gutter={16}>
            <Col span={12}>
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
                shouldUnregister={false}
                render={({ field }) => (
                  <Form.Item
                    label="Fecha Inicial"
                    labelCol={{span:24}}
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
                shouldUnregister={false}
                render={({ field }) => (
                  <Form.Item
                    label="Fecha de salida"
                    labelCol={{span:24}}
                    validateStatus={errors.fechafinal ? "error" : "success"}
                    help={errors.fechafinal && errors.fechafinal.message}
                  >
                    <DatePicker {...field} format="DD/MM/YYYY" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24}>
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
                  labelCol={{span:24}}
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
  )
}

export default FechasForms
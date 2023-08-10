import React from 'react'
import { Controller } from 'react-hook-form';
import { Input,Form,Col,Row } from 'antd';
export const FormDataPersonal = ({errors,control}) => {
  return (
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
                    labelCol={{span:24}}

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
                    labelCol={{span:24}}
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

    </Row>
  )
}

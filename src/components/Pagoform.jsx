import React from "react";
import { Form, Input, Col,DatePicker } from "antd";
const Pagoform = ({ control, Controller, errors }) => {
  return (
    <div>
      <Controller
        name="titularTargeta"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Su titularTargeta es requerido !",
          },
          validate: (value) => {
            if (!value % 1 == 0) {
              return true;
            } else {
              return " El titular es requerido !";
            }
          },
        }}
        render={({ field }) => (
          <Form.Item
            labelCol={{ span: 24 }}
            label="Titular Targeta"
            validateStatus={errors.titularTargeta ? "error" : "success"}
            help={errors.titularTargeta && errors.titularTargeta.message}
          >
            <Input placeholder="ej. Andres Caceres " {...field} />
          </Form.Item>
        )}
      />
      <Col span={24}>
        <Controller
          name="numeroTargeta"
          control={control}
          rules={{
            minLength: {
              value: 16,
              message: "Un Número de Targeta válido por favor!",
            },
            maxLength: {
              value: 16,
              message: "Un Número de Targeta válido por favor!",
            },
            required: {
              value: true,
              message: "Número de Targeta requerido!",
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
            labelCol={{span:24}}
              label="Numero de numeroTargeta"
              
              validateStatus={errors.numeroTargeta ? "error" : "success"}
              help={errors.numeroTargeta && errors.numeroTargeta.message}
            >
              <Input placeholder="xxxx xxxx xxxx xxxx" {...field} />
            </Form.Item>
          )}
        />
      </Col>
      <Col span={12}>
              <Controller
                name="fechaNacimiento"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Fecha de nacimiento es requerida!",
                  },
                  
                }}
                shouldUnregister={false}
                render={({ field }) => (
                  <Form.Item
                    label="Fecha de nacimiento"
                    validateStatus={errors.fechaNacimiento ? "error" : "success"}
                    help={errors.fechaNacimiento && errors.fechaNacimiento.message}
                  >
                    <DatePicker {...field} format="DD/MM/YYYY" />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="cvv"
                control={control}
                rules={{
                  minLength: {
                    value: 3,
                    message: "Un Número de cvv válido por favor!",
                  },
                  maxLength: {
                    value: 3,
                    message: "Un Número de cvv válido por favor!",
                  },
                  required: {
                    value: true,
                    message: "Número de cvv requerido!",
                  },
                  pattern: {
                    value: /^[0-9]$/,
                    message: "Por favor ingrese un número"
                  },
                }}
                render={({ field }) => (
                  <Form.Item
                    label=" cvv"
                    validateStatus={errors.cvv ? "error" : "success"}
                    help={errors.cvv && errors.cvv.message}
                  >
                    <Input {...field} />
                  </Form.Item>
                )}
              />
            </Col>
    </div>
  );
};

export default Pagoform;

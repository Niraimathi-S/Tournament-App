import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

interface IProps {
  name: string;
  rules: any;
  isInvalid: boolean;
  errorMessage: string;
  control: any;
}

function ControllerInput(props: IProps) {
  const { name, rules, isInvalid, errorMessage, control } = props;
  return (
    <>
      <Controller
        rules={rules}
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Form.Control
            onChange={onChange}
            value={value}
            ref={ref}
            isInvalid={isInvalid}
            placeholder={"Enter " + name}
          />
        )}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </>
  );
}

export default ControllerInput;

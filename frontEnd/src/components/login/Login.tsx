import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";

interface IState {
  email: string;
  password: string;
  isValidated: boolean;
  message: string;
  token: string;
  statusCode: number;
  errors: {
    email: boolean;
    password: boolean;
  };
}

function Login() {
  let navigate = useNavigate();
  let initailValue: IState = {
    email: "",
    password: "",
    isValidated: false,
    message: "",
    token: "",
    statusCode: 0,
    errors: {
      email: false,
      password: false,
    },
  };
  const [state, setState] = useState(initailValue);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = state;
    const form = e.currentTarget;
    let isValidEmail: boolean;
    let isValidPassword: boolean;
    try {
      if (form.checkValidity() === false) {
        console.log("when error occurs", form.checkValidity() === false);

        isValidEmail =
          !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.[A-Za-z]+)+$/.test(email) &&
          email.length !== 0;

        isValidPassword = password.length > 0 && password.length < 8;

        setState({
          ...state,
          errors: { email: isValidEmail, password: isValidPassword },
        });
      } else {
        const requestOptions = {
          url: "http://localhost:4000/user/login",
          method: "POST",
          headers: { "Content-Type": "application/JSON" },
          data: { email: email, password: password },
        };

        let response = await axios(requestOptions);
        let responseStatus = response.status;
        let data = response.data;

        setState({
          ...state,
          isValidated: true,
          message: data.message,
          statusCode: responseStatus,
          errors: {
            email: false,
            password: false,
          },
        });
        if (responseStatus === 200) {
          console.log(state);

          localStorage.setItem("token", data.token);
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (error: any) {
      console.log(error);
      setState({
        ...state,
        isValidated: true,
        message: error.response.data.message,
        statusCode: error.status,
        errors: {
          email: false,
          password: false,
        },
      });
    }
  };

  const { email, password, isValidated, message, statusCode, errors } = state;
  return (
    <div className="login-form">
      <h2 className="heading">Login</h2>
      <Form
        noValidate
        validated={isValidated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleOnChange}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email Id.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            minLength={8}
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleOnChange}
            isInvalid={errors.password}
          />

          <Form.Control.Feedback type="invalid">
            Please provide a valid Password. Password must contains 8 digits
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={email && password.length > 0 ? false : true}
        >
          Submit
        </Button>
      </Form>
      {statusCode !== 200 && <div className="error">{message}</div>}
    </div>
  );
}

export default Login;

import * as React from "react";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { player } from "../../types/player";
import { AppDispatch } from "../store/store";
import { addPlayer, updatePlayer } from "./playerSlice";
import "./PlayerForm.css";
import ControllerInput from "./ControllerInput";
import { MdClose } from "react-icons/md";

export default function App(props: { setIsFormOpened: any; player: player }) {
  let initialValue: player = {
    _id: "",
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    gender: "",
    category: "",
  };

  const error = useSelector(
    (state: { errorMessage: string }) => state.errorMessage
  );
  const dispatch = useDispatch<AppDispatch>();
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  useEffect(() => {
    const { player } = props;
    if (player._id !== "") {
      console.log(player);
      reset(player, { keepDefaultValues: true });
    } else {
      reset();
    }
  }, [props, reset]);

  const onSubmit = (data: any) => {
    console.log("data===", data);
    if (props.player._id !== "") {
      dispatch(updatePlayer(data));
      props.setIsFormOpened(false);
    } else {
      dispatch(addPlayer(data));
    }
    reset();
  };

  return (
    <div className="jumbotron">
      <div className="form-header">
        <Button
          className="close-btn"
          variant="outline-danger"
          onClick={() => {
            props.setIsFormOpened(false);
          }}
        >
          <MdClose />
        </Button>
      </div>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6">
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="label">First Name</Form.Label>
              <Col sm="12">
                <ControllerInput
                  rules={{
                    required: true,
                  }}
                  control={control}
                  name="firstName"
                  isInvalid={errors.firstName !== undefined}
                  errorMessage="Please provide First Name."
                />
              </Col>
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="label">Last Name</Form.Label>
              <Col sm="12">
                <ControllerInput
                  rules={{
                    required: true,
                  }}
                  control={control}
                  name="lastName"
                  isInvalid={errors.lastName !== undefined}
                  errorMessage="Please provide Last Name."
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label className="label">Email</Form.Label>
            <ControllerInput
              rules={{
                required: true,
              }}
              control={control}
              name="email"
              isInvalid={errors.email !== undefined}
              errorMessage="Please provide Email Id."
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label className="label">Age</Form.Label>
            <ControllerInput
              rules={{
                required: true,
                min: 18,
              }}
              control={control}
              name="age"
              isInvalid={errors.age !== undefined}
              errorMessage="Please provide valid age. Age should be greater than 18."
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label className="label">Gender</Form.Label>

            <Controller
              rules={{
                required: true,
              }}
              control={control}
              name="gender"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Form.Select
                  value={value}
                  name="gender"
                  onChange={onChange}
                  isInvalid={errors.gender !== undefined}
                >
                  <option>Choose...</option>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"non-binary"}>Non-Binary</option>
                </Form.Select>
              )}
            />
            <Form.Control.Feedback type="invalid">
              Please select a gender
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group>
            <Form.Label className="label">Category</Form.Label>

            <Controller
              rules={{
                required: true,
              }}
              control={control}
              name="category"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Form.Select
                  value={value}
                  name="category"
                  onChange={onChange}
                  isInvalid={errors.category !== undefined}
                >
                  <option>Choose...</option>
                  <option value={"batsman"}>Batsman</option>
                  <option value={"bowler"}>Bowler</option>
                  <option value={"wicket keeper"}>Wicket keeper</option>
                  <option value={"all rounder"}>All-rounder</option>
                </Form.Select>
              )}
            />
            <Form.Control.Feedback type="invalid">
              Please select a category
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col>
            <div className="btn-row">
              {error && <div className="error"> {error}</div>}
              <Button
                variant="primary"
                type="submit"
                // disabled={firstName ? false : true}
              >
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

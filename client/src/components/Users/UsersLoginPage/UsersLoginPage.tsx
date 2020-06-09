import React from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { UserLoginType } from "../../../types/UserLoginType";
import api, { saveToken } from "../../../api/api";
import { ApiResponseType } from "../../../types/dto/ApiResponseType";
import { Redirect } from "react-router-dom";

export class UsersLoginPage extends React.Component {
  state: UserLoginType;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      errorMessage: "",
      validated: false,
    };
  }

  private formInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = Object.assign(this.state, {
      [event.target.id]: event.target.value,
    });
    this.setState(newState);
  };

  private setLoggedInState(isLoggedIn: boolean) {
    const newState = Object.assign(this.state, {
      isLoggedIn: isLoggedIn,
    });
    this.setState(newState);
  }

  private setErrorMessage(errorMessage: string) {
    const newState = Object.assign(this.state, {
      errorMessage: errorMessage,
    });
    this.setState(newState);
  }
  /*
  emailChanged = (event: any) => {
    let newState: UserLoginType = { ...this.state };
    newState.email = event.target.value;
    this.setState(newState);
  };
  passwordChanged = (event: any) => {
    let newState: UserLoginType = { ...this.state };
    newState.password = event.target.value;
    this.setState(newState);
  };*/
  handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      this.setFormValidate(true);
      return;
    }

    api("auth/login", "post", {
      email: this.state.email,
      password: this.state.password,
    }).then((res: ApiResponseType) => {
      if (res.status === "error") {
        this.setErrorMessage("Greska na serveru!");
        return;
      }

      if (res.status === "ok") {
        if (res.data?.status === "error") {
          this.setErrorMessage(res.data.message);
        } else {
          console.log(res.data?.data);
          saveToken(res.data?.data.token);
          this.setLoggedInState(true);
        }
      }
    });
  };
  render() {
    if (this.state.isLoggedIn === true) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <Container>
        <Alert
          variant="danger"
          className={this.state.errorMessage ? "" : "d-none"}
        >
          {this.state.errorMessage}
        </Alert>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
        >
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="email"
              value={this.state.email}
              onChange={this.formInputChanged}
              required
            />
            <Form.Control.Feedback type="invalid">
              Email cannot be empty.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              value={this.state.password}
              onChange={this.formInputChanged}
              required
            />
            <Form.Control.Feedback type="invalid">
              Password cannot be empty.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      </Container>
    );
  }

  private setFormValidate(validated: boolean) {
    const newState = Object.assign(this.state, {
      validated: validated,
    });
    this.setState(newState);
  }
}

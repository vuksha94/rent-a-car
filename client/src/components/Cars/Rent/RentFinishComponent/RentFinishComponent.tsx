import React from "react";
import { Form, Button, Container, Alert, Table } from "react-bootstrap";
import api from "../../../../api/api";
import { ApiResponseType } from "../../../../types/dto/ApiResponseType";
import { Redirect } from "react-router-dom";
import { RentData } from "../../../../types/dto/RentDataResponse";

interface RentFinishState {
  isUserLoggedIn: boolean;
  rent: RentData;
  carId: number;
  errorMessage: string;
  validated: boolean;
  rentFinished: boolean;
}

interface RentFinishProperties {
  match: {
    params: {
      carId: number;
    };
  };
}

export class RentFinishComponent extends React.Component {
  state: RentFinishState;

  constructor(props: RentFinishProperties) {
    super(props);
    this.state = {
      isUserLoggedIn: true,
      rent: {},
      carId: props.match.params.carId,
      errorMessage: "",
      validated: false,
      rentFinished: false,
    };
  }

  private formInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRent = Object.assign(this.state.rent, {
      [event.target.id]: event.target.value,
    });
    const newState = Object.assign(this.state, {
      rent: newRent,
    });
    this.setState(newState);
  };

  handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      this.setFormValidate(true);
      return;
    }

    const { rentId, rentFuelFinish, rentKmFinish } = this.state.rent;
    api("rent/finish", "post", {
      rentId,
      rentFuelFinish,
      rentKmFinish,
    }).then((res: ApiResponseType) => {
      if (res.status === "ok") {
        if (res.data?.status === "error") {
          this.setErrorMessage(res.data.message);
        } else {
          this.setRentFinished(true);
        }
      } else if (res.status === "error") {
        this.setErrorMessage("Server error");
      }
    });
  };

  setFormValidate(validated: boolean) {
    const newState = Object.assign(this.state, {
      validated: validated,
    });
    this.setState(newState);
  }

  private setErrorMessage(errorMessage: string) {
    const newState = Object.assign(this.state, {
      errorMessage: errorMessage,
    });
    this.setState(newState);
  }

  private setRentFinished(finished: boolean) {
    const newState = Object.assign(this.state, {
      rentFinished: finished,
    });
    this.setState(newState);
  }

  render() {
    if (this.state.isUserLoggedIn === false) {
      return <Redirect to="/user/login" />;
    }
    if (this.state.rentFinished) {
      return <Redirect to="/cars/"></Redirect>;
    }
    return (
      <Container>
        <Alert
          variant="danger"
          className={this.state.errorMessage ? "" : "d-none"}
        >
          {this.state.errorMessage}
        </Alert>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Model</th>
              <th>Km start</th>
              <th>Fuel level start</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {this.state.rent.rentCar
                  ? this.state.rent.rentCar?.carMake.cmName +
                    this.state.rent.rentCar?.carModel.cmName
                  : ""}
              </td>
              <td>{this.state.rent.rentKmStart}</td>
              <td>{this.state.rent.rentFuelStart}</td>
            </tr>
          </tbody>
        </Table>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Client id</th>
              <th>Client name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {this.state.rent.rentClient
                  ? this.state.rent.rentClient.clientIdNumber
                  : ""}
              </td>
              <td>
                {this.state.rent.rentClient
                  ? this.state.rent.rentClient.clientName
                  : ""}
              </td>
            </tr>
          </tbody>
        </Table>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
        >
          <Form.Group>
            <Form.Label>Kilometer distance</Form.Label>
            <Form.Control
              type="number"
              id="rentKmFinish"
              value={this.state.rent?.rentKmFinish || ""}
              onChange={this.formInputChanged}
              required
            />
            <Form.Control.Feedback type="invalid">
              Kilometer distance cannot be empty.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Fuel level</Form.Label>
            <Form.Control
              type="number"
              id="rentFuelFinish"
              value={this.state.rent?.rentFuelFinish || ""}
              onChange={this.formInputChanged}
              required
            />
            <Form.Control.Feedback type="invalid">
              Fuel level can't be empty.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Finish rent
          </Button>
        </Form>
      </Container>
    );
  }

  componentWillMount() {
    this.getData();
  }
  getData() {
    api("/rent/active/" + this.state.carId, "get").then((res) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        return;
      }
      if (res.status === "ok") {
        this.putDataInState(res.data?.data);
      } else {
        console.log("greska");
      }
    });
  }

  private putDataInState(data: RentData) {
    const newState = Object.assign(this.state, {
      rent: data,
    });
    this.setState(newState);
    console.log(this.state);
  }

  private setLogginState(isLoggedIn: boolean) {
    const newState = Object.assign(this.state, {
      isUserLoggedIn: isLoggedIn,
    });

    this.setState(newState);
  }
}

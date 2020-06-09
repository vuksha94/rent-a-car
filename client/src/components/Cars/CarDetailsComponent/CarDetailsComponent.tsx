import React from "react";
import api from "../../../api/api";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Car } from "../../../types/dto/CarResponseType";
import { Redirect } from "react-router-dom";

interface CarDetailsProps {
  match: {
    params: {
      id: number;
    };
  };
}

interface CarDetailsState {
  isUserLoggedIn: boolean;

  id: number;
  carDetails?: Car;
}
export class CarDetailsComponent extends React.Component {
  state: CarDetailsState;
  constructor(props: CarDetailsProps) {
    super(props);

    this.state = {
      isUserLoggedIn: true,
      id: props.match.params.id,
    };
  }

  render() {
    if (this.state.isUserLoggedIn === false) {
      return <Redirect to="/user/login" />;
    }
    return (
      <Container>
        {this.makeExpensesTable()}
        {this.makeRentsTable()}
      </Container>
    );
  }

  componentWillMount() {
    this.getDetails();
  }

  private getDetails() {
    api("/cars/" + this.state.id, "get").then((res) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        return;
      }
      if (res.status === "ok") {
        this.putDataInState(res.data?.data);
      } else {
        console.log(res.error);
      }
    });
  }

  private putDataInState(carDetails: Car) {
    const newState = Object.assign(this.state, { carDetails });
    this.setState(newState);
  }

  private makeRentsTable() {
    return (
      <Row>
        <Col>
          <h1>All rents</h1>
          <Table striped bordered hover>
            <tr>
              <th>Client</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
            {this.state.carDetails?.rents?.map((rent) => {
              return (
                <tr>
                  <td>{this.getClientNameForRent(rent.rentClientId)}</td>
                  <td>{this.formatDate(rent.rentDatetimeFrom)}</td>
                  <td>{this.formatDate(rent.rentDatetimeTo)}</td>
                  <td>{rent.rentActive ? "Active" : "Finished"}</td>
                </tr>
              );
            })}
          </Table>
        </Col>
      </Row>
    );
  }

  private getClientNameForRent(clientId: number | undefined) {
    const client = this.state.carDetails?.clients?.find(
      (c) => c.clientId === clientId
    );
    return client?.clientName;
  }
  private makeExpensesTable() {
    return (
      <Row>
        <Col>
          <h1>All expenses</h1>
          <Table striped bordered hover>
            <tr>
              <th>Description</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
            {this.state.carDetails?.carExpenses?.map((exp) => {
              return (
                <tr>
                  <td>{exp.ceDescription}</td>
                  <td>{exp.cePrice}</td>
                  <td>{this.formatDate(exp.ceDate)}</td>
                </tr>
              );
            })}
            {this.calculateTotalExpenses()}
          </Table>
        </Col>
      </Row>
    );
  }
  private calculateTotalExpenses() {
    let sum = 0;
    this.state.carDetails?.carExpenses?.map((exp) => {
      sum += parseInt(exp.cePrice);
    });
    return (
      <tr>
        <td className="text-bold">Total</td>
        <td className="text-bold">{sum.toFixed(2)}</td>
        <td></td>
      </tr>
    );
  }

  private formatDate(date: Date | string | undefined): string {
    const formatted = date ? new Date(date) : "";
    return formatted
      ? formatted.toLocaleDateString() + " " + formatted.toLocaleTimeString()
      : "";
  }

  private setLogginState(isLoggedIn: boolean) {
    const newState = Object.assign(this.state, {
      isUserLoggedIn: isLoggedIn,
    });

    this.setState(newState);
  }
}

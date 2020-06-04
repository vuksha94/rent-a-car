import React from "react";
import api from "../../../api/api";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Car } from "../../../types/dto/CarResponseType";
import { HashRouter, Link } from "react-router-dom";

interface CarComponentState {
  cars: Car[];
}

export class CarsComponent extends React.Component {
  state: CarComponentState;

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      cars: [],
    };
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <HashRouter>
              <Link to="/cars/add">Add new car</Link>
            </HashRouter>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Registration number</th>
                  <th>Model</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>
                {this.state.cars.map((car) => {
                  return (
                    <tr>
                      <td>{car.carRegistrationNumber}</td>
                      <td>{car.carMake.cmName + " " + car.carModel.cmName}</td>
                      <td>{car.carAvailable}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }

  componentWillMount() {
    console.log(this.props);
    this.getCars();
  }

  private getCars() {
    api("/cars", "get").then((res) => {
      if (res.status === "ok") {
        this.putCarsInState(res.data?.data);
      } else {
        console.log("greska");
      }
    });
  }

  private putCarsInState(cars?: Car[]) {
    const newState = Object.assign(this.state, {
      cars: cars,
    });
    this.setState(newState);
    console.log(this.state);
  }
}

import React from "react";
import api from "../../../api/api";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Car } from "../../../types/dto/CarResponseType";
import { HashRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faInfoCircle,
  faCar,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

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
                  <th>Category</th>
                  <th>Fuel type</th>
                  <th>KM distance</th>
                  <th>Fuel level</th>
                  <th>Rent a car</th>
                  <th>Finish rent</th>
                  <th>Add expense</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {this.state.cars.map((car) => {
                  return (
                    <tr key={car.carId}>
                      <td>{car.carRegistrationNumber}</td>
                      <td>{car.carMake.cmName + " " + car.carModel.cmName}</td>
                      <td>
                        {car.carAvailable ? "avaialble" : "not available"}
                      </td>
                      <td>{car.carCategory.ccName}</td>
                      <td>{car.carFuelType.cftName}</td>
                      <td>{car.carKmDist}</td>
                      <td>{car.carFuelLevel}</td>

                      <td>{this.makeRentCarButton(car)}</td>
                      <td>{this.makeFinishRentCarButton(car)}</td>

                      <td>
                        <HashRouter>
                          <Link to={"/cars/" + car.carId + "/addExpense"}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                          </Link>
                        </HashRouter>
                      </td>
                      <td>
                        <HashRouter>
                          <Link to={"/cars/" + car.carId}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </Link>
                        </HashRouter>
                      </td>
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

  private makeRentCarButton(car: Car) {
    if (car.carAvailable) {
      return (
        <HashRouter>
          <Link to={car.carAvailable ? "/cars/" + car.carId + "/rent" : "#"}>
            <FontAwesomeIcon icon={faCar} />
          </Link>
        </HashRouter>
      );
    } else {
      return;
    }
  }

  private makeFinishRentCarButton(car: Car) {
    if (!car.carAvailable) {
      return (
        <HashRouter>
          <Link to={"/rent/finish/" + car.carId}>
            <FontAwesomeIcon icon={faCheck} />
          </Link>
        </HashRouter>
      );
    } else {
      return;
    }
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

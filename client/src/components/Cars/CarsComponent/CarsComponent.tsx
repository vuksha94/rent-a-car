import React from "react";
import api from "../../../api/api";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Car, CarRegistration } from "../../../types/dto/CarResponseType";
import { HashRouter, Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faInfoCircle,
  faCar,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

interface CarComponentState {
  isUserLoggedIn: boolean;
  cars: Car[];
}

export class CarsComponent extends React.Component {
  state: CarComponentState;

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      isUserLoggedIn: true,
      cars: [],
    };
  }
  render() {
    if (this.state.isUserLoggedIn === false) {
      return <Redirect to="/user/login" />;
    }
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
                  <th>Registration expires</th>
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
                      <td>
                        {this.makeRegistrationExpiryField(
                          car.carRegistrations,
                          car.carId
                        )}
                      </td>

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
          <Link
            to={
              car.carAvailable && car.isRegistered
                ? "/cars/" + car.carId + "/rent"
                : "#"
            }
          >
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

  private makeRegistrationExpiryField(
    registrations: CarRegistration[],
    carId: number
  ) {
    const now = new Date();
    const activeRegistration = registrations.find(this.findActiveRegistration);
    if (!activeRegistration) {
      return (
        <Link
          onClick={() => this.registerCar(carId)}
          to={"?carRegistered=" + carId}
        >
          Register
        </Link>
      );
    }
    const expiry = new Date(activeRegistration.crRegistrationTo);
    const lessThanAMonth =
      expiry.getTime() - now.getTime() < 1000 * 60 * 60 * 24 * 31;
    return (
      <span className={lessThanAMonth ? "text-danger" : ""}>
        {expiry.toLocaleDateString() + " " + expiry.toLocaleTimeString()}
      </span>
    );
  }

  componentWillMount() {
    this.getCars();
  }

  private registerCar(carId: number) {
    api("/cars/register", "post", { carId }).then((res) => {
      if (res.status === "ok" && res.data && res.data.data) {
        this.getCars();
      } else {
        console.log("greska");
      }
    });
  }

  private getCars() {
    api("/cars", "get").then((res) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        console.log("greska");
        return;
      }

      if (res.status === "ok" && res.data && res.data.data) {
        this.putCarsInState(res.data.data);
      }
    });
  }

  private setLogginState(isLoggedIn: boolean) {
    const newState = Object.assign(this.state, {
      isUserLoggedIn: isLoggedIn,
    });

    this.setState(newState);
  }

  private putCarsInState(cars: Car[]) {
    cars = cars.map((car) => {
      let registered = false;
      if (car.carRegistrations.length > 0) {
        const activeReg = car.carRegistrations.find(
          this.findActiveRegistration
        );
        if (activeReg) registered = true;
      }
      return { ...car, isRegistered: registered };
    });
    // sort cars by registration expiry desc
    const sortedCars = cars.sort((a: Car, b: Car) => {
      if (!a.carRegistrations) return -1; // if no registration
      if (!b.carRegistrations) return 1;
      const activeRegA = a.carRegistrations.find(this.findActiveRegistration);
      const activeRegB = b.carRegistrations.find(this.findActiveRegistration);
      if (!activeRegA) return -1; // if registration expired
      if (!activeRegB) return 1;
      return new Date(activeRegA.crRegistrationTo).getTime() <
        new Date(activeRegB.crRegistrationTo).getTime()
        ? -1
        : 1;
    });
    const newState = Object.assign(this.state, {
      cars: sortedCars,
    });
    this.setState(newState);
    console.log(this.state);
  }

  private findActiveRegistration(reg: CarRegistration): boolean {
    return new Date(reg.crRegistrationTo).getTime() > new Date().getTime();
  }
}

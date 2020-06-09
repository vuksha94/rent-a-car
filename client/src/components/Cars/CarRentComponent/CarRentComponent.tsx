import React from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Row,
  Card,
  Col,
} from "react-bootstrap";
import { ApiResponseType } from "../../../types/dto/ApiResponseType";
import api from "../../../api/api";
import { Redirect } from "react-router-dom";
import { ClientType } from "../../../types/ClientType";
// import { ClientsType } from "../../../types/ClientsType";
import { Car } from "../../../types/dto/CarResponseType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
interface ErrorAddClient {
  name?: string;
  numberId?: string;
}
interface CarRentComponentState {
  isUserLoggedIn: boolean;
  carId: number;
  car?: Car;
  selectedClient?: ClientType;
  clients: ClientType[];
  clientToAdd?: ClientType;
  errorMessage: string;
  successMessage: string;
  validated: boolean;
  validatedSearchClient: boolean;
  addClientFormValidated: boolean;
  errorsAddClient: ErrorAddClient;
  carRented: boolean;
  showAddClientForm: boolean;
}

interface CarRentProperties {
  match: {
    params: {
      id: number;
    };
  };
}
export class CarRentComponent extends React.Component {
  state: CarRentComponentState;

  constructor(props: CarRentProperties) {
    super(props);
    this.state = {
      isUserLoggedIn: true,
      carId: props.match.params.id,
      clients: [],
      errorMessage: "",
      successMessage: "",
      validated: false,
      validatedSearchClient: false,
      addClientFormValidated: false,
      errorsAddClient: {},
      carRented: false,
      showAddClientForm: false,
    };
  }

  private clientChanged(selectedClientId: number | string) {
    if (typeof selectedClientId === "string") {
      selectedClientId = parseInt(selectedClientId);
    }
    const newClient = this.state.clients.find(
      (client) => client.clientId === selectedClientId
    );
    const newState = Object.assign(this.state, {
      selectedClient: newClient,
    });
    this.setState(newState);
  }

  // add client form
  private formInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddClient = Object.assign(this.state.clientToAdd, {
      [event.target.id]: event.target.value,
    });
    const newState = Object.assign(this.state, {
      clientToAdd: newAddClient,
    });
    this.setState(newState);
  };
  setClientToAddId(searchNumberId: string) {
    // automatically enter in id number id that didn't exist after search
    let newAddClient;
    if (!this.state.clientToAdd) {
      newAddClient = new ClientType();
      newAddClient.clientIdNumber = searchNumberId;
    } else {
      newAddClient = Object.assign(this.state.clientToAdd, {
        clientIdNumber: searchNumberId,
      });
    }

    const newState = Object.assign(this.state, {
      clientToAdd: newAddClient,
    });
    this.setState(newState);
  }

  private checkAddClientFormValidation(): boolean {
    console.log("check");
    const nameRegExp = /^([a-z]|[ć|ž|č|đ|š| ]){1,}$/i;
    const numberIdRegExp = /^\d{8,9}$/;
    let errorObj: ErrorAddClient = {};
    if (!this.state.clientToAdd?.clientName?.match(nameRegExp)) {
      errorObj.name = "Name not valid.";
      console.log("name not valid");
    }
    if (!this.state.clientToAdd?.clientIdNumber?.match(numberIdRegExp)) {
      errorObj.numberId = "ID should have 8 or 9 digits.";
    }
    if (errorObj.name || errorObj.numberId) {
      this.setErrorsAddClient(errorObj);
      return false;
    }
    this.setErrorsAddClient({});
    return true;
  }

  private setErrorsAddClient(errorsAddClient: ErrorAddClient) {
    const newState = Object.assign(this.state, {
      errorsAddClient: errorsAddClient,
    });
    this.setState(newState);
  }

  handleAddClientSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!this.checkAddClientFormValidation() || !form.checkValidity()) {
      this.setAddClientFormValidate(true);
      return;
    }
    //if (this.checkAddClientFormValidation()) return;
    if (!this.state.clientToAdd) return;
    const { clientIdNumber, clientName } = this.state.clientToAdd;

    api("clients/", "post", {
      clientIdNumber,
      clientName,
    }).then((res: ApiResponseType) => {
      if (res.status === "error") {
        this.setErrorMessage("Server error");
        return;
      }

      if (res.status === "ok") {
        if (res.data?.status === "error") {
          this.setErrorMessage(res.data.message);
        } else {
          if (res.data?.data) {
            // if client exists
            const client: ClientType = res.data.data;
            if (client.clientId) {
              this.putClientsInState([...this.state.clients, client]);
              this.clientChanged(client.clientId);
              console.log(this.state.selectedClient?.clientName);
              this.setSuccessMessage("Client created and selected!");
              this.setErrorMessage("");
            } else {
              this.setErrorMessage("Different error");
            }
          }
        }
      }
    });
  };

  handleSubmitSearch = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      this.setSearchClientFormValidate(true);
      return;
    }

    const searchNumberId = form["searchClient"].value;

    api("clients/" + searchNumberId, "get").then((res: ApiResponseType) => {
      if (res.status === "error") {
        this.setErrorMessage("Greska na serveru!");
        return;
      }

      if (res.status === "ok") {
        if (res.data?.status === "error") {
          // Client not found
          this.setErrorMessage(res.data.message + " Create client to proceed.");
          this.setShowAddClientForm(true);

          this.setClientToAddId(searchNumberId);
        } else {
          if (res.data?.data) {
            // if client exists
            const client: ClientType = res.data.data;
            if (client.clientAvailable && client.clientId) {
              this.clientChanged(client.clientId);
              this.setSuccessMessage("Client found and selected!");
              this.setErrorMessage("");
            } else {
              this.setErrorMessage("Client already has an activerent!");
            }
          }
        }
      }
    });
  };

  handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      this.setFormValidate(true);
      return;
    }

    //let carId, description, price;
    const { carId } = this.state;

    api(
      "rent/" + carId + "/" + this.state.selectedClient?.clientId,
      "get"
    ).then((res: ApiResponseType) => {
      if (res.status === "error") {
        this.setErrorMessage("Greska na serveru!");
        return;
      }

      if (res.status === "ok") {
        if (res.data?.status === "error") {
          this.setErrorMessage(res.data.message);
        } else {
          this.setCarRented(true, res.data?.data.id);
        }
      }
    });
  };

  render() {
    if (this.state.isUserLoggedIn === false) {
      return <Redirect to="/user/login" />;
    }
    if (this.state.carRented) {
      // const { carId, carRented } = this.state;
      return <Redirect to={"/cars/?carRented"}></Redirect>;
    }
    return (
      <Container>
        <Row className={this.state.errorMessage ? "" : "d-none"}>
          <Col>
            <Alert variant="danger">{this.state.errorMessage}</Alert>
          </Col>
        </Row>
        <Row className={this.state.successMessage ? "" : "d-none"}>
          <Col>
            <Alert
              variant="success"
              className={this.state.successMessage ? "" : "d-none"}
            >
              {this.state.successMessage}
            </Alert>
          </Col>
        </Row>

        <Row>
          <Col>
            <h1>Rent a car</h1>
            {this.makeCarDetails(this.state.car)}
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.handleSubmit}
            >
              <Form.Group>
                <Form.Control
                  as="select"
                  custom
                  id="selectedClientId"
                  value={this.state.selectedClient?.clientId || ""}
                  onChange={(event: any) =>
                    this.clientChanged(event.target.value)
                  }
                  required
                >
                  <option value="">Choose client</option>
                  {this.state.clients.map(this.singleClient)}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please choose a client.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                Rent a car
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form
              noValidate
              validated={this.state.validatedSearchClient}
              onSubmit={this.handleSubmitSearch}
            >
              <Form.Group>
                <Form.Control
                  id="searchClient"
                  name="searchClient"
                  type="text"
                  placeholder="Search client number id..."
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Number id can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
          </Col>
        </Row>

        {this.state.showAddClientForm ? this.makeAddClientForm() : ""}
      </Container>
    );
  }

  componentWillMount() {
    this.getCarDetails(this.state.carId);
    this.getClients();
  }

  private getCarDetails(carId: number) {
    api("/cars/" + carId, "get").then((res) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        return;
      }
      if (res.status === "ok") {
        this.putCarInState(res.data?.data);
      } else {
        console.log("greska");
      }
    });
  }

  private getClients() {
    api("/clients", "get").then((res) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        console.log("greska");
        return;
      }
      if (res.status === "ok") {
        this.putClientsInState(res.data?.data);
      } else {
        console.log("greska");
      }
    });
  }

  private makeAddClientForm() {
    return (
      <Row id="addClient">
        <Col>
          <h1>Create client</h1>
          <Form
            noValidate
            validated={this.state.addClientFormValidated}
            onSubmit={this.handleAddClientSubmit}
          >
            <Form.Group>
              <Form.Label>Number ID</Form.Label>
              <Form.Control
                className={
                  this.state.errorsAddClient?.numberId ? "is-invalid" : ""
                }
                type="text"
                placeholder="Enter number id..."
                id="clientIdNumber"
                value={this.state.clientToAdd?.clientIdNumber || ""}
                onChange={this.formInputChanged}
                required
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errorsAddClient?.numberId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name..."
                id="clientName"
                value={this.state.clientToAdd?.clientName || ""}
                onChange={this.formInputChanged}
                required
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errorsAddClient?.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }

  private putCarInState(car: Car) {
    const newState = Object.assign(this.state, {
      car: car,
    });
    this.setState(newState);
  }
  private makeCarDetails(car: Car | undefined) {
    if (!car) return;
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            {car.carMake.cmName + " " + car.carModel.cmName}
          </Card.Title>
          <Card.Text>
            {car.carYear}, {car.carFuelType.cftName}, {car.carCategory.ccName}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
  private putClientsInState(clients: ClientType[]) {
    const newState = Object.assign(this.state, {
      clients: clients,
    });
    this.setState(newState);
  }
  private singleClient(client: ClientType) {
    return (
      <option
        value={client.clientId}
        disabled={client.clientAvailable ? false : true}
      >
        {client.clientIdNumber + " - " + client.clientName}
        {client.clientAvailable ? "" : " *has active rent"}
      </option>
    );
  }

  private setFormValidate(validated: boolean) {
    const newState = Object.assign(this.state, {
      validated: validated,
    });
    this.setState(newState);
  }
  private setSearchClientFormValidate(validated: boolean) {
    const newState = Object.assign(this.state, {
      validatedSearchClient: validated,
    });
    this.setState(newState);
  }
  private setAddClientFormValidate(validated: boolean) {
    const newState = Object.assign(this.state, {
      addClientFormValidated: validated,
    });
    this.setState(newState);
  }

  private setErrorMessage(errorMessage: string) {
    const newState = Object.assign(this.state, {
      errorMessage: errorMessage,
    });
    this.setState(newState);
  }
  private setSuccessMessage(successMessage: string) {
    const newState = Object.assign(this.state, {
      successMessage: successMessage,
    });
    this.setState(newState);
  }
  private setShowAddClientForm(set: boolean) {
    const newState = Object.assign(this.state, {
      showAddClientForm: set,
    });
    this.setState(newState);
  }

  private setCarRented(isAdded: boolean, rentId: string) {
    const newState = Object.assign(this.state, {
      carRented: isAdded,
    });
    this.setState(newState);
  }

  private setLogginState(isLoggedIn: boolean) {
    const newState = Object.assign(this.state, {
      isUserLoggedIn: isLoggedIn,
    });

    this.setState(newState);
  }
}

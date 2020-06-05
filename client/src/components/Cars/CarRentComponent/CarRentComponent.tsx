import React from "react";
import { Form, Button, Container, Alert, Row, Card } from "react-bootstrap";
import { ApiResponseType } from "../../../types/dto/ApiResponseType";
import api from "../../../api/api";
import { Redirect } from "react-router-dom";
import { ClientType } from "../../../types/ClientType";
import { ClientsType } from "../../../types/ClientsType";
import { Car } from "../../../types/dto/CarResponseType";

interface CarRentComponentState {
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
      carId: props.match.params.id,
      clients: [],
      errorMessage: "",
      successMessage: "",
      validated: false,
      validatedSearchClient: false,
      addClientFormValidated: false,
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

  handleAddClientSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      this.setAddClientFormValidate(true);
      return;
    }
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
          this.setErrorMessage(res.data.message);
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
    if (this.state.carRented) {
      // const { carId, carRented } = this.state;
      return <Redirect to={"/cars/?carRented"}></Redirect>;
    }
    return (
      <Container>
        <Row>
          <Alert
            variant="danger"
            className={this.state.errorMessage ? "" : "d-none"}
          >
            {this.state.errorMessage}
          </Alert>
          <Alert
            variant="success"
            className={this.state.successMessage ? "" : "d-none"}
          >
            {this.state.successMessage}
          </Alert>
        </Row>
        <Row>{this.makeCarDetails(this.state.car)}</Row>
        <Row>
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
        </Row>

        <Row>
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
              Search
            </Button>
          </Form>
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
      if (res.status === "ok") {
        this.putCarInState(res.data?.data);
      } else {
        console.log("greska");
      }
    });
  }

  private getClients() {
    api("/clients", "get").then((res) => {
      if (res.status === "ok") {
        this.putClientsInState(res.data?.data);
      } else {
        console.log("greska");
      }
    });
  }

  private makeAddClientForm() {
    return (
      <Row>
        <Form
          noValidate
          validated={this.state.addClientFormValidated}
          onSubmit={this.handleAddClientSubmit}
        >
          <Form.Group>
            <Form.Label>Number ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter number id..."
              id="clientIdNumber"
              value={this.state.clientToAdd?.clientIdNumber || ""}
              onChange={this.formInputChanged}
              required
            />
            <Form.Control.Feedback type="invalid">
              Client number id cannot be empty.
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
              Name cannot be empty.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
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
}

import React from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { ApiResponseType } from "../../../types/dto/ApiResponseType";
import api from "../../../api/api";
import { CreateCarType } from "../../../types/dto/CreateCarType";
import {
  CarCategory,
  CarMake,
  CarModel,
  CarFuelType,
} from "../../../types/dto/CarResponseType";
import { Redirect } from "react-router-dom";

interface CarAddComponentState {
  isUserLoggedIn: boolean;
  carToAdd: CreateCarType;
  makes: CarMake[];
  models: CarModel[];
  categories: CarCategory[];
  fuelTypes: CarFuelType[];
  years: number[];
  errorMessage: string;
  carAdded: boolean;
  carAddedRegNumber: string;
  validated: boolean;
}

export class CarAddComponent extends React.Component {
  state: CarAddComponentState;

  constructor(props: Readonly<{}>) {
    super(props);

    const years = [];
    for (let i = 2020; i > 1980; --i) {
      years.push(i);
    }
    this.state = {
      isUserLoggedIn: true,
      carToAdd: {},
      errorMessage: "",
      categories: [],
      fuelTypes: [],
      makes: [],
      models: [],
      years: years,
      carAdded: false,
      carAddedRegNumber: "",
      validated: false,
    };
  }

  private formInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCarToAdd = Object.assign(this.state.carToAdd, {
      [event.target.id]: event.target.value,
    });
    const newState = Object.assign(this.state, {
      carToAdd: newCarToAdd,
    });
    this.setState(newState);
    if (event.target.id === "carMakeId") {
      this.getModelsForMake(parseInt(event.target.value));
    }
  };

  render() {
    if (this.state.isUserLoggedIn === false) {
      return <Redirect to="/user/login" />;
    }
    if (this.state.carAdded) {
      return (
        <Redirect
          to={"/cars?carAdded=" + this.state.carAddedRegNumber}
        ></Redirect>
      );
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
            <Form.Control
              type="text"
              placeholder="Registration number..."
              id="carRegistrationNumber"
              value={this.state.carToAdd.carRegistrationNumber || ""}
              onChange={this.formInputChanged}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter registration number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
              custom
              id="carMakeId"
              value={this.state.carToAdd.carMakeId || ""}
              onChange={this.formInputChanged}
              required
            >
              <option value="">Choose make</option>
              {this.state.makes.map(this.singleMake)}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose car's make.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
              custom
              id="carModelId"
              value={this.state.carToAdd.carModelId || ""}
              onChange={this.formInputChanged}
              required
            >
              <option value="">Choose model</option>
              {this.state.models.map(this.singleModel)}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose car's model.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
              custom
              id="carCategoryId"
              value={this.state.carToAdd.carCategoryId || ""}
              onChange={this.formInputChanged}
              required
            >
              <option value="">Choose category</option>
              {this.state.categories.map(this.singleCategory)}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose car's category.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
              custom
              id="carFuelTypeId"
              value={this.state.carToAdd.carFuelTypeId || ""}
              onChange={this.formInputChanged}
              required
            >
              <option value="">Choose fuel type</option>
              {this.state.fuelTypes.map(this.singleFuelType)}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose car's fuel type.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Engine Volume..."
              id="carEngineVolume"
              value={this.state.carToAdd?.carEngineVolume || ""}
              onChange={this.formInputChanged}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter car's engine volume.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
              custom
              id="carYear"
              onChange={this.formInputChanged}
              required
            >
              <option value="">Choose production year</option>
              {this.state.years.map(this.singleYear)}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose car's production year.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Container>
    );
  }

  componentWillMount() {
    this.getAllData();
  }

  getAllData() {
    api("cars/makes", "get").then((res: ApiResponseType) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        console.log("greska");
        return;
      }
      if (res.status === "ok") {
        this.putCarMakesInState(res.data?.data);
      } else {
        console.log("greska");
      }
    });

    api("cars/categories", "get").then((res: ApiResponseType) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        console.log("greska");
        return;
      }
      if (res.status === "ok") {
        this.putCarCategoriesInState(res.data?.data);
      } else {
        console.log("greska");
      }
    });
    api("cars/fueltypes", "get").then((res: ApiResponseType) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        console.log("greska");
        return;
      }
      if (res.status === "ok") {
        this.putCarFuelTypesInState(res.data?.data);
      } else {
        console.log("greska");
      }
    });
  }

  getModelsForMake(makeId: number) {
    api("cars/models?makeId=" + makeId, "get").then((res: ApiResponseType) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        console.log("greska");
        return;
      }
      if (res.status === "ok") {
        this.putCarModelsInState(res.data?.data);
      } else {
        console.log("greska");
      }
    });
  }
  putCarMakesInState(makes: CarMake[]) {
    const newState = Object.assign(this.state, {
      makes: makes,
    });
    this.setState(newState);
  }
  putCarModelsInState(models: CarModel[]) {
    const newState = Object.assign(this.state, {
      models: models,
    });
    this.setState(newState);
  }
  putCarCategoriesInState(categories: CarCategory[]) {
    const newState = Object.assign(this.state, {
      categories: categories,
    });
    this.setState(newState);
  }
  putCarFuelTypesInState(fuelTypes: CarFuelType[]) {
    const newState = Object.assign(this.state, {
      fuelTypes: fuelTypes,
    });
    this.setState(newState);
  }

  singleMake(make: CarMake) {
    return <option value={make.cmId}>{make.cmName}</option>;
  }
  singleModel(model: CarModel) {
    return <option value={model.cmId}>{model.cmName}</option>;
  }
  singleCategory(category: CarCategory) {
    return <option value={category.ccId}>{category.ccName}</option>;
  }
  singleFuelType(fuelType: CarFuelType) {
    return <option value={fuelType.cftId}>{fuelType.cftName}</option>;
  }
  singleYear(year: number) {
    return <option value={year}>{year}</option>;
  }

  handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      this.setFormValidate(true);
      return;
    }

    console.log(this.state.carToAdd);

    api("cars", "post", this.state.carToAdd).then((res: ApiResponseType) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        console.log("greska");
        return;
      }
      if (res.status === "ok") {
        if (res.data?.status === "error") {
          this.setErrorMessage(res.data.message);
        } else {
          this.setCarAddedState(true, res.data?.data.carRegistrationNumber);
          console.log(res.data?.data);
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

  private setCarAddedState(isAdded: boolean, carAddedRegNumber: string) {
    const newState = Object.assign(this.state, {
      carAdded: isAdded,
      carAddedRegNumber: carAddedRegNumber,
    });
    this.setState(newState);
  }

  private setErrorMessage(errorMessage: string) {
    const newState = Object.assign(this.state, {
      errorMessage: errorMessage,
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

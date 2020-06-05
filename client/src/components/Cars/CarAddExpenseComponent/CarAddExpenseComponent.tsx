import React from "react";
import { Form, Button, Container, Alert, CardImg } from "react-bootstrap";
import { ApiResponseType } from "../../../types/dto/ApiResponseType";
import api from "../../../api/api";
import { Redirect } from "react-router-dom";

interface AddCarExpenceState {
  carId: number;
  description: string;
  price: string;
  errorMessage: string;
  validated: boolean;
  expenseAdded: boolean;
  expenseAddedId?: number;
}

interface CarAddExpensesProperties {
  match: {
    params: {
      id: number;
    };
  };
}
export class CarAddExpenseComponent extends React.Component {
  state: AddCarExpenceState;

  constructor(props: CarAddExpensesProperties) {
    super(props);
    this.state = {
      carId: props.match.params.id,
      description: "",
      price: "",
      errorMessage: "",
      validated: false,
      expenseAdded: false,
    };
  }

  private formInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = Object.assign(this.state, {
      [event.target.id]: event.target.value,
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

    //let carId, description, price;
    const { carId, description, price } = this.state;

    api("cars/expenses/" + carId, "post", {
      description,
      price,
    }).then((res: ApiResponseType) => {
      if (res.status === "error") {
        this.setErrorMessage("Greska na serveru!");
        return;
      }

      if (res.status === "ok") {
        if (res.data?.status === "error") {
          this.setErrorMessage(res.data.message);
        } else {
          this.setAddedExpense(true, res.data?.data.ceId);
        }
      }
    });
  };

  render() {
    if (this.state.expenseAdded) {
      const { carId, expenseAddedId } = this.state;
      return (
        <Redirect
          to={"/cars/" + carId + "?expenseAdded=" + expenseAddedId}
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
              as="textarea"
              placeholder="Enter description..."
              id="description"
              value={this.state.description}
              onChange={this.formInputChanged}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter valid description.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter Price..."
              id="price"
              value={this.state.price}
              onChange={this.formInputChanged}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter valid price.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
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
  private setErrorMessage(errorMessage: string) {
    const newState = Object.assign(this.state, {
      errorMessage: errorMessage,
    });
    this.setState(newState);
  }

  private setAddedExpense(isAdded: boolean, expenseAddedId: string) {
    const newState = Object.assign(this.state, {
      expenseAdded: isAdded,
      expenseAddedId: expenseAddedId,
    });
    this.setState(newState);
  }
}

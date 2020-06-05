import React from "react";
import { ClientType } from "../../../types/ClientType";
import { Container, Card } from "react-bootstrap";

interface ClientComponentProperties {
  match: {
    params: {
      id: number;
    };
  };
}

/*interface ClientComponentState {
  client: 
}*/

export class ClientComponent extends React.Component<
  ClientComponentProperties
> {
  state: ClientType;
  constructor(props: ClientComponentProperties) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <Card>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  componentWillMount() {
    console.log("componentWillMount");
    this.getClientData();
  }

  componentWillReceiveProps(newProperties: ClientComponentProperties) {
    console.log("componentWillReceiveProps");
    if (newProperties.match.params.id === this.props.match.params.id) {
      return;
    }
    this.getClientData();
  }

  getClientData() {}
}

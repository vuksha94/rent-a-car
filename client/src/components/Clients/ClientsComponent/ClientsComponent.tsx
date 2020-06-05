import React from "react";
import { ClientsType } from "../../../types/ClientsType";
import { Container } from "react-bootstrap";
import { HashRouter, Link } from "react-router-dom";

interface ClientsComponentProperties {
  match: {
    params: {
      id: number;
    };
  };
}

export class ClientsComponent extends React.Component<
  ClientsComponentProperties
> {
  state: ClientsType;
  constructor(props: ClientsComponentProperties) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <HashRouter>
          <ul>
            {this.state.clients?.map((client) => {
              return (
                <li>
                  <Link className="nav-link" to={"/client/"}></Link>
                </li>
              );
            })}
          </ul>
        </HashRouter>
      </Container>
    );
  }

  componentWillMount() {
    console.log("componentWillMount");
    this.getClientsData();
  }

  /*componentWillReceiveProps(newProperties: ClientsComponentProperties) {
    console.log("componentWillReceiveProps");
    if (newProperties.match.params.id === this.props.match.params.id) {
      return;
    }
    this.getClientsData();
  }*/

  getClientsData() {}
}

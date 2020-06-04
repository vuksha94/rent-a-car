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
                  <Link className="nav-link" to={"/client/" + client.id}>
                    {client.name} | {client.number_id}
                  </Link>
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

  getClientsData() {
    setTimeout(() => {
      console.log("getClientData");
      const clients: ClientsType = {
        clients: [
          {
            id: 1,
            name: "Stefan",
            number_id: "0098445678",
          },
          {
            id: 2,
            name: "Marko",
            number_id: "858975444",
          },
          {
            id: 3,
            name: "Milos",
            number_id: "1234445678",
          },
        ],
      };
      this.setState(clients);
    }, 100);
  }
}

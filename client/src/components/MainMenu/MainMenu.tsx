import React from "react";
import { Link, HashRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { isLoggedIn } from "../../api/api";
import { Navbar } from "react-bootstrap";

export class MenuItem {
  href: string;
  title: string;
  float: string;

  constructor(title: string, href: string, float = "left") {
    this.href = href;
    this.title = title;
    this.float = float;
  }
}

interface MainMenuProperties {
  items: MenuItem[];
}

interface MainMenuState {
  isUserLoggedIn: boolean;
  items: MenuItem[];
}

export class MainMenu extends React.Component<MainMenuProperties> {
  state: MainMenuState;

  constructor(props: MainMenuProperties) {
    super(props);

    this.state = {
      isUserLoggedIn: true,
      items: props.items,
    };
  }

  private setLogginState(isLoggedIn: boolean) {
    const newState = Object.assign(this.state, {
      isUserLoggedIn: isLoggedIn,
    });

    this.setState(newState);
  }

  componentWillMount() {
    this.setLogginState(isLoggedIn());
  }

  setItems(items: MenuItem[]) {
    this.setState({
      items: items,
    });
  }
  render() {
    return (
      <Navbar bg="secondary" expand="sm">
        <Navbar.Toggle aria-controls="navbar-rent-a-car" />
        <Navbar.Collapse id="navbar-rent-a-car">
          <Nav className="mr-auto">
            {this.state.items.map((item) => {
              if (item.float !== "left") return;
              return (
                <HashRouter>
                  <Link
                    className={"nav-link float-" + item.float}
                    to={item.href}
                    key={item.href}
                  >
                    {item.title}
                  </Link>
                </HashRouter>
              );
            })}
          </Nav>
          <Nav className="mr-sm-2">
            {this.state.items.map((item) => {
              if (item.float !== "right") return;
              return (
                <HashRouter>
                  <Link
                    className={"nav-link float-" + item.float}
                    to={item.href}
                    key={item.href}
                  >
                    {item.title}
                  </Link>
                </HashRouter>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

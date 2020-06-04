import React from "react";
import { Link, HashRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export class MenuItem {
  href: string;
  title: string;

  constructor(title: string, href: string) {
    this.href = href;
    this.title = title;
  }
}

interface MainMenuProperties {
  items: MenuItem[];
}

interface MainMenuState {
  items: MenuItem[];
}

export class MainMenu extends React.Component<MainMenuProperties> {
  state: MainMenuState;

  constructor(props: MainMenuProperties) {
    super(props);

    this.state = {
      items: props.items,
    };
  }

  setItems(items: MenuItem[]) {
    this.setState({
      items: items,
    });
  }
  render() {
    return (
      <Nav>
        {this.state.items.map((item) => {
          return (
            <HashRouter>
              <Link className="nav-link" to={item.href}>
                {item.title}
              </Link>
            </HashRouter>
          );
        })}
      </Nav>
    );
  }
}

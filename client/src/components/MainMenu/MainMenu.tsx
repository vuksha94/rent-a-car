import React from "react";
import { Link, HashRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { isLoggedIn } from "../../api/api";

export class MenuItem {
  href: string;
  title: string;
  float: string;
  showWhenLoggedIn: boolean;

  constructor(
    title: string,
    href: string,
    float = "left",
    showWhenLoggedIn = true
  ) {
    this.href = href;
    this.title = title;
    this.float = float;
    this.showWhenLoggedIn = showWhenLoggedIn;
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
      <Nav>
        {this.state.items.map((item) => {
          // if (!this.state.isUserLoggedIn === item.showWhenLoggedIn) return;
          return (
            <HashRouter>
              <Link className="nav-link" to={item.href} key={item.href}>
                {item.title}
              </Link>
            </HashRouter>
          );
        })}
      </Nav>
    );
  }
}

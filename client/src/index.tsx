import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.js";
import "popper.js/dist/popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import { MainMenu, MenuItem } from "./components/MainMenu/MainMenu";
import { HashRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import { CarsComponent } from "./components/Cars/CarsComponent/CarsComponent";
import { ClientsComponent } from "./components/Clients/ClientsComponent/ClientsComponent";
import { ClientComponent } from "./components/Clients/ClientComponent/ClientComponent";
import { UsersLoginPage } from "./components/Users/UsersLoginPage/UsersLoginPage";
import { CarAddComponent } from "./components/Cars/CarAddComponent/CarAddComponent";

const menuLinks = [
  new MenuItem("Home", "/"),
  new MenuItem("Login", "/user/login"),
  new MenuItem("Clients", "/clients"),
  new MenuItem("Cars", "/cars"),
];

ReactDOM.render(
  <React.StrictMode>
    <MainMenu items={menuLinks}></MainMenu>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/cars/add" component={CarAddComponent}></Route>
        <Route path="/cars" component={CarsComponent}></Route>
        <Route path="/user/login" component={UsersLoginPage}></Route>
        <Route path="/clients" component={ClientsComponent}></Route>
        <Route path="/client/:id" component={ClientComponent}></Route>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

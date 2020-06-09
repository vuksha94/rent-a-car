import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HashRouter, Link } from "react-router-dom";

function HomePage() {
  return (
    <Container>
      <Row>
        <Col>
          <div>
            This is <b>RENT A CAR</b> web application
          </div>
          <div>
            Click on{" "}
            <HashRouter>
              <Link to="/cars">Cars tab </Link>
            </HashRouter>
            to manage all functionalities about car renting
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

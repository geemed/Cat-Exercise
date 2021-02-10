import React from "react";
import { Container } from "react-bootstrap";

const Home = ({ children }) => {
  return (
    <Container>
      <section>{children}</section>
    </Container>
  );
};

export default Home;

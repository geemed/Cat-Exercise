import React from "react";
import { Container } from "react-bootstrap";

const Home = ({ children }) => {
  return (
    <section>
      <Container>{children}</Container>
    </section>
  );
};

export default Home;

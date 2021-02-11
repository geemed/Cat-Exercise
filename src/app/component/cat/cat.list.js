import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Col, Row } from "react-bootstrap";

const CatList = ({ item }) => {
  const history = useHistory();

  const handleGoTo = () => {
    history.push(`${item.id}`);
  };
  return (
    <Col xs={12} sm={6} md={3} className="cat-col">
      <Card className="cat-list">
        <Card.Img variant="top" src={item.url} className="rounded-circle" />
        <Card.Body>
          <Button variant="outline-info" size="sm" onClick={handleGoTo}>
            View details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CatList;

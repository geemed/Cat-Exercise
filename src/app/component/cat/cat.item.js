import React, { useEffect, useCallback, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "app-base/app.context";

import * as actions from "./cat.action";

const CatItem = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { breedId } = useParams();
  const { breeds, breed, isLoading, hasError } = useSelector(
    (state) => state.cat
  );
  const info = ((breed || {}).breeds || [])[0] || {};

  const getCatByBreed = useCallback(async () => {
    dispatch(actions.setLoading(true));

    const result = await actions.getCatByBreed(breeds, breedId);

    dispatch(actions.setLoading(false));
    setTimeout(() => {
      dispatch(result);
    }, 200);
  });

  const handleBack = () => {
    history.goBack();
  };

  const renderCatItem = () => {
    if (isLoading) return <h5>Loading ...</h5>;

    if (hasError)
      return <Alert variant="danger">{actions.getErrorMessage()}</Alert>;

    return (
      <Fragment>
        <Button variant="outline-info" size="sm" onClick={handleBack}>
          Back
        </Button>
        <Card className="cat-item">
          <Card.Img variant="top" src={breed.url} />
          <Card.Body>
            <h4>{info.name}</h4>
            <h5>Origin: {info.origin}</h5>
            <h6>{info.temperament}</h6>
            <Card.Text>{info.description}</Card.Text>
          </Card.Body>
        </Card>
      </Fragment>
    );
  };

  useEffect(() => {
    getCatByBreed();

    return () => dispatch(actions.clearCatByBreed());
  }, []);

  return <div className="cat">{renderCatItem()}</div>;
};

export default CatItem;

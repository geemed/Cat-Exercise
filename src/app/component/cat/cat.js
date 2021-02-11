import React, { Fragment, useCallback, useEffect } from "react";
import { Col, Form, Row, Button, InputGroup, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "app-base/app.context";

import CatList from "./cat.list";

import * as actions from "./cat.action";

const Cat = () => {
  const cat = useSelector((state) => state.cat);
  const dispatch = useDispatch();
  const {
    breeds,
    breedId,
    page,
    limit,
    hasLoadMore,
    data,
    isLoading,
    hasError,
  } = cat;

  const getCatsData = useCallback(async () => {
    if (data && data.length) return;

    const res = await actions.getCats();

    dispatch(res);
    setTimeout(() => {
      if (breedId && breedId.length)
        getCatsByBreedData(breedId, 1, limit, true);
    }, 200);
  });

  const getCatsByBreedData = useCallback(async (b, p, l, clr) => {
    dispatch(actions.setLoading(true));

    const res = await actions.getCatsByBreed(clr ? [] : breeds, b, p, l);

    dispatch(actions.setLoading(false));
    setTimeout(() => {
      dispatch(res);
    }, 200);
  });

  const handleSelectChange = (e) => {
    getCatsByBreedData(e.target.value, 1, limit, true);
  };

  const handleLoadMore = () => {
    const pager = hasError ? 1 : page + 1;

    getCatsByBreedData(breedId, pager, limit, false);
  };

  const handleRefresh = () => {
    dispatch(actions.setError(false));
    getCatsData();
  };

  const renderContent = () => {
    return (
      <Fragment>
        {renderSelect()}
        {hasError ? renderError() : renderCats()}
        {renderLoadMore()}
      </Fragment>
    );
  };

  const renderSelect = () => {
    return (
      <Row>
        <Col xs={12} sm={6} md={3}>
          <InputGroup>
            <Form.Control
              as="select"
              value={breedId}
              onChange={handleSelectChange}
              disabled={!data.length}
            >
              <option>Select breed</option>
              {data.map((data, idx) => {
                return (
                  <option key={idx} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </Form.Control>
            {hasError ? <Button onClick={handleRefresh}>Refresh</Button> : null}
          </InputGroup>
        </Col>
      </Row>
    );
  };

  const renderCats = () => {
    if (!breeds.length)
      return (
        <Row>
          <Col>{isLoading ? "Loading..." : "No cats available"}</Col>
        </Row>
      );

    return (
      <Row>
        {breeds.map((item, idx) => {
          return <CatList key={idx} item={item} />;
        })}
      </Row>
    );
  };

  const renderError = () => {
    return (
      <Row>
        <Col>
          <Alert variant="danger">{actions.getErrorMessage()}</Alert>
        </Col>
      </Row>
    );
  };

  const renderLoadMore = () => {
    if (!hasLoadMore || !breedId) return null;

    return (
      <Row>
        <Col>
          <Button
            variant="outline-info"
            size="sm"
            onClick={handleLoadMore}
            disabled={!breedId || isLoading}
          >
            {isLoading ? "Loading Cats 🐾" : "Load More 🐾"}
          </Button>
        </Col>
      </Row>
    );
  };

  useEffect(() => {
    getCatsData();
  }, []);

  return <div className="cats">{renderContent()}</div>;
};

export default Cat;

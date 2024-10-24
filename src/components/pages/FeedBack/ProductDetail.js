/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

const ProductDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //Slider
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //-----------------------------------------

  //Admin Token
  const token = localStorage.getItem("VendorToken");

  // Fetch Single Product

  const FetchSingleProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://desh-deepak-backend.herokuapp.com/api/v1/vender/product/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(data);
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Network Error");
    }
  };

  useEffect(() => {
    FetchSingleProduct();
  }, [axios, setData, toast, setLoading]);

  //-----------------------------------------------------------------------------

  //Delete Product

  const deleteProduct = async () => {
    let auth = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const data = await axios.delete(
        `https://desh-deepak-backend.herokuapp.com/api/v1/admin/product/${id}`,
        auth
      );
      toast.success("Product Deleted SuccessFully");
      navigate("/product");
    } catch (err) {
      console.log(err);
      toast.error("Network Error Please try again later");
    }
  };

  return (
    <>
      <Row>
        <Col md={6}>
          {data?.product?.data.length === 1 ? (
            <img
              src={data?.data?.images?.[0]?.url}
              className="img-large"
              style={{ height: "400px" }}
            />
          ) : (
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              variant="dark"
            >
              {data?.data?.images?.map((i, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 "
                    style={{ height: "400px" }}
                    src={i.url}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1> {data?.data?.name} </h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5> Rating : {data?.data?.ratings} </h5>
                  <h5>Number of Reviews : {data?.data?.numOfReviews} </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price : ₹{data?.data?.price}{" "}
                </ListGroup.Item>
                <ListGroup.Item>Stock : {data?.data?.Stock} </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Categry : {data?.data?.category}{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  ColorAvailbale :{" "}
                  {data?.data?.coloursAvailable.map((i, index) => (
                    <span key={index}> {i} </span>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  Size Availbale :{" "}
                  {data?.data?.sizesAvailable.map((i, index) => (
                    <span key={index}> {i} </span>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <Button
                    style={{ width: "100%" }}
                    variant="outline-danger"
                    onClick={() => deleteProduct()}
                  >
                    {" "}
                    Delete{" "}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "10%",
        }}
      >
        <Card style={{ color: "black", marginTop: "5%", width: "40%" }}>
          <Card.Body>Description : {data?.data?.description}</Card.Body>
        </Card>
        <Card style={{ color: "black", marginTop: "5%", width: "40%" }}>
          <Card.Title style={{ textAlign: "center", paddingTop: "2%" }}>
            {" "}
            Reviews{" "}
          </Card.Title>
          <Card.Body
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "10px",
            }}
          >
            {data?.data?.reviews?.map((i, index) => (
              <Card key={index}>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>User Name : {i.name} </ListGroup.Item>
                    <ListGroup.Item>Rating : {i.rating} </ListGroup.Item>
                    <ListGroup.Item> Comment : {i.comment} </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default HOC(ProductDetail);

import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { addToCart } from "../slices/cartSlice";

function ProductPage() {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  useEffect(() => {
    fetch("/api/v1/products/" + id)
      .then((resp) => resp.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <Container className="my-4">
        <Link to="/" className="my-2 btn bg-primary text-white">
          Go Back
        </Link>
        <Row>
          <Col md={5}>
            <Image src={products.image} fluid></Image>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{products.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{products.description}</p>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating value={products.rating} text={products.numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <strong>${products.price}</strong>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                {" "}
                <Row>
                  <Col>Price</Col>
                  <Col>${products.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    <strong>
                      {" "}
                      {products.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Control
                  as="select"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[
                    ...Array(products.countInStock)
                      .keys()
                      .map((x) => <option key={x + 1}>{x + 1}</option>),
                  ]}
                </Form.Control>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="text-end">
                    <Button
                      disabled={products.countInStock <= 0}
                      onClick={() =>
                        addToCartHandler({ ...products, qty: Number(qty) })
                      }
                    >
                      Add to Cart
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default ProductPage;

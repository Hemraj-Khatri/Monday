import { useState } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { addToCart } from "../slices/cartSlice";
import { useGetProductByIdQuery } from "../slices/productSlice";
function ProductPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const { data: products, isLoading, error } = useGetProductByIdQuery(id);

  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
    navigate("/cart");
  };
  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <Row className="my-3">
          <Col md={5}>
            <Image src={products.image} fluid />
          </Col>

          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{products.name}</h2>{" "}
              </ListGroup.Item>

              <ListGroup.Item>
                {" "}
                <p>{products.description}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={products.rating} text={products.numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <p>${products.price}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <p>Price</p>
                  </Col>
                  <Col>
                    <p>${products.price}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <p>Status</p>
                  </Col>
                  <Col>
                    <strong>
                      {products.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                as="select"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              >
                {[...Array(products.countInStock).keys()].map((x) => (
                  <option key={x + 1}>{x + 1}</option>
                ))}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="text-end">
                  <Col>
                    <Button
                      disabled={products.countInStock <= 0}
                      onClick={() =>
                        addToCartHandler({ ...products, qty: Number(qty) })
                      }
                    >
                      Add To Cart
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
}
export default ProductPage;

import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { addToCart, removeCart } from "../slices/cartSlice";
function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const updateCartQty = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const removeCartItem = (item) => {
    dispatch(removeCart(item));
  };
  return (
    <>
      {cartItems.length <= 0 ? (
        <Message variant="primary">
          Cart is Empty <Link to="/"> Go Back</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item>
                  <Row className="d-flex align-items-center">
                    <Col md={3}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item._id}`}>
                        <h5>{item.name}</h5>
                      </Link>
                    </Col>
                    <Col>
                      <strong>${(item.price * item.qty).toFixed(2)}</strong>
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          updateCartQty(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        variant="light"
                        onClick={() => removeCartItem(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>
                  Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  Products
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Sub total</Col>
                  <Col>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.price * item.qty, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivery Charge</Col>
                  <Col>$5</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Cost</Col>
                  <Col>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 5)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="text-end">
                  <Col>
                    <Link
                      to="/login?redirect=/shipping"
                      className="btn btn-primary"
                    >
                      Checkout
                    </Link>
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
export default CartPage;

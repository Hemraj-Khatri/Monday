import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item>
                <Row>
                  <Col md={3}>
                    <Image src={item.image} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item._id}`}>
                      <h3>{item.name}</h3>
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
        <Col md={4}></Col>
      </Row>
    </>
  );
}
export default CartPage;

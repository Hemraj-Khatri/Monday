import { useState } from "react";
import { Badge, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../components/Message";
import {
  useChangeStatusMutation,
  useGetOrderByIdQuery,
} from "../slices/orderSlice";
import { orderStatusColors } from "../utils/orderStatusColors";

function OrderPage() {
  const [updateOrderStatus, { isLoading: updateLoading }] =
    useChangeStatusMutation();

  const [isEdit, setIsEdit] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const { id } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderByIdQuery(id);
  const { userInfo } = useSelector((state) => state.auth);
  const updateStatusHandler = async (id, status) => {
    try {
      let resp = await updateOrderStatus({ id, status }).unwrap();
      refetch();
      setIsEdit(false);
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <h2>Loding.....</h2>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Shipping</h3>
                <p>
                  Name: {order.shippingAddress.recipient} |
                  {order.shippingAddress.phone} <br />
                  Address {order.shippingAddress.city}
                </p>
                {order.isDelivered ? (
                  <Message>Delivered At{order.deliveredArt}</Message>
                ) : (
                  <Message variant="danger"> Not Delevered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>Payment</h3>
                <p>Mode: COD</p>
                {order.isPaid ? (
                  <Message>Paid On{order.deliveredArt}</Message>
                ) : (
                  <Message variant="danger"> Not Paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <ListGroup>
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          {item.qty} X {item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card className="mt-5">
              <ListGroup>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingCharge}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>Status</Col>
                    <Col md={6}>
                      {isEdit ? (
                        <Form.Control
                          as="select"
                          onChange={(e) =>
                            updateStatusHandler(order._id, e.target.value)
                          }
                        >
                          <option>pending</option>
                          <option>in progress</option>
                          <option>cancelled</option>
                          <option>delivered</option>
                        </Form.Control>
                      ) : (
                        <Badge bg={orderStatusColors[order.status]}>
                          {order.status}
                        </Badge>
                      )}
                    </Col>
                    {userInfo && userInfo.isAdmin && !order.isDelivered && (
                      <Col>
                        <FaEdit onClick={() => setIsEdit(true)} />
                      </Col>
                    )}
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
export default OrderPage;

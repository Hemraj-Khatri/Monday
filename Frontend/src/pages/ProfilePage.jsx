import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderSlice";
import { useUpdateUserProfileMutation } from "../slices/userApiSlice";
function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUserProfile, { isLoading: updateProfileLoading }] =
    useUpdateUserProfileMutation();
  const {
    data: orders,
    isLoading: orderLoading,
    error,
  } = useGetMyOrdersQuery();

  const dispatch = useDispatch();
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      if (password != confirmPassword) {
        toast.error("password not match");
      } else {
        let resp = await updateUserProfile({
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(resp.user));
        toast.success(resp.message);
      }
    } catch (error) {
      toast.error(error.data.error);
    }
  };
  return (
    <>
      <Row>
        <Col md={3}>
          <h3>Profile</h3>
          <Form onSubmit={updateProfileHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Control
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="my-3">
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="my-3">
              <Form.Control
                type="password"
                placeholder="ConfirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button variant="dark" type="submit">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h3>My Orders</h3>
          {orderLoading ? (
            <h2>loading........</h2>
          ) : error ? (
            <Message>{error.data.error}</Message>
          ) : (
            <Table responsive striped hover className="table-sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Total Amount</th>
                  <th>Delivered</th>
                  <th>paid</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>

                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isDelivered ? (
                        order.delivered
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isPaid ? (
                        order.deleveredAt
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <Button variant="dark" className="btn btn-sm">
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
}
export default ProfilePage;

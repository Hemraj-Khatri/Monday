import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserProfileMutation } from "../slices/userApiSlice";
function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
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
        </Col>
      </Row>
    </>
  );
}
export default ProfilePage;

import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import { useUserLogoutMutation } from "../slices/userApiSlice";
import SearchBox from "./SearchBox";
function Header() {
  const { cartItems } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);

  const [userLogout, { isLoading }] = useUserLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogoutHandler = async () => {
    try {
      let resp = await userLogout().unwrap();
      dispatch(logout());
      toast.success(resp.message);
      navigate("/login");
    } catch (error) {
      toast.success(error.message);
    }
  };

  return (
    <Navbar expand="lg" variant="dark" bg="dark" className="sticky-top">
      <Container>
        <NavLink to="/" className="navbar-brand">
          <Navbar.Brand>Online Shopping</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <SearchBox />
            <NavLink to="/cart" className="nav-link">
              <FaShoppingCart />
              Cart{" "}
              {cartItems.length > 0 && (
                <Badge>
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </Badge>
              )}
            </NavLink>

            {userInfo ? (
              <NavDropdown title={userInfo.name}>
                <NavDropdown.Item
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={userLogoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink to="/login" className="nav-link">
                <FaUser />
                Login
              </NavLink>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin">
                <LinkContainer to={`/admin/orders`}>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Product</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

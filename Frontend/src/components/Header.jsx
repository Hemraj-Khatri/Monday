import { Badge } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <NavLink to="/" className="navbar-brand">
          <Navbar.Brand>Online Shopping</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/cart" className="nav-link">
              <FaShoppingCart />
              Cart{" "}
              {cartItems.length > 0 && (
                <Badge>
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </Badge>
              )}
            </NavLink>

            <NavLink to="/login" className="nav-link">
              <FaUser />
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

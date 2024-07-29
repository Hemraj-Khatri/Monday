import { Badge } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaCartPlus, FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="md">
        <Container>
          <NavLink to="/" className="navbar-brand">
            <Navbar.Brand>Online Shopping</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto ">
              <NavLink to="/cart" className="nav-link">
                <FaCartPlus />
                Cart
                {cartItems.length > 0 && (
                  <Badge>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </NavLink>

              <NavLink to="/login" className="nav-link">
                <FaRegUser />
                Login
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

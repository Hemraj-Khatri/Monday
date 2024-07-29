import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Product from "../components/Product";
function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/v1/products")
      .then((resp) => resp.json())
      .then((data) => setProducts(data))
      .catch((err) =>
        console.log("error when fetch api from backend " + err.message)
      );
  }, []);
  return (
    <>
      <Container>
        <Row>
          {products.map((product) => (
            <Col sm={12} md={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
export default HomePage;

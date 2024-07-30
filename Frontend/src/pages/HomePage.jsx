import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/v1/products")
      .then((resp) => resp.json())
      .then((data) => setProducts(data))
      .catch((err) =>
        console.log("Error while fetching product from backend" + err.message)
      );
  }, []);
  return (
    <>
      <Row>
        <h1>Latest Product</h1>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xlg={2} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}
export default HomePage;

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card className="my-3 p-3">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="text-truncate">{product.name}</Card.Title>
        </Link>
        <Card.Text className="text-truncate">{product.description}</Card.Text>
        <Rating value={product.rating} text={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;

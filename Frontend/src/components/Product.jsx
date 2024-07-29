import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card className="p-2 my-2">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="col-12 text-truncate">
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text className="col-12 text-truncate">
          {product.description}
        </Card.Text>
        <Card.Text>
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Text>
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;

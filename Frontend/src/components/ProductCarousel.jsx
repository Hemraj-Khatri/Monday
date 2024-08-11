import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";
import { useGetTopProductsQuery } from "../slices/productSlice";
import Message from "./Message";
function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <></>
  ) : error ? (
    <Message variant={danger}>{error.data.error}</Message>
  ) : (
    <Carousel pause="hover" className="mb-4 bg-light ">
      {products.map((product) => (
        <Carousel.Item key={product._id} className="carousel">
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} fluid />
          </Link>
          <Carousel.Caption className="carousel-caption">
            {product.name} - {product.price}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
export default ProductCarousel;

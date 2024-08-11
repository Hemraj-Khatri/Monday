import { useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Rating from "../components/Rating";
import "../index.css";
import { addToCart } from "../slices/cartSlice";
import {
  useAddReviewMutation,
  useGetProductByIdQuery,
} from "../slices/productSlice";
function ProductPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: products, isLoading, error } = useGetProductByIdQuery(id);
  const { userInfo } = useSelector((state) => state.auth);
  const [addReview, { isLoading: reviewLoading }] = useAddReviewMutation();
  const addReviewHandler = async (e) => {
    e.preventDefault();
    try {
      let resp = await addReview({
        _id: products._id,
        rating,
        comment,
      }).unwrap();
      console.log(resp);

      toast.success(resp.Message);
    } catch (error) {
      toast.error(error.data.error);
    }
  };

  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
    navigate("/cart");
  };
  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <Meta title={products.name} description={products.description} />
          <Row className="my-3">
            <Col md={5}>
              <Image src={products.image} fluid />
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{products.name}</h2>{" "}
                </ListGroup.Item>

                <ListGroup.Item>
                  {" "}
                  <p>{products.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={products.rating} text={products.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <p>${products.price}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <p>Price</p>
                    </Col>
                    <Col>
                      <p>${products.price}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <p>Status</p>
                    </Col>
                    <Col>
                      <strong>
                        {products.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item
                  as="select"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(products.countInStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="text-end">
                    <Col>
                      <Button
                        disabled={products.countInStock <= 0}
                        onClick={() =>
                          addToCartHandler({ ...products, qty: Number(qty) })
                        }
                      >
                        Add To Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row className="my-3">
            <Col md={6} className="reviews">
              <h2>Customer Reviews</h2>
              {products.reviews.length > 0 ? (
                products.reviews.map((review) => (
                  <>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </>
                ))
              ) : (
                <Message>No Reviews Yet</Message>
              )}
              <h2 className="my-4">Add Review</h2>

              {userInfo ? (
                <Form onSubmit={addReviewHandler}>
                  <Form.Group controlId="rating" className="my-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value={0}>Select Rating...</option>
                      <option value={1}>1 - Poor</option>
                      <option value={2}>2 - Satisfactory</option>
                      <option value={3}>3 - Good</option>
                      <option value={4}>4 - Very Good </option>
                      <option value={5}>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment" className="my-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write Comment"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="dark" className="my-3">
                    Add
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">Signin</Link> to review
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
export default ProductPage;

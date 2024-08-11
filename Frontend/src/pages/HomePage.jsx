import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import { useGetProductsQuery } from "../slices/productSlice";

function HomePage() {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   fetch("/api/v1/products")
  //     .then((resp) => resp.json())
  //     .then((data) => setProducts(data))
  //     .catch((err) =>
  //       console.log("Error while fetching product from backend" + err.message)
  //     );
  // }, []);
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      <Meta />
      {isLoading ? (
        <h1>Loading....</h1>
      ) : error ? (
        <Message variant="primary">{error.data.error}</Message>
      ) : (
        <>
          <Row>
            {!keyword && <ProductCarousel />}
            {keyword ? <h1>Search result</h1> : <h1>Latest Product</h1>}
            {data.products.map((product) => (
              <Col sm={12} md={6} lg={4} xlg={2} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={data.page} pages={data.pages} />
        </>
      )}
    </>
  );
}
export default HomePage;

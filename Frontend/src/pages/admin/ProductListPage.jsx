import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productSlice";

function ProductListPage() {
  const { pageNumber = 1 } = useParams(); // Default to 1 if not provided
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  const [addProduct, { isLoading: productLoading }] = useAddProductMutation();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const addProductHandler = async () => {
    try {
      let resp = await addProduct().unwrap();
      toast.success(resp.message);
    } catch (error) {
      toast.error(error.data?.error || "Failed to add product.");
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the product?")) {
      try {
        let resp = await deleteProduct(id).unwrap();
        toast.success(resp.message);
      } catch (err) {
        toast.error(err.data?.error || "Failed to delete product.");
      }
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (error) {
    return (
      <Message variant="danger">
        {error?.data?.error || "An unexpected error occurred."}
      </Message>
    );
  }

  if (!data?.products) {
    return <Message variant="danger">No products found.</Message>;
  }

  return (
    <>
      <Row className="my-4">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button variant="dark" size="sm" onClick={addProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {data.products.length > 0 ? (
        <>
          <Table responsive striped hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Stock</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/products/${product._id}/edit`}
                      size="sm"
                      variant="light"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="ms-2"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={data.page} pages={data.pages} admin={true} />
        </>
      ) : (
        <Message>No products found.</Message>
      )}
    </>
  );
}

export default ProductListPage;

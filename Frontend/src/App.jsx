import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Header />
      <div className="d-flex flex-column min-vh-100">
        <Container className="flex-grow-1">
          {/* main content goes here */}
          <Outlet />
        </Container>
        <Footer />
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
}

export default App;

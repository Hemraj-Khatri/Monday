import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;

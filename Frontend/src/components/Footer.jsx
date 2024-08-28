import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <div className="mb-3">
              <a
                href="https://www.facebook.com/hemraj.khatri404"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://www.youtube.com/@hemrajkhatri123/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://github.com/Hemraj-Khatri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/hemraj-khatri/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-2"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Online Shopping. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

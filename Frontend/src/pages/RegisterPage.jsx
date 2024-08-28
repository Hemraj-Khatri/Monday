import React, { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { useSignupMutation } from "../slices/userApiSlice"; // Import the signup mutation hook

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation(); // Hook to call the signup mutation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let resp = await signup({ name, email, password }).unwrap(); // Call the signup mutation
      navigate("/login");
      toast.success(resp.message);
      // Handle successful registration (e.g., redirect to login or show a success message)
    } catch (err) {
      // Handle error (e.g., show error message)
      console.error("Registration failed:", err);
    }
  };

  return (
    <div>
      <FormContainer className="min-vh-100">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup controlId="email" className="my-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button className="mt-2" type="submit" disabled={isLoading}>
            Signup
          </Button>
          {error && <p className="text-danger">{error.message}</p>}
          <p>
            Already Signup? <Link to="/login">Login</Link>
          </p>
        </Form>
      </FormContainer>
    </div>
  );
}

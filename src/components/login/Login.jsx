import "./Login.css";
import { useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import logo from "./logo-unac.png";

const Login = () => {
  const [data, setData] = useState({ email: "", contrasena: "" });
  const [error, setError] = useState("");

  const baseUrl =
    "https://sgacfi-back-mern.up.railway.app/sgacfi-api/auth/ingreso";

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(baseUrl, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
      console.log("Ingreso éxitoso");
    } catch (e) {
      if (e.response && e.response.status >= 400 && e.response.status <= 500) {
        setError(e.response.data.message);
      }
    }
  };

  return (
    <div className="main">
      <Container fluid>
        <Row>
          <Col>
            <div className="img-login"></div>
          </Col>
          <Col>
            <div className="ct-logo">
              <img src={logo} className="form-image" alt="logo-unac" />
            </div>
            <div className="ct-form">
              <Form className="text-start" onSubmit={handleSubmit}>
                <Container fluid style={{marginBottom: "24px"}}>
                  <span style={{
                    fontWeight: "400",
                    fontSize: "1rem",
                    color: "#2D3748"
                  }}>Welcome back</span>
                  <h2 style={{
                    fontWeight: "700",
                    fontSize: "30px",
                    color: "#1A202C"
                  }}>Login to your account</h2>
                </Container>

                <Form.Group className="mb-1">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                  />
                </Form.Group>

                <Form.Group style={{marginBottom: "41px"}}>
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="contrasena"
                    onChange={handleChange}
                    value={data.contrasena}
                    required
                  />
                </Form.Group>

                {error && <div className="error_msg mb-2">{error}</div> }

                <div>
                  <Button
                    className="form-btn w-100"
                    type="submit"
                  >
                    Login Now
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    variant: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8080";

  // Gestione cambio campi input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit del Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertInfo({ show: false, variant: "", message: "" });
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);

        setAlertInfo({
          show: true,
          variant: "success",
          message: "Login effettuato con successo! Reindirizzamento...",
        });

        setTimeout(() => {
          navigate("/clienti");
        }, 1000);
      } else {
        setAlertInfo({
          show: true,
          variant: "danger",
          message: data.message || "Credenziali non valide. Riprova.",
        });
      }
    } catch (error) {
      console.error("Errore di connessione:", error);
      setAlertInfo({
        show: true,
        variant: "danger",
        message: "Impossibile connettersi al server backend.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Autocompilazione per i pulsanti Demo
  const fillDemo = (role) => {
    switch (role) {
      case "admin":
        setFormData({ username: "admin@epic.energy", password: "admin123" });
        break;
      case "user":
        setFormData({
          username: "user@epic.energy",
          password: "user123",
        });
        break;
      default:
        break;
    }
  };

  return (
    <Container fluid className="p-0 vh-100 login-wrapper">
      <Row className="g-0 h-100">
        <Col
          lg={6}
          className="left-panel d-flex flex-column justify-content-between p-5 text-white"
        >
          <div className="brand-logo d-flex align-items-center gap-2">
            <div className="logo-icon"></div>
            <span className="fw-bold tracking-wide">EPIC ENERGY</span>
          </div>

          <div className="hero-content my-auto">
            <p className="tagline text-uppercase fw-semibold mb-3">
              CRM · ENERGY SERVICES
            </p>
            <h1 className="display-4 fw-semibold mb-3">
              Gestisci clienti, contratti e fatture in un solo posto.
            </h1>
            <p className="subtitle opacity-75 fs-6 leading-relaxed">
              La piattaforma per il team di EPIC Energy Services: anagrafiche
              business, indirizzi, fatturazione e ruoli, con accesso sicuro via
              token.
            </p>
          </div>

          <Row className="stats-row g-4 pt-4">
            <Col xs={4}>
              <h3 className="fw-bold m-0">1.240</h3>
              <small className="opacity-75">Clienti business</small>
            </Col>
            <Col xs={4}>
              <h3 className="fw-bold m-0">€ 18,4M</h3>
              <small className="opacity-75">Fatturato gestito</small>
            </Col>
            <Col xs={4}>
              <h3 className="fw-bold m-0">99,9%</h3>
              <small className="opacity-75">Uptime API</small>
            </Col>
          </Row>
        </Col>

        <Col
          lg={6}
          className="right-panel d-flex align-items-center justify-content-center p-4"
        >
          <div className="form-box w-100" style={{ maxWidth: "380px" }}>
            <h2 className="fw-bold text-dark mb-1">Accedi</h2>
            <p className="text-muted mb-4 small">
              Inserisci le tue credenziali per continuare.
            </p>

            {alertInfo.show && (
              <Alert
                variant={alertInfo.variant}
                className="py-2 px-3 small mb-3"
              >
                {alertInfo.message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label className="fw-semibold small text-dark">
                  Email o username
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="mario.rossi@epic.energy"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="custom-input"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label className="fw-semibold small text-dark">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="custom-input"
                />
              </Form.Group>
              <Button
                type="submit"
                disabled={loading}
                className="w-100 btn-brand py-2 fw-semibold"
              >
                {loading ? "Accesso in corso..." : "Entra"}
              </Button>
            </Form>

            <div className="demo-section mt-4 text-center">
              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="flex-fill btn-demo fw-semibold"
                  onClick={() => fillDemo("admin")}
                >
                  Admin
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="flex-fill btn-demo fw-semibold"
                  onClick={() => fillDemo("user")}
                >
                  User
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

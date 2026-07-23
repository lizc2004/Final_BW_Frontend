import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NuovoCliente() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    ragioneSociale: "",
    partitaIva: "",
    email: "",
    pec: "",
    telefono: "",
    sedeLegale: "",
    comune: "",
    provincia: "",
    cap: "",
    fatturatoAnnuale: "",
  });

  const [errore, setErrore] = useState("");
  const [loading, setLoading] = useState(false);

  function aggiornaCampo(event) {
    const { name, value } = event.target;

    setCliente((clientePrecedente) => ({
      ...clientePrecedente,
      [name]: value,
    }));
  }

  async function creaCliente(event) {
    event.preventDefault();

    setLoading(true);
    setErrore("");

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        "http://localhost:8080/clienti",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...cliente,
            fatturatoAnnuale: cliente.fatturatoAnnuale
              ? Number(cliente.fatturatoAnnuale)
              : null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Errore ${response.status}: impossibile creare il cliente`
        );
      }

      navigate("/clienti");
    } catch (error) {
      console.error(error);
      setErrore(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-4">
      <div className="mb-4">
        <h2 className="mb-1">Nuovo cliente</h2>
        <p className="text-secondary mb-0">
          Inserisci i dati del cliente
        </p>
      </div>

      {errore && (
        <div className="alert alert-danger">
          {errore}
        </div>
      )}

      <Form onSubmit={creaCliente}>
        <div className="row g-3">
          <Form.Group className="col-md-6">
            <Form.Label>Ragione sociale</Form.Label>

            <Form.Control
              type="text"
              name="ragioneSociale"
              value={cliente.ragioneSociale}
              onChange={aggiornaCampo}
              required
            />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Partita IVA</Form.Label>

            <Form.Control
              type="text"
              name="partitaIva"
              value={cliente.partitaIva}
              onChange={aggiornaCampo}
              required
            />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              name="email"
              value={cliente.email}
              onChange={aggiornaCampo}
            />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>PEC</Form.Label>

            <Form.Control
              type="email"
              name="pec"
              value={cliente.pec}
              onChange={aggiornaCampo}
            />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Telefono</Form.Label>

            <Form.Control
              type="text"
              name="telefono"
              value={cliente.telefono}
              onChange={aggiornaCampo}
            />
          </Form.Group>

          <Form.Group className="col-md-6">
            <Form.Label>Fatturato annuale</Form.Label>

            <Form.Control
              type="number"
              name="fatturatoAnnuale"
              value={cliente.fatturatoAnnuale}
              onChange={aggiornaCampo}
              min="0"
            />
          </Form.Group>

          <Form.Group className="col-12">
            <Form.Label>Sede legale</Form.Label>

            <Form.Control
              type="text"
              name="sedeLegale"
              value={cliente.sedeLegale}
              onChange={aggiornaCampo}
            />
          </Form.Group>

          <Form.Group className="col-md-5">
            <Form.Label>Comune</Form.Label>

            <Form.Control
              type="text"
              name="comune"
              value={cliente.comune}
              onChange={aggiornaCampo}
            />
          </Form.Group>

          <Form.Group className="col-md-4">
            <Form.Label>Provincia</Form.Label>

            <Form.Control
              type="text"
              name="provincia"
              value={cliente.provincia}
              onChange={aggiornaCampo}
              maxLength={2}
            />
          </Form.Group>

          <Form.Group className="col-md-3">
            <Form.Label>CAP</Form.Label>

            <Form.Control
              type="text"
              name="cap"
              value={cliente.cap}
              onChange={aggiornaCampo}
              maxLength={5}
            />
          </Form.Group>
        </div>

        <div className="d-flex gap-2 mt-4">
          <Button
            type="button"
            variant="outline-secondary"
            onClick={() => navigate("/clienti")}
          >
            Annulla
          </Button>

          <Button
            type="submit"
            variant="success"
            disabled={loading}
          >
            {loading ? "Salvataggio..." : "Crea cliente"}
          </Button>
        </div>
      </Form>
    </section>
  );
}
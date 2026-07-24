import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

function NuovoCliente() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    ragioneSociale: "",
    partitaIva: "",
    codiceFiscale: "",
    email: "",
    tipoCliente: "",
    fatturatoAnnuale: "",
    via: "",
    civico: "",
    cap: "",
    comuneId: "",
  });

  const [comuni, setComuni] = useState([]);
  const [loadingComuni, setLoadingComuni] = useState(true);
  const [loadingSalvataggio, setLoadingSalvataggio] = useState(false);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const caricaComuniCalabria = async () => {
      const token = localStorage.getItem("accessToken");

      const provinceCalabresi = [
        "Catanzaro",
        "Cosenza",
        "Crotone",
        "Reggio Calabria",
        "Vibo Valentia",
      ];

      try {
        setLoadingComuni(true);
        setErrore("");

        const richieste = provinceCalabresi.map((provincia) =>
          fetch(
            `${API_URL}/comuni/provincia/${encodeURIComponent(provincia)}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );

        const risposte = await Promise.all(richieste);

        const rispostaConErrore = risposte.find(
          (response) => !response.ok
        );

        if (rispostaConErrore) {
          throw new Error(
            `Errore ${rispostaConErrore.status} durante il caricamento dei comuni`
          );
        }

        const listeComuni = await Promise.all(
          risposte.map((response) => response.json())
        );

        const tuttiIComuni = listeComuni
          .flat()
          .filter(
            (comune, indice, array) =>
              indice ===
              array.findIndex(
                (comuneConfrontato) =>
                  comuneConfrontato.id === comune.id
              )
          )
          .sort((a, b) =>
            a.nome.localeCompare(b.nome, "it", {
              sensitivity: "base",
            })
          );

        setComuni(tuttiIComuni);
      } catch (error) {
        console.error(
          "Errore durante il caricamento dei comuni:",
          error
        );

        setErrore(
          "Non è stato possibile caricare i comuni della Calabria."
        );
      } finally {
        setLoadingComuni(false);
      }
    };

    caricaComuniCalabria();
  }, []);

  const aggiornaCampo = (event) => {
    const { name, value } = event.target;

    setCliente((clientePrecedente) => ({
      ...clientePrecedente,
      [name]: value,
    }));
  };

  const salvaCliente = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!cliente.comuneId) {
      setErrore("Seleziona un comune.");
      return;
    }

    const payload = {
      ragioneSociale: cliente.ragioneSociale.trim(),
      partitaIva: cliente.partitaIva.trim(),
      codiceFiscale: cliente.codiceFiscale.trim(),
      email: cliente.email.trim(),
      tipoCliente: cliente.tipoCliente,

      fatturatoAnnuale:
        cliente.fatturatoAnnuale === ""
          ? null
          : Number(cliente.fatturatoAnnuale),

      via: cliente.via.trim(),
      civico: cliente.civico.trim(),
      cap: cliente.cap.trim(),
      comuneId: Number(cliente.comuneId),

      dataUltimoContatto: null,
      pec: null,
      telefono: null,
      emailContatto: null,
      nomeContatto: null,
      cognomeContatto: null,
      telefonoContatto: null,
    };

    try {
      setLoadingSalvataggio(true);
      setErrore("");

      const response = await fetch(`${API_URL}/clienti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let messaggioErrore = `Errore ${response.status}: impossibile creare il cliente`;

        try {
          const datiErrore = await response.json();

          if (typeof datiErrore.message === "string") {
            messaggioErrore = datiErrore.message;
          } else if (typeof datiErrore.error === "string") {
            messaggioErrore = datiErrore.error;
          } else if (Array.isArray(datiErrore.errors)) {
            messaggioErrore = datiErrore.errors.join(", ");
          } else if (Array.isArray(datiErrore.listaErrori)) {
            messaggioErrore = datiErrore.listaErrori.join(", ");
          }
        } catch {
          // Mantiene il messaggio generico.
        }

        throw new Error(messaggioErrore);
      }

      navigate("/clienti");
    } catch (error) {
      console.error(
        "Errore durante la creazione del cliente:",
        error
      );

      setErrore(error.message);
    } finally {
      setLoadingSalvataggio(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={9}>
          <div className="mb-4">
            <h2 className="fw-bold mb-1">Nuovo cliente</h2>

            <p className="text-muted mb-0">
              Inserisci i dati del cliente e della sede legale.
            </p>
          </div>

          {errore && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setErrore("")}
            >
              {errore}
            </Alert>
          )}

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Form onSubmit={salvaCliente}>
                <Row className="g-3">
                  <Col xs={12}>
                    <h5 className="fw-bold mb-0">
                      Dati del cliente
                    </h5>
                  </Col>

                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label>Ragione sociale *</Form.Label>

                    <Form.Control
                      type="text"
                      name="ragioneSociale"
                      value={cliente.ragioneSociale}
                      onChange={aggiornaCampo}
                      placeholder="Inserisci la ragione sociale"
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label>Tipo cliente *</Form.Label>

                    <Form.Select
                      name="tipoCliente"
                      value={cliente.tipoCliente}
                      onChange={aggiornaCampo}
                      required
                    >
                      <option value="">
                        Seleziona il tipo di cliente
                      </option>
                      <option value="PA">
                        Pubblica Amministrazione
                      </option>
                      <option value="SAS">SAS</option>
                      <option value="SPA">SPA</option>
                      <option value="SRL">SRL</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label>Partita IVA *</Form.Label>

                    <Form.Control
                      type="text"
                      name="partitaIva"
                      value={cliente.partitaIva}
                      onChange={aggiornaCampo}
                      maxLength={11}
                      pattern="[0-9]{11}"
                      title="La partita IVA deve contenere 11 cifre"
                      placeholder="Inserisci la partita IVA"
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label>Codice fiscale *</Form.Label>

                    <Form.Control
                      type="text"
                      name="codiceFiscale"
                      value={cliente.codiceFiscale}
                      onChange={aggiornaCampo}
                      maxLength={16}
                      placeholder="Inserisci il codice fiscale"
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label>Email *</Form.Label>

                    <Form.Control
                      type="email"
                      name="email"
                      value={cliente.email}
                      onChange={aggiornaCampo}
                      placeholder="Inserisci l'email"
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={6}>
                    <Form.Label>Fatturato annuale</Form.Label>

                    <Form.Control
                      type="number"
                      name="fatturatoAnnuale"
                      value={cliente.fatturatoAnnuale}
                      onChange={aggiornaCampo}
                      min="0"
                      step="0.01"
                      placeholder="Inserisci il fatturato annuale"
                    />
                  </Form.Group>

                  <Col xs={12} className="mt-4">
                    <hr />

                    <h5 className="fw-bold mb-0">
                      Sede legale
                    </h5>
                  </Col>

                  <Form.Group as={Col} xs={12} md={8}>
                    <Form.Label>Via *</Form.Label>

                    <Form.Control
                      type="text"
                      name="via"
                      value={cliente.via}
                      onChange={aggiornaCampo}
                      placeholder="Inserisci la via"
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label>Numero civico *</Form.Label>

                    <Form.Control
                      type="text"
                      name="civico"
                      value={cliente.civico}
                      onChange={aggiornaCampo}
                      placeholder="Es. 15"
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label>CAP *</Form.Label>

                    <Form.Control
                      type="text"
                      name="cap"
                      value={cliente.cap}
                      onChange={aggiornaCampo}
                      maxLength={5}
                      pattern="[0-9]{5}"
                      title="Il CAP deve contenere 5 cifre"
                      placeholder="Es. 88046"
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={8}>
                    <Form.Label>Comune *</Form.Label>

                    <Form.Select
                      name="comuneId"
                      value={cliente.comuneId}
                      onChange={aggiornaCampo}
                      disabled={loadingComuni}
                      required
                    >
                      <option value="">
                        {loadingComuni
                          ? "Caricamento comuni..."
                          : "Seleziona il comune"}
                      </option>

                      {comuni.map((comune) => (
                        <option
                          key={comune.id}
                          value={comune.id}
                        >
                          {comune.nome}
                          {comune.provincia?.sigla
                            ? ` (${comune.provincia.sigla})`
                            : comune.provincia?.name
                              ? ` (${comune.provincia.name})`
                              : ""}
                        </option>
                      ))}
                    </Form.Select>

                    {loadingComuni && (
                      <div className="d-flex align-items-center gap-2 mt-2 text-muted">
                        <Spinner
                          animation="border"
                          size="sm"
                        />

                        <small>
                          Caricamento dei comuni calabresi...
                        </small>
                      </div>
                    )}
                  </Form.Group>

                  <Col
                    xs={12}
                    className="d-flex justify-content-end gap-2 mt-4"
                  >
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={() => navigate("/clienti")}
                      disabled={loadingSalvataggio}
                    >
                      Annulla
                    </Button>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={
                        loadingSalvataggio || loadingComuni
                      }
                    >
                      {loadingSalvataggio ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Salvataggio...
                        </>
                      ) : (
                        "Crea cliente"
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NuovoCliente;
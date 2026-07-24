import { useState } from "react"
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap"

const SendEmailForm = ({ token: propToken }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [foundCliente, setFoundCliente] = useState(null)
  const [searchError, setSearchError] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const [formData, setFormData] = useState({
    oggetto: "Rinnovo contratto fornitura energia 2026",
    messaggio: `Gentile referente,\n\nle scriviamo in merito al rinnovo del contratto di fornitura per l'anno 2026. Restiamo a disposizione per un incontro.\n\nCordiali saluti,\nEPIC Energy Services`,
  })

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  })

  const getToken = () => {
    return (
      propToken ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token")
    )
  }

  const handleSearchCliente = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setSearchError("")
    setFoundCliente(null)

    const jwtToken = getToken()

    try {
      const response = await fetch(
        `http://localhost:8080/clienti/cerca?query=${encodeURIComponent(searchQuery.trim())}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
          },
        },
      )

      if (response.status === 401) {
        throw new Error(
          "Sessione scaduta o non autorizzata. Effettua nuovamente il login.",
        )
      }

      if (!response.ok) {
        throw new Error("Cliente non trovato.")
      }

      const cliente = await response.json()
      setFoundCliente(cliente)
    } catch (err) {
      setSearchError(err.message || "Errore nella ricerca del cliente.")
    } finally {
      setIsSearching(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!foundCliente || !foundCliente.id) {
      setStatus({
        loading: false,
        success: null,
        error: "Cerca e seleziona prima un cliente valido.",
      })
      return
    }

    setStatus({ loading: true, success: null, error: null })

    const jwtToken = getToken()

    try {
      const response = await fetch(
        `http://localhost:8080/clienti/${foundCliente.id}/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
          },
          body: JSON.stringify({
            oggetto: formData.oggetto,
            messaggio: formData.messaggio,
          }),
        },
      )

      if (!response.ok) {
        throw new Error("Errore durante l'invio dell'email.")
      }

      setStatus({
        loading: false,
        success: `Email inviata con successo a ${foundCliente.ragioneSociale || foundCliente.nome}!`,
        error: null,
      })
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message })
    }
  }

  return (
    <Card
      className="shadow-sm border-0 rounded-4 mx-auto"
      style={{ maxWidth: "600px" }}
    >
      <Card.Body className="p-4">
        <Card.Title as="h4" className="fw-bold mb-1">
          Invia email al contatto cliente
        </Card.Title>
        <Card.Subtitle className="text-muted mb-4 small">
          Inserisci l'email o username per identificare il cliente.
        </Card.Subtitle>

        {status.success && <Alert variant="success">{status.success}</Alert>}
        {status.error && <Alert variant="danger">{status.error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSearch">
            <Form.Label className="fw-semibold text-secondary small">
              Cerca Cliente (Email o Username)
            </Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="es. l.bianchi@rossienergia.it o lucabianchi"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2"
              />
              <Button
                variant="outline-primary"
                onClick={handleSearchCliente}
                disabled={isSearching || !searchQuery}
              >
                {isSearching ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Cerca"
                )}
              </Button>
            </div>
            {searchError && (
              <small className="text-danger mt-1 d-block">{searchError}</small>
            )}
          </Form.Group>

          {foundCliente && (
            <Alert variant="info" className="py-2 small">
              <strong>Cliente trovato:</strong>{" "}
              {foundCliente.ragioneSociale || foundCliente.nome} (ID:{" "}
              {foundCliente.id})
            </Alert>
          )}

          <Form.Group className="mb-3" controlId="formOggetto">
            <Form.Label className="fw-semibold text-secondary small">
              Oggetto
            </Form.Label>
            <Form.Control
              type="text"
              name="oggetto"
              value={formData.oggetto}
              onChange={handleChange}
              required
              className="py-2"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formMessaggio">
            <Form.Label className="fw-semibold text-secondary small">
              Messaggio
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              name="messaggio"
              value={formData.messaggio}
              onChange={handleChange}
              required
              className="py-2"
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              type="submit"
              disabled={status.loading || !foundCliente}
              style={{ backgroundColor: "#288964", borderColor: "#288964" }}
              className="px-4 py-2 fw-semibold"
            >
              {status.loading ? "Invio in corso..." : "Invia email"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SendEmailForm

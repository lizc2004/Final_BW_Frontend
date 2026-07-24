import { useEffect, useState } from "react"
import { Modal, Form, Button, Alert } from "react-bootstrap"

const emptyForm = {
  data: "",
  importo: "",
  numero: "",
  clienteId: "",
  statoFatturaId: "",
}

const FatturaFormModal = ({
  show,
  onHide,
  onSalva,
  fatturaDaModificare,
  clienti,
  statiFattura,
}) => {
  const [form, setForm] = useState(emptyForm)
  const [errore, setErrore] = useState("")
  const [salvataggioInCorso, setSalvataggioInCorso] = useState(false)

  useEffect(() => {
    if (fatturaDaModificare) {
      setForm({
        data: fatturaDaModificare.data,
        importo: fatturaDaModificare.importo,
        numero: fatturaDaModificare.numero,
        clienteId: fatturaDaModificare.cliente?.id ?? "",
        statoFatturaId: fatturaDaModificare.statoFattura?.id ?? "",
      })
    } else {
      setForm(emptyForm)
    }
    setErrore("")
  }, [fatturaDaModificare, show])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrore("")
    setSalvataggioInCorso(true)

    try {
      await onSalva({
        data: form.data,
        importo: Number(form.importo),
        numero: form.numero,
        clienteId: Number(form.clienteId),
        statoFatturaId: Number(form.statoFatturaId),
      })
      onHide()
    } catch (err) {
      setErrore(err.message)
    } finally {
      setSalvataggioInCorso(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {fatturaDaModificare ? "Modifica fattura" : "Nuova fattura"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {errore && (
            <Alert variant="danger" className="py-2 small">
              {errore}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Numero</Form.Label>
            <Form.Control
              name="numero"
              value={form.numero}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Importo</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="importo"
              value={form.importo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              name="clienteId"
              value={form.clienteId}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona un cliente</option>
              {( Array.isArray(clienti)
                 ? clienti
                 : clienti?.content || []
               ).map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                {cliente.ragioneSociale}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stato</Form.Label>
            <Form.Select
              name="statoFatturaId"
              value={form.statoFatturaId}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona uno stato</option>
              {statiFattura.map((stato) => (
                <option key={stato.id} value={stato.id}>
                  {stato.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Annulla
          </Button>
          <Button variant="success" type="submit" disabled={salvataggioInCorso}>
            {salvataggioInCorso ? "Salvataggio..." : "Salva"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default FatturaFormModal

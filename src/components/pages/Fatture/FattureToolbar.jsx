import { Row, Col, Form, Button } from "react-bootstrap"

const FattureToolbar = ({
  clienti,
  statiFattura,
  filters,
  onFilterChange,
  onNuovaFattura,
}) => {
  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value })
  }

  return (
    <Row className="g-2 align-items-end mb-3">
      <Col md={2}>
        <Form.Label className="small text-muted mb-1">Cliente</Form.Label>
        <Form.Select
          name="clienteId"
          value={filters.clienteId}
          onChange={handleChange}
        >
          <option value="">Tutti</option>
          {(Array.isArray(clienti)
            ? clienti
            : clienti?.content || []
            ).map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
            {cliente.ragioneSociale}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col md={2}>
        <Form.Label className="small text-muted mb-1">Stato</Form.Label>
        <Form.Select
          name="statoId"
          value={filters.statoId}
          onChange={handleChange}
        >
          <option value="">Tutti</option>
          {statiFattura.map((stato) => (
            <option key={stato.id} value={stato.id}>
              {stato.nome}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col md={2}>
        <Form.Label className="small text-muted mb-1">Anno</Form.Label>
        <Form.Control
          type="number"
          name="anno"
          placeholder="es. 2026"
          value={filters.anno}
          onChange={handleChange}
        />
      </Col>

      <Col md={2}>
        <Form.Label className="small text-muted mb-1">
          Importo min
        </Form.Label>
        <Form.Control
          type="number"
          name="importoMin"
          value={filters.importoMin}
          onChange={handleChange}
        />
      </Col>

      <Col md={2}>
        <Form.Label className="small text-muted mb-1">
          Importo max
        </Form.Label>
        <Form.Control
          type="number"
          name="importoMax"
          value={filters.importoMax}
          onChange={handleChange}
        />
      </Col>

      <Col md={2} className="d-flex justify-content-end">
        <Button variant="success" onClick={onNuovaFattura}>
          + Nuova fattura
        </Button>
      </Col>
    </Row>
  )
}

export default FattureToolbar

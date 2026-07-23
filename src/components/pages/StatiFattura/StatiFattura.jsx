import { useEffect, useState } from "react"
import { Card, Badge, Form, Button, Alert, Spinner } from "react-bootstrap"
import { getStatiFattura, createStatoFattura } from "../../../Api/statoFatturaApi"
import { formatNomeStato, coloreStato } from "../../../utils/statoFatturaFormat"
import "./StatiFattura.css"

const StatiFattura = () => {
  const [statiFattura, setStatiFattura] = useState([])
  const [nuovoNome, setNuovoNome] = useState("")
  const [caricamento, setCaricamento] = useState(true)
  const [salvataggioInCorso, setSalvataggioInCorso] = useState(false)
  const [errore, setErrore] = useState("")

  const caricaStati = async () => {
    setCaricamento(true)
    setErrore("")
    try {
      const stati = await getStatiFattura()
      setStatiFattura(stati)
    } catch (err) {
      setErrore(err.message)
    } finally {
      setCaricamento(false)
    }
  }

  useEffect(() => {
    caricaStati()
  }, [])

  const handleAggiungi = async (e) => {
    e.preventDefault()
    setErrore("")
    setSalvataggioInCorso(true)

    try {
      await createStatoFattura({ nome: nuovoNome })
      setNuovoNome("")
      await caricaStati()
    } catch (err) {
      setErrore(err.message)
    } finally {
      setSalvataggioInCorso(false)
    }
  }

  return (
    <section className="stati-fattura-page">
      <h1>Stati fattura</h1>

      {errore && (
        <Alert variant="danger" className="py-2 small">
          {errore}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h2" className="h6 text-muted mb-3">
            Stati disponibili
          </Card.Title>

          {caricamento ? (
            <Spinner animation="border" size="sm" />
          ) : statiFattura.length === 0 ? (
            <p className="text-muted mb-0">Nessuno stato fattura presente.</p>
          ) : (
            <div className="d-flex flex-wrap gap-2">
              {statiFattura.map((stato) => (
                <Badge key={stato.id} bg={coloreStato(stato.nome)} className="stato-badge">
                  {formatNomeStato(stato.nome)}
                </Badge>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title as="h2" className="h6 text-muted mb-3">
            Aggiungi nuovo stato
          </Card.Title>
          <p className="text-muted small">
            Per modificare lo stato di una singola fattura usa il pulsante
            "Modifica" nella pagina Fatture: qui puoi solo definire quali
            stati sono disponibili nel gestionale.
          </p>

          <Form onSubmit={handleAggiungi} className="d-flex gap-2 align-items-start">
            <Form.Group className="flex-grow-1" controlId="nuovoStatoNome">
              <Form.Control
                name="nuovoStatoNome"
                placeholder="Nome nuovo stato (es. In contenzioso)"
                value={nuovoNome}
                onChange={(e) => setNuovoNome(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success" disabled={salvataggioInCorso}>
              {salvataggioInCorso ? "Aggiunta..." : "Aggiungi"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  )
}

export default StatiFattura

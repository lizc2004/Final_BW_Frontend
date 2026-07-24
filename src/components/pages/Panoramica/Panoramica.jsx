import { useEffect, useState } from "react"
import { Card, Col, Row, Badge, Spinner, Alert } from "react-bootstrap"
import { getFatture } from "../../../Api/fatturaApi"
import { getClienti } from "../../../Api/clienteApi"
import { formatNomeStato, coloreStato } from "../../../utils/statoFatturaFormat"
import { formatImporto } from "../../../utils/currency"
import "./Panoramica.css"

const Panoramica = () => {
  const [fatture, setFatture] = useState([])
  // null = non disponibile per il ruolo corrente (es. 403 su /clienti)
  const [clienti, setClienti] = useState(null)
  const [caricamento, setCaricamento] = useState(true)
  const [errore, setErrore] = useState("")

  useEffect(() => {
    const carica = async () => {
      setCaricamento(true)
      setErrore("")

      try {
        const pagina = await getFatture({ size: 1000 })
        setFatture(pagina.content ?? [])
      } catch (err) {
        setErrore(err.message)
      }

      try {
        const paginaClienti = await getClienti(0, 1)
        setClienti(paginaClienti.totalElements ?? 0)
      } catch {
        setClienti(null)
      }

      setCaricamento(false)
    }

    carica()
  }, [])

  const fatturatoTotale = fatture.reduce(
    (somma, fattura) => somma + Number(fattura.importo),
    0
  )

  const conteggioPerStato = fatture.reduce((acc, fattura) => {
    const nome = fattura.statoFattura?.nome ?? "Sconosciuto"
    acc[nome] = (acc[nome] ?? 0) + 1
    return acc
  }, {})

  return (
    <section className="panoramica">
      <h1>Panoramica</h1>

      {errore && (
        <Alert variant="danger" className="py-2 small">
          {errore}
        </Alert>
      )}

      {caricamento ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <>
          <Row className="g-3 mb-4">
            <Col md={4}>
              <Card className="kpi-card">
                <Card.Body>
                  <div className="kpi-value">
                    {clienti === null ? "—" : clienti}
                  </div>
                  <Card.Text className="kpi-label mb-0">
                    Clienti totali
                  </Card.Text>
                  {clienti === null && (
                    <Card.Text className="kpi-hint mb-0">
                      Non disponibile per il tuo ruolo
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="kpi-card">
                <Card.Body>
                  <div className="kpi-value">{fatture.length}</div>
                  <Card.Text className="kpi-label mb-0">
                    Fatture totali
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="kpi-card">
                <Card.Body>
                  <div className="kpi-value">
                    {formatImporto(fatturatoTotale)}
                  </div>
                  <Card.Text className="kpi-label mb-0">
                    Fatturato totale
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card>
            <Card.Body>
              <Card.Title as="h2" className="h6 text-muted mb-3">
                Fatture per stato
              </Card.Title>

              {Object.keys(conteggioPerStato).length === 0 ? (
                <p className="text-muted mb-0">Nessuna fattura presente.</p>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {Object.entries(conteggioPerStato).map(
                    ([nome, conteggio]) => (
                      <Badge
                        key={nome}
                        bg={coloreStato(nome)}
                        className="stato-badge"
                      >
                        {formatNomeStato(nome)}: {conteggio}
                      </Badge>
                    )
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </section>
  )
}

export default Panoramica

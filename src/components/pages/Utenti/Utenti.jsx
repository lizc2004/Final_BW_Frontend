import "./Utenti.css"

import { useEffect, useState } from "react"
import { getMyProfile } from "../../../Api/utenteApi"
import { updateMe } from "../../../Api/utenteApi"
import { Col, Container, Row, Table } from "react-bootstrap"

export default function Profilo() {
  const [utente, setUtente] = useState(null)

  useEffect(() => {
    getMyProfile().then((data) => {
      setUtente(data)
    })
  }, [])

  if (!utente) return <h2>Caricamento...</h2>

  function modifica() {
    updateMe({
      nome: "Roberto modificato",
    }).then((data) => {
      setUtente(data)
    })
  }
  return (
    <>
      <Container fluid className="mw-100">
        <Row className="bg-white">
          <Col>
            <div>
              <h1>Utenti</h1>
              <p>Gestione utenti e ruoli</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className="mw-100 p-0">
        <Table striped hover className="p-0">
          <thead>
            <tr>
              <th>UTENTE</th>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>RUOLI</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>{utente.nome}</p>
              </td>
              <td>
                <p>{utente.username}</p>
              </td>
              <td>
                <p>{utente.email}</p>
              </td>
              <td>
                {utente.ruoli[0]?.nome}, {utente.ruoli[1]?.nome}
              </td>
              <td>
                <button onClick={modifica}>Gestisci Ruoli</button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  )
}

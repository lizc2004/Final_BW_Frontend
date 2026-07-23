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
      <Container fluid className="bg-primary">
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>UTENTE</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>RUOLI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>
                    Nome:
                    {utente.nome}
                  </p>
                </td>
                <td>
                  <p>
                    Username:
                    {utente.username}
                  </p>
                </td>
                <td>
                  <p>
                    Email:
                    {utente.email}
                  </p>
                </td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>

          {utente && (
            <>
              <p>
                Username:
                {utente.username}
              </p>

              <p>
                Email:
                {utente.email}
              </p>

              <p>
                Nome:
                {utente.nome}
              </p>

              <button onClick={modifica}>Modifica nome</button>
            </>
          )}
        </div>
      </Container>
    </>
  )
}

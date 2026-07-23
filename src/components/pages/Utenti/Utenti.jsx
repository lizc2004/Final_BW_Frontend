import "./Utenti.css"

import { useEffect, useState } from "react"
import { getAllUtenti, getMyProfile } from "../../../Api/utenteApi"
import { updateMe } from "../../../Api/utenteApi"
import { Col, Container, Pagination, Row, Table } from "react-bootstrap"
import { Modal, Button } from "react-bootstrap"
import { addRole, removeRole } from "../../../Api/utenteApi"

const Utenti = () => {
  const [utenti, setUtenti] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [utenteSelezionato, setUtenteSelezionato] = useState(null)
  const [pagina, setPagina] = useState(0)
  const [totalePagine, setTotalePagine] = useState(0)
  const [ricerca, setRicerca] = useState("")

  const apriGestioneRuoli = (utente) => {
    setUtenteSelezionato(utente)
    setShowModal(true)
  }

  const chiudiModal = () => {
    setShowModal(false)
    setUtenteSelezionato(null)
  }

  const caricaUtenti = (page) => {
    getAllUtenti(page, 5, ricerca)
      .then((data) => {
        setUtenti(data.content)
        setPagina(data.number)
        setTotalePagine(data.totalPages)
      })
      .catch(console.error)
  }

  useEffect(() => {
    caricaUtenti(pagina)
  }, [pagina, ricerca])

  if (!utenti) return <h2>Caricamento...</h2>

  const ADMIN_ROLE_ID = 2

  const isAdmin = utenteSelezionato?.ruoli.some(
    (ruolo) => ruolo.nome === "ROLE_ADMIN",
  )

  const handleAddAdmin = async () => {
    try {
      await addRole(utenteSelezionato.id, ADMIN_ROLE_ID)

      const utentiAggiornati = await getAllUtenti(pagina, 10, ricerca)
      setUtenti(utentiAggiornati.content)

      setShowModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemoveAdmin = async () => {
    try {
      await removeRole(utenteSelezionato.id, ADMIN_ROLE_ID)

      const utentiAggiornati = await getAllUtenti(pagina, 10, ricerca)
      setUtenti(utentiAggiornati.content)

      setShowModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Container fluid className="mw-100 p-0">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Cerca utente per nome..."
          value={ricerca}
          onChange={(e) => {
            setPagina(0)
            setRicerca(e.target.value)
          }}
        />
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
            {utenti.map((utente) => (
              <tr key={utente.id}>
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
                  {utente.ruoli.map((ruolo) => (
                    <span key={ruolo.id}>
                      {ruolo.nome.replace("ROLE_", "")}{" "}
                    </span>
                  ))}
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => apriGestioneRuoli(utente)}
                  >
                    Gestisci Ruoli
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          disabled={pagina === 0}
          onClick={() => setPagina(pagina - 1)}
        />

        {[...Array(totalePagine).keys()].map((num) => (
          <Pagination.Item
            key={num}
            active={num === pagina}
            onClick={() => setPagina(num)}
          >
            {num + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={pagina === totalePagine - 1}
          onClick={() => setPagina(pagina + 1)}
        />
      </Pagination>

      <Modal show={showModal} onHide={chiudiModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Gestione Ruoli</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {utenteSelezionato && (
            <>
              <h5>{utenteSelezionato.nome}</h5>

              <p>Ruoli attuali:</p>

              <ul>
                {utenteSelezionato.ruoli.map((ruolo) => (
                  <li key={ruolo.id}>{ruolo.nome}</li>
                ))}
              </ul>

              {isAdmin ? (
                <Button variant="danger" onClick={handleRemoveAdmin}>
                  Rimuovi ADMIN
                </Button>
              ) : (
                <Button variant="success" onClick={handleAddAdmin}>
                  Aggiungi ADMIN
                </Button>
              )}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={chiudiModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Utenti

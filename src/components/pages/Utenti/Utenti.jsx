import "./Utenti.css";

import { useEffect, useState } from "react";
import { getAllUtenti } from "../../../Api/utenteApi";
import { Container, Table } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import { addRole, removeRole } from "../../../Api/utenteApi";

const Utenti = () => {
  const [utenti, setUtenti] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [utenteSelezionato, setUtenteSelezionato] = useState(null);

  const apriGestioneRuoli = (utente) => {
    setUtenteSelezionato(utente);
    setShowModal(true);
  };

  const chiudiModal = () => {
    setShowModal(false);
    setUtenteSelezionato(null);
  };

  useEffect(() => {
    getAllUtenti()
      .then((data) => {
        setUtenti(data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!utenti) return <h2>Caricamento...</h2>;

  const ADMIN_ROLE_ID = 2;

  const isAdmin = utenteSelezionato?.ruoli.some(
    (ruolo) => ruolo.nome === "ROLE_ADMIN",
  );

  const handleAddAdmin = async () => {
    try {
      await addRole(utenteSelezionato.id, ADMIN_ROLE_ID);

      const utentiAggiornati = await getAllUtenti();
      setUtenti(utentiAggiornati.content);

      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveAdmin = async () => {
    try {
      await removeRole(utenteSelezionato.id, ADMIN_ROLE_ID);

      const utentiAggiornati = await getAllUtenti();
      setUtenti(utentiAggiornati.content);

      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
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
                  {utente.ruoli[0]?.nome}, {utente.ruoli[1]?.nome}
                </td>
                <td>
                  <Button
                    variant="primary"
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
          <Button variant="secondary" onClick={chiudiModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Utenti;

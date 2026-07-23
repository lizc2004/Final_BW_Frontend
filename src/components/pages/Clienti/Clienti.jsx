// Importa gli hook di React.
import { useEffect, useState } from "react";

// Importa i componenti di React Bootstrap.
import {
  Button,
  Form,
  InputGroup,
  Spinner,
  Table,
} from "react-bootstrap";

// Importa le icone.
import {
  BsPlusLg,
  BsSearch,
} from "react-icons/bs";

export default function Clienti() {

  /* STATE  */

  // Contiene tutti i clienti recuperati dal backend.
  const [clienti, setClienti] = useState([]);

  // Indica se il caricamento è ancora in corso.
  const [loading, setLoading] = useState(true);

  // Contiene il testo scritto nella barra di ricerca.
  const [ricerca, setRicerca] = useState("");



  /*
   * ===============================
   * USE EFFECT
   * ===============================
   */

  /*
   * Viene eseguito una sola volta
   * all'apertura della pagina.
   *
   * Recupera tutti i clienti dal backend.
   */
  useEffect(() => {
    caricaClienti();
  }, []);



  /*
   * ===============================
   * FETCH CLIENTI
   * ===============================
   */

  async function caricaClienti() {

    try {

      // Recupera il token salvato dopo il login.
      const token = localStorage.getItem("token");

      // Chiamata al backend.
      const response = await fetch(
        "http://localhost:8080/clienti",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Se la risposta non è valida
      // viene generato un errore.
      if (!response.ok) {
        throw new Error("Errore durante il recupero dei clienti.");
      }

      // Converte il JSON in oggetto JavaScript.
      const data = await response.json();

      // Salva i clienti nello state.
      setClienti(data);

    } catch (error) {

      console.error(error);

    } finally {

      // Nasconde lo spinner.
      setLoading(false);

    }

  }



  /*
   * ===============================
   * RICERCA CLIENTI
   * ===============================
   */

  /*
   * Filtra la lista dei clienti
   * in base alla ragione sociale.
   */
  const clientiFiltrati = clienti.filter((cliente) =>
    cliente.ragioneSociale
      ?.toLowerCase()
      .includes(ricerca.toLowerCase())
  );



  /*
   * ===============================
   * RENDER
   * ===============================
   */

  return (

    <div className="p-4">

      {/* ==========================
          TOOLBAR
      ========================== */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        {/* Barra di ricerca */}

        <InputGroup style={{ maxWidth: "350px" }}>

          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>

          <Form.Control
            placeholder="Cerca cliente..."
            value={ricerca}
            onChange={(e) =>
              setRicerca(e.target.value)
            }
          />

        </InputGroup>



        {/* Pulsante Nuovo Cliente */}

        <Button variant="success">

          <BsPlusLg className="me-2" />

          Nuovo Cliente

        </Button>

      </div>



      {/* ==========================
          TABELLA
      ========================== */}

      {loading ? (

        // Spinner mostrato durante il caricamento.

        <div className="text-center mt-5">

          <Spinner animation="border" />

        </div>

      ) : (

        <Table
          striped
          hover
          bordered
          responsive
        >

          <thead>

            <tr>

              <th>ID</th>

              <th>Ragione Sociale</th>

              <th>Email</th>

              <th>Telefono</th>

              <th>Fatturato</th>

            </tr>

          </thead>

          <tbody>

            {/* Se non esistono clienti */}

            {clientiFiltrati.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="text-center"
                >

                  Nessun cliente trovato

                </td>

              </tr>

            ) : (

              /*
               * Crea una riga
               * per ogni cliente.
               */
              clientiFiltrati.map((cliente) => (

                <tr key={cliente.id}>

                  <td>{cliente.id}</td>

                  <td>{cliente.ragioneSociale}</td>

                  <td>{cliente.email}</td>

                  <td>{cliente.telefono}</td>

                  <td>{cliente.fatturatoAnnuale}</td>

                </tr>

              ))

            )}

          </tbody>

        </Table>

      )}

    </div>

  );

}
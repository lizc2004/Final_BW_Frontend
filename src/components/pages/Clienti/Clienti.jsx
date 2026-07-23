import { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Spinner,
  Table,
} from "react-bootstrap";
import { BsPlusLg, BsSearch } from "react-icons/bs";

export default function Clienti() {
  const [clienti, setClienti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");
  const [nome, setNome] = useState("");
  const [ordinamento, setOrdinamento] = useState("");

  useEffect(() => {
    caricaClienti();
  }, []);

  async function fetchClienti(url) {
    setLoading(true);
    setErrore("");

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Errore ${response.status}`);
      }

      const data = await response.json();
      setClienti(data);
    } catch (error) {
      console.error(error);
      setErrore("Impossibile recuperare i clienti.");
    } finally {
      setLoading(false);
    }
  }

  function caricaClienti() {
    fetchClienti("http://localhost:8080/clienti");
  }

  function cercaClienti(event) {
    event.preventDefault();

    if (!nome.trim()) {
      caricaClienti();
      return;
    }

    const parametro = encodeURIComponent(nome.trim());

    fetchClienti(
      `http://localhost:8080/clienti/filtro?ragioneSociale=${parametro}`
    );
  }

  function ordinaClienti(event) {
    const valore = event.target.value;
    setOrdinamento(valore);

    if (!valore) {
      caricaClienti();
      return;
    }

    const [campo, direzione] = valore.split("|");

    fetchClienti(
      `http://localhost:8080/clienti/ordinamento?campo=${campo}&direzione=${direzione}`
    );
  }

  function formattaFatturato(valore) {
    if (valore === null || valore === undefined) {
      return "-";
    }

    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(valore);
  }

  function formattaData(data) {
    if (!data) {
      return "-";
    }

    return new Date(data).toLocaleDateString("it-IT");
  }

  return (
    <section className="p-4">
      <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
        <Form
          onSubmit={cercaClienti}
          style={{
            minWidth: "280px",
            flex: 1,
          }}
        >
          <InputGroup>
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>

            <Form.Control
              type="text"
              placeholder="Cerca cliente..."
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </InputGroup>
        </Form>

        <Form.Select
          value={ordinamento}
          onChange={ordinaClienti}
          style={{ maxWidth: "230px" }}
        >
          <option value="">Ordina per</option>
          <option value="nome|asc">Nome A-Z</option>
          <option value="nome|desc">Nome Z-A</option>
          <option value="fatturato|asc">Fatturato crescente</option>
          <option value="fatturato|desc">Fatturato decrescente</option>
          <option value="dataInserimento|asc">
            Inserimento meno recente
          </option>
          <option value="dataInserimento|desc">
            Inserimento più recente
          </option>
          <option value="dataUltimoContatto|asc">
            Contatto meno recente
          </option>
          <option value="dataUltimoContatto|desc">
            Contatto più recente
          </option>
          <option value="provincia|asc">Provincia A-Z</option>
          <option value="provincia|desc">Provincia Z-A</option>
        </Form.Select>

        <Button variant="success">
          <BsPlusLg className="me-2" />
          Nuovo cliente
        </Button>
      </div>

      {errore && <div className="alert alert-danger">{errore}</div>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table hover responsive className="align-middle">
          <thead>
            <tr>
              <th>Ragione sociale</th>
              <th>Fatturato annuo</th>
              <th>Data inserimento</th>
              <th>Ultimo contatto</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {clienti.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Nessun cliente trovato
                </td>
              </tr>
            ) : (
              clienti.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.ragioneSociale}</td>

                  <td>
                    {formattaFatturato(cliente.fatturatoAnnuale)}
                  </td>

                  <td>{formattaData(cliente.dataInserimento)}</td>

                  <td>{formattaData(cliente.dataUltimoContatto)}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </section>
  );
}
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Spinner,
  Table,
} from "react-bootstrap";

import Pagination from "react-bootstrap/Pagination";

import {
  BsChevronLeft,
  BsChevronRight,
  BsPlusLg,
  BsSearch,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Clienti() {
  const navigate = useNavigate();

  const [clienti, setClienti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");
  const [nome, setNome] = useState("");
  const [ordinamento, setOrdinamento] = useState("");

  // Spring considera la prima pagina come pagina 0.
  const [paginaCorrente, setPaginaCorrente] = useState(0);

  // Informazioni restituite dall'oggetto Page del backend.
  const [pagineTotali, setPagineTotali] = useState(0);
  const [clientiTotali, setClientiTotali] = useState(0);
  const [primaPagina, setPrimaPagina] = useState(true);
  const [ultimaPagina, setUltimaPagina] = useState(true);

  /*
   * Ogni volta che cambia la pagina corrente,
   * viene eseguita una nuova richiesta al backend.
   */
  useEffect(() => {
    caricaClienti(paginaCorrente);
  }, [paginaCorrente]);

  async function fetchClienti(url, rispostaPaginata = false) {
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

      if (rispostaPaginata) {
    
        const contenuto = Array.isArray(data?.content)
          ? data.content
          : [];

        setClienti(contenuto);
        setPagineTotali(data?.totalPages ?? 0);
        setClientiTotali(
          data?.totalElements ?? contenuto.length
        );
        setPrimaPagina(data?.first ?? true);
        setUltimaPagina(data?.last ?? true);
      } else {
       
        const listaClienti = Array.isArray(data)
          ? data
          : [];

        setClienti(listaClienti);
        setPagineTotali(0);
        setClientiTotali(listaClienti.length);
        setPrimaPagina(true);
        setUltimaPagina(true);
      }
    } catch (error) {
      console.error(error);
      setErrore("Impossibile recuperare i clienti.");
      setClienti([]);
      setPagineTotali(0);
      setClientiTotali(0);
      setPrimaPagina(true);
      setUltimaPagina(true);
    } finally {
      setLoading(false);
    }
  }

  
  function caricaClienti(pagina = 0) {
    fetchClienti(
      `http://localhost:8080/clienti?page=${pagina}&size=5&sortBy=ragioneSociale&direction=asc`,
      true
    );
  }

  function cercaClienti(event) {
    event.preventDefault();

    if (!nome.trim()) {
     
      if (paginaCorrente === 0) {
        caricaClienti(0);
      } else {
        setPaginaCorrente(0);
      }

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
      if (paginaCorrente === 0) {
        caricaClienti(0);
      } else {
        setPaginaCorrente(0);
      }

      return;
    }

    const [campo, direzione] = valore.split("|");

    fetchClienti(
      `http://localhost:8080/clienti/ordinamento?campo=${campo}&direzione=${direzione}`
    );
  }

  function vaiAllaPaginaPrecedente() {
    setPaginaCorrente((paginaPrecedente) =>
      Math.max(paginaPrecedente - 1, 0)
    );
  }

  function vaiAllaPaginaSuccessiva() {
    setPaginaCorrente((paginaPrecedente) =>
      Math.min(
        paginaPrecedente + 1,
        Math.max(pagineTotali - 1, 0)
      )
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

            <Button
              type="submit"
              variant="outline-secondary"
            >
              Cerca
            </Button>
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
          <option value="fatturato|asc">
            Fatturato crescente
          </option>
          <option value="fatturato|desc">
            Fatturato decrescente
          </option>
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
          <option value="provincia|asc">
            Provincia A-Z
          </option>
          <option value="provincia|desc">
            Provincia Z-A
          </option>
        </Form.Select>

        <Button
          type="button"
          variant="success"
          onClick={() => navigate("/clienti/nuovo")}
        >
          <BsPlusLg className="me-2" />
          Nuovo cliente
        </Button>
      </div>

      {errore && (
        <div className="alert alert-danger">
          {errore}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Ragione sociale</th>
                <th>Fatturato annuo</th>
                <th>Data inserimento</th>
                <th>Ultimo contatto</th>
              </tr>
            </thead>

            <tbody>
              {clienti.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4"
                  >
                    Nessun cliente trovato
                  </td>
                </tr>
              ) : (
                clienti.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.ragioneSociale}</td>

                    <td>
                      {formattaFatturato(
                        cliente.fatturatoAnnuale
                      )}
                    </td>

                    <td>
                      {formattaData(
                        cliente.dataInserimento
                      )}
                    </td>

                    <td>
                      {formattaData(
                        cliente.dataUltimoContatto
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          {pagineTotali > 0 && (
  <>
    <div className="text-center text-muted mt-3">
      Clienti totali: {clientiTotali}
    </div>

    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev
        disabled={paginaCorrente === 0 || loading}
        onClick={() =>
          setPaginaCorrente((pagina) => pagina - 1)
        }
      />

      {[...Array(pagineTotali).keys()].map((numeroPagina) => (
        <Pagination.Item
          key={numeroPagina}
          active={numeroPagina === paginaCorrente}
          disabled={loading}
          onClick={() =>
            setPaginaCorrente(numeroPagina)
          }
        >
          {numeroPagina + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        disabled={
          paginaCorrente === pagineTotali - 1 ||
          loading
        }
        onClick={() =>
          setPaginaCorrente((pagina) => pagina + 1)
        }
      />
    </Pagination>
  </>
)}
        </>
      )}
    </section>
  );
}
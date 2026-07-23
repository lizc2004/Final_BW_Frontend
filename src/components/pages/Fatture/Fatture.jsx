import { useEffect, useState, useCallback } from "react"
import { Spinner, Alert } from "react-bootstrap"
import FattureToolbar from "./FattureToolbar"
import FattureTable from "./FattureTable"
import FatturaFormModal from "./FatturaFormModal"
import { getFatture, createFattura, updateFattura, deleteFattura } from "../../../Api/fatturaApi"
import { getStatiFattura } from "../../../Api/statoFatturaApi"
import { getClienti } from "../../../Api/clienteApi"
import "./Fatture.css"

const emptyFilters = {
  clienteId: "",
  statoId: "",
  anno: "",
  importoMin: "",
  importoMax: "",
}

const Fatture = () => {
  const [fatture, setFatture] = useState([])
  const [clienti, setClienti] = useState([])
  const [statiFattura, setStatiFattura] = useState([])
  const [filters, setFilters] = useState(emptyFilters)
  const [caricamento, setCaricamento] = useState(true)
  const [errore, setErrore] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [fatturaDaModificare, setFatturaDaModificare] = useState(null)

  const caricaFatture = useCallback(async () => {
    setCaricamento(true)
    setErrore("")
    try {
      const pagina = await getFatture(filters)
      setFatture(pagina.content ?? [])
    } catch (err) {
      setErrore(err.message)
    } finally {
      setCaricamento(false)
    }
  }, [filters])

  useEffect(() => {
    // Cliente e stati servono per i menu a tendina di filtro e form:
    // vengono caricati una sola volta, non a ogni cambio di filtro.
    getClienti().then(setClienti).catch(() => setClienti([]))
    getStatiFattura().then(setStatiFattura).catch(() => setStatiFattura([]))
  }, [])

  useEffect(() => {
    caricaFatture()
  }, [caricaFatture])

  const apriNuovaFattura = () => {
    setFatturaDaModificare(null)
    setShowModal(true)
  }

  const apriModificaFattura = (fattura) => {
    setFatturaDaModificare(fattura)
    setShowModal(true)
  }

  const salvaFattura = async (body) => {
    if (fatturaDaModificare) {
      await updateFattura(fatturaDaModificare.id, body)
    } else {
      await createFattura(body)
    }
    await caricaFatture()
  }

  const eliminaFattura = async (fattura) => {
    if (!window.confirm(`Eliminare la fattura ${fattura.numero}?`)) {
      return
    }
    try {
      await deleteFattura(fattura.id)
      await caricaFatture()
    } catch (err) {
      setErrore(err.message)
    }
  }

  return (
    <section className="fatture-page">
      <h1>Fatture</h1>

      <FattureToolbar
        clienti={clienti}
        statiFattura={statiFattura}
        filters={filters}
        onFilterChange={setFilters}
        onNuovaFattura={apriNuovaFattura}
      />

      {errore && (
        <Alert variant="danger" className="py-2 small">
          {errore}
        </Alert>
      )}

      {caricamento ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <FattureTable
          fatture={fatture}
          onModifica={apriModificaFattura}
          onElimina={eliminaFattura}
        />
      )}

      <FatturaFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSalva={salvaFattura}
        fatturaDaModificare={fatturaDaModificare}
        clienti={clienti}
        statiFattura={statiFattura}
      />
    </section>
  )
}

export default Fatture

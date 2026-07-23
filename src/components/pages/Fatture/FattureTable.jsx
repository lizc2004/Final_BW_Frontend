import { Table } from "react-bootstrap"
import FatturaRow from "./FatturaRow"

const FattureTable = ({ fatture, onModifica, onElimina }) => {
  if (fatture.length === 0) {
    return <p className="text-muted">Nessuna fattura trovata.</p>
  }

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>Numero</th>
          <th>Cliente</th>
          <th>Data</th>
          <th>Importo</th>
          <th>Stato</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {fatture.map((fattura) => (
          <FatturaRow
            key={fattura.id}
            fattura={fattura}
            onModifica={onModifica}
            onElimina={onElimina}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default FattureTable

import { Badge, Button } from "react-bootstrap"

const formatImporto = (importo) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(importo)

const FatturaRow = ({ fattura, onModifica, onElimina }) => {
  return (
    <tr>
      <td>{fattura.numero}</td>
      <td>{fattura.cliente?.ragioneSociale}</td>
      <td>{fattura.data}</td>
      <td>{formatImporto(fattura.importo)}</td>
      <td>
        <Badge bg="secondary">{fattura.statoFattura?.nome}</Badge>
      </td>
      <td className="text-end">
        <Button
          size="sm"
          variant="outline-primary"
          className="me-2"
          onClick={() => onModifica(fattura)}
        >
          Modifica
        </Button>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => onElimina(fattura)}
        >
          Elimina
        </Button>
      </td>
    </tr>
  )
}

export default FatturaRow

import { Badge, Button } from "react-bootstrap"
import { formatNomeStato, coloreStato } from "../../../utils/statoFatturaFormat"
import { formatImporto } from "../../../utils/currency"

const FatturaRow = ({ fattura, onModifica, onElimina }) => {
  return (
    <tr>
      <td>{fattura.numero}</td>
      <td>{fattura.cliente?.ragioneSociale}</td>
      <td>{fattura.data}</td>
      <td>{formatImporto(fattura.importo)}</td>
      <td>
        <Badge bg={coloreStato(fattura.statoFattura?.nome)}>
          {formatNomeStato(fattura.statoFattura?.nome)}
        </Badge>
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

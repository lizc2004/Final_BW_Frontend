// pagina principale
// contiene toolbar, tabella e pagination

import ClientiToolbar from "./ClientiToolbar"
import ClientiTable from "./ClientiTable"
import "./Clienti.css"

const Clienti = () => {
  return (
    <section className="clienti-page">
      <h1>Clienti</h1>

      <ClientiToolbar />
      <ClientiTable />
    </section>
  )
}

export default Clienti

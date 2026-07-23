// importo Outlet da React Router
// Outlet rappresenta la pagina interna da visualizzare
import { Outlet } from "react-router-dom"
import { useState } from "react"
// importo i componenti del layout
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

// importo il CSS
import "./DashboardLayout.css"

const DashboardLayout = () => {
  {
    /* Stato che contiene il ruolo selezionato.
     * Il valore iniziale è "admin", quindi quando il gestionale
     * viene aperto vengono mostrate tutte le voci della Sidebar.
     */
  }

  const [role, setRole] = useState("admin")

  return (
    <div className="dashboard-layout">
      {/*
       * Passo il ruolo alla Sidebar.
       *
       * La Sidebar userà questo valore per decidere
       * quali collegamenti mostrare.
       */}
      <Sidebar role={role} />

      <div className="dashboard-content">
        {/* Passo alla Navbar:
        // role     → il ruolo attualmente selezionato
        // setRole  → la funzione che permette di cambiarlo
        */}

        <Navbar role={role} setRole={setRole} />

        {/*
         * Outlet viene sostituito automaticamente
         * con la pagina relativa alla route corrente.
         *
         * Esempio:
         * /clienti  → mostra il componente Clienti
         * /fatture  → mostra il componente Fatture
         */}
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

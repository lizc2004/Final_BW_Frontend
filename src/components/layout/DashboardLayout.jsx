// importo Outlet da React Router
// Outlet rappresenta la pagina interna da visualizzare
import { Outlet } from "react-router-dom"
import { useState } from "react"
// importo i componenti del layout
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

// Outlet mostra il contenuto della pagina corrispondente alla route corrente
import { Outlet } from "react-router-dom"

// Importo Sidebar e Navbar
import Sidebar from "../layout/Sidebar"
import Navbar from "../layout/Navbar"

// Importo il CSS del layout
import "./DashboardLayout.css"

const DashboardLayout = () => {
  /*
   * Stato che contiene il ruolo selezionato.
   *
   * Il valore iniziale è "admin", quindi quando il gestionale
   * viene aperto vengono mostrate tutte le voci della Sidebar.
   */
  const [role, setRole] = useState("admin")

  return (
    <div className="dashboard-layout">
      {/*
       * Passo il ruolo alla Sidebar.
       *
       * La Sidebar usa questo valore per decidere
       * quali collegamenti mostrare.
       */}
      <Sidebar role={role} />

      <div className="dashboard-content">
        {/*
         * Passo alla Navbar:
         *
         * role    → ruolo attualmente selezionato
         * setRole → funzione che permette di cambiarlo
         */}
        <Navbar role={role} setRole={setRole} />

        {/*
         * Outlet viene sostituito automaticamente
         * con la pagina relativa alla route corrente.
         *
         * Esempio:
         * /clienti → mostra il componente Clienti
         * /fatture → mostra il componente Fatture
         * /utenti  → mostra il componente associato alla route Utenti
         */}
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

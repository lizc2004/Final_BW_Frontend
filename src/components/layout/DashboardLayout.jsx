<<<<<<< HEAD
// importo Outlet da React Router
// Outlet rappresenta la pagina interna da visualizzare
import { Outlet } from "react-router-dom"

// importo i componenti del layout
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

// importo il CSS
import "./DashboardLayout.css"
=======
// Importo useState per memorizzare il ruolo selezionato
import { useState } from "react";

// Outlet mostra il contenuto della pagina corrispondente alla route corrente
import { Outlet } from "react-router-dom";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

import "./DashboardLayout.css";
>>>>>>> develop

const DashboardLayout = () => {
  {/* Stato che contiene il ruolo selezionato.
  * Il valore iniziale è "admin", quindi quando il gestionale
  * viene aperto vengono mostrate tutte le voci della Sidebar.
  */}

  const [role, setRole] = useState("admin");

  return (
    <div className="dashboard-layout">
<<<<<<< HEAD
      {/* barra laterale visibile in tutte le pagine */}
      <Sidebar />

      {/* parte destra della dashboard */}
      <div className="dashboard-content">
        {/* barra superiore visibile in tutte le pagine */}
        <Navbar />

        {/* qui verrà mostrata la pagina selezionata */}
        <main className="dashboard-main, p-0, m-0, mt-3">
=======
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
>>>>>>> develop
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

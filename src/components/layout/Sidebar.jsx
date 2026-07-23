// NavLink permette di navigare tra le pagine
// e riconosce automaticamente il link attivo
import { NavLink } from "react-router-dom";

import {
  BsPeople,
  BsReceipt,
  BsTags,
  BsEnvelope,
  BsBoxArrowLeft,
} from "react-icons/bs";

import { Button } from "react-bootstrap";

import "./Sidebar.css";

/*
 * La Sidebar riceve il ruolo selezionato
 * dal componente DashboardLayout.
 */
const Sidebar = ({ role }) => {
  /*
   * Funzione utilizzata per assegnare le classi ai NavLink.
   *
   * React Router passa automaticamente la proprietà isActive.
   *
   * Se il link è attivo aggiungiamo la classe "active-link".
   */
  const getLinkClass = ({ isActive }) =>
    `sidebar-link d-flex align-items-center gap-3 ${
      isActive ? "active-link" : ""
    }`;

  return (
    <aside className="sidebar d-flex flex-column">
      {/* Nome del gestionale */}
      <div className="mb-5">
        <h2 className="h5 mb-1">EPIC Energy CRM</h2>

        <p className="small mb-0">
          Gestione aziendale
        </p>
      </div>

      {/*
       * Navigazione principale.
       *
       * Clienti e Fatture sono visibili
       * sia all'Admin sia all'Operatore.
       */}
      <nav className="d-flex flex-column gap-2">
        {/* Collegamento alla pagina Clienti */}
        <NavLink
          to="/clienti"
          className={getLinkClass}
        >
          <BsPeople />

          <span>Clienti</span>
        </NavLink>

        {/* Collegamento alla pagina Fatture */}
        <NavLink
          to="/fatture"
          className={getLinkClass}
        >
          <BsReceipt />

          <span>Fatture</span>
        </NavLink>

        {/*
         * Le pagine Stati fattura e Contatta cliente
         * vengono mostrate soltanto quando il ruolo è "admin".
         */}
        {role === "admin" && (
          <>
            {/* Collegamento alla gestione degli stati */}
            <NavLink
              to="/stati-fattura"
              className={getLinkClass}
            >
              <BsTags />

              <span>Stati fattura</span>
            </NavLink>

            {/* Collegamento alla pagina per inviare email */}
            <NavLink
              to="/invia-email"
              className={getLinkClass}
            >
              <BsEnvelope />

              <span>Contatta cliente</span>
            </NavLink>
          </>
        )}
      </nav>

      {/*
       * mt-auto spinge il pulsante Esci
       * nella parte inferiore della Sidebar.
       */}
      <div className="mt-auto">
        <Button
          variant="outline-light"
          className="w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <BsBoxArrowLeft />

          <span>Esci</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
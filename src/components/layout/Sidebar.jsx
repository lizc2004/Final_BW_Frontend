// importo NavLink per la navigazione tra le pagine
import { NavLink } from "react-router-dom";

import { Button } from "react-bootstrap";

import {
  BsPeople,
  BsReceipt,
  BsBarChart,
  BsEnvelope,
  BsBoxArrowRight,
} from "react-icons/bs";

import "./Sidebar.css";

// componente Sidebar
const Sidebar = () => {

  // funzione che assegna una classe diversa
  // al link attualmente selezionato
  const getLinkClass = ({ isActive }) =>
    isActive ? "sidebar-link active-link" : "sidebar-link";

  return (

    // contenitore principale della sidebar
    <aside className="sidebar d-flex flex-column justify-content-between p-4">

      {/* Parte superiore della sidebar */}
      <div>

        {/* Nome del gestionale */}
        <h3 className="fw-bold mb-1">
            EPIC Energy CRM
        </h3>

        {/* Sottotitolo */}
        <p className="text-light small mb-5">
            Dashboard Aziendale
        </p>

        {/* Menu di navigazione */}
        <nav className="d-flex flex-column gap-2">

          {/* Pagina Clienti */}
          <NavLink
            to="/clienti"
            className={getLinkClass}
          >
            <BsPeople />
            Clienti
          </NavLink>

          {/* Pagina Fatture */}
          <NavLink
            to="/fatture"
            className={getLinkClass}
          >
            <BsReceipt />
            Fatture
          </NavLink>

          {/* Pagina Stati Fattura */}
          <NavLink
            to="/stati-fattura"
            className={getLinkClass}
          >
            <BsBarChart />
            Stati fattura
          </NavLink>

          {/* Pagina Contatta Cliente */}
          <NavLink
            to="/invia-email"
            className={getLinkClass}
          >
            <BsEnvelope />
            Contatta cliente
          </NavLink>

        </nav>

      </div>

      {/* Parte inferiore della sidebar */}
      <Button variant="outline-light">

        {/* Icona del pulsante */}
        <BsBoxArrowRight className="me-2" />

        {/* Testo del pulsante */}
        Esci

      </Button>

    </aside>

  );
};

export default Sidebar;
// NavLink permette di navigare tra le pagine
// e riconosce automaticamente il collegamento attivo
import { NavLink, useNavigate } from "react-router-dom";

// Importo le icone utilizzate nella Sidebar
import {
  BsHouseDoor,
  BsPeople,
  BsReceipt,
  BsPersonGear,
  BsTags,
  BsEnvelope,
  BsBoxArrowLeft,
} from "react-icons/bs";

// Importo il componente Button di React Bootstrap
import { Button } from "react-bootstrap";

// Importo il CSS della Sidebar
import "./Sidebar.css";

/*
 * La Sidebar riceve la proprietà role
 * dal componente DashboardLayout.
 *
 * role può essere:
 * "admin"
 * "operator"
 */
const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  /*
   * Funzione che assegna le classi CSS ai NavLink.
   *
   * React Router passa automaticamente isActive.
   * Se il link corrisponde alla pagina corrente,
   * viene aggiunta la classe active-link.
   */
  const getLinkClass = ({ isActive }) =>
    `sidebar-link d-flex align-items-center gap-3 ${
      isActive ? "active-link" : ""
    }`;

  /*
   * Rimuove il token salvato al login e riporta l'utente
   * alla pagina di accesso.
   */
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <aside className="sidebar d-flex flex-column">
      {/* Nome del gestionale, cliccabile per tornare alla Panoramica */}
      <NavLink to="/" className="sidebar-brand mb-5 text-decoration-none">
        <h2 className="h5 mb-1">EPIC Energy CRM</h2>

        <p className="small mb-0">
          Gestione aziendale
        </p>
      </NavLink>

      {/* Navigazione principale della Sidebar */}
      <nav className="d-flex flex-column gap-2">
        {/*
         * Panoramica è visibile sia all'Admin
         * sia all'Operatore.
         */}
        <NavLink
          to="/"
          end
          className={getLinkClass}
        >
          <BsHouseDoor />

          <span>Panoramica</span>
        </NavLink>

        {/*
         * Clienti è visibile sia all'Admin
         * sia all'Operatore.
         */}
        <NavLink
          to="/clienti"
          className={getLinkClass}
        >
          <BsPeople />

          <span>Clienti</span>
        </NavLink>

        {/*
         * Fatture è visibile sia all'Admin
         * sia all'Operatore.
         */}
        <NavLink
          to="/fatture"
          className={getLinkClass}
        >
          <BsReceipt />

          <span>Fatture</span>
        </NavLink>

        {/*
         * Le voci contenute in questo blocco
         * vengono mostrate soltanto all'Admin.
         */}
        {role === "admin" && (
          <>
        

            {/* Gestione degli stati delle fatture */}
            <NavLink
              to="/stati-fattura"
              className={getLinkClass}
            >
              <BsTags />

              <span>Stati fattura</span>
            </NavLink>

              {/* Gestione degli utenti */}
            <NavLink
              to="/utenti"
              className={getLinkClass}
            >
              <BsPersonGear />

              <span>Utenti</span>
            </NavLink>

            {/* Pagina per inviare comunicazioni ai clienti */}
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
          onClick={handleLogout}
        >
          <BsBoxArrowLeft />

          <span>Esci</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
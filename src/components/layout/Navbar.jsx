// useLocation permette di conoscere l'indirizzo della pagina corrente
import { useLocation } from "react-router-dom";

// Importo i componenti React Bootstrap utilizzati nella Navbar
import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

// Importo il CSS della Navbar
import "./Navbar.css";

/*
 * La Navbar riceve dal DashboardLayout:
 *
 * role     → il ruolo attualmente selezionato
 * setRole  → la funzione per modificare il ruolo
 */
const Navbar = ({ role, setRole }) => {
  /*
   * useLocation restituisce informazioni sulla route corrente.
   *
   * location.pathname può contenere, per esempio:
   * "/clienti"
   * "/fatture"
   * "/stati-fattura"
   * "/invia-email"
   */
  const location = useLocation();

  /*
   * Oggetto che associa ogni pathname
   * al titolo e al sottotitolo da mostrare nella Navbar.
   */
  const pageInfo = {
  "/panoramica": {
    title: "Panoramica",
    subtitle: "Riepilogo generale del gestionale",
  },

  "/clienti": {
    title: "Clienti",
    subtitle: "Gestisci i clienti dell'azienda",
  },

  "/fatture": {
    title: "Fatture",
    subtitle: "Consulta e gestisci le fatture",
  },

  "/stati-fattura": {
    title: "Stati fattura",
    subtitle: "Gestisci gli stati disponibili per le fatture",
  },

  "/utenti": {
    title: "Utenti",
    subtitle: "Gestisci gli utenti e i relativi ruoli",
  },

  "/invia-email": {
    title: "Contatta cliente",
    subtitle: "Invia comunicazioni ai clienti",
  },
};

  /*
   * Cerco le informazioni della pagina corrente.
   *
   * Se il pathname non è presente nell'oggetto pageInfo,
   * viene utilizzato il valore di fallback.
   */
  const currentPage = pageInfo[location.pathname] || {
    title: "EPIC Energy CRM",
    subtitle: "Dashboard gestionale",
  };

  return (
    <header className="navbar-custom d-flex align-items-center">
      {/*
       * Container fluid occupa tutta la larghezza disponibile.
       */}
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* Titolo e sottotitolo della pagina corrente */}
        <div>
          <h1 className="h4 mb-1">{currentPage.title}</h1>

          <p className="navbar-subtitle mb-0">
            {currentPage.subtitle}
          </p>
        </div>

        {/* Area per la selezione del ruolo */}
        <div className="role-switch">
          <span className="role-label">Ruolo</span>

          {/*
           * ToggleButtonGroup è controllato attraverso lo stato role.
           *
           * value={role}
           * indica quale pulsante è selezionato.
           *
           * onChange={setRole}
           * aggiorna lo stato quando l'utente sceglie un ruolo.
           */}
          <ToggleButtonGroup
            type="radio"
            name="role"
            value={role}
            onChange={setRole}
          >
            {/* Pulsante Admin */}
            <ToggleButton
              id="role-admin"
              value="admin"
              variant="outline-success"
            >
              Admin
            </ToggleButton>

            {/* Pulsante Operatore */}
            <ToggleButton
              id="role-operator"
              value="operator"
              variant="outline-success"
            >
              Operatore
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
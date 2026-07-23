// importo useLocation per conoscere la pagina corrente
import { useLocation } from "react-router-dom";

import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

import "./Navbar.css";

const Navbar = () => {

  // recupero la route corrente
  const location = useLocation();

  // oggetto che associa ad ogni pagina
  // il relativo titolo e sottotitolo
  const pageInfo = {
    "/clienti": {
      title: "Clienti",
      subtitle: "Anagrafica clienti business",
    },

    "/fatture": {
      title: "Fatture",
      subtitle: "Gestione delle fatture",
    },

    "/stati-fattura": {
      title: "Stati fattura",
      subtitle: "Gestione degli stati delle fatture",
    },

    "/invia-email": {
      title: "Contatta cliente",
      subtitle: "Invio email ai clienti",
    },
  };

  // recupero le informazioni della pagina corrente
  // se la pagina non esiste utilizzo dei valori di default
  const currentPage =
    pageInfo[location.pathname] || {
      title: "EPIC Energy CRM",
      subtitle: "Dashboard",
    };

  return (

    // barra superiore della dashboard
    <header className="navbar-custom">

      <Container
        fluid
        className="h-100 d-flex justify-content-between align-items-center"
      >

        {/* Titolo e sottotitolo della pagina */}
        <div>

          <h4 className="fw-bold mb-1">
            {currentPage.title}
          </h4>

          <p className="navbar-subtitle mb-0">
            {currentPage.subtitle}
          </p>

        </div>

        {/* Selettore del ruolo */}
        <div className="role-switch d-flex align-items-center gap-3">

          {/* Etichetta del selettore */}
          <span className="role-label">
            Ruolo
          </span>

          {/* Pulsanti per cambiare ruolo */}
          <ToggleButtonGroup
            type="radio"
            name="role"
            defaultValue="admin"
          >

            {/* Ruolo amministratore */}
            <ToggleButton
              id="role-admin"
              value="admin"
              variant="outline-success"
            >
              Admin
            </ToggleButton>

            {/* Ruolo operatore */}
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

// esporto il componente
export default Navbar;
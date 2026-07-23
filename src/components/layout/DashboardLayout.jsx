// importo Outlet da React Router
// Outlet rappresenta la pagina interna da visualizzare
import { Outlet } from "react-router-dom";

// importo i componenti del layout
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

// importo il CSS
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    // contenitore principale della dashboard
    <div className="dashboard-layout">

      {/* barra laterale visibile in tutte le pagine */}
      <Sidebar />

      {/* parte destra della dashboard */}
      <div className="dashboard-content">

        {/* barra superiore visibile in tutte le pagine */}
        <Navbar />

        {/* qui verrà mostrata la pagina selezionata */}
        <main className="dashboard-main">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
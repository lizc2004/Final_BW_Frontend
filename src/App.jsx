import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

import Login from "./components/pages/Login/Login";
import Panoramica from "./components/pages/Panoramica/Panoramica";
import Clienti from "./components/pages/Clienti/Clienti";
import NuovoCliente from "./components/pages/Clienti/NuovoCliente";
import Fatture from "./components/pages/Fatture/Fatture";
import StatiFattura from "./components/pages/StatiFattura/StatiFattura";
import ContattoClienti from "./components/pages/ContattoClienti/ContattoClienti";
import Utenti from "./components/pages/Utenti/Utenti";

function App() {
  return (
    <Routes>
      {/* Quando apro il sito, vado subito al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Pagina di login senza navbar e sidebar */}
      <Route path="/login" element={<Login />} />

      {/* Pagine interne della dashboard */}
      <Route element={<DashboardLayout />}>
        <Route path="/panoramica" element={<Panoramica />} />
        <Route path="/clienti" element={<Clienti />} />
        <Route path="/clienti/nuovo" element={<NuovoCliente />} />
        <Route path="/fatture" element={<Fatture />} />
        <Route path="/stati-fattura" element={<StatiFattura />} />
        <Route path="/utenti" element={<Utenti />} />
        <Route path="/invia-email" element={<ContattoClienti />} />
      </Route>

      {/* Percorso inesistente */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
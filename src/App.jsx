import { Routes, Route, Navigate } from "react-router-dom"

// importo il layout comune della dashboard
import DashboardLayout from "./components/layout/DashboardLayout"

import Login from "./components/pages/Login/Login"
import Panoramica from "./components/pages/Panoramica/Panoramica"
import Clienti from "./components/pages/Clienti/Clienti"
import Fatture from "./components/pages/Fatture/Fatture"
import StatiFattura from "./components/pages/StatiFattura/StatiFattura"
import ContattoClienti from "./components/pages/ContattoClienti/ContattoClienti"
import Utenti from "../src/components/pages/Utenti/Utenti"

function App() {
  return (
    <Routes>
      {/* Il login non utilizza Sidebar e Navbar */}
      <Route path="/login" element={<Login />} />
      {/* Layout comune a tutte le pagine della dashboard */}
      <Route element={<DashboardLayout />}>
        <Route index element={<Panoramica />} />
        <Route path="clienti" element={<Clienti />} />
        <Route path="fatture" element={<Fatture />} />
        <Route path="stati-fattura" element={<StatiFattura />} />
        <Route path="utenti" element={<Utenti />} />
        <Route path="invia-email" element={<ContattoClienti />} />
        <Route path="utenti" element={<Utenti />} />
      </Route>

      {/* Se il percorso non esiste, torna alla panoramica */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

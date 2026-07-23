import { Routes, Route } from "react-router-dom"
import Login from "./components/pages/Login/Login"
import Panoramica from "./components/pages/Panoramica/Panoramica"
import Clienti from "./components/pages/Clienti/Clienti"
import Fatture from "./components/pages/Fatture/Fatture"
import StatiFattura from "./components/pages/StatiFattura/StatiFattura"
import ContattoClienti from "./components/pages/ContattoClienti/ContattoClienti"
import Utenti from "./components/pages/Utenti/Utenti"

function App() {
  return (
    // <Routes>
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/" element={<Panoramica />} />
    //   <Route path="/clienti" element={<Clienti />} />
    //   <Route path="/fatture" element={<Fatture />} />
    //   <Route path="/stati-fattura" element={<StatiFattura />} />
    //   <Route path="/invia-email" element={<ContattoClienti />} />
    //   <Route path="/utenti" element={<Utenti />} />
    // </Routes>

    <UtentiTest />
  )
}

export default App

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App.jsx"
import "bootstrap/dist/css/bootstrap.min.css"

<<<<<<< HEAD
createRoot(document.getElementById("root")).render(
=======
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
>>>>>>> develop
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

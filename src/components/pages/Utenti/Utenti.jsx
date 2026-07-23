import "./Utenti.css"

import { useEffect, useState } from "react"
import { getMyProfile } from "../../../Api/utenteApi"
import { updateMe } from "../../../Api/utenteApi"

export default function Profilo() {
  const [utente, setUtente] = useState(null)

  useEffect(() => {
    getMyProfile().then((data) => {
      setUtente(data)
    })
  }, [])

  if (!utente) return <h2>Caricamento...</h2>

  function modifica() {
    updateMe({
      nome: "Roberto modificato",
    }).then((data) => {
      setUtente(data)
    })
  }
  return (
    <>
      <div className="bg-white">
        <h1>Utenti</h1>
        <p>Gestione utenti e ruoli</p>
      </div>
      <div>
        {utente && (
          <>
            <p>
              Username:
              {utente.username}
            </p>

            <p>
              Email:
              {utente.email}
            </p>

            <p>
              Nome:
              {utente.nome}
            </p>

            <button onClick={modifica}>Modifica nome</button>
          </>
        )}
      </div>
    </>
  )
}

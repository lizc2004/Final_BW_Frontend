// Trasforma "NON_PAGATA" in "Non Pagata" per una visualizzazione leggibile,
// senza toccare il valore reale che viene inviato/ricevuto dal backend.
export function formatNomeStato(nome) {
  if (!nome) return ""
  return nome
    .toLowerCase()
    .split("_")
    .map((parola) => parola.charAt(0).toUpperCase() + parola.slice(1))
    .join(" ")
}

// Colore del badge in base al nome dello stato. Gli stati "non pagata"
// diventano rossi, quelli "pagata" verdi; qualsiasi stato nuovo/custom
// (es. "In contenzioso") resta grigio come fallback neutro.
export function coloreStato(nome) {
  if (!nome) return "secondary"
  const normalizzato = nome.toLowerCase()
  if (normalizzato.includes("non")) return "danger"
  if (normalizzato.includes("pagat")) return "success"
  return "secondary"
}

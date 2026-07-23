const BASE_URL = import.meta.env.VITE_API_URL

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("accessToken")
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  const response = await fetch(BASE_URL + endpoint, config)

  // Le risposte 204 (es. DELETE) non hanno body: niente da leggere come JSON.
  if (response.status === 204) {
    if (!response.ok) {
      throw new Error("Errore nella richiesta")
    }
    return null
  }

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || "Errore nella richiesta")
  }
  return data
}

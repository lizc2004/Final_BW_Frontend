import { apiRequest } from "./api"

export function getMyProfile() {
  return apiRequest("/utenti/me")
}

export function updateMe(body) {
  return apiRequest("/utenti/me", {
    method: "PUT",
    body: JSON.stringify(body),
  })
}

export const getAllUtenti = () => {
  return apiRequest("/utenti", "GET")
}

export const addRole = (utenteId, ruoloId) =>
  apiRequest(`/utenti/${utenteId}/ruoli/${ruoloId}`, {
    method: "POST",
  })

export const removeRole = (utenteId, ruoloId) =>
  apiRequest(`/utenti/${utenteId}/ruoli/${ruoloId}`, {
    method: "DELETE",
  })

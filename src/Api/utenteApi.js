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

export const addRole = (utenteId, ruoloId) =>
  apiRequest(`/utenti/${utenteId}/ruoli/${ruoloId}`, {
    method: "POST",
  })

export const removeRole = (utenteId, ruoloId) =>
  apiRequest(`/utenti/${utenteId}/ruoli/${ruoloId}`, {
    method: "DELETE",
  })

export const getAllUtenti = (page = 0, size = 5, nome = "") =>
  apiRequest(`/utenti?page=${page}&size=${size}&nome=${nome}`)

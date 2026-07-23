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

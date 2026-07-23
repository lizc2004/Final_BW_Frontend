import { apiRequest } from "./api"

// Usata per popolare il menu a tendina "Cliente" nel form fatture.
export function getClienti() {
  return apiRequest("/clienti")
}

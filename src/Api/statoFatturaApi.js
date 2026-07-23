import { apiRequest } from "./api"

export function getStatiFattura() {
  return apiRequest("/stati-fattura")
}

export function createStatoFattura(body) {
  return apiRequest("/stati-fattura", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

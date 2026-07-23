import { apiRequest } from "./api"

export function getFatture(filters = {}) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value)
    }
  })

  const query = params.toString()
  return apiRequest(`/fatture${query ? `?${query}` : ""}`)
}

export function getFatturaById(id) {
  return apiRequest(`/fatture/${id}`)
}

export function createFattura(body) {
  return apiRequest("/fatture", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export function updateFattura(id, body) {
  return apiRequest(`/fatture/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  })
}

export function deleteFattura(id) {
  return apiRequest(`/fatture/${id}`, {
    method: "DELETE",
  })
}

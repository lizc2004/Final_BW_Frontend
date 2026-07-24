import { apiRequest } from "./api"

/*
 * GET /clienti pagina di default a 5 risultati (Page<ClienteResponseDTO>).
 * page/size permettono di scegliere cosa serve al chiamante:
 * - Panoramica chiede solo size=1 per leggere totalElements senza
 *   scaricare tutti i clienti;
 * - i menu a tendina (filtro Fatture, form Fattura) chiedono una size
 *   alta per ottenere di fatto la lista completa.
 */
export function getClienti(page = 0, size = 1000) {
  return apiRequest(`/clienti?page=${page}&size=${size}`)
}

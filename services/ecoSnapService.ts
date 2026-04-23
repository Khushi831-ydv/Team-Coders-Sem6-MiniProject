import { EcoSnapCreateRequest, EcoSnapTicket } from "../types";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function createEcoSnapTicket(
  data: EcoSnapCreateRequest,
): Promise<EcoSnapTicket> {
  const formData = new FormData();
  formData.append("image", data.image);

  if (data.location) {
    formData.append("location", data.location);
  }

  if (data.note) {
    formData.append("note", data.note);
  }

  const res = await fetch(`${API_BASE_URL}/eco-snap/report`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to create ticket");
  }

  return await res.json();
}

export async function fetchEcoSnapTickets(): Promise<EcoSnapTicket[]> {
  const res = await fetch(`${API_BASE_URL}/eco-snap/tickets`);

  if (!res.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return await res.json();
}

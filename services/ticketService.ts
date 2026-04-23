import {
  Ticket,
  TicketCreateRequest,
  TicketIssueType,
  TicketStatus,
} from "../types";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function createTicket(data: TicketCreateRequest): Promise<Ticket> {
  const formData = new FormData();
  formData.append("image", data.image);

  if (data.location) formData.append("location", data.location);
  if (data.description) formData.append("description", data.description);

  const res = await fetch(`${API_BASE_URL}/report`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Create ticket failed:", errorText);
    throw new Error("Failed to create ticket");
  }

  return await res.json();
}

export async function fetchTickets(): Promise<Ticket[]> {
  const res = await fetch(`${API_BASE_URL}/tickets`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch tickets failed:", errorText);
    throw new Error("Failed to fetch tickets");
  }

  return await res.json();
}

export async function updateTicket(
  id: number,
  updates: { issue_type?: TicketIssueType; status?: TicketStatus },
): Promise<Ticket> {
  const res = await fetch(`${API_BASE_URL}/ticket/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Update ticket failed:", errorText);
    throw new Error("Failed to update ticket");
  }

  return await res.json();
}

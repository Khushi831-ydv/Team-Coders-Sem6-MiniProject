import { Ticket, TicketCreateRequest, TicketIssueType, TicketStatus } from '../types';

const STORAGE_KEY = 'greenaudit_tickets';

function load(): Ticket[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function save(tickets: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function detectIssueType(filename: string, desc: string): TicketIssueType {
  const t = `${filename} ${desc}`.toLowerCase();
  if (/leak|water|pipe/.test(t))            return 'Water';
  if (/light|bulb|electric/.test(t))        return 'Electricity';
  if (/trash|waste|bin|overflow/.test(t))   return 'Waste';
  return 'General';
}

function detectSeverity(filename: string, desc: string): 'Low' | 'Medium' | 'High' | 'Critical' {
  const t = `${filename} ${desc}`.toLowerCase();
  if (/broken|critical|burst/.test(t))      return 'Critical';
  if (/leak|overflow|danger/.test(t))       return 'High';
  if (/light|waste/.test(t))               return 'Medium';
  return 'Low';
}

function toDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload  = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

export async function createTicket(data: TicketCreateRequest): Promise<Ticket> {
  const image_url   = await toDataUrl(data.image);
  const issue_type  = detectIssueType(data.image.name, data.description || '');
  const severity    = detectSeverity(data.image.name, data.description || '');
  const tickets     = load();
  const ticket: Ticket = {
    id:          Date.now(),
    image_url,
    issue_type,
    severity,
    status:      'Unseen',
    description: data.description || '',
    location:    data.location    || '',
    created_at:  new Date().toISOString(),
    created_by:  data.created_by  || 'anonymous',
  };
  save([ticket, ...tickets]);
  return ticket;
}

export async function fetchTickets(): Promise<Ticket[]> {
  return load();
}

export async function deleteTicket(id: number): Promise<void> {
  save(load().filter(t => t.id !== id));
}

export async function updateTicket(
  id: number,
  updates: { issue_type?: TicketIssueType; status?: TicketStatus },
): Promise<Ticket> {
  const tickets = load().map(t => t.id === id ? { ...t, ...updates } : t);
  save(tickets);
  const updated = tickets.find(t => t.id === id);
  if (!updated) throw new Error('Ticket not found');
  return updated;
}

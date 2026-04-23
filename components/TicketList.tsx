import React from "react";
import { Ticket, TicketIssueType, TicketStatus } from "../types";

type Props = {
  tickets: Ticket[];
  onUpdateTicket: (
    id: number,
    updates: { issue_type?: TicketIssueType; status?: TicketStatus },
  ) => void;
};

const issueColors: Record<TicketIssueType, string> = {
  Water: "#2563eb",
  Electricity: "#ca8a04",
  Waste: "#16a34a",
  General: "#6b7280",
};

const statusColors: Record<TicketStatus, string> = {
  Unseen: "#dc2626",
  Acknowledged: "#ea580c",
  "In Progress": "#2563eb",
  Resolved: "#16a34a",
};

const TicketList: React.FC<Props> = ({ tickets, onUpdateTicket }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ margin: 0 }}>Maintenance Tickets</h2>
        <div
          style={{
            background: "#0f172a",
            color: "#fff",
            borderRadius: "999px",
            padding: "8px 12px",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          Total: {tickets.length}
        </div>
      </div>

      {tickets.length === 0 ? (
        <p>No tickets yet.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket.id}
            style={{
              background: "#f8fafc",
              borderRadius: "14px",
              padding: "14px",
              marginBottom: "14px",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src={ticket.image_url}
              alt={ticket.issue_type}
              style={{
                width: "110px",
                height: "110px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    background: issueColors[ticket.issue_type],
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "4px 10px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {ticket.issue_type}
                </span>

                <span
                  style={{
                    background:
                      ticket.severity === "Critical"
                        ? "#dc2626"
                        : ticket.severity === "High"
                          ? "#ea580c"
                          : ticket.severity === "Medium"
                            ? "#ca8a04"
                            : "#16a34a",
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "4px 10px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {ticket.severity}
                </span>

                <span
                  style={{
                    background: statusColors[ticket.status],
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "4px 10px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {ticket.status}
                </span>
              </div>

              <p style={{ margin: "6px 0" }}>
                <strong>Description:</strong>{" "}
                {ticket.description || "No description"}
              </p>
              <p style={{ margin: "6px 0" }}>
                <strong>Location:</strong> {ticket.location || "Not provided"}
              </p>
              <p style={{ margin: "6px 0", color: "#475569" }}>
                <strong>Created:</strong>{" "}
                {new Date(ticket.created_at).toLocaleString()}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "12px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    Issue Type
                  </label>
                  <select
                    value={ticket.issue_type}
                    onChange={(e) =>
                      onUpdateTicket(ticket.id, {
                        issue_type: e.target.value as TicketIssueType,
                      })
                    }
                    style={{
                      padding: "8px 10px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Waste">Waste</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      onUpdateTicket(ticket.id, {
                        status: e.target.value as TicketStatus,
                      })
                    }
                    style={{
                      padding: "8px 10px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <option value="Unseen">Unseen</option>
                    <option value="Acknowledged">Acknowledged</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TicketList;

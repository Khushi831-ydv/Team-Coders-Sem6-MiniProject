import React, { useMemo, useState } from "react";
import { createTicket } from "../services/ticketService";
import { Ticket } from "../types";

type Props = {
  onTicketCreated: (ticket: Ticket) => void;
};

const EcoSnap: React.FC<Props> = ({ onTicketCreated }) => {
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentAlert, setAgentAlert] = useState("");

  const previewUrl = useMemo(() => {
    if (!image) return "";
    return URL.createObjectURL(image);
  }, [image]);

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    try {
      setLoading(true);
      setAgentAlert("");

      const ticket = await createTicket({
        image,
        location,
        description,
      });

      onTicketCreated(ticket);

      setAgentAlert(
        `⚠️ Agent Alert: ${ticket.issue_type} issue detected – ${ticket.severity} severity`,
      );

      setImage(null);
      setLocation("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Failed to create ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ecfdf5, #f8fafc)",
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        border: "1px solid #d1fae5",
      }}
    >
      <h2 style={{ marginBottom: "8px", color: "#065f46" }}>
        Eco-Snap Maintenance Reporting
      </h2>

      <div style={{ display: "grid", gap: "14px", marginTop: "14px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImage(file);
          }}
          style={{
            padding: "10px",
            background: "#fff",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
          }}
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: "220px",
              height: "160px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          />
        )}

        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            background: "#fff",
          }}
        />

        <textarea
          placeholder="Add description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            resize: "vertical",
            background: "#fff",
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "12px",
            background: loading ? "#94a3b8" : "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "15px",
          }}
        >
          {loading ? "Reporting..." : "Report"}
        </button>

        {agentAlert && (
          <div
            style={{
              background: "#dc2626",
              color: "#fff",
              padding: "12px",
              borderRadius: "10px",
              fontWeight: 700,
            }}
          >
            {agentAlert}
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoSnap;

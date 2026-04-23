import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Mic, Send, Volume2, X } from "lucide-react";
import { ChatMessage } from "../types";
import { getCampusAssistantReply } from "../services/chatbotService";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I am your AI Campus Assistant. Ask me about solar panels, waste, water, leaks, recycling, or campus sustainability.",
      images: [],
      createdAt: new Date().toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const speakText = (text: string) => {
    if (!voiceEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Speech recognition is not supported in this browser."); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setListening(true);
    recognition.onresult = (event: any) => { setInput(event.results[0][0].transcript); setListening(false); };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { id: `user-${Date.now()}`, role: "user", text: trimmed, images: [], createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await getCampusAssistantReply(trimmed);
      const assistantMsg: ChatMessage = { id: `assistant-${Date.now()}`, role: "assistant", text: reply.text, images: reply.images, createdAt: new Date().toISOString() };
      setMessages((prev) => [...prev, assistantMsg]);
      speakText(reply.text);
    } catch {
      setMessages((prev) => [...prev, { id: `err-${Date.now()}`, role: "assistant", text: "Sorry, I could not process your request right now.", images: [], createdAt: new Date().toISOString() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Campus Assistant"
          style={{ position: "fixed", right: "24px", bottom: "24px", width: "60px", height: "60px", borderRadius: "999px", border: "none", background: "linear-gradient(135deg, #059669, #10b981)", color: "#fff", cursor: "pointer", boxShadow: "0 10px 30px rgba(16,185,129,0.35)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div style={{ position: "fixed", right: "24px", bottom: "24px", width: "380px", maxWidth: "calc(100vw - 32px)", height: "560px", background: "#ffffff", borderRadius: "20px", boxShadow: "0 20px 50px rgba(0,0,0,0.18)", overflow: "hidden", zIndex: 9999, display: "flex", flexDirection: "column", border: "1px solid #e2e8f0" }}>
          {/* Header */}
          <div style={{ padding: "16px", background: "linear-gradient(135deg, #0f172a, #1e293b)", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "16px" }}>AI Campus Assistant</div>
              <div style={{ fontSize: "12px", opacity: 0.85 }}>Sustainability help with voice + images</div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setVoiceEnabled((p) => !p)} title="Toggle voice output" style={{ background: voiceEnabled ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: "10px", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Volume2 size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} title="Close" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "none", borderRadius: "10px", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px", background: "#f8fafc" }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ marginBottom: "14px", display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "85%", background: msg.role === "user" ? "#10b981" : "#ffffff", color: msg.role === "user" ? "#ffffff" : "#0f172a", padding: "12px", borderRadius: "14px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                  <div style={{ whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: 1.5 }}>{msg.text}</div>
                  {msg.images.length > 0 && (
                    <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                      {msg.images.map((img, i) => (
                        <img key={i} src={img} alt="Campus visual" style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e2e8f0" }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && <div style={{ color: "#475569", fontSize: "14px" }}>Assistant is thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px", borderTop: "1px solid #e2e8f0", display: "flex", gap: "8px", alignItems: "center", background: "#fff" }}>
            <button onClick={handleVoiceInput} title="Voice input" style={{ border: "none", background: listening ? "#dc2626" : "#e2e8f0", color: listening ? "#fff" : "#0f172a", width: "42px", height: "42px", borderRadius: "12px", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Mic size={18} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about water, waste, solar panels..."
              style={{ flex: 1, height: "42px", borderRadius: "12px", border: "1px solid #cbd5e1", padding: "0 12px", outline: "none", fontSize: "14px" }}
            />
            <button onClick={handleSend} disabled={loading} title="Send" style={{ border: "none", background: "#0f172a", color: "#fff", width: "42px", height: "42px", borderRadius: "12px", cursor: loading ? "not-allowed" : "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: loading ? 0.6 : 1 }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;

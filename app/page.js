"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    // أضف رسالة المستخدم
    setMessages(prev => [...prev, { role: "user", content: input }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    // أضف رد الـ AI
    setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);

    setInput("");
  }

  return (
    <main style={{ padding: 30, maxWidth: 700, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>🤖 Mister AI - Chat</h1>

      <div style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 10,
        minHeight: 400,
        marginTop: 20
      }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              marginBottom: 12
            }}
          >
            <b>{m.role === "user" ? "🧑 أنت" : "🤖 Mister AI"}</b>
            <div>{m.content}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, display: "flex" }}>
        <input
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc"
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب رسالتك..."
        />
        <button
          style={{
            marginLeft: 10,
            padding: "10px 20px",
            borderRadius: 8,
            background: "black",
            color: "white"
          }}
          onClick={sendMessage}
        >
          إرسال
        </button>
      </div>
    </main>
  );
}

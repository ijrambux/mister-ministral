"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((m) => [...m, userMessage]);

    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    const botMessage = { role: "assistant", content: data.reply };

    setMessages((m) => [...m, botMessage]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Mister Ministral Chat</h1>

      <div style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", padding: 10 }}>
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.role}:</b> {msg.content}</p>
        ))}
      </div>

      <input
        style={{ width: "80%", padding: 10 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="اكتب رسالة..."
      />

      <button onClick={sendMessage} style={{ padding: 10 }}>
        إرسال
      </button>
    </div>
  );
}

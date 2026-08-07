"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      setMessage(data.message);
if (res.ok) {
  window.location.href = "/dashboard";
}
    } catch {
      setMessage("Sunucu hatası.");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Giriş Yap
        </h1>

        <input
          className="w-full p-3 rounded bg-zinc-800"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-zinc-800"
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded"
        >
          Giriş Yap
        </button>

        <p className="text-center">{message}</p>
      </form>
    </main>
  );
}
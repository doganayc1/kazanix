"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    setMessage(data.message);
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Kayıt Ol
        </h1>

        <input
          className="w-full p-3 rounded bg-zinc-800"
          type="text"
          placeholder="İsim"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded"
        >
          Kayıt Ol
        </button>

        <p className="text-center">{message}</p>
      </form>
    </main>
  );
}
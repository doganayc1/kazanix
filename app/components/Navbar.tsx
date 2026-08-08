"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="flex flex-col">
          <h1 className="text-3xl font-extrabold text-yellow-400">
            KAZANIX
          </h1>

          <span className="text-xs text-gray-400">
            Fırsatları keşfet, kazanmaya başla
          </span>
        </Link>

        <nav className="flex items-center gap-3">

          <Link
            href="/"
            className="border border-zinc-700 px-4 py-2 rounded-xl text-gray-300 hover:border-yellow-500 hover:text-yellow-400 transition"
          >
            Ana Sayfa
          </Link>

          <Link
            href="/favorites"
            className="border border-zinc-700 px-4 py-2 rounded-xl text-gray-300 hover:border-yellow-500 hover:text-yellow-400 transition"
          >
            ❤️ Favoriler
          </Link>

          <Link
            href="/dashboard"
            className="border border-zinc-700 px-4 py-2 rounded-xl text-gray-300 hover:border-yellow-500 hover:text-yellow-400 transition"
          >
            👤 Panelim
          </Link>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-400 transition disabled:opacity-50"
          >
            {loading ? "Çıkış yapılıyor..." : "Çıkış Yap"}
          </button>

        </nav>

      </div>
    </header>
  );
}
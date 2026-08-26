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
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
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
            className="rounded-xl border border-zinc-700 px-4 py-2 text-gray-300 transition hover:border-yellow-500 hover:text-yellow-400"
          >
            Ana Sayfa
          </Link>

          <Link
            href="/campaigns"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-gray-300 transition hover:border-yellow-500 hover:text-yellow-400"
          >
            Kampanyalar
          </Link>

          <Link
            href="/favorites"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-gray-300 transition hover:border-yellow-500 hover:text-yellow-400"
          >
            Favoriler
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-gray-300 transition hover:border-yellow-500 hover:text-yellow-400"
          >
            Panelim
          </Link>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="rounded-xl bg-red-500 px-4 py-2 font-bold text-white transition hover:bg-red-400 disabled:opacity-50"
          >
            {loading ? "Çıkış yapılıyor..." : "Çıkış Yap"}
          </button>
        </nav>
      </div>
    </header>
  );
}

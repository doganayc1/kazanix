"use client";

import Link from "next/link";

export default function Navbar() {
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
            href="/favorites"
            className="border border-zinc-700 px-4 py-2 rounded-xl text-gray-300 hover:border-yellow-500 hover:text-yellow-400 transition"
          >
            ⭐ Favorilerim
          </Link>



          <Link
            href="/login"
            className="border border-yellow-500 text-yellow-400 px-5 py-2 rounded-xl hover:bg-yellow-500 hover:text-black transition"
          >
            Giriş Yap
          </Link>



          <Link
            href="/register"
            className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            Kayıt Ol
          </Link>


        </nav>


      </div>

    </header>
  );
}
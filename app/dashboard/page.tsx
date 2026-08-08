import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";

async function getUser() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      favorites: true,
    },
  });

  return user;
}

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Kullanıcı bulunamadı
          </h1>

          <p className="text-gray-400 mt-3">
            Lütfen tekrar giriş yapın.
          </p>

          <Link
            href="/login"
            className="inline-block mt-6 bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            Giriş Yap
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-extrabold">
          Hoş Geldin, {user.name} 👋
        </h1>

        <p className="text-gray-400 mt-3">
          KAZANIX kullanıcı panelin
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-gray-500">
              E-posta
            </p>

            <h2 className="font-bold mt-2 break-all">
              {user.email}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-gray-500">
              Favoriler
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              {user.favorites.length}
            </h2>
          </div>

          <Link
            href="/favorites"
            className="bg-yellow-500 text-black rounded-3xl p-6 font-bold flex items-center justify-center hover:bg-yellow-400 transition"
          >
            Favorilerimi Gör
          </Link>

        </div>

        <div className="mt-10 flex gap-4">

          <Link
            href="/"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-3 font-bold hover:border-yellow-500 transition"
          >
            Kampanyalara Git
          </Link>

          <Link
            href="/business"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-3 font-bold hover:border-yellow-500 transition"
          >
            İşletme Paneli
          </Link>

        </div>

      </div>
    </main>
  );
}
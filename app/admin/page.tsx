import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getAdmin() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}

async function getStats() {
  const [users, businesses, campaigns, comments, favorites] =
    await Promise.all([
      prisma.user.count(),
      prisma.businessProfile.count(),
      prisma.campaign.count(),
      prisma.comment.count(),
      prisma.favorite.count(),
    ]);

  return {
    users,
    businesses,
    campaigns,
    comments,
    favorites,
  };
}

export default async function AdminPage() {
  const admin = await getAdmin();

  if (!admin) {
    redirect("/login");
  }

  const stats = await getStats();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <p className="text-yellow-400 font-bold">
              KAZANIX YÖNETİCİ PANELİ
            </p>

            <h1 className="text-4xl font-extrabold mt-2">
              Hoş geldin, {admin.name}
            </h1>

            <p className="text-zinc-400 mt-2">
              Platformu buradan yönetebilirsin.
            </p>
          </div>

          <Link
            href="/"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 font-bold hover:border-yellow-500 transition"
          >
            Siteye Git
          </Link>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400">Kullanıcılar</p>
            <p className="text-4xl font-extrabold mt-3 text-yellow-400">
              {stats.users}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400">İşletmeler</p>
            <p className="text-4xl font-extrabold mt-3 text-yellow-400">
              {stats.businesses}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400">Kampanyalar</p>
            <p className="text-4xl font-extrabold mt-3 text-yellow-400">
              {stats.campaigns}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400">Yorumlar</p>
            <p className="text-4xl font-extrabold mt-3 text-yellow-400">
              {stats.comments}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400">Favoriler</p>
            <p className="text-4xl font-extrabold mt-3 text-yellow-400">
              {stats.favorites}
            </p>
          </div>

        </div>

        <section className="mt-10">

          <h2 className="text-2xl font-bold">
            Yönetim
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">

            <Link
              href="/admin/campaigns"
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-500 transition"
            >
              <h3 className="text-xl font-bold">
                Kampanyalar
              </h3>

              <p className="text-zinc-400 mt-2">
                Kampanyaları yönet.
              </p>
            </Link>

            <Link
              href="/admin/businesses"
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-500 transition"
            >
              <h3 className="text-xl font-bold">
                İşletmeler
              </h3>

              <p className="text-zinc-400 mt-2">
                İşletmeleri yönet.
              </p>
            </Link>

            <Link
              href="/admin/users"
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-500 transition"
            >
              <h3 className="text-xl font-bold">
                Kullanıcılar
              </h3>

              <p className="text-zinc-400 mt-2">
                Kullanıcıları yönet.
              </p>
            </Link>

            <Link
              href="/admin/comments"
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-500 transition"
            >
              <h3 className="text-xl font-bold">
                Yorumlar
              </h3>

              <p className="text-zinc-400 mt-2">
                Yorumları yönet.
              </p>
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}
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

export default async function AdminCampaignsPage() {
  const admin = await getAdmin();

  if (!admin) {
    redirect("/login");
  }

  const campaigns = await prisma.campaign.findMany({
    include: {
      category: true,
      business: true,
      favorites: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <Link
              href="/admin"
              className="text-yellow-400 font-bold"
            >
              ← Yönetici Paneli
            </Link>

            <h1 className="text-4xl font-extrabold mt-4">
              Kampanyalar
            </h1>

            <p className="text-zinc-400 mt-2">
              Platformdaki tüm kampanyaları yönet.
            </p>
          </div>

          <Link
            href="/admin/campaigns/create"
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            + Yeni Kampanya
          </Link>

        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-zinc-800">
                <tr>
                  <th className="text-left p-4">Kampanya</th>
                  <th className="text-left p-4">İşletme</th>
                  <th className="text-left p-4">Kategori</th>
                  <th className="text-center p-4">Favori</th>
                  <th className="text-center p-4">Yorum</th>
                  <th className="text-right p-4">İşlem</th>
                </tr>
              </thead>

              <tbody>

                {campaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                  >

                    <td className="p-4">
                      <div className="font-bold">
                        {campaign.title}
                      </div>

                      <div className="text-sm text-zinc-500 mt-1 max-w-xs truncate">
                        {campaign.description}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold">
                        {campaign.business.companyName}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                        {campaign.category.name}
                      </span>
                    </td>

                    <td className="p-4 text-center text-yellow-400 font-bold">
                      {campaign.favorites.length}
                    </td>

                    <td className="p-4 text-center text-yellow-400 font-bold">
                      {campaign.comments.length}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">

                        <Link
                          href={`/campaign/${campaign.id}`}
                          className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                        >
                          Gör
                        </Link>

                        <Link
                          href={`/admin/campaigns/${campaign.id}/edit`}
                          className="px-3 py-2 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400"
                        >
                          Düzenle
                        </Link>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {campaigns.length === 0 && (
            <div className="p-10 text-center text-zinc-400">
              Henüz kampanya bulunmuyor.
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
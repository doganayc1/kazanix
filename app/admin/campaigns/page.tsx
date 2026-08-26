import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteCampaignButton from "./DeleteCampaignButton";

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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/admin"
            className="text-sm font-medium text-yellow-500 hover:text-yellow-400"
          >
            ← Dashboard
          </Link>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Kampanyalar
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Kampanyaları buradan yönetebilirsiniz.
          </p>
        </div>

        <div className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
          {campaigns.length} Kampanya
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        {campaigns.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Henüz kampanya yok
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Veritabanında henüz kayıtlı kampanya bulunmuyor.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Kampanya
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    İşletme
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Kategori
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Favori
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Yorum
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                    İşlem
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {campaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/40"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {campaign.title}
                      </div>

                      {campaign.description && (
                        <div className="mt-1 max-w-md truncate text-sm text-gray-500 dark:text-gray-400">
                          {campaign.description}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {campaign.business?.companyName ?? "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {campaign.category?.name ?? "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {campaign.favorites?.length ?? 0}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {campaign.comments?.length ?? 0}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <DeleteCampaignButton campaignId={campaign.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


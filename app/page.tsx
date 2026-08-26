import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getCampaigns() {
  return await prisma.campaign.findMany({
    include: {
      business: true,
      category: true,
      favorites: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function Home() {
  const campaigns = await getCampaigns();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold mb-2">
          KAZANIX
        </h1>

        <p className="text-gray-400 mb-10">
          En yeni kampanyalar
        </p>

        {campaigns.length === 0 ? (
          <p className="text-gray-400">
            Henüz kampanya bulunmuyor.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6"
              >

                <div className="flex justify-between">
                  <span className="text-yellow-400 text-sm">
                    {campaign.category.name}
                  </span>

                  <span>
                    {campaign.favorites.length} favori
                  </span>
                </div>

                <h2 className="text-2xl font-bold mt-4">
                  {campaign.title}
                </h2>

                <p className="text-gray-400 mt-3">
                  {campaign.description}
                </p>

                <div className="mt-6 text-sm text-gray-500">
                  {campaign.business.companyName}
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  {campaign.comments.length} yorum
                </div>

                <Link
                  href={`/campaign/${campaign.id}`}
                  className="block mt-6 bg-yellow-500 text-black text-center py-3 rounded-xl font-bold hover:bg-yellow-400"
                >
                  Kampanyayı İncele
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

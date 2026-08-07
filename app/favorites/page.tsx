import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function FavoritesPage() {

  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;


  if (!userId) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Favorileri görmek için giriş yapmalısınız.
          </h1>

          <Link
            href="/login"
            className="inline-block mt-5 bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            Giriş Yap
          </Link>
        </div>
      </main>
    );
  }


  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
    },
    include: {
      campaign: {
        include: {
          business: true,
          category: true,
        },
      },
    },
  });



  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-extrabold mb-8">
          Favorilerim ⭐
        </h1>


        {favorites.length === 0 ? (
          <p className="text-gray-400">
            Henüz favori kampanyanız yok.
          </p>
        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {favorites.map((item) => (

              <div
                key={item.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >

                <span className="text-yellow-400 text-sm font-bold">
                  {item.campaign.category.name}
                </span>


                <h2 className="text-2xl font-bold mt-3">
                  {item.campaign.title}
                </h2>


                <p className="text-gray-400 mt-3">
                  {item.campaign.description}
                </p>


                <p className="text-gray-500 mt-4">
                  {item.campaign.business.companyName}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}
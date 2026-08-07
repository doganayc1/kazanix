import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FavoriteButton from "@/app/components/FavoriteButton";


async function getCampaign(id: string) {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      business: true,
    },
  });

  return campaign;
}


export default async function CampaignDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const campaign = await getCampaign(id);


  if (!campaign) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Kampanya bulunamadı.
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">

      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-10">


        <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold">
          {campaign.category.name}
        </span>


        <h1 className="text-4xl font-extrabold mt-6">
          {campaign.title}
        </h1>


        <p className="text-gray-400 text-lg mt-5">
          {campaign.description}
        </p>


        <div className="mt-8 border-t border-zinc-800 pt-6">

          <p className="text-gray-500">
            Kampanyayı sunan firma
          </p>


          <h2 className="text-2xl font-bold mt-2">
            {campaign.business.companyName}
          </h2>

        </div>


        <FavoriteButton 
          campaignId={campaign.id}
        />


        <Link
          href="/"
          className="block text-center mt-4 border border-zinc-700 py-3 rounded-xl hover:bg-zinc-800 transition"
        >
          Ana Sayfaya Dön
        </Link>


      </div>

    </main>
  );
}
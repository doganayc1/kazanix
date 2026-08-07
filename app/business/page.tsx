import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";


async function getBusiness() {

  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;


  if (!userId) {
    return null;
  }


  const business = await prisma.businessProfile.findUnique({
    where: {
      userId,
    },
    include: {
      campaigns: true,
    },
  });


  return business;

}



export default async function BusinessPage() {

  const business = await getBusiness();



  if (!business) {

    return (

      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-3xl font-bold">
            İşletme profili bulunamadı
          </h1>

          <p className="text-gray-400 mt-3">
            Önce işletme hesabı oluşturmalısınız.
          </p>

        </div>

      </main>

    );

  }



  return (

    <main className="min-h-screen bg-zinc-950 text-white p-6">


      <div className="max-w-6xl mx-auto">


        <h1 className="text-4xl font-extrabold">
          {business.companyName} 🏪
        </h1>


        <p className="text-gray-400 mt-3">
          İşletme yönetim paneli
        </p>



        <div className="grid md:grid-cols-3 gap-6 mt-10">


          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <p className="text-gray-500">
              Toplam Kampanya
            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-3">
              {business.campaigns.length}
            </h2>

          </div>



          <Link
            href="/business/create"
            className="bg-yellow-500 text-black rounded-3xl p-6 font-bold flex items-center justify-center hover:bg-yellow-400 transition"
          >

            + Yeni Kampanya Ekle

          </Link>



          <Link
            href="/"
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 font-bold flex items-center justify-center hover:border-yellow-500 transition"
          >

            Kampanyaları Gör

          </Link>


        </div>



        <div className="mt-12">


          <h2 className="text-2xl font-bold mb-6">
            Kampanyalarım
          </h2>



          {business.campaigns.length === 0 ? (

            <div className="bg-zinc-900 rounded-2xl p-6 text-gray-400">
              Henüz kampanya eklenmemiş.
            </div>

          ) : (

            <div className="grid md:grid-cols-3 gap-6">


              {business.campaigns.map((campaign) => (

                <div
                  key={campaign.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >

                  <h3 className="text-xl font-bold">
                    {campaign.title}
                  </h3>


                  <p className="text-gray-400 mt-3">
                    {campaign.description}
                  </p>


                </div>

              ))}


            </div>

          )}


        </div>


      </div>


    </main>

  );

}
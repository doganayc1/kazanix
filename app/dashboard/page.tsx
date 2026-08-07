import { prisma } from "@/lib/prisma";
import Link from "next/link";


async function getUser() {

  const user = await prisma.user.findUnique({
    where: {
      id: "cmsiw49ur0000urvgirss704s",
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
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

        Kullanıcı bulunamadı.

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

            <h2 className="font-bold mt-2">
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

            ⭐ Favorilerime Git

          </Link>


        </div>


      </div>


    </main>

  );
}
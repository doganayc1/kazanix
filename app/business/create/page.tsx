"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


export default function CreateCampaignPage() {

  const [categories, setCategories] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [message, setMessage] = useState("");



  useEffect(() => {

    async function loadCategories() {

      const res = await fetch("/api/categories");

      const data = await res.json();

      setCategories(data);

    }


    loadCategories();

  }, []);




  async function createCampaign(
    e: React.FormEvent
  ) {

    e.preventDefault();


    const res = await fetch(
      "/api/business/campaigns",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          title,

          description,

          categoryId,

        }),

      }
    );



    if (res.ok) {

      setMessage("🚀 Kampanya başarıyla oluşturuldu");

      setTitle("");
      setDescription("");

    } else {

      setMessage("Bir hata oluştu");

    }

  }





  return (

    <main className="min-h-screen bg-zinc-950 text-white p-6">


      <div className="max-w-3xl mx-auto">


        <h1 className="text-4xl font-extrabold">
          Yeni Kampanya Oluştur 🚀
        </h1>


        <p className="text-gray-400 mt-3">
          İşletmen için yeni fırsat ekle.
        </p>



        <form
          onSubmit={createCampaign}
          className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6"
        >


          <input

            value={title}

            onChange={(e)=>setTitle(e.target.value)}

            placeholder="Kampanya başlığı"

            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3"

          />



          <textarea

            value={description}

            onChange={(e)=>setDescription(e.target.value)}

            placeholder="Kampanya açıklaması"

            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 h-32"

          />




          <select

            value={categoryId}

            onChange={(e)=>setCategoryId(e.target.value)}

            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3"

          >

            <option>
              Kategori seç
            </option>


            {categories.map((category)=> (

              <option
                key={category.id}
                value={category.id}
              >

                {category.name}

              </option>

            ))}


          </select>




          <button

            type="submit"

            className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold hover:bg-yellow-400"

          >

            Kampanyayı Yayınla

          </button>



          {message && (

            <p className="text-center text-yellow-400">
              {message}
            </p>

          )}




          <Link

            href="/business"

            className="block text-center text-gray-400"

          >

            ← İşletme Paneline Dön

          </Link>


        </form>


      </div>


    </main>

  );

}
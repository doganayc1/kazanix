"use client";

import { useState } from "react";

export default function FavoriteButton({
  campaignId,
}: {
  campaignId: string;
}) {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  async function addFavorite() {

    setLoading(true);

    try {

      const res = await fetch(
        `/api/favorites/${campaignId}`,
        {
          method: "POST",
        }
      );


      if (res.ok) {
        setMessage("⭐ Favorilere eklendi");
      } else {
        setMessage("Favori eklenemedi");
      }


    } catch (error) {

      setMessage("Bir hata oluştu");

    }


    setLoading(false);

  }


  return (
    <div>

      <button
        onClick={addFavorite}
        disabled={loading}
        className="mt-8 w-full bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
      >

        {loading ? "Ekleniyor..." : "⭐ Favoriye Ekle"}

      </button>


      {message && (
        <p className="text-center text-yellow-400 mt-3">
          {message}
        </p>
      )}

    </div>
  );
}
"use client";

import { useState } from "react";

export default function DeleteCampaignButton({
  campaignId,
}: {
  campaignId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Bu kampanyayı silmek istediğinizden emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/campaigns", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: campaignId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Kampanya silinemedi.");
        return;
      }

      window.location.reload();
    } catch {
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-500 disabled:opacity-50 transition"
    >
      {loading ? "Siliniyor..." : "Sil"}
    </button>
  );
}
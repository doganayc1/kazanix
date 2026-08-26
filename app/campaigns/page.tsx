"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Campaign = {
  id: string;
  title: string;
  description: string | null;
  category?: {
    name: string;
  } | null;
  business?: {
    companyName: string;
  } | null;
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const res = await fetch("/api/campaigns");

        if (!res.ok) {
          throw new Error("Kampanyalar alınamadı.");
        }

        const data = await res.json();
        setCampaigns(data);
      } catch (err) {
        console.error(err);
        setError("Kampanyalar yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-yellow-400">
            Kampanyalar
          </h1>

          <p className="mt-2 text-gray-400">
            Güncel fırsatları keşfet, avantajlı kampanyalardan yararlan.
          </p>
        </div>

        {loading && (
          <div className="py-20 text-center text-gray-400">
            Kampanyalar yükleniyor...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && campaigns.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h2 className="text-xl font-bold">
              Henüz kampanya bulunmuyor
            </h2>

            <p className="mt-2 text-gray-400">
              Yeni kampanyalar eklendiğinde burada görünecek.
            </p>
          </div>
        )}

        {!loading && !error && campaigns.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/campaign/${campaign.id}`}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                    {campaign.category?.name ?? "Genel"}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white transition group-hover:text-yellow-400">
                  {campaign.title}
                </h2>

                {campaign.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                    {campaign.description}
                  </p>
                )}

                <div className="mt-6 border-t border-zinc-800 pt-4">
                  <p className="text-sm text-gray-500">
                    {campaign.business?.companyName ?? "İşletme"}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-yellow-400">
                    Detayları Gör →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

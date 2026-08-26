"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Campaign = {
  id: string;
  title: string;
  description?: string | null;
  category?: {
    name: string;
  } | null;
  business?: {
    companyName: string;
  } | null;
  comments?: unknown[];
};

export default function AdminPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const res = await fetch("/api/campaigns");

        if (!res.ok) {
          throw new Error("Kampanyalar alÄ±namadÄ±.");
        }

        const data = await res.json();
        setCampaigns(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Kampanyalar yÃ¼klenirken bir hata oluÅŸtu.");
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-yellow-400">
              KAZANIX Admin
            </h1>
            <p className="mt-2 text-gray-400">
              KampanyalarÄ± yÃ¶net ve platformu kontrol et.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-zinc-700 px-5 py-3 text-center font-semibold text-gray-300 transition hover:border-yellow-500 hover:text-yellow-400"
          >
            Siteye DÃ¶n
          </Link>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-gray-500">Toplam Kampanya</p>
            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {campaigns.length}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-gray-500">Durum</p>
            <p className="mt-2 text-xl font-bold text-green-400">
              Sistem Aktif
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-gray-500">YÃ¶netim</p>
            <p className="mt-2 text-xl font-bold">Kampanyalar</p>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Kampanyalar</h2>

          <Link
            href="/campaigns"
            className="rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400"
          >
            TÃ¼mÃ¼nÃ¼ GÃ¶r
          </Link>
        </div>

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-gray-400">
            Kampanyalar yÃ¼kleniyor...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-10 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && campaigns.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h2 className="text-xl font-bold">
              HenÃ¼z kampanya bulunmuyor
            </h2>

            <p className="mt-2 text-gray-400">
              Kampanyalar eklendiÄŸinde burada gÃ¶rÃ¼necek.
            </p>
          </div>
        )}

        {!loading && !error && campaigns.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-yellow-500/50"
              >
                <span className="inline-block rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                  {campaign.category?.name ?? "Genel"}
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {campaign.title}
                </h3>

                {campaign.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                    {campaign.description}
                  </p>
                )}

                <div className="mt-5 border-t border-zinc-800 pt-4">
                  <p className="text-sm text-gray-500">
                    {campaign.business?.companyName ?? "Ä°ÅŸletme"}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {campaign.comments?.length ?? 0} yorum
                  </p>
                </div>

                <Link
                  href={"/campaign/" + campaign.id}
                  className="mt-6 block rounded-xl bg-yellow-500 py-3 text-center font-bold text-black transition hover:bg-yellow-400"
                >
                  KampanyayÄ± Ä°ncele
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

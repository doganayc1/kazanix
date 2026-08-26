"use client";

import { useEffect, useState } from "react";

type Advertisement = {
  id: string;
  company: string;
  email: string;
  title: string;
  description: string;
  package: string;
  status: string;
  createdAt: string;
};

export default function AdminAdvertisements() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAds() {
    const response = await fetch("/api/admin/advertisements");
    const data = await response.json();

    if (Array.isArray(data)) {
      setAds(data);
    }

    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/advertisements", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    await loadAds();
  }

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
              KAZANIX ADMIN
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Reklam Başvuruları
            </h1>
          </div>

          <a
            href="/"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-bold hover:border-yellow-400"
          >
            Siteye Dön
          </a>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            Yükleniyor...
          </div>
        ) : ads.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-400">
            Henüz reklam başvurusu yok.
          </div>
        ) : (
          <div className="space-y-5">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold">{ad.title}</h2>

                      <span
                        className={
                          ad.status === "APPROVED"
                            ? "rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400"
                            : ad.status === "REJECTED"
                              ? "rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400"
                              : "rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-400"
                        }
                      >
                        {ad.status}
                      </span>
                    </div>

                    <p className="mt-2 font-semibold text-yellow-400">
                      {ad.company}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {ad.email}
                    </p>

                    <p className="mt-4 text-zinc-400">
                      {ad.description}
                    </p>

                    <p className="mt-4 text-sm text-zinc-500">
                      Paket:{" "}
                      <span className="font-bold text-zinc-300">
                        {ad.package}
                      </span>
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => updateStatus(ad.id, "APPROVED")}
                      className="rounded-xl bg-green-500 px-4 py-3 font-bold text-black hover:bg-green-400"
                    >
                      Onayla
                    </button>

                    <button
                      onClick={() => updateStatus(ad.id, "REJECTED")}
                      className="rounded-xl bg-red-500 px-4 py-3 font-bold text-white hover:bg-red-400"
                    >
                      Reddet
                    </button>

                    <button
                      onClick={() => updateStatus(ad.id, "PENDING")}
                      className="rounded-xl border border-zinc-700 px-4 py-3 font-bold hover:border-yellow-400"
                    >
                      Beklet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

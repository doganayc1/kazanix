"use client";

import { useEffect, useState } from "react";

type Advertisement = {
  id: string;
  company: string;
  email: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  package: string;
  status: string;
  startsAt: string | null;
  expiresAt: string | null;
  createdAt: string;
};

export default function AdminAdvertisements() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAds() {
    try {
      const response = await fetch(
        "/api/admin/advertisements",
        { cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Yetkisiz erişim.");
        return;
      }

      setAds(Array.isArray(data) ? data : []);
    } catch {
      setError("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(
    id: string,
    status: string
  ) {
    const response = await fetch(
      "/api/admin/advertisements",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      }
    );

    if (response.ok) {
      await loadAds();
    } else {
      alert("İşlem başarısız.");
    }
  }

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
              KAZANIX ADMIN
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Reklam Yönetimi
            </h1>

            <p className="mt-2 text-zinc-500">
              Başvuruları onayla, reddet veya beklet.
            </p>
          </div>

          <a
            href="/"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-bold"
          >
            Siteye Dön
          </a>

        </div>

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            Yükleniyor...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && ads.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-500">
            Henüz reklam başvurusu yok.
          </div>
        )}

        <div className="space-y-5">

          {ads.map((ad) => (

            <div
              key={ad.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl font-black">
                      {ad.title}
                    </h2>

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

                  <p className="mt-2 font-bold text-yellow-400">
                    {ad.company}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {ad.email}
                  </p>

                  <p className="mt-5 leading-7 text-zinc-400">
                    {ad.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3 text-sm">

                    <span className="rounded-lg bg-zinc-800 px-3 py-2">
                      Paket: {ad.package}
                    </span>

                    {ad.expiresAt && (
                      <span className="rounded-lg bg-zinc-800 px-3 py-2">
                        Bitiş:{" "}
                        {new Date(ad.expiresAt).toLocaleDateString("tr-TR")}
                      </span>
                    )}

                  </div>

                  {ad.link && (
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm font-bold text-yellow-400"
                    >
                      Reklam bağlantısını aç →
                    </a>
                  )}

                </div>

                <div className="flex flex-wrap gap-2 lg:w-72 lg:content-start">

                  <button
                    onClick={() =>
                      updateStatus(ad.id, "APPROVED")
                    }
                    className="rounded-xl bg-green-500 px-5 py-3 font-bold text-black"
                  >
                    ✓ Onayla
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(ad.id, "REJECTED")
                    }
                    className="rounded-xl bg-red-500 px-5 py-3 font-bold"
                  >
                    ✕ Reddet
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(ad.id, "PENDING")
                    }
                    className="rounded-xl border border-zinc-700 px-5 py-3 font-bold"
                  >
                    Beklet
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}

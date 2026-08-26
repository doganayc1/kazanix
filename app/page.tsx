"use client";

import { useEffect, useState } from "react";

type Ad = {
  id: string;
  company: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  package: string;
};

const packages = [
  {
    id: "starter",
    name: "Başlangıç",
    price: "₺499",
    duration: "7 gün",
  },
  {
    id: "popular",
    name: "Öne Çıkan",
    price: "₺999",
    duration: "15 gün",
  },
  {
    id: "premium",
    name: "Premium",
    price: "₺1.999",
    duration: "30 gün",
  },
];

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [selected, setSelected] = useState("popular");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function loadAds() {
    try {
      const response = await fetch("/api/advertisements/active", {
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        setAds(Array.isArray(data) ? data : []);
      }
    } catch {
      setAds([]);
    }
  }

  useEffect(() => {
    loadAds();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSent(false);

    const form = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/advertisements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: form.get("company"),
          email: form.get("email"),
          title: form.get("title"),
          description: form.get("description"),
          image: form.get("image"),
          link: form.get("link"),
          package: form.get("package"),
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      setSent(true);
      e.currentTarget.reset();
      setSelected("");
    } catch {
      alert("Başvuru gönderilemedi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-black">
            KAZANIX<span className="text-yellow-400">.</span>
          </a>

          <a
            href="#reklam-ver"
            className="rounded-xl bg-yellow-400 px-5 py-3 font-bold text-black"
          >
            Reklam Ver
          </a>
        </div>
      </header>

      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-4xl">

            <div className="inline-block rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-400">
              KAZANIX REKLAM PLATFORMU
            </div>

            <h1 className="mt-6 text-5xl font-black md:text-7xl">
              Markanı
              <br />
              <span className="text-yellow-400">
                milyonlara ulaştır.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Markanızı, ürününüzü veya hizmetinizi KAZANIX
              üzerinde tanıtın.
            </p>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
            SPONSORLU
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Güncel reklamlar
          </h2>
        </div>

        {ads.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h3 className="text-2xl font-bold">
              Henüz yayınlanan reklam yok
            </h3>

            <p className="mt-3 text-zinc-500">
              İlk reklamı vermek için aşağıdaki formu kullanabilirsin.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {ads.map((ad) => (
              <article
                key={ad.id}
                className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
              >

                {ad.image ? (
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-zinc-800">
                    <span className="text-3xl font-black text-yellow-400">
                      KAZANIX
                    </span>
                  </div>
                )}

                <div className="p-6">

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-yellow-400">
                      {ad.company}
                    </span>

                    <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-400">
                      SPONSORLU
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-black">
                    {ad.title}
                  </h3>

                  <p className="mt-3 leading-6 text-zinc-400">
                    {ad.description}
                  </p>

                  {ad.link && (
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 block rounded-xl bg-yellow-400 py-3 text-center font-black text-black"
                    >
                      İncele
                    </a>
                  )}

                </div>
              </article>
            ))}

          </div>
        )}
      </section>

      <section
        id="reklam-ver"
        className="border-t border-zinc-800 bg-zinc-900"
      >
        <div className="mx-auto max-w-4xl px-6 py-20">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 md:p-10">

            <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
              REKLAM VER
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Reklam başvurusu
            </h2>

            <p className="mt-4 text-zinc-500">
              Başvurunuz önce admin tarafından incelenir.
              Test modunda ödeme alınmamaktadır.
            </p>

            <form
              onSubmit={submit}
              className="mt-8 space-y-5"
            >

              <input
                name="company"
                required
                placeholder="Firma adı"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-yellow-400"
              />

              <input
                name="email"
                required
                type="email"
                placeholder="E-posta"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-yellow-400"
              />

              <input
                name="title"
                required
                placeholder="Reklam başlığı"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-yellow-400"
              />

              <textarea
                name="description"
                required
                rows={5}
                placeholder="Reklam açıklaması"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-yellow-400"
              />

              <input
                name="image"
                type="url"
                placeholder="Görsel URL'si (isteğe bağlı)"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-yellow-400"
              />

              <input
                name="link"
                type="url"
                placeholder="Reklam bağlantısı (isteğe bağlı)"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-yellow-400"
              />

              <select
                name="package"
                required
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4"
              >
                <option value="">
                  Paket seç
                </option>

                {packages.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name} - {item.price} / {item.duration}
                  </option>
                ))}
              </select>

              <button
                disabled={loading}
                className="w-full rounded-xl bg-yellow-400 py-4 font-black text-black disabled:opacity-50"
              >
                {loading
                  ? "Gönderiliyor..."
                  : "Reklam Başvurusu Gönder"}
              </button>

            </form>

            {sent && (
              <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 text-green-400">
                <strong>Başvuru alındı.</strong>
                <br />
                <span className="text-sm text-zinc-400">
                  Admin onayından sonra reklam yayınlanabilir.
                </span>
              </div>
            )}

          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} KAZANIX
        </div>
      </footer>

    </main>
  );
}

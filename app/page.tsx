"use client";

import { useState } from "react";

const packages = [
  {
    id: "starter",
    name: "Başlangıç",
    price: "₺499",
    duration: "7 gün",
    features: ["Ana sayfada reklam", "Sponsorlu etiketi", "7 günlük yayın"],
  },
  {
    id: "popular",
    name: "Öne Çıkan",
    price: "₺999",
    duration: "15 gün",
    features: ["Ana sayfada üst sıra", "Sponsorlu etiketi", "15 günlük yayın"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "₺1.999",
    duration: "30 gün",
    features: ["Ana sayfada öne çıkan", "Özel görünüm", "30 günlük yayın"],
  },
];

export default function Home() {
  const [selected, setSelected] = useState("popular");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submitAd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

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
          package: form.get("package"),
        }),
      });

      if (!response.ok) {
        throw new Error("Başvuru gönderilemedi");
      }

      setSubmitted(true);
      e.currentTarget.reset();
      setSelected("");
    } catch {
      alert("Başvuru gönderilemedi. Sunucuyu kontrol et.");
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
            className="rounded-xl bg-yellow-400 px-5 py-3 font-bold text-black hover:bg-yellow-300"
          >
            Reklam Ver
          </a>
        </div>
      </header>

      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-block rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-400">
              REKLAM PLATFORMU
            </div>

            <h1 className="mt-6 text-5xl font-black md:text-7xl">
              Markanı
              <br />
              <span className="text-yellow-400">öne çıkar.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              KAZANIX üzerinden markanı, ürününü veya hizmetini hedef
              kitlene ulaştır.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
          Reklam Paketleri
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Sana uygun paketi seç
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packages.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7"
            >
              <h3 className="text-2xl font-black">{item.name}</h3>

              <div className="mt-5 text-4xl font-black text-yellow-400">
                {item.price}
              </div>

              <p className="mt-2 text-zinc-500">{item.duration}</p>

              <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                {item.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              <button
                onClick={() => {
                  setSelected(item.id);
                  document
                    .getElementById("reklam-ver")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-8 w-full rounded-xl bg-yellow-400 py-3 font-black text-black hover:bg-yellow-300"
              >
                Bu Paketi Seç
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="reklam-ver"
        className="border-t border-zinc-800 bg-zinc-900"
      >
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 md:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
              Reklam Başvurusu
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Reklamını oluştur
            </h2>

            <form onSubmit={submitAd} className="mt-8 space-y-5">
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
                placeholder="Reklam açıklaması"
                rows={5}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none focus:border-yellow-400"
              />

              <select
                name="package"
                required
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none"
              >
                <option value="">Reklam paketi seç</option>

                {packages.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - {item.price}
                  </option>
                ))}
              </select>

              <button
                disabled={loading}
                type="submit"
                className="w-full rounded-xl bg-yellow-400 py-4 font-black text-black hover:bg-yellow-300 disabled:opacity-50"
              >
                {loading ? "Gönderiliyor..." : "Başvuruyu Gönder"}
              </button>
            </form>

            {submitted && (
              <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 text-green-400">
                ✓ Başvurun başarıyla oluşturuldu.
                <br />
                <span className="text-sm text-zinc-400">
                  Ödeme alınmadı. Reklamın admin onayından sonra yayınlanabilir.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} KAZANIX. Tüm hakları saklıdır.
        </div>
      </footer>
    </main>
  );
}

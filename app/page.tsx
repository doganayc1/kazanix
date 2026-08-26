"use client";

import { useMemo, useState } from "react";

const ads = [
  {
    id: 1,
    company: "ABC Giyim",
    title: "Yaz İndirimi Başladı!",
    description:
      "Seçili ürünlerde %50'ye varan indirim fırsatlarını keşfet.",
    category: "Moda",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    company: "Lezzet Durağı",
    title: "Yeni Menü ile Tanış!",
    description:
      "En sevilen lezzetler ve özel fırsatlar şimdi tek yerde.",
    category: "Yeme & İçme",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    company: "Tekno Market",
    title: "Teknolojide Fırsat Günleri",
    description:
      "Elektronik ürünlerde özel fiyatları ve kampanyaları keşfet.",
    category: "Teknoloji",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    company: "Spor Dünyası",
    title: "Spor Ürünlerinde Büyük Fırsat",
    description:
      "Spor ayakkabı, ekipman ve giyim ürünlerinde özel fiyatlar.",
    category: "Spor",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    company: "Güzellik Merkezi",
    title: "Bakımda Özel Kampanya",
    description:
      "Güzellik ve bakım hizmetlerinde özel fırsatları kaçırma.",
    category: "Güzellik",
    image:
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    company: "Oto Servis",
    title: "Araç Bakım Kampanyası",
    description:
      "Periyodik bakım ve servis hizmetlerinde avantajlı fiyatlar.",
    category: "Otomotiv",
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80",
  },
];

const categories = [
  "Tümü",
  "Moda",
  "Yeme & İçme",
  "Teknoloji",
  "Spor",
  "Güzellik",
  "Otomotiv",
];

export default function Home() {
  const [category, setCategory] = useState("Tümü");
  const [search, setSearch] = useState("");

  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      const categoryMatch =
        category === "Tümü" || ad.category === category;

      const text = `${ad.company} ${ad.title} ${ad.description} ${ad.category}`
        .toLowerCase();

      const searchMatch = text.includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <a href="/" className="text-2xl font-black tracking-tight">
            KAZANIX<span className="text-yellow-400">.</span>
          </a>

          <nav className="hidden gap-7 md:flex">
            <a href="#reklamlar" className="text-sm text-zinc-400 hover:text-white">
              Reklamlar
            </a>
            <a href="#nasil" className="text-sm text-zinc-400 hover:text-white">
              Nasıl Çalışır?
            </a>
            <a href="#sss" className="text-sm text-zinc-400 hover:text-white">
              SSS
            </a>
          </nav>

          <a
            href="#reklam-ver"
            className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-black hover:bg-yellow-300"
          >
            Reklam Ver
          </a>

        </div>
      </header>

      <section className="relative overflow-hidden border-b border-zinc-800">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(250,204,21,0.12),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">

          <div className="max-w-4xl">

            <div className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-xs font-black tracking-widest text-yellow-400">
              TÜRKİYE'NİN REKLAM KEŞİF PLATFORMU
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Markaları
              <br />
              <span className="text-yellow-400">keşfet.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
              Kampanyaları, fırsatları ve sponsorlu reklamları tek
              bir yerde keşfet. Markanı da binlerce potansiyel
              müşteriye ulaştır.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <a
                href="#reklamlar"
                className="rounded-xl bg-yellow-400 px-7 py-4 text-center font-black text-black hover:bg-yellow-300"
              >
                Reklamları Keşfet
              </a>

              <a
                href="#reklam-ver"
                className="rounded-xl border border-zinc-700 px-7 py-4 text-center font-bold hover:border-yellow-400"
              >
                Markanı Tanıt
              </a>

            </div>

          </div>

        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-900/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-10 md:grid-cols-4">

          <div>
            <div className="text-3xl font-black text-yellow-400">6+</div>
            <div className="mt-1 text-sm text-zinc-500">
              Örnek reklam
            </div>
          </div>

          <div>
            <div className="text-3xl font-black">7</div>
            <div className="mt-1 text-sm text-zinc-500">
              Kategori
            </div>
          </div>

          <div>
            <div className="text-3xl font-black">24/7</div>
            <div className="mt-1 text-sm text-zinc-500">
              Reklam görünürlüğü
            </div>
          </div>

          <div>
            <div className="text-3xl font-black">1</div>
            <div className="mt-1 text-sm text-zinc-500">
              Reklam platformu
            </div>
          </div>

        </div>
      </section>

      <section id="reklamlar" className="mx-auto max-w-7xl px-5 py-20">

        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

          <div>
            <p className="text-xs font-black uppercase tracking-widest text-yellow-400">
              Sponsorlu İçerikler
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Güncel reklamlar
            </h2>

            <p className="mt-3 text-zinc-500">
              İlginizi çeken markaları ve kampanyaları bulun.
            </p>
          </div>

          <div className="w-full md:w-80">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Reklam veya marka ara..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-yellow-400"
            />

          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-3">

          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={
                category === item
                  ? "rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-black text-black"
                  : "rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-400 hover:border-yellow-400 hover:text-yellow-400"
              }
            >
              {item}
            </button>
          ))}

        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {filteredAds.map((ad) => (
            <article
              key={ad.id}
              className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40"
            >

              <div className="relative h-56 overflow-hidden">

                <img
                  src={ad.image}
                  alt={ad.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1.5 text-xs font-black text-yellow-400">
                  SPONSORLU
                </div>

              </div>

              <div className="p-6">

                <div className="flex items-center justify-between gap-3">

                  <span className="text-sm font-bold text-yellow-400">
                    {ad.company}
                  </span>

                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-500">
                    {ad.category}
                  </span>

                </div>

                <h3 className="mt-4 text-2xl font-black">
                  {ad.title}
                </h3>

                <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">
                  {ad.description}
                </p>

                <a
                  href="#reklam-ver"
                  className="mt-6 block rounded-xl bg-white py-3 text-center font-black text-black hover:bg-yellow-400"
                >
                  İncele
                </a>

              </div>

            </article>
          ))}

        </div>

        {filteredAds.length === 0 && (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <div className="text-xl font-bold">
              Reklam bulunamadı.
            </div>
            <p className="mt-2 text-zinc-500">
              Arama veya kategori seçimini değiştirmeyi deneyin.
            </p>
          </div>
        )}

      </section>

      <section id="nasil" className="border-y border-zinc-800 bg-zinc-900/40">

        <div className="mx-auto max-w-7xl px-5 py-20">

          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-yellow-400">
              Nasıl Çalışır?
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Reklam vermek çok kolay.
            </h2>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7">
              <div className="text-4xl font-black text-yellow-400">
                01
              </div>
              <h3 className="mt-6 text-xl font-black">
                Başvur
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Markanın reklam bilgilerini bize gönder.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7">
              <div className="text-4xl font-black text-yellow-400">
                02
              </div>
              <h3 className="mt-6 text-xl font-black">
                Reklamını hazırlayalım
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Reklam içeriğini platforma uygun hale getirelim.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7">
              <div className="text-4xl font-black text-yellow-400">
                03
              </div>
              <h3 className="mt-6 text-xl font-black">
                Yayınla
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Reklamın KAZANIX üzerinde ziyaretçilere gösterilsin.
              </p>
            </div>

          </div>

        </div>

      </section>

      <section id="reklam-ver" className="mx-auto max-w-7xl px-5 py-20">

        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-yellow-400/5">

          <div className="p-8 md:p-14">

            <p className="text-xs font-black uppercase tracking-widest text-yellow-400">
              İşletmeler İçin
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-black md:text-5xl">
              Markanı KAZANIX'ta öne çıkar.
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              Kampanyanı ve markanı KAZANIX ziyaretçilerine ulaştır.
              Reklam başvurusu için bizimle iletişime geç.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <a
                href="mailto:reklam@kazanix.com?subject=KAZANIX%20Reklam%20Başvurusu"
                className="rounded-xl bg-yellow-400 px-7 py-4 text-center font-black text-black hover:bg-yellow-300"
              >
                Reklam Başvurusu Yap
              </a>

              <a
                href="mailto:reklam@kazanix.com"
                className="rounded-xl border border-zinc-700 px-7 py-4 text-center font-bold hover:border-yellow-400"
              >
                İletişime Geç
              </a>

            </div>

          </div>

        </div>

      </section>

      <section id="sss" className="border-t border-zinc-800">

        <div className="mx-auto max-w-4xl px-5 py-20">

          <div className="text-center">

            <p className="text-xs font-black uppercase tracking-widest text-yellow-400">
              SSS
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Sık sorulan sorular
            </h2>

          </div>

          <div className="mt-10 space-y-4">

            <details className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <summary className="cursor-pointer font-bold">
                KAZANIX'ta nasıl reklam verebilirim?
              </summary>
              <p className="mt-4 text-sm leading-6 text-zinc-500">
                Reklam Ver bölümündeki başvuru butonundan bize ulaşarak
                reklam talebini iletebilirsin.
              </p>
            </details>

            <details className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <summary className="cursor-pointer font-bold">
                Reklam fiyatları nedir?
              </summary>
              <p className="mt-4 text-sm leading-6 text-zinc-500">
                Reklam fiyatları reklam alanı, süre ve kampanyaya göre
                belirlenir. Güncel fiyat için iletişime geçebilirsin.
              </p>
            </details>

            <details className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <summary className="cursor-pointer font-bold">
                Hangi sektörler reklam verebilir?
              </summary>
              <p className="mt-4 text-sm leading-6 text-zinc-500">
                Yasalara ve platform kurallarına uygun olmak şartıyla
                farklı sektörlerden işletmeler reklam başvurusu yapabilir.
              </p>
            </details>

          </div>

        </div>

      </section>

      <footer className="border-t border-zinc-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="text-2xl font-black">
              KAZANIX<span className="text-yellow-400">.</span>
            </div>

            <p className="mt-2 max-w-md text-sm text-zinc-600">
              Markaları, kampanyaları ve müşterileri buluşturan
              reklam keşif platformu.
            </p>

          </div>

          <div className="flex flex-wrap gap-5 text-sm text-zinc-500">
            <a href="#reklamlar" className="hover:text-white">
              Reklamlar
            </a>
            <a href="#reklam-ver" className="hover:text-white">
              Reklam Ver
            </a>
            <a href="#sss" className="hover:text-white">
              SSS
            </a>
            <a href="mailto:reklam@kazanix.com" className="hover:text-white">
              İletişim
            </a>
          </div>

          <div className="text-sm text-zinc-700">
            © {new Date().getFullYear()} KAZANIX
          </div>

        </div>

      </footer>

    </main>
  );
}

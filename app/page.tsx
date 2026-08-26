import Link from "next/link";

const ads = [
  {
    company: "ABC Giyim",
    title: "Yaz İndirimi Başladı!",
    description: "Seçili ürünlerde %50'ye varan indirim fırsatlarını keşfet.",
    category: "Moda",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
  {
    company: "Lezzet Durağı",
    title: "Yeni Menü ile Tanış!",
    description: "En sevilen lezzetler ve özel fırsatlar şimdi tek yerde.",
    category: "Yeme & İçme",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
  {
    company: "Tekno Market",
    title: "Teknolojide Fırsat Günleri",
    description: "Elektronik ürünlerde özel fiyatları keşfet.",
    category: "Teknoloji",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
    link: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            KAZANIX<span className="text-yellow-400">.</span>
          </Link>

          <a
            href="#reklam-ver"
            className="rounded-xl bg-yellow-400 px-5 py-3 font-bold text-black hover:bg-yellow-300"
          >
            Reklam Ver
          </a>
        </div>
      </header>

      <section className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-block rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-400">
              SPONSORLU REKLAMLAR
            </div>

            <h1 className="mt-6 text-5xl font-black md:text-7xl">
              Markaları
              <br />
              <span className="text-yellow-400">keşfet.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Güncel kampanyaları, fırsatları ve sponsorlu içerikleri tek
              yerde keşfet.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
            Öne Çıkanlar
          </p>
          <h2 className="mt-2 text-3xl font-bold">Güncel reklamlar</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <article
              key={ad.company}
              className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-yellow-400/40"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-yellow-400">
                  SPONSORLU
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-yellow-400">
                    {ad.company}
                  </span>

                  <span className="text-xs text-zinc-500">
                    {ad.category}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold">{ad.title}</h3>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {ad.description}
                </p>

                <a
                  href={ad.link}
                  className="mt-6 block rounded-xl bg-white py-3 text-center font-bold text-black hover:bg-yellow-400"
                >
                  İncele
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="reklam-ver" className="border-t border-zinc-800 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-8 md:p-12">
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
              İşletmeler İçin
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Markanızı KAZANIX'ta tanıtın.
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Kampanyanızı ve reklamınızı potansiyel müşterilere ulaştırın.
            </p>

            <a
              href="mailto:reklam@kazanix.com"
              className="mt-8 inline-block rounded-xl bg-yellow-400 px-7 py-4 font-black text-black hover:bg-yellow-300"
            >
              Reklam Başvurusu Yap
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} KAZANIX. Tüm hakları saklıdır.
        </div>
      </footer>
    </main>
  );
}

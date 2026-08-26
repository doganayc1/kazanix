import Link from "next/link";

const ads = [
  {
    company: "ABC Giyim",
    title: "Yaz İndirimi Başladı!",
    description: "Seçili ürünlerde %50'ye varan indirim fırsatlarını keşfet.",
    category: "Moda",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    company: "Lezzet Durağı",
    title: "Yeni Menü ile Tanış!",
    description: "En sevilen lezzetler ve özel fırsatlar şimdi tek yerde.",
    category: "Yeme & İçme",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    company: "Tekno Market",
    title: "Teknolojide Fırsat Günleri",
    description: "Elektronik ürünlerde özel fiyatları keşfet.",
    category: "Teknoloji",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
  },
  {
    company: "Spor Dünyası",
    title: "Spor Ürünlerinde Büyük Fırsat",
    description: "Spor ayakkabı, ekipman ve giyim ürünlerinde özel fiyatlar.",
    category: "Spor",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
  },
  {
    company: "Güzellik Merkezi",
    title: "Yeni Müşterilere Özel Kampanya",
    description: "Güzellik ve bakım hizmetlerinde özel fırsatları kaçırma.",
    category: "Güzellik",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    company: "Oto Servis",
    title: "Araç Bakım Kampanyası",
    description: "Periyodik bakım ve servis hizmetlerinde avantajlı fiyatlar.",
    category: "Otomotiv",
    image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80",
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
  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link href="/" className="text-2xl font-black tracking-tight">
            KAZANIX<span className="text-yellow-400">.</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#reklamlar" className="text-sm text-zinc-300 hover:text-white">
              Reklamlar
            </a>
            <a href="#kategoriler" className="text-sm text-zinc-300 hover:text-white">
              Kategoriler
            </a>
            <a href="#reklam-ver" className="text-sm text-zinc-300 hover:text-white">
              Reklam Ver
            </a>
          </nav>

          <a
            href="#reklam-ver"
            className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:bg-yellow-300"
          >
            Reklam Ver
          </a>
        </div>
      </header>

      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-black tracking-widest text-yellow-400">
              SPONSORLU REKLAMLAR
            </div>

            <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
              Markaları
              <br />
              <span className="text-yellow-400">keşfet.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
              Markaların kampanyalarını, fırsatlarını ve sponsorlu
              reklamlarını tek bir yerde keşfet.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#reklamlar"
                className="rounded-xl bg-yellow-400 px-7 py-4 text-center font-black text-black hover:bg-yellow-300"
              >
                Reklamları Keşfet
              </a>

              <a
                href="#reklam-ver"
                className="rounded-xl border border-zinc-700 px-7 py-4 text-center font-bold text-white hover:border-yellow-400"
              >
                Markanı Tanıt
              </a>
            </div>

          </div>
        </div>
      </section>

      <section id="kategoriler" className="border-b border-zinc-800 bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-widest text-yellow-400">
              Kategoriler
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={category}
                className={
                  index === 0
                    ? "rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-black"
                    : "rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:border-yellow-400 hover:text-yellow-400"
                }
              >
                {category}
              </button>
            ))}
          </div>

        </div>
      </section>

      <section id="reklamlar" className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-yellow-400">
              Öne Çıkanlar
            </p>

            <h2 className="mt-2 text-4xl font-black">
              Güncel reklamlar
            </h2>

            <p className="mt-3 text-zinc-500">
              İşletmelerin sponsorlu kampanyalarını keşfet.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-400">
            {ads.length} sponsorlu reklam
          </div>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {ads.map((ad) => (
            <article
              key={ad.company}
              className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40"
            >

              <div className="relative h-56 overflow-hidden">

                <img
                  src={ad.image}
                  alt={ad.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1.5 text-xs font-black text-yellow-400">
                  SPONSORLU
                </div>

              </div>

              <div className="p-6">

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-yellow-400">
                    {ad.company}
                  </span>

                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                    {ad.category}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black">
                  {ad.title}
                </h3>

                <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">
                  {ad.description}
                </p>

                <button
                  className="mt-6 block w-full rounded-xl bg-white py-3 text-center font-black text-black transition hover:bg-yellow-400"
                >
                  İncele
                </button>

              </div>
            </article>
          ))}

        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid gap-10 md:grid-cols-3">

            <div>
              <div className="mb-4 text-3xl font-black text-yellow-400">
                01
              </div>
              <h3 className="text-xl font-black">
                Reklamını gönder
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Markanın reklam bilgilerini bize ulaştır.
              </p>
            </div>

            <div>
              <div className="mb-4 text-3xl font-black text-yellow-400">
                02
              </div>
              <h3 className="text-xl font-black">
                Yayınlayalım
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Reklamını KAZANIX üzerinde görünür hale getirelim.
              </p>
            </div>

            <div>
              <div className="mb-4 text-3xl font-black text-yellow-400">
                03
              </div>
              <h3 className="text-xl font-black">
                Daha fazla kişiye ulaş
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Markanı yeni müşterilerle buluştur.
              </p>
            </div>

          </div>

        </div>
      </section>

      <section id="reklam-ver" className="mx-auto max-w-7xl px-6 py-20">

        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-yellow-400/5">

          <div className="p-8 md:p-14">

            <div className="max-w-3xl">

              <p className="text-xs font-black uppercase tracking-widest text-yellow-400">
                İşletmeler İçin
              </p>

              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                Markanızı KAZANIX'ta tanıtın.
              </h2>

              <p className="mt-5 text-lg leading-8 text-zinc-400">
                Kampanyanızı ve reklamınızı potansiyel müşterilere
                ulaştırın. KAZANIX üzerinde sponsorlu reklam alanınızı
                oluşturun.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                <a
                  href="mailto:reklam@kazanix.com?subject=KAZANIX Reklam Başvurusu"
                  className="rounded-xl bg-yellow-400 px-7 py-4 text-center font-black text-black hover:bg-yellow-300"
                >
                  Reklam Başvurusu Yap
                </a>

                <a
                  href="mailto:reklam@kazanix.com"
                  className="rounded-xl border border-zinc-700 px-7 py-4 text-center font-bold text-white hover:border-yellow-400"
                >
                  Bize Ulaşın
                </a>

              </div>

            </div>

          </div>

        </div>
      </section>

      <footer className="border-t border-zinc-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="text-xl font-black">
              KAZANIX<span className="text-yellow-400">.</span>
            </div>

            <p className="mt-2 text-sm text-zinc-600">
              Markaları ve müşterileri buluşturan reklam platformu.
            </p>
          </div>

          <div className="text-sm text-zinc-600">
            © {new Date().getFullYear()} KAZANIX. Tüm hakları saklıdır.
          </div>

        </div>

      </footer>

    </main>
  );
}

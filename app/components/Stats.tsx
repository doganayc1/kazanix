export default function Stats() {
  const stats = [
    {
      number: "1000+",
      title: "Aktif Fırsat",
      icon: "🎯",
    },
    {
      number: "500+",
      title: "İşletme",
      icon: "🏢",
    },
    {
      number: "10.000+",
      title: "Kullanıcı",
      icon: "👥",
    },
    {
      number: "24/7",
      title: "Güncel Takip",
      icon: "⚡",
    },
  ];

  return (
    <section className="mt-20">

      <div className="grid md:grid-cols-4 gap-6">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center hover:border-yellow-500 transition"
          >

            <div className="text-4xl">
              {stat.icon}
            </div>

            <h3 className="text-3xl font-extrabold text-yellow-400 mt-4">
              {stat.number}
            </h3>

            <p className="text-gray-400 mt-2">
              {stat.title}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}
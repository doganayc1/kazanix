export default function WhyKazanix() {
  const features = [
    {
      icon: "🔥",
      title: "Güncel Fırsatlar",
      desc: "Banka, market, e-ticaret ve günlük kazanç fırsatlarını tek yerden takip et.",
    },
    {
      icon: "💰",
      title: "Gerçek Kazanç",
      desc: "İndirim, bonus ve cashback fırsatlarıyla paranı daha değerli kullan.",
    },
    {
      icon: "🏢",
      title: "İşletmeler İçin Güçlü Platform",
      desc: "Firmalar kampanyalarını milyonlarca kullanıcıya ulaştırabilir.",
    },
  ];

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold mb-8">
        🚀 Neden KAZANIX?
      </h2>


      <div className="grid md:grid-cols-3 gap-6">

        {features.map((feature) => (

          <div
            key={feature.title}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-yellow-500 transition hover:-translate-y-1"
          >

            <div className="text-5xl">
              {feature.icon}
            </div>


            <h3 className="text-xl font-bold mt-5 text-yellow-400">
              {feature.title}
            </h3>


            <p className="text-gray-400 mt-3 leading-relaxed">
              {feature.desc}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}
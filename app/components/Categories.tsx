export default function Categories() {
  const categories = [
    {
      icon: "💳",
      title: "Banka Kampanyaları",
      desc: "Bonuslar, kart fırsatları ve banka promosyonları",
    },
    {
      icon: "🛒",
      title: "Market İndirimleri",
      desc: "Güncel market ve alışveriş fırsatları",
    },
    {
      icon: "📱",
      title: "Kazandıran Uygulamalar",
      desc: "Telefonundan gelir sağlayabileceğin uygulamalar",
    },
    {
      icon: "🎁",
      title: "Cashback Fırsatları",
      desc: "Alışveriş yaparken geri ödeme fırsatları",
    },
    {
      icon: "✈️",
      title: "Seyahat Fırsatları",
      desc: "Uygun fiyatlı uçuş ve konaklama fırsatları",
    },
    {
      icon: "🏷️",
      title: "E-Ticaret",
      desc: "Online alışveriş indirimleri",
    },
  ];

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold mb-8">
        🔥 Popüler Kategoriler
      </h2>


      <div className="grid md:grid-cols-3 gap-6">

        {categories.map((category) => (

          <div
            key={category.title}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-yellow-500 transition hover:-translate-y-1"
          >

            <div className="text-4xl">
              {category.icon}
            </div>


            <h3 className="text-xl font-bold mt-4 text-yellow-400">
              {category.title}
            </h3>


            <p className="text-gray-400 mt-3">
              {category.desc}
            </p>


          </div>

        ))}

      </div>

    </section>
  );
}
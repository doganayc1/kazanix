import Link from "next/link";

type CampaignCardProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  company: string;
};

export default function CampaignCard({
  id,
  title,
  description,
  category,
  company,
}: CampaignCardProps) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-yellow-500 transition-all hover:-translate-y-2 shadow-lg">

      <div className="flex items-center justify-between">

        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
          {category}
        </span>

        <span className="text-gray-500 text-xs">
          KAZANIX
        </span>

      </div>


      <h3 className="text-2xl font-bold mt-5 group-hover:text-yellow-400 transition">
        {title}
      </h3>


      <p className="text-gray-400 mt-4 leading-relaxed">
        {description}
      </p>


      <div className="mt-6 border-t border-zinc-800 pt-4">

        <p className="text-sm text-gray-500">
          Firma
        </p>

        <p className="font-bold text-white">
          {company}
        </p>

      </div>


      <Link
        href={`/campaign/${id}`}
        className="mt-6 block w-full text-center bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
      >
        Detayları Gör
      </Link>


    </div>
  );
}
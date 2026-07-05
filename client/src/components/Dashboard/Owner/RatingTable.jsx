import { Star } from "lucide-react";

export default function RatingTable({ ratings }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">

      <div className="border-b border-slate-800 p-6">
        <h2 className="text-2xl font-bold text-white">
          Customer Ratings
        </h2>

        <p className="mt-1 text-slate-400">
          Users who have submitted ratings for your store.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-800 bg-slate-900">
              <th className="px-6 py-4 text-left text-slate-300">
                Name
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Email
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Address
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Rating
              </th>
            </tr>
          </thead>

          <tbody>
            {ratings.map((item) => (
              <tr
                key={item.user_id}
                className="border-b border-slate-800 transition hover:bg-slate-800/40"
              >
                <td className="px-6 py-5 font-medium text-white">
                  {item.name}
                </td>

                <td className="px-6 py-5 text-slate-400">
                  {item.email}
                </td>

                <td className="px-6 py-5 text-slate-400">
                  {item.address}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 font-semibold text-yellow-400">
                    <Star
                      size={18}
                      className="fill-yellow-400"
                    />

                    {item.rating}/5
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
import { Building2, Star, Users } from "lucide-react";

export default function StoreOverviewCard({
  storeName,
  averageRating,
  totalRatings,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Store */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <Building2 className="text-indigo-400" />

          <h2 className="text-lg font-semibold text-white">
            Store
          </h2>
        </div>

        <p className="text-2xl font-bold text-white">
          {storeName}
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Store managed by you
        </p>
      </div>

      {/* Average Rating */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <Star className="fill-yellow-400 text-yellow-400" />

          <h2 className="text-lg font-semibold text-white">
            Average Rating
          </h2>
        </div>

        <p className="text-4xl font-bold text-yellow-400">
          {averageRating}
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Overall customer rating
        </p>
      </div>

      {/* Total Ratings */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <Users className="text-indigo-400" />

          <h2 className="text-lg font-semibold text-white">
            Total Ratings
          </h2>
        </div>

        <p className="text-4xl font-bold text-indigo-400">
          {totalRatings}
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Customers rated your store
        </p>
      </div>
    </div>
  );
}
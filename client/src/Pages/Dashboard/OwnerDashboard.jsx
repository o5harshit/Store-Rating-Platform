import { motion } from "framer-motion";

import StoreOverviewCard from "@/components/Dashboard/Owner/StoreOverviewCard";
import RatingTable from "@/components/Dashboard/Owner/RatingTable";
import Navbar from "@/components/Common/Navbar";
import useOwnerRatings from "@/lib/useOwnerRatings";

export default function OwnerDashboard() {
  const {
    stores,
    loadingRatings,
  } = useOwnerRatings();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-slate-400">
            Manage your stores, monitor customer feedback and improve
            your overall ratings.
          </p>
        </motion.div>

        {/* Loading */}

        {loadingRatings ? (
          <div className="py-10 text-center text-slate-400">
            Loading stores and ratings...
          </div>
        ) : stores.length === 0 ? (
          <div className="py-10 text-center text-slate-400">
            No stores found.
          </div>
        ) : (
          /* All Owner Stores */

          <div className="space-y-16">
            {stores.map((store) => (
              <motion.section
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Store Stats */}

                <StoreOverviewCard
                  storeName={store.name}
                  averageRating={store.averageRating}
                  totalRatings={store.totalRatings}
                />

                {/* Store Rating Table */}

                <div className="mt-10">
                  {store.ratings.length === 0 ? (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-10 text-center text-slate-400">
                      No ratings submitted for {store.name} yet.
                    </div>
                  ) : (
                    <RatingTable
                      ratings={store.ratings}
                    />
                  )}
                </div>
              </motion.section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import RatingDialog from "@/components/Dashboard/User/RatingDialog";

export default function StoreCard({
  store,
  onRatingSuccess,
}) {
  const [openRatingDialog, setOpenRatingDialog] =
    useState(false);


  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={18}
        className={
          index < Math.round(Number(rating))
            ? "fill-yellow-400 text-yellow-400"
            : "text-slate-600"
        }
      />
    ));
  };

  return (
    <>
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.02,
        }}
        transition={{
          duration: 0.2,
        }}
        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg backdrop-blur-xl"
      >
        {/* Store Name */}

        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {store.name}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={16} />

              {store.address}
            </div>
          </div>

          <div className="rounded-full bg-indigo-600/20 px-3 py-1 text-sm font-semibold text-indigo-400">
            #{store.id}
          </div>
        </div>

        {/* Overall Rating */}

        <div className="mb-5 rounded-xl bg-slate-800/60 p-4">
          <p className="text-sm text-slate-400">
            Overall Rating
          </p>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-1">
              {renderStars(store.rating)}
            </div>

            <span className="text-lg font-bold text-white">
              {store.rating}
            </span>
          </div>
        </div>

        {/* User Rating */}

        <div className="mb-6 rounded-xl border border-slate-800 p-4">
          <p className="text-sm text-slate-400">
            My Rating
          </p>

          {Number(store.userRating) > 0 ? (
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-1">
                {renderStars(store.userRating)}
              </div>

              <span className="font-semibold text-indigo-400">
                {store.userRating}/5
              </span>
            </div>
          ) : (
            <p className="mt-2 font-medium text-orange-400">
              Not Rated Yet
            </p>
          )}
        </div>

        {/* Button */}

        <Button
          onClick={() => setOpenRatingDialog(true)}
          className="h-11 w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {Number(store.userRating) > 0
            ? "Update Rating"
            : "Give Rating"}
        </Button>
      </motion.div>

      <RatingDialog
        open={openRatingDialog}
        setOpen={setOpenRatingDialog}
        store={store}
        onRatingSuccess={onRatingSuccess}
      />
    </>
  );
}
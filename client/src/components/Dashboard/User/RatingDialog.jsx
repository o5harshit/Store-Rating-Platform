/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Star, Store } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { SUBMIT_RATING } from "@/utils/constants";

export default function RatingDialog({
  open,
  setOpen,
  store,
  onRatingSuccess,
}) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setRating(Number(store?.userRating) || 0);
    }
  }, [open, store]);

  const handleDialogChange = (value) => {
    setOpen(value);

    if (!value) {
      setRating(0);
      setHoveredRating(0);
    }
  };

  const handleSubmitRating = async () => {
    if (!rating) {
      return toast.error("Please select a rating.");
    }

    try {
      setLoading(true);

      const response = await apiClient.post(
        SUBMIT_RATING,
        {
          store_id: store.id,
          rating,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Rating submitted successfully.",
        );

        setOpen(false);

     
   console.log("Rating success callback:", onRatingSuccess);

        if (onRatingSuccess) {
          await onRatingSuccess();
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit rating.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleDialogChange}
    >
      <DialogContent className="border-slate-800 bg-slate-950 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Rate Store
          </DialogTitle>

          <DialogDescription className="text-center text-slate-400">
            Share your experience with this store.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-5">
          <div className="rounded-2xl bg-indigo-600 p-4">
            <Store className="h-8 w-8 text-white" />
          </div>

          <h2 className="mt-4 text-xl font-semibold">
            {store?.name}
          </h2>

          <p className="mt-1 text-center text-sm text-slate-400">
            {store?.address}
          </p>
        </div>

        <div className="flex justify-center gap-3 py-4">
          {[1, 2, 3, 4, 5].map((star) => {
            const active =
              star <= (hoveredRating || rating);

            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() =>
                  setHoveredRating(star)
                }
                onMouseLeave={() =>
                  setHoveredRating(0)
                }
                className="transition hover:scale-110"
              >
                <Star
                  className={`h-10 w-10 ${
                    active
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-600"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p className="text-center text-sm text-slate-400">
          {rating
            ? `You selected ${rating} out of 5`
            : "Select your rating"}
        </p>

        <Button
          onClick={handleSubmitRating}
          disabled={loading || !rating}
          className="mt-4 w-full"
        >
          {loading
            ? "Submitting..."
            : store?.userRating
              ? "Update Rating"
              : "Submit Rating"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  totalRecords,
  limit,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const start =
    (page - 1) * limit + 1;

  const end = Math.min(
    page * limit,
    totalRecords
  );

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5 lg:flex-row">

      <p className="text-sm text-slate-400">
        Showing{" "}
        <span className="font-semibold text-white">
          {start}
        </span>{" "}
        -
        <span className="font-semibold text-white">
          {" "}
          {end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-white">
          {totalRecords}
        </span>{" "}
        records
      </p>

      <div className="flex items-center gap-2">

        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <Button
              key={index}
              size="sm"
              variant={
                page === index + 1
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                onPageChange(index + 1)
              }
            >
              {index + 1}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

      </div>

    </div>
  );
}
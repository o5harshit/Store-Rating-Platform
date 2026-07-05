import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StoreSearchBar({
  filters,
  setFilters,
  onSearch,
  onReset,
}) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
      <div className="grid gap-4 lg:grid-cols-3">
        <Input
          placeholder="Search by Name"
          value={filters.name}
          onChange={(e) =>
            setFilters({
              ...filters,
              name: e.target.value,
            })
          }
          className="border-slate-700 bg-slate-950 text-white"
        />

        <Input
          placeholder="Search by Address"
          value={filters.address}
          onChange={(e) =>
            setFilters({
              ...filters,
              address: e.target.value,
            })
          }
          className="border-slate-700 bg-slate-950 text-white"
        />

        <div className="flex gap-2">
          <Button onClick={onSearch} className="flex-1">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>

          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
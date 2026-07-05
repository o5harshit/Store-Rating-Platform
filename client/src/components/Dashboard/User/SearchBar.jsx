import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="mb-8">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <Input
          placeholder="Search by Store Name or Address..."
          className="h-12 rounded-xl border-slate-700 bg-slate-900 pl-11 text-white placeholder:text-slate-500"
        />

      </div>

    </div>
  );
}
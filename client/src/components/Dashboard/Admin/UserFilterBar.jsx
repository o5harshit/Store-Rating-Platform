import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserFilterBar({
  filters,
  setFilters,
  onSearch,
  onReset,
  showRole = false,
}) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Name */}

        <Input
          placeholder="Name"
          value={filters.name}
          onChange={(e) =>
            setFilters({
              ...filters,
              name: e.target.value,
            })
          }
          className="border-slate-700 bg-slate-950 text-white"
        />

        {/* Email */}

        <Input
          placeholder="Email"
          value={filters.email}
          onChange={(e) =>
            setFilters({
              ...filters,
              email: e.target.value,
            })
          }
          className="border-slate-700 bg-slate-950 text-white"
        />

        {/* Address */}

        <Input
          placeholder="Address"
          value={filters.address}
          onChange={(e) =>
            setFilters({
              ...filters,
              address: e.target.value,
            })
          }
          className="border-slate-700 bg-slate-950 text-white"
        />

        {/* Role */}

        {showRole && (
          <Select
            value={filters.role}
            onValueChange={(value) =>
              setFilters({
                ...filters,
                role: value,
              })
            }
          >
            <SelectTrigger className="border-slate-700 bg-slate-950 text-white">
              <SelectValue placeholder="Role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>

              <SelectItem value="ADMIN">Admin</SelectItem>

              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>
        )}

        {/* Buttons */}

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

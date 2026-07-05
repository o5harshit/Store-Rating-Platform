import { Bell, LogOut, Search, Store } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-600 p-3">

            <Store className="h-6 w-6 text-white" />

          </div>

          <div>

            <h1 className="text-xl font-bold text-white">

              Store Rating

            </h1>

            <p className="text-xs text-slate-400">

              Rate • Discover • Explore

            </p>

          </div>

        </div>

        {/* Search */}

        <div className="relative hidden w-[380px] lg:block">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <Input
            placeholder="Search stores..."
            className="border-slate-700 bg-slate-900 pl-10 text-white placeholder:text-slate-500"
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button className="rounded-lg p-2 transition hover:bg-slate-800">

            <Bell className="text-slate-300" />

          </button>

          <Avatar>

            <AvatarFallback className="bg-indigo-600 text-white">

              HS

            </AvatarFallback>

          </Avatar>

          <button className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-slate-300 transition hover:bg-slate-800">

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

    </header>
  );
}
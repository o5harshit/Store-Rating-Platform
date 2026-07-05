import {
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function StoreTable({
  stores,
  onUpdateStore,
  onDeleteStore,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-2xl font-bold text-white">
          Stores
        </h2>

        <p className="mt-1 text-slate-400">
          Registered stores.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900">
              <th className="px-6 py-4 text-left text-slate-300">
                Store
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Email
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Address
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Owner
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Rating
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {stores.map((store) => (
              <tr
                key={store.id}
                className="border-b border-slate-800 transition hover:bg-slate-800/40"
              >
                <td className="px-6 py-5 font-medium text-white">
                  {store.name}
                </td>

                <td className="px-6 py-5 text-slate-400">
                  {store.email}
                </td>

                <td className="px-6 py-5 text-slate-400">
                  {store.address}
                </td>

                <td className="px-6 py-5 text-slate-300">
                  {store.owner_name}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 font-semibold text-yellow-400">
                    <Star
                      size={18}
                      className="fill-yellow-400"
                    />

                    {store.rating}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        onUpdateStore(store)
                      }
                    >
                      <Pencil className="mr-2 h-4 w-4" />

                      Update
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        onDeleteStore(store)
                      }
                    >
                      <Trash2 className="mr-2 h-4 w-4" />

                      Delete
                    </Button>
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
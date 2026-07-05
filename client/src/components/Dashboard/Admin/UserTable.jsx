import {
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UserTable({
  users,
  onUpdateUser,
  onDeleteUser,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-2xl font-bold text-white">
          Users
        </h2>

        <p className="mt-1 text-slate-400">
          Manage all platform users.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900">
              <th className="px-6 py-4 text-left text-slate-300">
                Name
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Email
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Address
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Role
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-800 transition hover:bg-slate-800/40"
              >
                <td className="px-6 py-5 font-medium text-white">
                  {user.name}
                </td>

                <td className="px-6 py-5 text-slate-400">
                  {user.email}
                </td>

                <td className="px-6 py-5 text-slate-400">
                  {user.address}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-red-500/20 text-red-400"
                        : user.role === "OWNER"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        onUpdateUser(user)
                      }
                    >
                      <Pencil className="mr-2 h-4 w-4" />

                      Update
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        onDeleteUser(user)
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
import {
  AlertTriangle,
  Trash2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function DeleteUserDialog({
  open,
  setOpen,
  user,
  onDelete,
  deleting,
}) {
  if (!user) {
    return null;
  }

  const avatar =
    user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="border-slate-800 bg-slate-950 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />

            Delete User
          </DialogTitle>

          <DialogDescription className="text-slate-400">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-xl font-bold text-red-400">
            {avatar}
          </div>

          <h3 className="mt-3 font-semibold text-white">
            {user.name}
          </h3>

          <p className="text-sm text-slate-400">
            {user.email}
          </p>

          <span className="mt-2 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {user.role}
          </span>
        </div>

        <p className="text-center text-sm text-slate-400">
          Are you sure you want to permanently delete this user?
        </p>

        <div className="mt-4 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 text-black"
            disabled={deleting}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="flex-1"
            disabled={deleting}
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />

            {deleting
              ? "Deleting..."
              : "Delete User"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
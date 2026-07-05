import {
  AlertTriangle,
  Store,
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

export default function DeleteStoreDialog({
  open,
  setOpen,
  store,
  onDelete,
  deleting,
}) {
  if (!store) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="border-slate-800 bg-slate-950 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />

            Delete Store
          </DialogTitle>

          <DialogDescription className="text-slate-400">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* Store Information */}

        <div className="flex flex-col items-center py-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
            <Store className="h-8 w-8 text-red-400" />
          </div>

          <h3 className="mt-3 text-lg font-semibold text-white">
            {store.name}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {store.address}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Owner: {store.owner_name}
          </p>
        </div>

        {/* Warning */}

        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-center text-sm text-red-300">
            Deleting this store will also permanently delete all
            ratings submitted for this store.
          </p>
        </div>

        {/* Buttons */}

        <div className="mt-4 flex gap-3">
          <Button
            type="button"
            variant="outline text-black"
            className="flex-1"
            disabled={deleting}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            className="flex-1"
            disabled={deleting}
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />

            {deleting
              ? "Deleting..."
              : "Delete Store"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
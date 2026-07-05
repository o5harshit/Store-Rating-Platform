import { useEffect, useState } from "react";
import { Store } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UpdateStoreDialog({
  open,
  setOpen,
  store,
  onUpdate,
  updating,
}) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    owner_id: "",
  });

  useEffect(() => {
    if (store) {
      setFormData({
        name: store.name || "",
        address: store.address || "",
        owner_id: store.owner_id || "",
      });
    }
  }, [store]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!store) {
      return;
    }

    const updatedFields = {};

    if (formData.name !== store.name) {
      updatedFields.name = formData.name;
    }

    if (formData.address !== store.address) {
      updatedFields.address = formData.address;
    }

    if (
      String(formData.owner_id) !==
      String(store.owner_id)
    ) {
      updatedFields.owner_id = formData.owner_id;
    }

    await onUpdate(updatedFields);
  };

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
          <DialogTitle>
            Update Store
          </DialogTitle>

          <DialogDescription className="text-slate-400">
            Change only the fields you want to update.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600/20">
            <Store className="h-8 w-8 text-indigo-400" />
          </div>

          <h3 className="mt-3 font-semibold text-white">
            {store.name}
          </h3>

          <p className="text-sm text-slate-400">
            Store ID: {store.id}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Store Name
            </label>

            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Store name"
              className="border-slate-700 bg-slate-900 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Address
            </label>

            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Store address"
              className="border-slate-700 bg-slate-900 text-white"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="outline text-black"
              className="flex-1"
              disabled={updating}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="flex-1"
              disabled={updating}
            >
              {updating
                ? "Updating..."
                : "Update Store"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
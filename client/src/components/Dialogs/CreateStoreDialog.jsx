import { useEffect, useState } from "react";
import { toast } from "sonner";

import { apiClient } from "@/lib/api-client";

import {
  CREATE_STORE,
  GET_STORE_OWNERS,
} from "@/utils/constants";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateStoreDialog({
  open,
  setOpen,
  fetchStores,
}) {
  const [loading, setLoading] = useState(false);

  const [owners, setOwners] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    owner_id: "",
  });

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/immutability
      fetchOwners();
    }
  }, [open]);

  const fetchOwners = async () => {
    try {
      const response = await apiClient.get(
        GET_STORE_OWNERS,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setOwners(response.data.owners);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load owners."
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim())
      return toast.error("Store name is required");

    if (!formData.address.trim())
      return toast.error("Address is required");

    if (!formData.owner_id)
      return toast.error("Select Store Owner");

    try {
      setLoading(true);
      console.log(formData);
      const response = await apiClient.post(
        CREATE_STORE,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setFormData({
          name: "",
          address: "",
          owner_id: "",
        });

        await fetchStores();

        setOpen(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create store."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="max-w-lg border-slate-800 bg-slate-950 text-white">

        <DialogHeader>
          <DialogTitle>
            Create Store
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <div>
            <Label>Store Name</Label>

            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Address</Label>

            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div>

            <Label>Store Owner</Label>

            <Select
              value={formData.owner_id}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  owner_id: value,
                })
              }
            >

              <SelectTrigger>

                <SelectValue placeholder="Select Owner" />

              </SelectTrigger>

              <SelectContent>

                {owners.map((owner) => (

                  <SelectItem
                    key={owner.id}
                    value={String(owner.id)}
                  >
                    {owner.name}
                  </SelectItem>

                ))}

              </SelectContent>

            </Select>

          </div>

          <Button
            className="w-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading
              ? "Creating..."
              : "Create Store"}
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}
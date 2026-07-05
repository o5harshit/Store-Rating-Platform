import { Building2, Star, Users } from "lucide-react";

import StatCard from "./StatCard";

export default function DashboardStats({
  totalUsers,
  totalStores,
  totalRatings,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      <StatCard
        title="Total Users"
        value={totalUsers}
        icon={Users}
        iconColor="text-blue-400"
      />

      <StatCard
        title="Total Stores"
        value={totalStores}
        icon={Building2}
        iconColor="text-green-400"
      />

      <StatCard
        title="Submitted Ratings"
        value={totalRatings}
        icon={Star}
        iconColor="text-yellow-400"
        valueColor="text-yellow-400"
      />

    </div>
  );
}
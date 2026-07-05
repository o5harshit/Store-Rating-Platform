import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import Navbar from "@/components/Common/Navbar";
import StoreSearchBar from "@/components/Dashboard/User/StoreSearchBar";
import StoreCard from "@/components/Dashboard/User/StoreCard";
import Pagination from "@/components/Common/Pagination";

import useStores from "@/lib/useStores";

export default function UserDashboard() {
  const user = useSelector((state) => state.auth.user);

  const {
    stores,
    filters,
    setFilters,
    page,
    totalPages,
    totalRecords,
    loadingStores,
    handleSearch,
    handleReset,
    handlePageChange,
    fetchStores
  } = useStores();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Hero Section */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-white">
            Welcome Back, {user?.name} 👋
          </h1>

          <p className="mt-3 text-slate-400">
            Discover stores, rate your experiences and help others
            make better shopping decisions.
          </p>
        </motion.div>

        {/* Analytics */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 grid gap-6 md:grid-cols-3"
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
            <p className="text-sm text-slate-400">
              Total Stores
            </p>

            <h2 className="mt-3 text-4xl font-bold text-white">
              {totalRecords}
            </h2>
          </div>
        </motion.div>

        {/* Store Search Filter */}

        <StoreSearchBar
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {/* Heading */}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Explore Stores
          </h2>

          <p className="text-sm text-slate-400">
            {totalRecords} Stores Available
          </p>
        </div>

        {/* Store Cards */}

        {loadingStores ? (
          <div className="py-10 text-center text-slate-400">
            Loading stores...
          </div>
        ) : stores.length === 0 ? (
          <div className="py-10 text-center text-slate-400">
            No stores found.
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid gap-7 md:grid-cols-2 xl:grid-cols-3"
            >
              {stores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onRatingSuccess={fetchStores}
                />
              ))}
            </motion.div>

            <Pagination
              page={page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              limit={10}
              onPageChange={handlePageChange}
            />
          </>
        )}

      </main>
    </div>
  );
}
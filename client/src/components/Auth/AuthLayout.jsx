import { motion } from "framer-motion";
import { Store } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">

      {/* Background */}

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-indigo-600/30 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px]" />

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute left-20 top-20 hidden h-28 w-28 rounded-full bg-violet-500/20 blur-3xl lg:block"
      />

      <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">

        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="hidden lg:block"
        >
          <div className="mb-8 flex items-center gap-3">

            <div className="rounded-xl bg-indigo-600 p-3">

              <Store className="h-7 w-7 text-white" />

            </div>

            <h1 className="text-3xl font-bold text-white">
              Store Rating Platform
            </h1>

          </div>

          <h2 className="mb-6 text-5xl font-bold leading-tight text-white">
            {title}
          </h2>

          <p className="max-w-lg text-lg text-slate-400">
            {subtitle}
          </p>

          {/* Stats */}

          <div className="mt-12 flex gap-6">

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">

              <h3 className="text-3xl font-bold text-white">
                500+
              </h3>

              <p className="mt-2 text-slate-400">
                Registered Stores
              </p>

            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">

              <h3 className="text-3xl font-bold text-white">
                10K+
              </h3>

              <p className="mt-2 text-slate-400">
                Community Ratings
              </p>

            </div>

          </div>

        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
        >
          {children}
        </motion.div>

      </div>

    </div>
  );
}
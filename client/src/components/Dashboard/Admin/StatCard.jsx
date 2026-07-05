import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-indigo-400",
  valueColor = "text-white",
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-lg"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${valueColor}`}>
            {value}
          </h2>

        </div>

        <div className="rounded-xl bg-slate-800 p-4">

          <Icon className={`h-8 w-8 ${iconColor}`} />

        </div>

      </div>
    </motion.div>
  );
}
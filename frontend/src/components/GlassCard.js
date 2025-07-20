import { motion } from "framer-motion";

export default function GlassCard({ children, className }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-glassBg backdrop-blur-md rounded-xl border border-white border-opacity-20 p-6 shadow-lg text-white ${className}`}
    >
      {children}
    </motion.div>
  );
}

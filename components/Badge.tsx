import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "live";
  className?: string;
};

const variantStyles = {
  default: "bg-brand-navy/5 text-brand-navy",
  live: "bg-brand-blue text-white",
};

const Badge = ({ children, variant = "default", className }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${variantStyles[variant]} ${className || ""}`}
    >
      {children}
    </span>
  );
};

export default Badge;

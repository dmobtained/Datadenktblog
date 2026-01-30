import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-navy text-white shadow-sm hover:bg-brand-black active:translate-y-px",
  secondary:
    "border border-brand-navy/20 bg-white text-brand-navy hover:border-brand-navy/40 hover:bg-brand-navy/5",
  ghost: "text-brand-navy hover:bg-brand-navy/5",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export const ButtonLink = ({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) => {
  return (
    <Link href={href} className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}>
      {children}
    </Link>
  );
};

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export const Button = ({
  type = "button",
  children,
  variant = "primary",
  className,
}: ButtonProps) => {
  return (
    <button type={type} className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}>
      {children}
    </button>
  );
};

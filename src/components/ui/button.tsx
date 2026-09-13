import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "ghost" | "outline";
type ButtonSize = "default" | "sm" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "relative bg-primary text-white hover:bg-primary/90 active:translate-y-0.5 border-none shadow-sm focus-visible:ring-4 focus-visible:ring-primary/20",
  secondary:
    "relative bg-secondary text-white hover:bg-secondary/90 active:translate-y-0.5 border-none shadow-sm focus-visible:ring-4 focus-visible:ring-secondary/20",
  outline:
    "relative bg-white text-secondary border border-border hover:border-secondary hover:bg-slate-50 active:translate-y-0.5 focus-visible:ring-4 focus-visible:ring-secondary/20",
  ghost: "text-secondary hover:bg-slate-100 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-12 px-6 py-3",
  sm: "h-10 px-4 py-2 text-xs",
  lg: "h-14 px-8 py-4 text-base",
};

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-[12px] font-black uppercase tracking-[0.1em] transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

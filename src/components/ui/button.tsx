import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "relative bg-[#7c5aed] text-white shadow-[4px_4px_0px_0px_#f46ebb] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#f46ebb] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none border-none",
  secondary:
    "relative bg-white text-[#7c5aed] border-2 border-[#7c5aed]/20 backdrop-blur-md hover:bg-[#7c5aed]/5",
  ghost: "text-[#1a1a1b] hover:bg-[#7c5aed]/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-12 px-6 py-3",
  sm: "h-10 px-4 py-2",
  lg: "h-14 px-8 py-4",
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
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-[family-name:var(--font-mono)] text-[12px] font-black uppercase tracking-[0.1em] transition-all disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

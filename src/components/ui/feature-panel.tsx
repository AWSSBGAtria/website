import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeaturePanel({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("geometric-block p-6 group transition-all hover:bg-[#7c5aed]/5", className)}>
      <div className="flex flex-col items-start gap-6">
        <div className="flex h-14 w-14 items-center justify-center border border-[#7c5aed]/20 bg-[#7c5aed]/5 text-[#7c5aed] shadow-[4px_4px_0px_0px_rgba(124,90,237,0.1)] group-hover:shadow-[6px_6px_0px_0px_rgba(124,90,237,0.2)] transition-all">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase leading-none tracking-tight text-[#1a1a1b]">{title}</h3>
          <p className="mt-4 font-medium leading-relaxed text-neutral-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center",
        )}
      >
        <div className="h-0.5 w-8 bg-[#7c5aed]" />
        <p className="font-mono text-xs font-black uppercase tracking-[0.3em] text-[#7c5aed]">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-[#1a1a1b] md:text-7xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "font-medium body-balance text-lg leading-relaxed text-[#1a1a1b]/60 md:text-xl",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

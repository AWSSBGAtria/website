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
        <div className="h-0.5 w-8 bg-primary" />
        <p className="font-mono text-xs font-black uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight text-secondary">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "font-medium body-balance text-base sm:text-lg md:text-xl leading-relaxed text-secondary/70",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

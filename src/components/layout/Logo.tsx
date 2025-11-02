import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 text-xl font-bold font-headline tracking-tight text-primary sm:text-2xl", className)}>
      Luzia Delivery 🛒
    </div>
  );
}

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  href?: string;
  endCard?: React.ReactNode;
  className?: string;
};

export function HorizontalRow({ title, children, ariaLabel, href, endCard, className }: Props) {
  return (
    <section className={cn("py-4 md:py-6 shadow-soft rounded-3xl mb-6", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
            {title && (
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-left flex-1 sm:flex-none">
                    {title}
                </h2>
            )}
            {href && (
                <Button variant="ghost" asChild className="hidden md:inline-flex text-sm font-medium text-accent hover:text-accent/80">
                    <Link href={href}>
                        Ver todos
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
            )}
        </div>
      </div>

      <div
        role="region"
        aria-label={ariaLabel ?? title ?? "Scroll list"}
        className="overflow-x-auto no-scrollbar pl-4 sm:pl-6 lg:pl-8"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div
          className="inline-flex space-x-3 sm:space-x-4 snap-x snap-mandatory"
        >
          {children}
          {href && (
            <div className={cn("snap-start shrink-0 flex items-center justify-center w-32 sm:w-36")}>
              {endCard ? endCard : (
                <Button variant="outline" asChild className="h-full w-full flex-col gap-2 rounded-2xl border-orange-600 bg-orange-50 text-orange-600 hover:bg-orange-100">
                    <Link href={href}>
                        Ver todos
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </Button>
              )}
            </div>
          )}
          <div className="shrink-0 w-1 h-1 pr-4 sm:pr-6 lg:pr-8"></div>
        </div>
      </div>
      {href && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:hidden">
              <Button asChild size="lg" className="w-full bg-orange-600 text-white hover:bg-orange-700 font-bold rounded-full shadow-lg">
                  <Link href={href}>
                      Ver todos
                      <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
              </Button>
          </div>
      )}
    </section>
  );
}

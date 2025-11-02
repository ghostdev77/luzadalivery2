import React from "react";
import { HorizontalRow } from "./HorizontalRow";
import { ProductCard } from "../products/ProductCard";
import type { Product } from "@/lib/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PromoRow({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return null;
  }
  return (
    <HorizontalRow title="⭐ Mais Vendidos" ariaLabel="Mais vendidos roláveis">
      {products.map((p) => (
        <div key={p.id} className="snap-start shrink-0 w-48 md:w-56">
          <ProductCard
            product={p}
            className="h-full"
            titleClassName="text-sm"
            priceClassName="text-base font-semibold"
          />
        </div>
      ))}
       <div className={cn("snap-start shrink-0 flex items-center justify-center", "w-48 md:w-56")}>
            <Button variant="outline" asChild className="h-full w-full flex-col gap-2 rounded-2xl border-orange-600 text-orange-600 bg-orange-50 hover:bg-orange-100">
                <Link href={'/categorias/mais-vendidos'}>
                    Ver todos
                    <ArrowRight className="h-6 w-6" />
                </Link>
            </Button>
        </div>
    </HorizontalRow>
  );
}

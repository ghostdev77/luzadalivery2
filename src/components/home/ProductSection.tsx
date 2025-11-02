
"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductCard } from "../products/ProductCard";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { HorizontalRow } from "./HorizontalRow";
import { cn } from "@/lib/utils";

interface ProductSectionProps {
  title: string;
  products: Product[];
  href?: string;
  cardSize?: 'default' | 'small';
}

export function ProductSection({ title, products, href, cardSize = 'default' }: ProductSectionProps) {
  if (products.length === 0) return null;

  const isSmall = cardSize === 'small';

  const cardWrapperClass = isSmall ? "w-36" : "w-40 sm:w-44";

  return (
    <HorizontalRow title={title} href={href} className="shadow-soft rounded-3xl mb-6">
      {products.map((product) => (
         <div key={product.id} className={cn("snap-start shrink-0", cardWrapperClass)}>
            <ProductCard 
              product={product} 
              className="h-full"
              cardSize={cardSize}
            />
        </div>
      ))}
    </HorizontalRow>
  );
}

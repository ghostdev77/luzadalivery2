"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductVariantSelectorProps {
  variants: Product[];
  currentProductId: string;
}

export function ProductVariantSelector({ variants, currentProductId }: ProductVariantSelectorProps) {
  if (variants.length <= 1) {
    return null;
  }

  // Sort variants by a logical order if possible (e.g., size)
  // This is a simple alphabetical sort, but can be improved
  const sortedVariants = [...variants].sort((a, b) => 
    (a.variantName ?? a.nome).localeCompare(b.variantName ?? b.nome)
  );

  return (
    <div className="mb-6">
      <p className="mb-2 text-sm font-semibold text-gray-700">Selecione o tamanho:</p>
      <div className="flex flex-wrap gap-2">
        {sortedVariants.map((variant) => (
          <Button
            key={variant.id}
            asChild
            variant="outline"
            className={cn(
              "rounded-full border-2",
              variant.id === currentProductId
                ? "border-primary bg-primary/10 text-primary"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            )}
          >
            <Link href={`/produtos/${variant.id}`} replace>
              {variant.variantName || variant.nome}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

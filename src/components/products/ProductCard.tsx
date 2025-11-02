
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
  cardSize?: 'default' | 'small';
}

export function ProductCard({ product, className, cardSize = 'default' }: ProductCardProps) {
  const { addToCart } = useCart();
  const discount = product.emPromocao && product.precoAntigo
    ? Math.round(((product.precoAntigo - product.preco) / product.precoAntigo) * 100)
    : 0;

  const isOutOfStock = product.estoque === 0;

  const isSmall = cardSize === 'small';
  const titleClass = isSmall ? "text-xs" : "text-sm";
  const priceClass = isSmall ? "text-sm" : "text-base";
  const imageHeight = isSmall ? "h-28" : "h-36 sm:h-40";

  return (
    <div className={cn("group relative flex h-full flex-col overflow-visible rounded-lg bg-transparent text-card-foreground", className)}>
      <div className="relative">
        <Link href={`/produtos/${product.id}`} className="flex flex-1 flex-col text-left">
            <div className={cn("relative w-full overflow-hidden rounded-xl", imageHeight)}>
            {product.emPromocao && discount > 0 && (
                <Badge
                variant="destructive"
                className="absolute left-1.5 top-1.5 z-10 !px-2 !py-0.5 !text-xs"
                >
                🔥 {discount}%
                </Badge>
            )}
            {product.estoque > 0 && product.estoque < product.estoqueMinimo && (
                <Badge className="absolute right-1.5 top-1.5 z-10 !px-2 !py-0.5 !text-xs !bg-yellow-500 text-black">
                    ⚠️ Poucos
                </Badge>
            )}
            <Image
                src={product.imagemThumb}
                alt={product.nome}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 30vw, (max-width: 768px) 20vw, 15vw"
                data-ai-hint="product image"
            />
            </div>
        </Link>
        <Button
            size="icon"
            variant="default"
            className="absolute -bottom-4 right-3 h-9 w-9 rounded-full font-bold shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
            }}
            disabled={isOutOfStock}
            aria-label={`Adicionar ${product.nome} ao carrinho`}
        >
            {isOutOfStock ? <Plus/> : <Plus />}
        </Button>
      </div>

      <Link href={`/produtos/${product.id}`} className="flex flex-1 flex-col text-left">
        <div className="flex flex-1 flex-col pt-3 px-1">
           {product.peso && <p className="text-xs text-muted-foreground/80 font-medium">{product.peso}</p>}
          <h3 className={cn("font-semibold leading-tight tracking-tight mt-1 line-clamp-2", titleClass)}>
            {product.nome}
          </h3>
          
          <div className="mt-2 flex-grow">
            {product.emPromocao && product.precoAntigo && (
              <span className="mr-1.5 text-xs text-muted-foreground line-through">
                {formatPrice(product.precoAntigo)}
              </span>
            )}
            <span className={cn("font-bold text-primary", priceClass)}>
              {formatPrice(product.preco)}
            </span>
          </div>

        </div>
      </Link>
    </div>
  );
}

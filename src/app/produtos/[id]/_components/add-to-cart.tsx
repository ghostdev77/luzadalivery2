"use client";

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/products/QuantitySelector';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export function AddToCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const isOutOfStock = product.estoque === 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="mt-8 flex items-center gap-4">
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        maxQuantity={product.estoque}
      />
      <Button
        size="lg"
        className="h-14 w-full flex-1 rounded-full text-lg font-bold shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-100"
        onClick={handleAddToCart}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? (
          "Indisponível"
        ) : (
          <>
            + Adicionar 🛒 {formatPrice(product.preco * quantity)}
          </>
        )}
      </Button>
    </div>
  );
}

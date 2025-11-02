"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export function CartButton() {
  const { totalQuantity, setIsCartOpen } = useCart();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative h-11 w-11 rounded-full"
      onClick={() => setIsCartOpen(true)}
      aria-label={`Abrir carrinho com ${totalQuantity} itens`}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalQuantity > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-accent text-xs font-bold text-accent-foreground">
          {totalQuantity}
        </span>
      )}
    </Button>
  );
}

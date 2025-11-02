"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { useCart } from "@/contexts/CartContext";
import type { CartItem as CartItemType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { QuantitySelector } from "../products/QuantitySelector";
import { Button } from "../ui/button";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-start gap-4 py-4">
      <Image
        src={item.imagemThumb}
        alt={item.nome}
        width={80}
        height={80}
        className="rounded-lg border object-cover"
        data-ai-hint="product image"
      />
      <div className="flex-1">
        <Link href={`/produtos/${item.id}`}>
            <h3 className="font-semibold leading-tight hover:underline">{item.nome}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{formatPrice(item.preco)} cada</p>
        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            setQuantity={(q) => updateQuantity(item.id, q)}
            maxQuantity={item.estoque}
          />
          <div className="flex items-center gap-2">
            <p className="font-semibold">{formatPrice(item.preco * item.quantity)}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-full"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remover ${item.nome} do carrinho`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

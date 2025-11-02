"use client";

import { useCart } from "@/contexts/CartContext";
import { siteConfig } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Separator } from "../ui/separator";

export function CartSummary() {
  const { subtotal } = useCart();
  const deliveryFee = siteConfig.taxaEntrega;
  const total = subtotal + deliveryFee;

  return (
    <div className="space-y-3 rounded-xl bg-muted/50 p-4">
        <h4 className="font-headline text-lg font-semibold">📋 Resumo do Pedido</h4>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Produtos</span>
                <span>{formatPrice(subtotal)}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa de entrega</span>
                <span>{formatPrice(deliveryFee)}</span>
            </div>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-bold">
            <span className="font-headline">TOTAL</span>
            <span>{formatPrice(total)}</span>
        </div>
    </div>
  );
}

"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import Link from "next/link";
import { useState } from "react";
import { checkoutAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cartItems, totalQuantity, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setIsProcessing(true);
    const result = await checkoutAction({ cartItems, subtotal });
    setIsProcessing(false);

    if (result.success && result.whatsappUrl) {
      toast({
        title: "Pedido enviado!",
        description: "Você será redirecionado para o WhatsApp para finalizar.",
      });
      window.open(result.whatsappUrl, '_blank');
      clearCart();
      onOpenChange(false);
    } else {
      toast({
        title: "Erro no checkout",
        description: result.error || "Ocorreu um erro desconhecido.",
        variant: "destructive",
      });
    }
  };


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg rounded-l-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-headline text-2xl">
            <ShoppingCart className="h-6 w-6" />
            Meu Carrinho ({totalQuantity} {totalQuantity === 1 ? 'item' : 'itens'})
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-6">
              <div className="flex flex-col divide-y pr-6">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <Separator className="my-4" />
            <SheetFooter className="flex flex-col gap-4">
              <CartSummary />
              <Button
                size="lg"
                className="h-14 w-full bg-green-500 text-lg font-bold text-white hover:bg-green-600 disabled:animate-none rounded-full"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-b-transparent border-current"></div>
                    Processando...
                  </>
                ) : (
                  "💬 Finalizar no WhatsApp"
                )}
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground/20" strokeWidth={1} />
            <h3 className="font-headline text-xl font-semibold">Seu carrinho está vazio</h3>
            <p className="text-muted-foreground">Adicione produtos para começar suas compras.</p>
            <SheetClose asChild>
                <Button asChild size="lg">
                    <Link href="/">Continuar comprando</Link>
                </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

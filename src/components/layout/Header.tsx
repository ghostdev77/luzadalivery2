"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { Search } from "../search/Search";
import { CartButton } from "../cart/CartButton";
import { Button } from "../ui/button";
import { Menu, Phone, Clock } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet";
import { categories, siteConfig } from "@/lib/mock-data";
import { Separator } from "../ui/separator";
import { useCart } from "@/contexts/CartContext";
import { CartSheet } from "../cart/CartSheet";
import { useEffect, useState } from "react";
import { isStoreOpen } from "@/lib/utils";

export function Header() {
  const { isCartOpen, setIsCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check on client-side to avoid hydration mismatch
    const updateStoreStatus = () => setIsOpen(isStoreOpen(siteConfig));
    updateStoreStatus();
    
    // Optional: check periodically
    const interval = setInterval(updateStoreStatus, 60000); // every minute

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-sm' : 'bg-background/0 border-transparent'}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <MobileNav />
          <div className="hidden sm:block">
            <Link href="/">
                <Logo />
            </Link>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="sm:hidden">
            <Logo />
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <div className="hidden w-full max-w-xs md:block">
            <Search />
          </div>
          <div
            className={`hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold sm:flex transition-colors ${
              isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            <div className={`h-2 w-2.5 animate-pulse rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`}></div>
            {isOpen ? "Aberto" : "Fechado"}
          </div>
          <CartButton />
        </div>
      </div>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="sm:hidden rounded-full">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0 max-w-[300px]">
        <div className="p-4">
          <Logo />
        </div>
        <Separator />
        <div className="p-4">
          <Search />
        </div>
        <nav className="flex-grow space-y-1 px-4">
          <SheetClose asChild>
            <Link href="/" className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-accent">
                Início
            </Link>
          </SheetClose>
          <p className="px-3 pt-4 pb-2 text-sm font-semibold text-muted-foreground">Categorias</p>
          {categories.map((category) => (
            <SheetClose asChild key={category.id}>
              <Link
                href={`/categorias/${category.id}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium hover:bg-accent"
              >
                <span className="text-xl">{category.icone}</span> {category.nome}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <Separator />
        <div className="space-y-4 p-4 text-sm">
            <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{siteConfig.whatsappNumero}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{siteConfig.horarioAbertura} - {siteConfig.horarioFechamento}</span>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

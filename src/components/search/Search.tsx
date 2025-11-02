"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover';
import { products as allProducts } from '@/lib/mock-data';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const inputRef = useRef<HTMLInputElement>(null);


  const searchResults = useMemo(() => {
    if (debouncedSearchTerm.length < 2) return [];
    
    return allProducts.filter(p => 
      p.nome.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
      p.tags.some(tag => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    ).slice(0, 5);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 1) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
}, []);

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative" ref={inputRef}>
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <PopoverAnchor asChild>
          <Input
            type="search"
            placeholder="Buscar produtos..."
            className="w-full pl-9 rounded-full h-11 bg-secondary hover:bg-muted focus:bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => debouncedSearchTerm.length > 1 && setIsOpen(true)}
          />
        </PopoverAnchor>
        {searchTerm && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
            </button>
        )}
      </div>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl shadow-xl mt-2" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="flex flex-col max-h-80 overflow-y-auto">
          {searchResults.map(product => (
            <Link 
              href={`/produtos/${product.id}`}
              key={product.id}
              className="flex items-center gap-4 p-3 hover:bg-accent first:rounded-t-2xl last:rounded-b-2xl"
              onClick={() => setIsOpen(false)}
            >
              <Image src={product.imagemThumb} alt={product.nome} width={48} height={48} className="rounded-lg object-cover" data-ai-hint="product image"/>
              <div className="flex-1">
                <p className="font-semibold text-sm line-clamp-1">{product.nome}</p>
                <p className="text-sm text-primary font-semibold">{formatPrice(product.preco)}</p>
              </div>
            </Link>
          ))}
          {searchResults.length === 0 && debouncedSearchTerm.length > 1 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
                Nenhum produto encontrado.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

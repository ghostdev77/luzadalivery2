"use client";

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { ProductGrid } from './ProductGrid';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { FilterSidebar, type Filters } from './FilterSidebar';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Filter } from 'lucide-react';
import { Separator } from '../ui/separator';

interface ProductListProps {
  initialProducts: Product[];
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

const defaultFilters: Filters = {
  priceRange: 'all',
  showOnSaleOnly: false,
  showInStockOnly: false,
};

export function ProductList({ initialProducts }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = initialProducts
      .filter(p => {
        const searchTermMatch =
          p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const onSaleMatch = !filters.showOnSaleOnly || p.emPromocao;
        const inStockMatch = !filters.showInStockOnly || p.estoque > 0;
        
        const priceMatch = (() => {
          if (filters.priceRange === 'all') return true;
          if (filters.priceRange === '100+') return p.preco >= 100;
          const [min, max] = filters.priceRange.split('-').map(Number);
          return p.preco >= min && p.preco <= max;
        })();

        return searchTermMatch && onSaleMatch && inStockMatch && priceMatch;
      });

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.preco - b.preco);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.preco - a.preco);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default: // 'relevance'
        filtered.sort((a, b) => (b.vezesVendido ?? 0) - (a.vezesVendido ?? 0));
        break;
    }
    return filtered;
  }, [searchTerm, sortBy, initialProducts, filters]);
  
  const sidebar = <FilterSidebar filters={filters} setFilters={setFilters} className="lg:sticky lg:top-24" />;
  const clearAll = () => {
    setSearchTerm('');
    setFilters(defaultFilters);
    setSortBy('relevance');
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
      <aside className="hidden lg:block lg:col-span-1">
        {sidebar}
      </aside>
      
      <div className="lg:col-span-3">
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
          <Input 
            placeholder="Buscar nesta categoria..."
            className="max-w-sm rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center justify-between gap-4">
            <div className="lg:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className='rounded-full'><Filter className="mr-2 h-4 w-4" /> Filtros</Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-4/5 p-6 overflow-y-auto rounded-r-2xl">
                  {sidebar}
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm shrink-0 font-medium text-muted-foreground">Ordenar por:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger className="w-[180px] rounded-full">
                        <SelectValue placeholder="Relevância" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevância</SelectItem>
                        <SelectItem value="price-asc">Menor Preço</SelectItem>
                        <SelectItem value="price-desc">Maior Preço</SelectItem>
                        <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
          <ProductGrid products={filteredAndSortedProducts} />
        ) : (
          <div className="text-center col-span-full py-16">
            <p className="font-semibold text-xl mb-2">Nenhum produto encontrado</p>
            <p className="text-muted-foreground mb-4">Tente ajustar seus filtros ou busca.</p>
            <Button onClick={clearAll}>Limpar filtros</Button>
          </div>
        )}
      </div>
    </div>
  );
}

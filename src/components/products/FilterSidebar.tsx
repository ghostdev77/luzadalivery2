"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type Filters = {
  priceRange: string;
  showOnSaleOnly: boolean;
  showInStockOnly: boolean;
};

interface FilterSidebarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  className?: string;
}

const priceRanges = [
  { value: "all", label: "Todos" },
  { value: "0-20", label: "Até R$20" },
  { value: "20-50", label: "R$20 - R$50" },
  { value: "50-100", label: "R$50 - R$100" },
  { value: "100+", label: "Acima de R$100" },
];

export function FilterSidebar({ filters, setFilters, className }: FilterSidebarProps) {
  const handlePriceChange = (value: string) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleCheckboxChange = (key: 'showOnSaleOnly' | 'showInStockOnly') => (checked: boolean) => {
    setFilters({ ...filters, [key]: checked });
  };
  
  const clearFilters = () => {
    setFilters({
      priceRange: 'all',
      showOnSaleOnly: false,
      showInStockOnly: false,
    });
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between pb-4 border-b mb-4">
        <h3 className="font-headline text-xl font-semibold">Filtros</h3>
        <Button variant="ghost" onClick={clearFilters} className="text-sm h-auto p-0 hover:bg-transparent text-primary">Limpar</Button>
      </div>
      <Accordion type="multiple" defaultValue={['price', 'other']} className="w-full space-y-4">
        <AccordionItem value="price" className="border-b-0 rounded-2xl bg-card p-4 shadow-soft">
          <AccordionTrigger className="py-0 font-semibold text-base hover:no-underline">Faixa de Preço</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={filters.priceRange} onValueChange={handlePriceChange} className="space-y-3 pt-4">
              {priceRanges.map(range => (
                <div key={range.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={range.value} id={`price-${range.value}`} />
                  <Label htmlFor={`price-${range.value}`} className="font-normal cursor-pointer">{range.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="other" className="border-b-0 rounded-2xl bg-card p-4 shadow-soft">
          <AccordionTrigger className="py-0 font-semibold text-base hover:no-underline">Outros Filtros</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex items-center space-x-3">
              <Checkbox id="on-sale" checked={filters.showOnSaleOnly} onCheckedChange={handleCheckboxChange('showOnSaleOnly')} />
              <Label htmlFor="on-sale" className="font-normal cursor-pointer">🔥 Em promoção</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="in-stock" checked={filters.showInStockOnly} onCheckedChange={handleCheckboxChange('showInStockOnly')} />
              <Label htmlFor="in-stock" className="font-normal cursor-pointer">✅ Apenas disponíveis</Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

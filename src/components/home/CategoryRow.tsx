
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/lib/types";
import { HorizontalRow } from "./HorizontalRow";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
    category: Omit<Category, 'ordem' | 'ativa' | 'descricao' | 'cor'>;
    className?: string;
    labelClassName?: string;
}

function CategoryCard({ category, className, labelClassName }: CategoryCardProps) {
    return (
        <Link href={`/categorias/${category.id}`} className="block transition-transform duration-300 ease-in-out hover:-translate-y-1">
            <Card className={cn("flex h-full flex-col items-center justify-center p-3 text-center transition-shadow duration-300 hover:shadow-xl bg-card rounded-2xl", className)}>
                <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="text-3xl sm:text-4xl">{category.icone}</div>
                <p className={cn("mt-2 w-20 truncate font-semibold", labelClassName)}>
                    {category.nome}
                </p>
                </CardContent>
            </Card>
        </Link>
    );
}

interface CategoryRowProps {
  categories: Category[];
}

export function CategoryRow({ categories }: CategoryRowProps) {
  return (
    <HorizontalRow title="Navegue por Categorias" ariaLabel="Categorias roláveis" className="shadow-soft rounded-3xl mb-6">
      {categories.map((c) => (
        <div key={c.id} className="snap-center shrink-0">
          <CategoryCard
            category={c}
            className="w-[88px] h-[88px] sm:w-24 sm:h-24"
            labelClassName="text-xs"
          />
        </div>
      ))}
    </HorizontalRow>
  );
}

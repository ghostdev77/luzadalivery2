import { products, categories } from "@/lib/mock-data";
import { ProductList } from "@/components/products/ProductList";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type CategoryPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
    return categories.map(c => ({ slug: c.id })).concat([{slug: 'ofertas'}, {slug: 'mais-vendidos'}]);
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  let title: string;
  let filteredProducts;

  if (slug === 'ofertas') {
    title = '🔥 Ofertas';
    filteredProducts = products.filter(p => p.emPromocao);
  } else if (slug === 'mais-vendidos') {
    title = '⭐ Mais Vendidos';
    filteredProducts = [...products].sort((a, b) => (b.vezesVendido ?? 0) - (a.vezesVendido ?? 0));
  } else {
    const category = categories.find((c) => c.id === slug);
    if (!category) {
      notFound();
    }
    title = `${category.icone} ${category.nome}`;
    filteredProducts = products.filter((p) => p.categoria === slug);
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold text-primary">{slug === 'ofertas' ? 'Ofertas' : slug === 'mais-vendidos' ? 'Mais Vendidos' : categories.find(c => c.id === slug)?.nome}</span>
      </div>
      <h1 className="mb-2 font-headline text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mb-8 text-muted-foreground">{filteredProducts.length} produtos encontrados</p>
      
      <Separator className="mb-8"/>

      <ProductList initialProducts={filteredProducts} />
    </div>
  );
}

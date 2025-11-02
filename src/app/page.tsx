

import { CategoryRow } from '@/components/home/CategoryRow';
import { HowItWorks } from '@/components/home/HowItWorks';
import { ProductSection } from '@/components/home/ProductSection';
import { categories, products, banners } from '@/lib/mock-data';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategoryCardRow } from '@/components/home/CategoryCardRow';

export default function Home() {
  const weeklyOffers = products.filter((p) => p.emPromocao).slice(0, 10);
  const bestSellers = products
    .sort((a, b) => (b.vezesVendido ?? 0) - (a.vezesVendido ?? 0))
    .slice(0, 10);
  
  const laticinios = products.filter(p => p.categoria === 'laticinios').slice(0, 10);
  const limpeza = products.filter(p => p.categoria === 'limpeza').slice(0, 10);
  const padaria = products.filter(p => p.categoria === 'padaria').slice(0, 10);
  const hortifruti = products.filter(p => p.categoria === 'hortifruti').slice(0, 10);
  const doces = products.filter(p => p.categoria === 'doces').slice(0, 10);
  const carnes = products.filter(p => p.categoria === 'carnes').slice(0, 10);
  const higiene = products.filter(p => p.categoria === 'higiene').slice(0, 10);
  const graos = products.filter(p => p.categoria === 'graos').slice(0, 10);
  const mercearia = products.filter(p => p.categoria === 'mercearia').slice(0, 10);


  const beverageSubCategories = [
    { id: "refrigerantes", nome: "Refrigerantes", icone: "🥤", link: "/categorias/bebidas?filter=refrigerante" },
    { id: "cervejas", nome: "Cervejas", icone: "🍺", link: "/categorias/bebidas?filter=cerveja" },
    { id: "sucos", nome: "Sucos", icone: "🧃", link: "/categorias/bebidas?filter=suco" },
    { id: "vinhos", nome: "Vinhos", icone: "🍷", link: "/categorias/bebidas?filter=vinho" },
    { id: "destilados", nome: "Destilados", icone: "🥃", link: "/categorias/bebidas?filter=destilado" },
    { id: "energeticos", nome: "Energéticos", icone: "⚡️", link: "/categorias/bebidas?filter=energetico" },
  ];


  return (
    <div className="flex flex-col">
      <HeroCarousel banners={banners} />
      <CategoryRow categories={categories} />
      <ProductSection
        title="🔥 Ofertas da Semana"
        products={weeklyOffers}
        href="/categorias/ofertas"
        cardSize="small"
      />
      <ProductSection 
        title="⭐ Mais Vendidos"
        products={bestSellers}
        href="/categorias/mais-vendidos"
        cardSize="small"
      />
      <ProductSection title="🥬 Hortifruti" products={hortifruti} href="/categorias/hortifruti" cardSize="small" />
      <ProductSection title="🍖 Carnes e Aves" products={carnes} href="/categorias/carnes" cardSize="small" />
      <ProductSection title="🧀 Laticínios e Frios" products={laticinios} href="/categorias/laticinios" cardSize="small" />
      <ProductSection title="🍞 Padaria" products={padaria} href="/categorias/padaria" cardSize="small" />
      <ProductSection title="🧹 Limpeza" products={limpeza} href="/categorias/limpeza" cardSize="small" />
      <ProductSection title="🧼 Higiene Pessoal" products={higiene} href="/categorias/higiene" cardSize="small" />
      <ProductSection title="🌾 Grãos e Cereais" products={graos} href="/categorias/graos" cardSize="small" />
      <ProductSection title="🥫 Mercearia" products={mercearia} href="/categorias/mercearia" cardSize="small" />
      <ProductSection title="🍫 Doces e Biscoitos" products={doces} href="/categorias/doces" cardSize="small" />
      <CategoryCardRow title="🥤 Bebidas" categories={beverageSubCategories} href="/categorias/bebidas"/>

      <HowItWorks />
      <div className="h-12"></div>
    </div>
  );
}

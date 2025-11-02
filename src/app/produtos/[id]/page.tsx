import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products, categories } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Package, Tag, CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { AddToCart } from './_components/add-to-cart';
import { RecommendedProducts } from '@/components/products/RecommendedProducts';
import { ProductVariantSelector } from './_components/variant-selector';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
    return products.map(p => ({ id: p.id }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const category = categories.find((c) => c.id === product.categoria);
  const discount = product.emPromocao && product.precoAntigo
    ? Math.round(((product.precoAntigo - product.preco) / product.preco) * 100)
    : 0;

  const productVariants = product.variantGroupId 
    ? products.filter(p => p.variantGroupId === product.variantGroupId) 
    : [product];


  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            {category && (
                <>
                <Link href={`/categorias/${category.id}`} className="hover:text-primary">{category.nome}</Link>
                <ChevronRight className="h-4 w-4" />
                </>
            )}
            <span className="font-semibold text-primary">{product.nome}</span>
        </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div className="relative">
          <Image
            src={product.imagemURL}
            alt={product.nome}
            width={400}
            height={400}
            className="aspect-square w-full rounded-3xl border-2 border-gray-100 bg-white object-contain p-4 shadow-soft transition-shadow duration-300 hover:shadow-xl"
            priority
            data-ai-hint="product image"
          />
        </div>
        <div className="flex flex-col">
          {product.emPromocao && discount > 0 && (
            <Badge variant="destructive" className="w-fit">
              {discount}% OFF
            </Badge>
          )}
          <h1 className="mt-2 font-headline text-2xl font-bold tracking-tight lg:text-3xl">
            {product.nome}
          </h1>
          
          <div className="mt-3">
            {product.emPromocao && product.precoAntigo && (
              <span className="mr-2 text-md text-muted-foreground line-through">
                {formatPrice(product.precoAntigo)}
              </span>
            )}
            <span className="font-headline text-3xl font-bold text-primary">
              {formatPrice(product.preco)}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>4.8 (150 avaliações)</span>
          </div>
          
          <Separator className="my-5"/>

          {productVariants.length > 1 && (
            <ProductVariantSelector variants={productVariants} currentProductId={product.id} />
          )}

          <div className="space-y-3 text-sm text-muted-foreground">
            {product.estoque > 0 ? (
                <div className="flex items-center gap-2 font-semibold text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>{product.estoque > 10 ? "Disponível em estoque" : `${product.estoque} unidades restantes`}</span>
                </div>
            ) : (
                <div className="flex items-center gap-2 font-semibold text-destructive">
                    <span>Fora de estoque</span>
                </div>
            )}
            {product.peso && (
                <div className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    <span>Peso: {product.peso}</span>
                </div>
            )}
            <div className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                <span>Marca: {product.marca}</span>
            </div>
          </div>
          
          <div className="mt-auto pt-6">
            <AddToCart product={product} />
          </div>

        </div>
      </div>
      <div className="mt-12 lg:mt-16">
        <h2 className="font-headline text-2xl font-bold">📋 Descrição</h2>
        <p className="mt-4 text-muted-foreground">{product.descricao}</p>
      </div>

      <div className="mt-12 lg:mt-16">
        <RecommendedProducts currentProductId={product.id} />
      </div>
    </div>
  );
}

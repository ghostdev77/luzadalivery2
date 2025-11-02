
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return <p className="col-span-full text-center text-muted-foreground">Nenhum produto encontrado.</p>
    }
    
    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  cardSize="small"
                />
            ))}
        </div>
    );
}

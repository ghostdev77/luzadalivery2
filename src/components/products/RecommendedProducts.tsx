"use client";

import { useEffect, useState } from "react";
import { getProductRecommendations } from "@/ai/flows/product-recommendations";
import { products as allProducts } from "@/lib/mock-data";
import type { Product } from "@/lib/types";
import { ProductSection } from "../home/ProductSection";

interface RecommendedProductsProps {
  currentProductId: string;
}

export function RecommendedProducts({ currentProductId }: RecommendedProductsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        // In a real app, you might pass more viewing history or cart data.
        const result = await getProductRecommendations({
          viewingHistory: [currentProductId],
          numRecommendations: 4,
        });

        // This is a mock implementation to map IDs to full product objects.
        // In a real app, you'd fetch these products from your database.
        const recommendedProducts = result.recommendedProductIds
          .map(id => allProducts.find(p => p.id === id))
          .filter((p): p is Product => p !== undefined)
          .slice(0, 4);
        
        // If AI returns nothing, show some related products from the same category
        if(recommendedProducts.length === 0) {
            const currentProduct = allProducts.find(p => p.id === currentProductId);
            if(currentProduct) {
                const relatedByCategory = allProducts.filter(p => p.categoria === currentProduct.categoria && p.id !== currentProductId).slice(0, 4);
                setRecommendations(relatedByCategory);
            }
        } else {
            setRecommendations(recommendedProducts);
        }

      } catch (error) {
        console.error("Failed to get product recommendations:", error);
        // Fallback: show some products from the same category
        const currentProduct = allProducts.find(p => p.id === currentProductId);
        if(currentProduct) {
            const relatedByCategory = allProducts.filter(p => p.categoria === currentProduct.categoria && p.id !== currentProductId).slice(0, 4);
            setRecommendations(relatedByCategory);
        }
      }
    }

    fetchRecommendations();
  }, [currentProductId]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <ProductSection 
        title="💡 Você também pode gostar"
        products={recommendations}
    />
  );
}

'use server';

/**
 * @fileOverview Product recommendation AI agent.
 *
 * - getProductRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  viewingHistory: z.array(
    z.string().describe('IDs of products the user has viewed')
  ).optional().describe('The user viewing history.'),
  currentCart: z.array(
    z.string().describe('IDs of products currently in the cart')
  ).optional().describe('The user current cart.'),
  numRecommendations: z.number().default(3).describe('The number of product recommendations to return.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProductIds: z.array(
    z.string().describe('IDs of recommended products')
  ).describe('The list of recommended product IDs.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const productRecommendationsPrompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are a shopping assistant for a online supermarket. The supermarket name is Luzia Delivery, which services Santa Luzia do Paruá - MA. Your task is to provide product recommendations to the user based on their viewing history and current cart.

Generate a list of {{numRecommendations}} product IDs in the ` + '`recommendedProductIds`' + ` field.  These products should be relevant to what the user has already viewed or added to their cart.

{% if viewingHistory %}
Viewing History: {{viewingHistory}}
{% endif %}

{% if currentCart %}
Current Cart: {{currentCart}}
{% endif %}
`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await productRecommendationsPrompt(input);
    return output!;
  }
);

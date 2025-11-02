"use server";

import { z } from "zod";
import type { CartItem } from "@/lib/types";
import { siteConfig } from "@/lib/mock-data";
import { isStoreOpen } from "@/lib/utils";

const checkoutSchema = z.object({
  cartItems: z.array(z.any()),
  subtotal: z.number(),
});

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

const formatarMensagemWhatsApp = (cartItems: CartItem[], subtotal: number) => {
  const data = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
  let msg = `🛍️ *NOVO PEDIDO - LUZIA DELIVERY*\n`;
  msg += `*Data:* ${data}\n\n`;
  msg += `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
  msg += `*ITENS DO CARRINHO:*\n`;
  msg += `------------------------------------\n`;
  
  cartItems.forEach((item) => {
    msg += `*${item.quantity}x* ${item.nome}\n`;
    msg += `   (Preço Un: ${formatPrice(item.preco)} | Subtotal: *${formatPrice(item.preco * item.quantity)}*)\n\n`;
  });
  
  msg += `------------------------------------\n`;
  msg += `*RESUMO DO PEDIDO:*\n`;
  msg += `Subtotal dos Produtos: *${formatPrice(subtotal)}*\n`;
  msg += `Taxa de Entrega: *${formatPrice(siteConfig.taxaEntrega)}*\n`;
  
  const total = subtotal + siteConfig.taxaEntrega;
  
  msg += `------------------------------------\n`;
  msg += `*VALOR TOTAL: ${formatPrice(total)}*\n\n`;
  msg += `------------------------------------\n\n`;
  msg += `*Aguardando confirmação do pedido.*\n`;
  msg += `Obrigado! 😊`;
  
  return msg;
};

export async function checkoutAction(input: { cartItems: CartItem[]; subtotal: number }): Promise<{ success: boolean; whatsappUrl?: string, error?: string }> {
  const parsedInput = checkoutSchema.safeParse(input);

  if (!parsedInput.success) {
    return { success: false, error: "Dados inválidos." };
  }
  
  const { cartItems, subtotal } = parsedInput.data;

  // 1. Validations
  if (cartItems.length === 0) {
    return { success: false, error: 'Seu carrinho está vazio!' };
  }
  
  if (subtotal < siteConfig.pedidoMinimo) {
    return { success: false, error: `O pedido mínimo é de ${formatPrice(siteConfig.pedidoMinimo)}.` };
  }

  if (!isStoreOpen(siteConfig)) {
    return { success: false, error: `Desculpe, a loja está fechada. Nosso horário de funcionamento é das ${siteConfig.horarioAbertura} às ${siteConfig.horarioFechamento}.` };
  }

  // TODO: Add more validations like real-time stock check.
  
  // 2. (Simulate) Save order to Firestore
  // In a real app, you would save the order here and get an order ID.
  // const pedidoId = await salvarPedido(cartItems, subtotal);
  
  // 3. Format WhatsApp message
  const mensagem = formatarMensagemWhatsApp(cartItems, subtotal);
  
  // 4. Encode for URL and create link
  const mensagemCodificada = encodeURIComponent(mensagem);
  const numeroWhatsApp = siteConfig.whatsappNumero;
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
  
  // 5. (Simulate) Update order status in Firestore
  // await firestore.collection('pedidos').doc(pedidoId).update({ ... });
  
  return { success: true, whatsappUrl: linkWhatsApp };
}

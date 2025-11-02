import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Config } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}

export function isStoreOpen(config: Config): boolean {
  if (!config.lojaAberta || !config.aceitandoPedidos) {
    return false;
  }

  const agora = new Date();
  
  const diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  const diaAtual = diasSemana[agora.getDay()];

  if (!config.diasFuncionamento.includes(diaAtual)) {
    return false;
  }
  
  try {
    const [horaAbertura, minutoAbertura] = config.horarioAbertura.split(':').map(Number);
    const [horaFechamento, minutoFechamento] = config.horarioFechamento.split(':').map(Number);

    // Se a loja abre às 00:00 e fecha às 23:59, está sempre aberta nos dias de funcionamento.
    if (horaAbertura === 0 && minutoAbertura === 0 && horaFechamento === 23 && minutoFechamento === 59) {
      return true;
    }
    
    const horaAtualDecimal = agora.getHours() + agora.getMinutes() / 60;
    const aberturaDecimal = horaAbertura + minutoAbertura / 60;
    const fechamentoDecimal = horaFechamento + minutoFechamento / 60;

    // Handle overnight hours (e.g., 22:00 to 02:00)
    if (fechamentoDecimal < aberturaDecimal) {
      return horaAtualDecimal >= aberturaDecimal || horaAtualDecimal < fechamentoDecimal;
    }
  
    return horaAtualDecimal >= aberturaDecimal && horaAtualDecimal < fechamentoDecimal;
  } catch (e) {
    console.error("Error parsing store hours", e);
    return false; // Fail safe to closed
  }
}

export interface Product {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  precoAntigo: number | null;
  emPromocao: boolean;
  imagemURL: string;
  imagemThumb: string;
  estoque: number;
  estoqueMinimo: number;
  unidade: string;
  peso?: string;
  marca: string;
  ativo: boolean;
  destaque: boolean;
  ordem: number;
  tags: string[];
  vezesVendido?: number;
  criadoEm?: Date;
  atualizadoEm?: Date;
  variantGroupId?: string;
  variantName?: string;
}

export interface Category {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  ordem: number;
  ativa: boolean;
  descricao: string;
}

export interface Banner {
  id: string;
  titulo: string;
  descricao: string;
  imagemURL: string;
  imagemMobileURL: string;
  link: string; // Could be /produto/[id] or /categoria/[id]
  ordem: number;
  ativo: boolean;
}

export interface Config {
  id: "geral";
  whatsappNumero: string;
  whatsappMensagem: string;
  horarioAbertura: string;
  horarioFechamento: string;
  diasFuncionamento: string[];
  taxaEntrega: number;
  pedidoMinimo: number;
  mensagemBanner: string;
  mensagemRodape: string;
  lojaAberta: boolean;
  aceitandoPedidos: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

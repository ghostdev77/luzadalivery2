import Link from "next/link";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/mock-data";

export function Footer() {
  const socialLinks = [
    { name: "💬 WhatsApp", href: `https://wa.me/${siteConfig.whatsappNumero}` },
    { name: "📸 Instagram", href: "#" },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.mensagemRodape}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition hover:text-primary"
                >
                  <span className="sr-only">{link.name}</span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-2">
            <div className="space-y-4">
              <h3 className="font-headline text-sm font-semibold text-foreground">
                📱 Contato
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumero}`}
                    className="transition hover:text-primary"
                  >
                    {siteConfig.whatsappNumero}
                  </a>
                </li>
                <li>
                    <p>
                        Santa Luzia do Paruá - MA
                    </p>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-headline text-sm font-semibold text-foreground">
                🕐 Horários
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Seg-Sáb: {siteConfig.horarioAbertura} - {siteConfig.horarioFechamento}</li>
                  <li>Domingo: Fechado</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-headline text-sm font-semibold text-foreground">
                💳 Pagamento
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>PIX ⚡ | Cartão 💳 | Dinheiro 💵</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Luzia Delivery. Todos os direitos reservados.</p>
          <p>Feito com ❤️ no Maranhão</p>
        </div>
      </div>
    </footer>
  );
}

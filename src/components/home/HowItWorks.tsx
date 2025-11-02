import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const steps = [
    {
        step: "1️⃣",
        title: "Escolha seus produtos",
        description: "Navegue pelas categorias ou use a busca para encontrar o que precisa."
    },
    {
        step: "2️⃣",
        title: "Adicione ao carrinho",
        description: "Clique no botão 'Adicionar' para montar sua cesta de compras."
    },
    {
        step: "3️⃣",
        title: "Finalize no WhatsApp 💬",
        description: "Seu pedido é enviado e você finaliza a compra com um atendente."
    }
]

export function HowItWorks() {
  return (
    <section className="py-12 md:py-16 shadow-soft rounded-3xl mb-6">
      <h2 className="mb-8 text-center font-headline text-3xl font-bold tracking-tight">
        Como Funciona
      </h2>
      <div className="grid gap-6 md:grid-cols-3 container mx-auto px-4 sm:px-6 lg:px-8">
        {steps.map((step, index) => (
          <Card key={index} className="text-center rounded-2xl shadow-soft bg-transparent border-none">
            <CardHeader className="p-8">
              <CardTitle className="mx-auto mb-4 text-5xl">{step.step}</CardTitle>
              <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
              <CardDescription className="pt-2">{step.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

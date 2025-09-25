import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
        Bem-vindo à Shop Music
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        O seu marketplace para comprar e vender instrumentos musicais com
        segurança e facilidade.
      </p>
      <Link href="/login">
        <Button size="lg">
          <LogIn className="mr-2 h-5 w-5" />
          Entrar ou Criar Conta
        </Button>
      </Link>
    </main>
  );
}

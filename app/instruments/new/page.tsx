import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InstrumentForm } from "../components/InstrumentForm";

export default function NewInstrumentPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Adicionar Novo Instrumento</CardTitle>
          <CardDescription>
            Preencha os detalhes abaixo para colocar o seu instrumento à venda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InstrumentForm />
        </CardContent>
      </Card>
    </main>
  );
}

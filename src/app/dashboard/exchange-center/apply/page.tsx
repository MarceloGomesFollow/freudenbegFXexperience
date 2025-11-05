
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

const formSchema = z.object({
  requestType: z.enum(["voluntary", "manager_indication"], {
    required_error: "Você precisa selecionar o tipo de solicitação.",
  }),
  fullName: z.string().min(2, "O nome completo é obrigatório."),
  registration: z.string().min(1, "A matrícula é obrigatória."),
  originUnit: z.string().min(2, "A unidade de origem é obrigatória."),
  currentRole: z.string().min(2, "O cargo/função é obrigatório."),
  companyTimeYears: z.coerce.number().min(0).optional(),
  companyTimeMonths: z.coerce.number().min(0).max(11).optional(),
  languages: z.string().optional(),
  objectives: z.string().min(10, "Os objetivos devem ter pelo menos 10 caracteres."),
  interestAreas: z.string().min(5, "A área de interesse é obrigatória."),
  interestUnits: z.string().min(5, "A unidade de interesse é obrigatória."),
  availability: z.string().min(5, "A disponibilidade é obrigatória."),
  managerName: z.string().optional(),
  indicationJustification: z.string().optional(),
});

export default function ExchangeApplicationPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "Ana Silva",
      registration: "12345",
      originUnit: "Tecnologia",
      currentRole: "Analista de Sistemas Pleno",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Inscrição Enviada!",
      description: "Sua inscrição para o intercâmbio foi enviada para aprovação.",
    });
  }

  return (
    <div className="space-y-8">
      <Button variant="outline" asChild>
        <Link href="/dashboard/exchange-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para Oportunidades
        </Link>
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Formulário de Inscrição/Indicação</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para participar do Programa de Intercâmbio Profissional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tipo de Solicitação *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="voluntary" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Inscrição voluntária
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="manager_indication" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Indicação do Gestor
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-medium border-b pb-2">Dados do Colaborador</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matrícula</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="originUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidade de Origem</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="currentRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo/Função</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <div className="grid md:grid-cols-3 gap-6 items-end">
                 <FormItem>
                    <FormLabel>Tempo de Empresa</FormLabel>
                    <div className="flex gap-2">
                        <FormField
                        control={form.control}
                        name="companyTimeYears"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input type="number" placeholder="Anos" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="companyTimeMonths"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                <Input type="number" placeholder="Meses" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    </div>
                </FormItem>
                <div className="md:col-span-2">
                 <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Idiomas e nível de proficiência</FormLabel>
                        <FormControl>
                            <Input placeholder="Ex: Inglês - Avançado, Espanhol - Intermediário" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              </div>

              <FormField
                control={form.control}
                name="objectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivos do Colaborador com o Programa</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o que você espera aprender e como pretende aplicar o conhecimento adquirido."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-medium border-b pb-2">Detalhes da Vivência</h3>
              <FormField
                control={form.control}
                name="interestAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Área(s) de Interesse para Vivência</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Inovação, Gestão de Produtos, Análise de Dados" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="interestUnits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa(s) / Unidade(s) de Interesse para Vivência</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Unidade de Marketing, P&D, Unidade de Vendas B2B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disponibilidade de Período (2 a 4 semanas)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: De 01/10/2024 a 30/10/2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-medium border-b pb-2">Indicação (se aplicável)</h3>
                <FormField
                control={form.control}
                name="managerName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nome do Gestor</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="indicationJustification"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Justificativa da Indicação</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Descreva por que este colaborador está sendo indicado e como o intercâmbio pode beneficiar seu desenvolvimento." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <div className="pt-6 flex justify-end">
                    <Button type="submit" size="lg">Enviar para Aprovação</Button>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

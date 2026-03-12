"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  CALENDAR_EVENT_TYPES,
  formatDateISO,
  getAllCalendarEvents,
  INITIAL_CALENDAR_EVENTS,
  parseDateISO,
  saveCalendarEvent,
  type CalendarEventType,
} from "@/lib/calendar-events";
import { useToast } from "@/hooks/use-toast";

const isValidDateISO = (value: string | null) => {
  if (!value) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

const eventTypeLabels: Record<CalendarEventType, string> = {
  Apresentacao: "Apresentacao",
  Mentoria: "Mentoria",
  Prazo: "Prazo",
  Treinamento: "Treinamento",
};

export default function NewCalendarEventPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}>
      <NewCalendarEventContent />
    </Suspense>
  );
}

function NewCalendarEventContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();

  const initialDate = useMemo(() => {
    const dateFromQuery = params.get("date");
    if (isValidDateISO(dateFromQuery)) {
      return dateFromQuery!;
    }
    return formatDateISO(new Date());
  }, [params]);

  const [dateISO, setDateISO] = useState(initialDate);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<CalendarEventType>("Apresentacao");
  const [unit, setUnit] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [events, setEvents] = useState(INITIAL_CALENDAR_EVENTS);

  useEffect(() => {
    setEvents(getAllCalendarEvents());
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !unit.trim() || !dateISO) {
      toast({
        variant: "destructive",
        title: "Campos obrigatorios",
        description: "Preencha data, evento e unidade para continuar.",
      });
      return;
    }

    setIsSaving(true);
    saveCalendarEvent({
      dateISO,
      title,
      type,
      unit,
    });

    toast({
      title: "Evento criado",
      description: "O novo evento foi adicionado na agenda.",
    });

    router.push(`/dashboard/calendar?created=1&date=${encodeURIComponent(dateISO)}`);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Button variant="outline" asChild>
          <Link href="/dashboard/calendar">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para Agenda
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
            Novo Evento da Agenda
          </h2>
          <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
            Preencha as mesmas informacoes usadas na visao calendario e na visao consolidada.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Criar evento</CardTitle>
            <CardDescription>Data, evento, tipo e unidade.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="event-date">Data</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={dateISO}
                  onChange={(e) => setDateISO(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-title">Evento</Label>
                <Input
                  id="event-title"
                  placeholder="Ex: Reuniao de alinhamento"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-type">Tipo</Label>
                <Select value={type} onValueChange={(value) => setType(value as CalendarEventType)}>
                  <SelectTrigger id="event-type">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {CALENDAR_EVENT_TYPES.map((eventType) => (
                      <SelectItem key={eventType} value={eventType}>
                        {eventTypeLabels[eventType]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-unit">Unidade</Label>
                <Input
                  id="event-unit"
                  placeholder="Ex: Tecnologia"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSaving}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {isSaving ? "Salvando..." : "Salvar Evento"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consolidado de eventos</CardTitle>
            <CardDescription>Referencia atual da agenda (calendario + tabela).</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Unidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {parseDateISO(item.dateISO).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{eventTypeLabels[item.type]}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

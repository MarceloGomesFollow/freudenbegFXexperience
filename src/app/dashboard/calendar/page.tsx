"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Calendar as CalendarIcon, List } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  formatDateISO,
  getAllCalendarEvents,
  INITIAL_CALENDAR_EVENTS,
  parseDateISO,
  type CalendarEvent,
  type CalendarEventType,
} from "@/lib/calendar-events";

export default function CalendarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  const selectedDateISO = date ? formatDateISO(date) : null;

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.dateISO.localeCompare(b.dateISO)),
    [events]
  );

  const eventTypeVariant = (type: CalendarEventType) => {
    return (
      {
        Apresentacao: "default",
        Mentoria: "secondary",
        Prazo: "destructive",
        Treinamento: "outline",
      }[type] || "default"
    );
  };

  const EventBadge = ({ type }: { type: CalendarEventType }) => {
    // @ts-ignore
    return <Badge variant={eventTypeVariant(type)}>{type}</Badge>;
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (!selectedDate) {
      setSelectedEvents([]);
      return;
    }

    const dateISO = formatDateISO(selectedDate);
    setSelectedEvents(events.filter((event) => event.dateISO === dateISO));
  };

  useEffect(() => {
    setEvents(getAllCalendarEvents());
  }, []);

  useEffect(() => {
    if (!date) {
      setSelectedEvents([]);
      return;
    }
    const dateISO = formatDateISO(date);
    setSelectedEvents(events.filter((event) => event.dateISO === dateISO));
  }, [date, events]);

  useEffect(() => {
    const dateFromQuery = searchParams.get("date");
    if (!dateFromQuery || !/^\d{4}-\d{2}-\d{2}$/.test(dateFromQuery)) {
      return;
    }

    const parsed = parseDateISO(dateFromQuery);
    if (!Number.isNaN(parsed.getTime())) {
      setDate(parsed);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get("created") !== "1") return;

    toast({
      title: "Evento adicionado",
      description: "A agenda foi atualizada com o novo evento.",
    });

    const params = new URLSearchParams(searchParams.toString());
    params.delete("created");
    const query = params.toString();
    router.replace(query ? `/dashboard/calendar?${query}` : "/dashboard/calendar");
  }, [router, searchParams, toast]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
            Agenda Digital
          </h2>
          <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
            Acompanhe os eventos, prazos e atividades do programa.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link
            href={
              selectedDateISO
                ? `/dashboard/calendar/new-event?date=${selectedDateISO}`
                : "/dashboard/calendar/new-event"
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Evento
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="calendar">
        <TabsList className="grid w-full max-w-sm grid-cols-1 sm:grid-cols-2">
          <TabsTrigger value="calendar">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Visao Calendario
          </TabsTrigger>
          <TabsTrigger value="table">
            <List className="mr-2 h-4 w-4" />
            Visao Consolidada
          </TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <div className="grid md:grid-cols-3 gap-8 mt-4">
            <Card className="md:col-span-2">
              <CardContent className="p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="p-0"
                  classNames={{
                    root: "w-full",
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 p-4",
                    month: "space-y-4 w-full",
                    table: "w-full border-collapse",
                    head_row: "flex justify-around",
                    row: "flex w-full mt-2 justify-around",
                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  }}
                  components={{
                    DayContent: ({ date: dayDate }) => {
                      const dayISO = formatDateISO(dayDate);
                      const hasEvent = events.some((event) => event.dateISO === dayISO);
                      return (
                        <div className="relative h-9 w-9">
                          <p>{dayDate.getDate()}</p>
                          {hasEvent && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"></span>
                          )}
                        </div>
                      );
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Eventos do Dia</CardTitle>
                <CardDescription>
                  {date
                    ? date.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Selecione uma data"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedEvents.map((event) => (
                      <div key={event.id} className="space-y-2 rounded-md border p-3">
                        <h4 className="font-semibold">{event.title}</h4>
                        <div className="flex items-center gap-2">
                          <EventBadge type={event.type} />
                          <span className="text-sm text-muted-foreground">{event.unit}</span>
                        </div>
                      </div>
                    ))}
                    <Button size="sm" className="w-full" asChild>
                      <Link href={`/dashboard/calendar/new-event?date=${selectedDateISO ?? ""}`}>
                        Adicionar outro evento no dia
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {date
                        ? "Nenhum evento para este dia."
                        : "Selecione um dia no calendario para ver os eventos."}
                    </p>
                    {selectedDateISO && (
                      <Button size="sm" className="w-full" asChild>
                        <Link href={`/dashboard/calendar/new-event?date=${selectedDateISO}`}>
                          Criar evento para este dia
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="table">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Proximos Eventos</CardTitle>
              <CardDescription>Lista consolidada de todos os eventos e prazos.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
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
                    {sortedEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          {parseDateISO(event.dateISO).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>
                          <EventBadge type={event.type} />
                        </TableCell>
                        <TableCell>{event.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


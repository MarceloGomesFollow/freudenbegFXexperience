
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Calendar as CalendarIcon, List } from "lucide-react";
import Link from "next/link";

const events = [
    {
        date: new Date("2024-08-25T00:00:00"),
        title: "Showcase de Inovação Q2",
        type: "Apresentação",
        unit: "Todas"
    },
    {
        date: new Date("2024-08-28T00:00:00"),
        title: "Mentoria com Fábio Pereira",
        type: "Mentoria",
        unit: "Tecnologia"
    },
    {
        date: new Date("2024-09-05T00:00:00"),
        title: "Entrega do Relatório A3",
        type: "Prazo",
        unit: "Geral"
    },
    {
        date: new Date("2024-09-10T00:00:00"),
        title: "Workshop de Vendas Consultivas",
        type: "Treinamento",
        unit: "Vendas"
    },
];

type Event = typeof events[0];

export default function CalendarPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        if (selectedDate) {
            const eventOnDay = events.find(event => event.date.toDateString() === selectedDate.toDateString());
            setSelectedEvent(eventOnDay || null);
        }
    };

    const EventBadge = ({type}: {type: string}) => {
        const variant = {
            'Apresentação': 'default',
            'Mentoria': 'secondary',
            'Prazo': 'destructive',
            'Treinamento': 'outline',
        }[type] || 'default';

        // @ts-ignore
        return <Badge variant={variant}>{type}</Badge>;
    }


  return (
    <div className="space-y-8">
        <div className="flex justify-between items-start">
            <div>
            <h2 className="text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">Agenda Digital</h2>
            <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                Acompanhe os eventos, prazos e atividades do programa.
            </p>
            </div>
            <Button asChild>
                <Link href="#">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Novo Evento
                </Link>
            </Button>
        </div>

        <Tabs defaultValue="calendar">
            <TabsList className="grid w-full grid-cols-2 max-w-sm">
                <TabsTrigger value="calendar"><CalendarIcon className="mr-2 h-4 w-4"/> Visão Calendário</TabsTrigger>
                <TabsTrigger value="table"><List className="mr-2 h-4 w-4"/>Visão Consolidada</TabsTrigger>
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
                                    DayContent: ({ date }) => {
                                      const eventOnDay = events.find(event => event.date.toDateString() === date.toDateString());
                                      return (
                                        <div className="relative h-9 w-9">
                                          <p>{date.getDate()}</p>
                                          {eventOnDay && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"></span>}
                                        </div>
                                      );
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Eventos do Dia</CardTitle>
                            <CardDescription>
                                {date ? date.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) : "Selecione uma data"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {selectedEvent ? (
                                <div className="space-y-4">
                                    <h4 className="font-semibold">{selectedEvent.title}</h4>
                                    <div className="flex items-center gap-2">
                                       <EventBadge type={selectedEvent.type} />
                                       <span className="text-sm text-muted-foreground">{selectedEvent.unit}</span>
                                    </div>
                                    <Button size="sm" className="w-full">Ver Detalhes</Button>
                                </div>
                            ) : (
                                <div className="text-sm text-muted-foreground">
                                    {date ? "Nenhum evento para este dia." : "Selecione um dia no calendário para ver os eventos."}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="table">
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Próximos Eventos</CardTitle>
                        <CardDescription>Lista consolidada de todos os eventos e prazos.</CardDescription>
                    </CardHeader>
                    <CardContent>
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
                                {events.sort((a,b) => a.date.getTime() - b.date.getTime()).map((event, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{event.date.toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>
                                        <EventBadge type={event.type} />
                                    </TableCell>
                                    <TableCell>{event.unit}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}

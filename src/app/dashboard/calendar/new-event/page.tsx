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
import { useLanguage } from "@/contexts/LanguageContext";

const isValidDateISO = (value: string | null) => {
  if (!value) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

export default function NewCalendarEventPage() {
  const { t } = useLanguage();
  return (
    <Suspense fallback={<div className="p-8 text-center">{t("common.loading")}</div>}>
      <NewCalendarEventContent />
    </Suspense>
  );
}

function NewCalendarEventContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const { t } = useLanguage();

  const eventTypeLabels: Record<CalendarEventType, string> = {
    Apresentacao: t("data.eventType.presentation"),
    Mentoria: t("data.eventType.mentoring"),
    Prazo: t("data.eventType.deadline"),
    Treinamento: t("data.eventType.training"),
  };

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
        title: t("calendar.newEventPage.requiredFields"),
        description: t("calendar.newEventPage.requiredFieldsDesc"),
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
      title: t("toast.eventAdded"),
      description: t("toast.eventAddedDesc"),
    });

    router.push(`/dashboard/calendar?created=1&date=${encodeURIComponent(dateISO)}`);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Button variant="outline" asChild>
          <Link href="/dashboard/calendar">
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t("calendar.newEventPage.backToCalendar")}
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
            {t("calendar.newEventPage.title")}
          </h2>
          <p className="mt-2 text-slate-200 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
            {t("calendar.newEventPage.subtitle")}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("calendar.newEventPage.createEvent")}</CardTitle>
            <CardDescription>{t("calendar.newEventPage.createEventDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="event-date">{t("common.date")}</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={dateISO}
                  onChange={(e) => setDateISO(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-title">{t("calendar.newEventPage.event")}</Label>
                <Input
                  id="event-title"
                  placeholder={t("calendar.newEventPage.eventPlaceholder")}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-type">{t("calendar.tableType")}</Label>
                <Select value={type} onValueChange={(value) => setType(value as CalendarEventType)}>
                  <SelectTrigger id="event-type">
                    <SelectValue placeholder={t("calendar.newEventPage.selectType")} />
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
                <Label htmlFor="event-unit">{t("common.unit")}</Label>
                <Input
                  id="event-unit"
                  placeholder={t("calendar.newEventPage.unitPlaceholder")}
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSaving}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {isSaving ? t("calendar.newEventPage.saving") : t("calendar.newEventPage.saveEvent")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("calendar.newEventPage.consolidatedEvents")}</CardTitle>
            <CardDescription>{t("calendar.newEventPage.consolidatedEventsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("calendar.tableDate")}</TableHead>
                  <TableHead>{t("calendar.tableEvent")}</TableHead>
                  <TableHead>{t("calendar.tableType")}</TableHead>
                  <TableHead>{t("calendar.tableUnit")}</TableHead>
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

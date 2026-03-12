export const CALENDAR_EVENT_TYPES = [
  "Apresentacao",
  "Mentoria",
  "Prazo",
  "Treinamento",
] as const;

export type CalendarEventType = (typeof CALENDAR_EVENT_TYPES)[number];

export type CalendarEvent = {
  id: string;
  dateISO: string;
  title: string;
  type: CalendarEventType;
  unit: string;
};

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "agenda-showcase-inovacao-q2",
    dateISO: "2024-08-25",
    title: "Showcase de Inovacao Q2",
    type: "Apresentacao",
    unit: "Todas",
  },
  {
    id: "agenda-mentoria-fabio-pereira",
    dateISO: "2024-08-28",
    title: "Mentoria com Fabio Pereira",
    type: "Mentoria",
    unit: "Tecnologia",
  },
  {
    id: "agenda-entrega-relatorio-a3",
    dateISO: "2024-09-05",
    title: "Entrega do Relatorio A3",
    type: "Prazo",
    unit: "Geral",
  },
  {
    id: "agenda-workshop-vendas-consultivas",
    dateISO: "2024-09-10",
    title: "Workshop de Vendas Consultivas",
    type: "Treinamento",
    unit: "Vendas",
  },
];

const STORAGE_KEY = "fx.calendar.events.v1";

const isCalendarEvent = (value: unknown): value is CalendarEvent => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<CalendarEvent>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.dateISO === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.type === "string" &&
    CALENDAR_EVENT_TYPES.includes(candidate.type as CalendarEventType) &&
    typeof candidate.unit === "string"
  );
};

const normalize = (value: string) => value.trim().toLowerCase();

const hasSameIdentity = (a: CalendarEvent, b: CalendarEvent) =>
  a.dateISO === b.dateISO &&
  normalize(a.title) === normalize(b.title) &&
  a.type === b.type &&
  normalize(a.unit) === normalize(b.unit);

const sortByDate = (events: CalendarEvent[]) =>
  [...events].sort((a, b) => {
    const byDate = a.dateISO.localeCompare(b.dateISO);
    if (byDate !== 0) return byDate;
    return a.title.localeCompare(b.title);
  });

export const parseDateISO = (dateISO: string) => {
  const [year, month, day] = dateISO.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
};

export const formatDateISO = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getStoredCalendarEvents = (): CalendarEvent[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return sortByDate(parsed.filter(isCalendarEvent));
  } catch {
    return [];
  }
};

export const getAllCalendarEvents = (): CalendarEvent[] => {
  const stored = getStoredCalendarEvents();

  const merged = [...INITIAL_CALENDAR_EVENTS];
  for (const event of stored) {
    if (!merged.some((existing) => hasSameIdentity(existing, event))) {
      merged.push(event);
    }
  }

  return sortByDate(merged);
};

type NewCalendarEventInput = Omit<CalendarEvent, "id">;

export const saveCalendarEvent = (input: NewCalendarEventInput): CalendarEvent => {
  const newEvent: CalendarEvent = {
    id: `agenda-${Date.now()}`,
    dateISO: input.dateISO,
    title: input.title.trim(),
    type: input.type,
    unit: input.unit.trim(),
  };

  const stored = getStoredCalendarEvents();
  const alreadyExists =
    INITIAL_CALENDAR_EVENTS.some((event) => hasSameIdentity(event, newEvent)) ||
    stored.some((event) => hasSameIdentity(event, newEvent));

  if (alreadyExists) {
    return newEvent;
  }

  const next = sortByDate([...stored, newEvent]);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return newEvent;
};

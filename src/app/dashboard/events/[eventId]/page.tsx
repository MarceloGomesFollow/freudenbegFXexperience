
import EventDetailClient from './_client';

const events = [
    {
        id: "freud-talks-2023",
        title: "FreudTalks Experience 2023",
        description: "",
        category: "previousEdition",
        imageUrl: "https://picsum.photos/seed/ted-talk-stage/1200/400",
        imageHint: "conference stage audience"
    },
    {
        id: "innovation-showcase",
        title: "Showcase de Inovação Q2",
        description: "",
        category: "nextEvent",
        date: "25 de Agosto, 2024",
        imageUrl: "https://picsum.photos/seed/project-showcase/1200/400",
        imageHint: "project presentation team"
    },
];

export function generateStaticParams() {
    return events.map((e) => ({ eventId: e.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
    const { eventId } = await params;
    return <EventDetailClient eventId={eventId} />;
}

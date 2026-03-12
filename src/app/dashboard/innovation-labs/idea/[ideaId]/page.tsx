import { ideas } from '@/lib/data';
import IdeaDetailClient from './_client';

export function generateStaticParams() {
    return ideas.map((i) => ({ ideaId: i.id }));
}

export default async function IdeaDetailPage({ params }: { params: Promise<{ ideaId: string }> }) {
    const { ideaId } = await params;
    return <IdeaDetailClient ideaId={ideaId} />;
}

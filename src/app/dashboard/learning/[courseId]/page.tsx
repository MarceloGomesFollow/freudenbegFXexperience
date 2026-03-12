import { coursesDb, learningPathsDb } from '@/lib/data';
import LearningItemClient from './_client';

export function generateStaticParams() {
    return [
        ...coursesDb.map((c) => ({ courseId: c.id })),
        ...learningPathsDb.map((p) => ({ courseId: p.id })),
    ];
}

export default async function LearningItemPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    return <LearningItemClient courseId={courseId} />;
}

import { challenges } from '@/lib/data';
import ChallengeDetailClient from './_client';

export function generateStaticParams() {
    return challenges.map((c) => ({ challengeId: c.id }));
}

export default async function ChallengeDetailPage({ params }: { params: Promise<{ challengeId: string }> }) {
    const { challengeId } = await params;
    return <ChallengeDetailClient challengeId={challengeId} />;
}

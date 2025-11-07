
"use client";

import { useState, useEffect } from 'react';

export function DateTime() {
    const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

    useEffect(() => {
        // Set the date only on the client
        setCurrentDateTime(new Date());

        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 60000); // Update every minute

        return () => {
            clearInterval(timer);
        };
    }, []);

    if (!currentDateTime) {
        // Render a placeholder or nothing on the server and initial client render
        return null;
    }

    const formattedDate = currentDateTime.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = currentDateTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span>{formattedDate}</span>
            <span className="font-semibold">{formattedTime}</span>
        </div>
    );
}

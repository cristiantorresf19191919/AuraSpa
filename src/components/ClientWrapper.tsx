'use client';

import { useState, useEffect } from 'react';

interface ClientWrapperProps {
    children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Always render the same structure to prevent hydration mismatch
    // Use suppressHydrationWarning to prevent React warnings
    return (
        <div suppressHydrationWarning>
            {mounted ? children : (
                <div className="min-h-screen flex flex-col">
                    <div className="h-16 bg-transparent" />
                    <main className="flex-1 main-background">
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="animate-pulse text-white">Loading...</div>
                        </div>
                    </main>
                    <div className="h-16 bg-transparent" />
                </div>
            )}
        </div>
    );
} 
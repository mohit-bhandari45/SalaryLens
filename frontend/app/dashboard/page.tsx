"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Check if there is a token in the URL params (from Google OAuth)
        const urlToken = searchParams.get("token");

        if (urlToken) {
            localStorage.setItem("token", urlToken);
            setToken(urlToken);

            // Cleanup the URL to remove the token parameter for security/cleanliness
            router.replace("/dashboard");
        } else {
            // Check local storage for existing token
            const localToken = localStorage.getItem("token");
            if (!localToken) {
                // If not authenticated, send them to login
                router.push("/auth");
            } else {
                setToken(localToken);
            }
        }
    }, [searchParams, router]);

    if (!token) return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-12">
                    <Link href="/" className="inline-flex items-center justify-center w-12 h-12 bg-neutral-900 rounded-xl border border-neutral-800">
                        <span className="text-xl font-bold tracking-tighter text-indigo-400">SL</span>
                    </Link>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/auth");
                        }}
                        className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                    >
                        Sign out
                    </button>
                </header>

                <main className="space-y-8">
                    <div className="bg-neutral-900/40 border border-neutral-800/80 p-8 rounded-3xl">
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                            Welcome to your Dashboard
                        </h1>
                        <p className="text-neutral-400 font-light">
                            You have successfully authenticated. Here you can start adding salary information or browse analytics.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}

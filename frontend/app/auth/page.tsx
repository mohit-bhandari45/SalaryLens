"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
        const body = isLogin
            ? { email, password }
            : { username, email, password };

        try {
            const res = await fetch(`http://localhost:5000${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            // Save token to localStorage (or cookies in a real app)
            localStorage.setItem("token", data.token);

            // Redirect to dashboard
            router.push("/dashboard");

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex items-center justify-center p-6 selection:bg-neutral-800">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-md rounded-3xl p-8 relative z-10 shadow-2xl">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center justify-center w-12 h-12 bg-neutral-950 rounded-xl mb-4 border border-neutral-800">
                        <span className="text-xl font-bold tracking-tighter text-indigo-400">SL</span>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                        {isLogin ? "Welcome back" : "Create your account"}
                    </h1>
                    <p className="text-neutral-400 font-light">
                        {isLogin ? "Enter your details to access your dashboard." : "Join anonymously to track your career timeline."}
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {!isLogin && (
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-neutral-300">Username</label>
                            <input
                                type="text"
                                placeholder="developer_01"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder:text-neutral-600"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder:text-neutral-600"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder:text-neutral-600"
                            required
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="cursor-pointer w-full py-3 mt-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.05)] disabled:opacity-50"
                    >
                        {loading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="flex-1 h-px bg-neutral-800" />
                    <span className="text-sm text-neutral-500">or continue with</span>
                    <div className="flex-1 h-px bg-neutral-800" />
                </div>

                <button
                    type="button"
                    onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
                    className="cursor-pointer w-full py-3 bg-neutral-950 border border-neutral-800 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                </button>

                <div className="mt-8 text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError(null);
                        }}
                        className="cursor-pointer text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}

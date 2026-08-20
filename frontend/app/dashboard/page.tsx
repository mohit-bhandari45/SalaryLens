"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const API_URL = "http://localhost:5000";

const COMPANY_TYPES = [
    { value: "agency", label: "Agency" },
    { value: "startup", label: "Startup" },
    { value: "product", label: "Product Company" },
    { value: "service", label: "Service Company" },
    { value: "freelance", label: "Freelance" },
    { value: "government", label: "Government" },
    { value: "non_profit", label: "Non-profit" },
];

const WORK_MODES = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "On-site" },
];

type Section = "overview" | "submit" | "explore";

interface SalarySubmission {
    id: string;
    role: string;
    experienceYears: number;
    location: string;
    salary: number;
    salaryPeriod: string;
    companyType: string;
    workMode: string;
    createdAt: string;
}

function Sidebar({ activeSection, onNavigate, collapsed, onToggleCollapse }: { activeSection: Section; onNavigate: (section: Section) => void; collapsed: boolean; onToggleCollapse: () => void }) {
    const router = useRouter();

    const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
        {
            id: "overview",
            label: "Overview",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            id: "submit",
            label: "My Salary",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            id: "explore",
            label: "Explore",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
        },
    ];

    return (
        <aside className={`${collapsed ? "w-[72px]" : "w-64"} bg-[#111111] border-r border-neutral-800/60 min-h-screen flex flex-col transition-all duration-300 ease-in-out`}>
            <div className={`p-4 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
                {!collapsed && (
                    <Link href="/" className="inline-flex items-center justify-center w-9 h-9 bg-neutral-900 rounded-lg border border-neutral-700">
                        <span className="text-sm font-bold tracking-tighter text-white">SL</span>
                    </Link>
                )}
                <button
                    onClick={onToggleCollapse}
                    className="cursor-pointer p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800/50 transition-all"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <svg className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <nav className="flex-1 px-3 py-2 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            activeSection === item.id
                                ? "bg-white text-black shadow-lg shadow-white/5"
                                : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                        } ${collapsed ? "justify-center" : ""}`}
                        title={item.label}
                    >
                        {item.icon}
                        {!collapsed && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>

            <div className={`p-3 border-t border-neutral-800/60 ${collapsed ? "flex justify-center" : ""}`}>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/auth");
                    }}
                    className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:text-white hover:bg-neutral-800/50 transition-all ${collapsed ? "justify-center" : ""}`}
                    title="Sign out"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {!collapsed && <span>Sign out</span>}
                </button>
            </div>
        </aside>
    );
}

function OverviewSection({ submission, onNavigate }: { submission: SalarySubmission | null; onNavigate: (section: Section) => void }) {
    const dummy = submission
        ? {
              percentile: 35,
              marketMedian: 28000,
              rangeMin: 22000,
              rangeMax: 35000,
              similarProfiles: 312,
              confidence: 82,
              totalInDb: 1284,
          }
        : null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Overview</h1>
                <p className="text-neutral-400">Your salary submission dashboard</p>
            </div>

            {submission && dummy ? (
                <>
                    {/* Your Salary Card */}
                    <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-neutral-800 border border-neutral-700 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-semibold text-white">Your Current Submission</h2>
                            </div>
                            <button
                                onClick={() => onNavigate("submit")}
                                className="cursor-pointer px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-colors"
                            >
                                Edit
                            </button>
                        </div>

                        <div className="flex items-center gap-3 mb-5">
                            <h3 className="text-xl font-bold text-white">{submission.role}</h3>
                            <span className="px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-neutral-300 capitalize">{submission.workMode}</span>
                            <span className="px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-neutral-300 capitalize">{submission.companyType.replace("_", " ")}</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-black/40 border border-neutral-800/60 rounded-xl p-4">
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Salary</span>
                                <p className="text-xl font-bold text-white mt-1">₹{submission.salary.toLocaleString()}</p>
                                <p className="text-xs text-neutral-500 mt-0.5">/{submission.salaryPeriod === "monthly" ? "mo" : "yr"}</p>
                            </div>
                            <div className="bg-black/40 border border-neutral-800/60 rounded-xl p-4">
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Experience</span>
                                <p className="text-xl font-bold text-white mt-1">{submission.experienceYears}</p>
                                <p className="text-xs text-neutral-500 mt-0.5">years</p>
                            </div>
                            <div className="bg-black/40 border border-neutral-800/60 rounded-xl p-4">
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Location</span>
                                <p className="text-xl font-bold text-white mt-1">{submission.location}</p>
                            </div>
                            <div className="bg-black/40 border border-neutral-800/60 rounded-xl p-4">
                                <span className="text-xs text-neutral-500 uppercase tracking-wider">Submitted</span>
                                <p className="text-xl font-bold text-white mt-1">{new Date(submission.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                                <p className="text-xs text-neutral-500 mt-0.5">{new Date(submission.createdAt).getFullYear()}</p>
                            </div>
                        </div>
                    </div>

                    {/* 3 Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Your Percentile</span>
                            <div className="flex items-end gap-2 mt-2">
                                <p className="text-4xl font-bold text-white">{dummy.percentile}</p>
                                <span className="text-lg text-neutral-500 mb-1">th</span>
                            </div>
                            <div className="mt-3 w-full bg-neutral-800 rounded-full h-2">
                                <div className="bg-white rounded-full h-2" style={{ width: `${dummy.percentile}%` }} />
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">You earn more than {dummy.percentile}% of similar profiles</p>
                        </div>

                        <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Similar Profiles</span>
                            <p className="text-4xl font-bold text-white mt-2">{dummy.similarProfiles}</p>
                            <div className="mt-3 flex items-center gap-2 text-sm">
                                <span className="text-neutral-500">Range:</span>
                                <span className="text-white font-medium">₹{(dummy.rangeMin / 1000).toFixed(0)}k — ₹{(dummy.rangeMax / 1000).toFixed(0)}k</span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">Profiles matching your role, experience & location</p>
                        </div>

                        <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl">
                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Market Median</span>
                            <p className="text-4xl font-bold text-white mt-2">₹{(dummy.marketMedian / 1000).toFixed(0)}k</p>
                            <div className="mt-3">
                                {(() => {
                                    const diff = Math.round(((submission.salary - dummy.marketMedian) / dummy.marketMedian) * 100);
                                    return (
                                        <span className={`text-sm font-medium ${diff >= 0 ? "text-white" : "text-neutral-400"}`}>
                                            Your salary is {diff >= 0 ? "+" : ""}{diff}% vs median
                                        </span>
                                    );
                                })()}
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">Middle salary among similar profiles</p>
                        </div>
                    </div>

                    {/* Salary vs Median + Confidence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl">
                            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">Your Salary vs Median</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="text-neutral-400">You</span>
                                        <span className="text-white font-medium">₹{submission.salary.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-neutral-800 rounded-full h-3">
                                        <div className="bg-white rounded-full h-3" style={{ width: `${Math.min((submission.salary / dummy.rangeMax) * 100, 100)}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="text-neutral-400">Median</span>
                                        <span className="text-neutral-300 font-medium">₹{dummy.marketMedian.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-neutral-800 rounded-full h-3">
                                        <div className="bg-neutral-600 rounded-full h-3" style={{ width: `${(dummy.marketMedian / dummy.rangeMax) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-800/60">
                                <span className="text-xs text-neutral-500">Range: ₹{(dummy.rangeMin / 1000).toFixed(0)}k — ₹{(dummy.rangeMax / 1000).toFixed(0)}k</span>
                                <span className="text-xs text-neutral-500">Based on {dummy.similarProfiles} profiles</span>
                            </div>
                        </div>

                        <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl">
                            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">Comparison Confidence</h3>
                            <div className="flex items-center gap-5">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                        <circle cx="40" cy="40" r="36" fill="none" stroke="#262626" strokeWidth="6" />
                                        <circle cx="40" cy="40" r="36" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(dummy.confidence / 100) * 226} 226`} />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-lg font-bold text-white">{dummy.confidence}%</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2.5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-400">Total submissions</span>
                                        <span className="text-white font-medium">{dummy.totalInDb.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-400">Similar profiles</span>
                                        <span className="text-white font-medium">{dummy.similarProfiles}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-400">Data quality</span>
                                        <span className="text-white font-medium">High</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-3">
                        <button onClick={() => onNavigate("submit")} className="cursor-pointer px-5 py-2.5 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition-colors text-sm">
                            Update Salary
                        </button>
                        <button onClick={() => onNavigate("explore")} className="cursor-pointer px-5 py-2.5 bg-neutral-800 border border-neutral-700 text-white font-medium rounded-xl hover:bg-neutral-700 transition-colors text-sm">
                            Explore Data
                        </button>
                    </div>
                </>
            ) : (
                <div className="bg-[#141414] border border-neutral-800 p-12 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-neutral-800 border border-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <p className="text-neutral-400 mb-4">You haven&apos;t submitted your salary yet.</p>
                    <button
                        onClick={() => onNavigate("submit")}
                        className="cursor-pointer px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors text-sm"
                    >
                        Submit Your Salary
                    </button>
                </div>
            )}
        </div>
    );
}

function SubmitSection({ submission, onSubmitted }: { submission: SalarySubmission | null; onSubmitted: (data: SalarySubmission) => void }) {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState("");
    const [experienceYears, setExperienceYears] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [salaryPeriod, setSalaryPeriod] = useState<"monthly" | "annually">("monthly");
    const [companyType, setCompanyType] = useState("");
    const [workMode, setWorkMode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const t = localStorage.getItem("token");
        setToken(t);
    }, []);

    useEffect(() => {
        if (submission) {
            setRole(submission.role);
            setExperienceYears(String(submission.experienceYears));
            setLocation(submission.location);
            setSalary(String(submission.salary));
            setSalaryPeriod(submission.salaryPeriod as "monthly" | "annually");
            setCompanyType(submission.companyType);
            setWorkMode(submission.workMode);
        }
    }, [submission]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/salaries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    role,
                    experienceYears: parseFloat(experienceYears),
                    location,
                    salary: parseFloat(salary),
                    salaryPeriod,
                    companyType,
                    workMode,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                const msg = data.details
                    ? Object.values(data.details).flat().join(", ")
                    : data.error || "Something went wrong";
                throw new Error(msg);
            }

            onSubmitted(data as SalarySubmission);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const hasExisting = !!submission;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
                    {hasExisting ? "Update Your Salary" : "Submit Your Salary"}
                </h1>
                <p className="text-neutral-400">
                    {hasExisting
                        ? "Update your salary information. Your data stays anonymous."
                        : "Your data is anonymous and helps others understand the market."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl space-y-5">
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">Job Role</label>
                        <input
                            type="text"
                            placeholder="e.g. Full Stack Developer"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-neutral-800/50 rounded-xl focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30 transition-all text-white placeholder:text-neutral-600"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">Years of Experience</label>
                        <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="50"
                            placeholder="e.g. 1.5"
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-neutral-800/50 rounded-xl focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30 transition-all text-white placeholder:text-neutral-600"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">Location</label>
                        <input
                            type="text"
                            placeholder="e.g. Delhi NCR"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-neutral-800/50 rounded-xl focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30 transition-all text-white placeholder:text-neutral-600"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">Salary (₹)</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="e.g. 25000"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-neutral-800/50 rounded-xl focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30 transition-all text-white placeholder:text-neutral-600"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">Salary Period</label>
                        <select
                            value={salaryPeriod}
                            onChange={(e) => setSalaryPeriod(e.target.value as "monthly" | "annually")}
                            className="w-full px-4 py-3 bg-black/30 border border-neutral-800/50 rounded-xl focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30 transition-all text-white"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="annually">Annually</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">Company Type</label>
                        <select
                            value={companyType}
                            onChange={(e) => setCompanyType(e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-neutral-800/50 rounded-xl focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30 transition-all text-white"
                            required
                        >
                            <option value="" disabled>Select company type</option>
                            {COMPANY_TYPES.map((ct) => (
                                <option key={ct.value} value={ct.value}>{ct.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">Work Mode</label>
                        <select
                            value={workMode}
                            onChange={(e) => setWorkMode(e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-neutral-800/50 rounded-xl focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30 transition-all text-white"
                            required
                        >
                            <option value="" disabled>Select work mode</option>
                            {WORK_MODES.map((wm) => (
                                <option key={wm.value} value={wm.value}>{wm.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.08)] disabled:opacity-50"
                >
                    {loading ? "Saving..." : (hasExisting ? "Update Salary" : "Submit Salary Data")}
                </button>
            </form>
        </div>
    );
}

function ExploreSection() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Explore</h1>
                <p className="text-neutral-400">Browse salary data without submitting your own</p>
            </div>

            <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Filter by role..."
                        className="w-full px-4 py-3 bg-black/30 border border-neutral-800/50 rounded-xl focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30 transition-all text-white placeholder:text-neutral-600"
                    />
                    <input
                        type="text"
                        placeholder="Filter by location..."
                        className="w-full px-4 py-3 bg-black/30 border border-neutral-800/50 rounded-xl focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30 transition-all text-white placeholder:text-neutral-600"
                    />
                    <select className="w-full px-4 py-3 bg-black/30 border border-neutral-800/50 rounded-xl focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600/30 transition-all text-white">
                        <option value="">All company types</option>
                        {COMPANY_TYPES.map((ct) => (
                            <option key={ct.value} value={ct.value}>{ct.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-[#141414] border border-neutral-800 p-12 rounded-2xl text-center">
                <div className="w-16 h-16 bg-neutral-800/30 border border-neutral-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <p className="text-neutral-400">Explore will be available once we have enough salary data in the system.</p>
            </div>
        </div>
    );
}

function SuccessToast({ submission, onDismiss }: { submission: SalarySubmission; onDismiss: () => void }) {
    return (
        <div className="fixed bottom-6 right-6 bg-[#141414] border border-neutral-700 rounded-2xl p-5 shadow-2xl z-50 max-w-sm">
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div className="flex-1">
                    <p className="text-white font-medium text-sm">Salary updated</p>
                    <p className="text-neutral-400 text-xs mt-1">{submission.role} · ₹{submission.salary.toLocaleString()}</p>
                </div>
                <button onClick={onDismiss} className="text-neutral-500 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<Section>("overview");
    const [submission, setSubmission] = useState<SalarySubmission | null>(null);
    const [toast, setToast] = useState<SalarySubmission | null>(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const fetchSubmission = useCallback(async (authToken: string) => {
        try {
            const res = await fetch(`${API_URL}/api/salaries/me`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            if (res.ok) {
                const data = await res.json();
                setSubmission(data);
            }
        } catch {
            // Silently fail
        }
    }, []);

    useEffect(() => {
        const urlToken = searchParams.get("token");

        if (urlToken) {
            localStorage.setItem("token", urlToken);
            setToken(urlToken);
            router.replace("/dashboard");
            return;
        }

        const localToken = localStorage.getItem("token");
        if (!localToken) {
            router.push("/auth");
        } else {
            setToken(localToken);
            fetchSubmission(localToken);
        }
    }, [searchParams, router, fetchSubmission]);

    useEffect(() => {
        const section = searchParams.get("section") as Section | null;
        if (section && ["overview", "submit", "explore"].includes(section)) {
            setActiveSection(section);
        }
    }, [searchParams]);

    const handleSubmitted = (data: SalarySubmission) => {
        setSubmission(data);
        setToast(data);
        setTimeout(() => setToast(null), 4000);
        setActiveSection("overview");
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#0a0a0a] text-neutral-50">
            <Sidebar activeSection={activeSection} onNavigate={setActiveSection} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {activeSection === "overview" && <OverviewSection submission={submission} onNavigate={setActiveSection} />}
                    {activeSection === "submit" && <SubmitSection submission={submission} onSubmitted={handleSubmitted} />}
                    {activeSection === "explore" && <ExploreSection />}
                </div>
            </main>

            {toast && <SuccessToast submission={toast} onDismiss={() => setToast(null)} />}
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

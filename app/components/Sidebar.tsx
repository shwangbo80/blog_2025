import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/login");
    }

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Mobile dropdown menu */}
            {isOpen && (
                <div className="md:hidden fixed top-16 left-4 z-40 bg-slate-800 rounded shadow-lg border border-slate-600">
                    <div className="flex flex-col p-4">
                        <a href="/dashboard" onClick={() => setIsOpen(false)}>
                            <p className="text-md text-light font-bold px-2 py-2 hover:bg-slate-700 rounded">
                                Dashboard
                            </p>
                        </a>
                        <a href="/dashboard/create" onClick={() => setIsOpen(false)}>
                            <p className="text-md text-light px-2 py-2 hover:bg-slate-700 rounded">
                                Create Post
                            </p>
                        </a>
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsOpen(false);
                            }}
                            className="w-full text-left"
                        >
                            <p className="text-md text-light px-2 py-2 hover:bg-slate-700 rounded">
                                Logout
                            </p>
                        </button>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-40 flex-col bg-slate-800 p-5 pt-5 border-s border-t border-b border-slate-600">
                <div>
                    <a href="/dashboard">
                        <p className="text-md text-light font-bold px-2">Dashboard</p>
                    </a>
                    <a href="/dashboard/create">
                        <p className="text-md text-light px-2 mt-5">Create Post</p>
                    </a>
                    <button onClick={handleLogout} className="w-full text-left">
                        <p className="text-md text-light px-2 mt-5">Logout</p>
                    </button>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 z-30 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

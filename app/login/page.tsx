"use client";

import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
                setLoggedIn(true);
                router.push("/dashboard");
            } else {
                setCheckingAuth(false); // <-- Add this line
            }
        }
        checkAuth();
    }, [router]);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg("");
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setErrorMsg(error.message);
        } else {
            router.push("/dashboard");
        }
    }
    if (checkingAuth)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
            </div>
        );
    if (loggedIn) {
        router.push("/dashboard");
    }
    return (
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 max-w-4xl mx-auto min-h-[calc(100vh-4rem)]">
            <div className="bg-gray-800 p-10 mx-auto w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl/9 font-bold tracking-tight text-light">
                        Sign in
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-light"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    required
                                    value={email ?? ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-xl"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm/6 font-medium text-light"
                            >
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                    value={password ?? ""}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-xl"
                                />
                            </div>
                        </div>
                        {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="flex justify-center rounded-md bg-indigo-600 px-5 py-2 text-lg font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

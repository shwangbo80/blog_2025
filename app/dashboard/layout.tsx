"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const { data } = await supabase.auth.getUser();
            if (!data.user) {
                router.push("/login");
            } else {
                setLoading(false);
            }
        }
        checkAuth();
    }, [router]);

    return loading ? (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
    ) : (
        <div className="mx-auto max-w-7xl my-5">
            <div className="flex">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}

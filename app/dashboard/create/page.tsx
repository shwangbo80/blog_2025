"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("draft");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const { data } = await supabase.auth.getUser();
            if (!data.user) {
                router.replace("/login");
            } else {
                setUser(data.user);
            }
            setLoading(false);
        }
        checkAuth();
    }, [router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        const slug = title.trim().toLowerCase().replace(/\s+/g, "-");
        const { error } = await supabase.from("posts").insert([
            {
                title,
                content,
                is_published: status === "published",
                slug,
                // user_id removed
            },
        ]);
        if (error) {
            setError(error.message);
        } else {
            router.push("/dashboard");
        }
    }

    if (loading) {
        return (
            <div className="bg-slate-900 mx-auto w-full p-10 text-white">
                Checking authentication...
            </div>
        );
    }

    return (
        <div className="bg-slate-900 mx-auto w-full">
            <div className="bg-slate-800 p-10 border border-slate-600">
                <p className="text-light font-bold mb-5">Create Post</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-light">Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-500 p-2  bg-gray-900 w-full text-light focus:border-blue-500 focus:outline-none focus:ring-0"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-light">Content</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="border border-gray-500 p-2 bg-gray-900 w-full h-50 text-light focus:border-blue-500 focus:outline-none focus:ring-0"
                        />
                    </div>
                    <div className="mb-4 w-[150px]">
                        <label className="block text-light">Status</label>
                        <select
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border border-gray-500 p-2 w-full text-light bg-gray-900 focus:border-blue-500 focus:outline-none focus:ring-0"
                        >
                            <option value="draft" className="bg-slate-900">
                                Draft
                            </option>
                            <option value="published" className="bg-slate-900">
                                Published
                            </option>
                        </select>
                    </div>
                    {error && <div className="text-red-500 mb-2">{error}</div>}
                    <button className="bg-blue-500 text-white p-3 rounded mt-5">
                        Post Blog
                    </button>
                </form>
            </div>
        </div>
    );
}

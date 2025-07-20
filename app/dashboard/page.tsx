"use client";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Post = {
    id: string;
    slug: string;
    title: string;
    content: string;
    cover_image: string;
    is_published: boolean;
    created_at: string; // add other fields as needed
};

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function checkAuthAndFetch() {
            const { data } = await supabase.auth.getUser();
            if (!data.user) {
                router.replace("/login");
                return;
            }
            setUser(data.user);
            try {
                const { data: postsData, error: postsError } = await supabase.from("posts").select("*");
                if (postsError) {
                    setError(postsError.message);
                } else if (postsData) {
                    setPosts(postsData.reverse());
                }
            } catch (err: any) {
                setError("Failed to fetch posts.");
            }
            setLoading(false);
        }
        checkAuthAndFetch();
    }, [router]);

    if (loading) {
        return (
            <div className="bg-slate-900 mx-auto w-full p-10 text-white">
                Checking authentication...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-slate-900 mx-auto w-full p-10 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-slate-800 mx-auto w-full border border-slate-600">
            <div className="bg-slate-00 p-5">
                <p className="font-bold mb-5 text-white">Posts</p>
                <div>
                    {posts.map((post) => (
                        <div key={post.id} className="border-b-1 border-gray-500 py-3">
                            <p className="text-xs text-light">
                                {new Date(post.created_at).toISOString().slice(0, 10)}
                            </p>
                            <a
                                key={post.id}
                                href={`/dashboard/edit/${post.slug}`}
                                className="text-lg font-bold text-white hover:underline"
                            >
                                {post.title}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

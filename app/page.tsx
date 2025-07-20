"use client";
import { supabase } from "./lib/supabaseClient";
import { useEffect, useState } from "react";
import Hero from "./components/hero";

type Post = {
    id: string;
    slug: string;
    title: string;
    content: string;
    cover_image: string;
    is_published: boolean;
    created_at: string; // add other fields as needed
};

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const { data } = await supabase.auth.getUser();
            setIsLoggedIn(!!data.user);
        }

        async function fetchPosts() {
            const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: true });
            if (data) {
                const filteredPosts = isLoggedIn
                    ? data.reverse()
                    : data.reverse().filter((post) => post.is_published);
                setPosts(filteredPosts);
            }
            console.log(data);
        }

        checkAuth().then(() => fetchPosts());
    }, [isLoggedIn]);

    return (
        <div className="grid w-full font-[family-name:var(--font-geist-sans)] mb-5 prose dark:prose-invert max-w-none">
            <Hero />
            <main className="flex flex-col gap-[15px] row-start-2 sm:items-start p-10 bg-gray-900 w-full max-w-5xl mx-auto">
                {posts.map((post) => (
                    <div key={post.id} className=" w-full p-5 bg-gray-800">
                        <div className="text-xs text-gray-400">
                            {new Date(post.created_at).toISOString().slice(0, 10)}
                        </div>
                        <div className="">
                            <a
                                key={post.id}
                                href={`/post/${post.slug}`}
                                className="text-xl font-bold no-underline hover:underline py-2"
                            >
                                {post.title}
                            </a>
                        </div>
                        {/* <p>{post.content}</p> */}
                    </div>
                ))}
            </main>
        </div>
    );
}

"use client";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import "../../globals.css";

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  cover_image: string;
  is_published: boolean;
  created_at: string; // add other fields as needed
};

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();
      console.log(data)
      if (data) setPost(data);
    }
    fetchPost();
  }, [slug]);
  return (
    <main className="flex flex-col  row-start-2 sm:items-start mx-auto my-5 max-w-6xl">
      {post ? (
        <>
          <div className="bg-gray-800 p-10 w-full">
            <div className="border border-gray-700 p-5">
              <div className="text-4xl font-bold mb-5">{post.title}</div>
              <div className="text-sm text-gray-400 mb-3">
                Created at: {new Date(post.created_at).toLocaleDateString("en-US")}
              </div>
              <div className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content, {
                    USE_PROFILES: { html: true },
                  }),
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      )}
    </main>
  );
}

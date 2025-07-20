"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  cover_image: string;
  is_published: boolean;
  created_at: string;
};

export default function EditPost() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    content: "",
    cover_image: "",
    status: "published",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();
      if (data) {
        setPost(data);
        setForm({
          title: data.title ?? "",
          content: data.content ?? "",
          cover_image: data.cover_image ?? "",
          status: data.is_published ? "published" : "draft",
        });
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const { error } = await supabase
      .from("posts")
      .update({
        title: form.title,
        content: form.content,
        cover_image: form.cover_image,
        is_published: form.status === "published",
      })
      .eq("slug", slug);
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!post) return <div className="text-red-500 p-10">Post not found.</div>;

  return (
    <div className="bg-slate-800 mx-auto w-full p-0 md:p-10 border border-slate-600">
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        <input
          type="text"
          className="border border-gray-500 p-2 rounded bg-gray-900 text-white text-xl"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="border border-gray-500 p-2 rounded bg-gray-900 text-white min-h-[400px] text-xl"
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          required
        />
        <div className="mb-4 w-[150px]">
          <label className="block text-light">Status</label>
          <select
            required
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            className="border border-gray-500 p-2 w-full text-light bg-gray-900 focus:border-gray-400"
          >
            <option value="published" className="bg-slate-900">
              Published
            </option>
            <option value="draft" className="bg-slate-900">
              Draft
            </option>
          </select>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-xs bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Update Post
        </button>
        <button
          type="button"
          className="w-xs bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
              setError("");
              const { error } = await supabase
                .from("posts")
                .delete()
                .eq("slug", slug);
              if (error) {
                setError(error.message);
              } else {
                router.push("/dashboard");
              }
            }
          }}
        >
          Delete Post
        </button>
      </form>
    </div>
  );
}
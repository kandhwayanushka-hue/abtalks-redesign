"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { MobileNav } from "@/components/day/ChallengeDay";
import { getUser } from "@/lib/auth";
import { remember } from "@/lib/memory";
import { communityPost, type PostFeedback } from "@/data/community";
import { ArrowLeft, ArrowRight, Message, Send, Star, Trophy, Users } from "@/components/icons";

export default function CommunityPostPage({ id }: { id: string }) {
  const post = communityPost(id);
  const [user] = useState(() => getUser());
  const [name, setName] = useState(() => user?.name ?? "");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [localFeedback, setLocalFeedback] = useState<PostFeedback[]>(post?.feedback ?? []);

  if (!post) notFound();
  const current = post;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    const fb: PostFeedback = { name: name || "You", text: comment.trim(), rating, ts: 0 };
    remember("feedback", current.id, `${fb.name}: ${fb.text} (${fb.rating}/5)`);
    setLocalFeedback((cur) => [...cur, fb]);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white">
              A
            </span>
            <span className="text-sm font-semibold tracking-tight">
              ABTalks <span className="text-zinc-500">·</span>{" "}
              <span className="text-gradient">Community</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden sm:flex" />
            <Link
              href="/dashboard#community"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          href="/dashboard#community"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Community
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold text-white">
            {post.author
              .split(" ")
              .filter(Boolean)
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>
          <div>
            <div className="font-semibold">{post.author}</div>
            <div className="text-xs text-zinc-500">
              Day {post.day} · {post.tag}
            </div>
          </div>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-400">
            <Trophy className="h-3.5 w-3.5" />
            {post.votes} votes
          </span>
        </div>

        <h1 className="mt-6 font-serif text-3xl tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">{post.build}</p>

        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400">
          <Users className="h-4 w-4 shrink-0 text-violet-400" />
          Leave feedback — vote it up, tell the builder what worked, or what you’d do different.
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <Message className="h-4 w-4 text-violet-400" />
              Feedback
            </h2>
            <span className="text-xs text-zinc-500">{localFeedback.length} comment{localFeedback.length === 1 ? "" : "s"}</span>
          </div>

          {sent ? (
            <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">
              Thanks — your feedback is logged to memory and shows on the post below.
            </div>
          ) : (
            <form onSubmit={submit} className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <label className="text-xs font-medium uppercase tracking-widest text-zinc-500" htmlFor="fb-name">
                    Name
                  </label>
                  <input
                    id="fb-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-violet-500/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <span className="block text-xs font-medium uppercase tracking-widest text-zinc-500">Rating</span>
                  <div className="mt-2.5 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        aria-label={`${s} star${s === 1 ? "" : "s"}`}
                      >
                        <Star
                          className={`h-6 w-6 transition ${
                            s <= rating ? "text-amber-400" : "text-zinc-700"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                required
                className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-violet-500/50"
                placeholder="What worked? What would you improve?"
              />
              <button
                type="submit"
                className="mt-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Post feedback
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}

          <div className="mt-4 space-y-3">
            {localFeedback.map((f, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-[10px] font-bold text-white">
                      {f.name
                        .split(" ")
                        .filter(Boolean)
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </span>
                    <span className="text-sm font-medium">{f.name}</span>
                  </div>
                  <span className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= f.rating ? "text-amber-400" : "text-zinc-700"}`} />
                    ))}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{f.text}</p>
              </div>
            ))}
            {localFeedback.length === 0 && (
              <p className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-center text-sm text-zinc-500">
                No feedback yet — be the first.
              </p>
            )}
          </div>
        </section>

        <Link
          href="/dashboard#community"
          className="group mt-10 inline-flex items-center gap-2 text-sm text-violet-400 transition hover:text-violet-300"
        >
          Back to all ships
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </main>

      <MobileNav active="dash" />
    </div>
  );
}

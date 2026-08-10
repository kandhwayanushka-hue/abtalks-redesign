"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Send, Sparkles, Trash2 } from "@/components/icons";
import { clearHistory, getHistory, getProfile, pushMessage, type MentorMessage } from "@/lib/memory";
import { mentorReply } from "@/lib/mentor";
import type { Mentor } from "@/lib/mentors";

const SUGGESTIONS = ["Give me a hint for today", "Review my submission", "Where am I?"];

export default function MentorChat({ mentor, fullScreen }: { mentor?: Mentor; fullScreen?: boolean }) {
  const [history, setHistory] = useState<MentorMessage[]>(() => getHistory());
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openedFullScreen = useRef(false);

  const sendRef = useRef<(text: string) => void>(() => {});
  const openFullScreenRef = useRef<() => void>(() => {});

  useEffect(() => {
    sendRef.current = send;
    openFullScreenRef.current = openFullScreen;
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (!detail) return;
      openFullScreenRef.current();
      sendRef.current(detail);
    };
    window.addEventListener("abtalks:mentor-ask", handler);
    return () => window.removeEventListener("abtalks:mentor-ask", handler);
  }, []);

  // Scroll only the chat's own message list (not the whole page) so opening a
  // page with the mentor embedded never yanks the window to the bottom.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, thinking]);

  function openFullScreen() {
    if (fullScreen || openedFullScreen.current) return;
    openedFullScreen.current = true;
    window.open("/chat", "_blank", "noopener");
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    const userMsg: MentorMessage = { role: "user", content: trimmed, ts: Date.now() };
    const next = [...history, userMsg];
    setHistory(next);
    pushMessage(userMsg);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      const profile = getProfile();
      const reply = mentorReply(
        trimmed,
        profile,
        mentor ? { name: mentor.name, specialty: mentor.specialty } : undefined
      );
      const replyMsg: MentorMessage = { role: "assistant", content: reply, ts: Date.now() };
      setHistory([...next, replyMsg]);
      pushMessage(replyMsg);
      setThinking(false);
    }, 700);
  }

  function quickReview() {
    send(
      "Review my submission: repo is public and cloneable, live demo reachable, PROMPTS.md included, README updated. Ship it."
    );
  }

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        openFullScreen();
      }}
    >
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
            style={
              mentor
                ? { background: `linear-gradient(135deg, ${mentor.color}, ${mentor.color}88)` }
                : undefined
            }
          >
            {mentor ? mentor.name[0] : <Brain className="h-5 w-5" />}
          </span>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              {mentor ? mentor.name : "Live mentor · doubt solving"}
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {mentor ? mentor.specialty : "online · remembers all 60 days"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!fullScreen && (
            <a
              href="/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-violet-500/30 hover:text-white"
            >
              Full screen ↗
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearHistory();
              setHistory([]);
            }}
            title="Delete chat history"
            aria-label="Delete chat history"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition hover:border-red-500/40 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={quickReview}
            className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300 transition hover:bg-violet-500/20"
          >
            Quick review
          </button>
        </div>
      </div>

      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-5 py-5" ref={scrollRef}>
        {history.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-sm bg-gradient-to-r from-violet-500 to-blue-500 text-white"
                  : "rounded-bl-sm bg-zinc-800 text-zinc-200"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-zinc-800 px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:240ms]" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/5 px-5 py-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-violet-500/30 hover:text-zinc-200"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="border-t border-white/5 p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything — the mentor remembers your journey…"
            className="flex-1 rounded-full border border-white/10 bg-zinc-800/70 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white transition enabled:hover:brightness-110 disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

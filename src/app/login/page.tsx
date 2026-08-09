"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Sparkles } from "@/components/icons";
import { setUser } from "@/lib/auth";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (res: { credential: string }) => void;
          }) => void;
          renderButton: (el: HTMLElement, opts: { theme?: string; size?: string; width?: number }) => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

function decodeJwt(token: string) {
  const payload = token.split(".")[1];
  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return JSON.parse(decodeURIComponent(escape(window.atob(padded)))) as {
    name?: string;
    email?: string;
    picture?: string;
  };
}

function GoogleG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" width={20} height={20}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a11.99 11.99 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

const TRACKS = ["Claude Challenge", "Agents", "Deployment", "Portfolio"];

export default function LoginPage() {
  const router = useRouter();
  const googleBtn = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<null | { name: string; email: string }>(null);

  function signIn() {
    setLoading(true);
    window.setTimeout(() => {
      const user = { name: "Anushka", email: "anushka@abes.ac.in", joinedAt: new Date().toISOString(), provider: "google" as const };
      setUser(user);
      setAccount(user);
      setLoading(false);
      window.setTimeout(() => router.push("/dashboard"), 500);
    }, 700);
  }

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    let cancelled = false;
    function render() {
      if (cancelled || !googleBtn.current || !window.google) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (res) => {
          const info = decodeJwt(res.credential);
          const user = {
            name: info.name ?? "Google user",
            email: info.email ?? "",
            joinedAt: new Date().toISOString(),
            provider: "google" as const,
          };
          setUser(user);
          setAccount(user);
          router.push("/dashboard");
        },
      });
      window.google.accounts.id.renderButton(googleBtn.current, {
        theme: "outline",
        size: "large",
        width: googleBtn.current.clientWidth,
      });
    }
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <main className="flex flex-1 flex-col justify-center px-4 py-10">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-2xl font-bold text-white">
              A
            </span>
            <h1 className="mt-5 text-2xl font-semibold tracking-tight">
              Welcome to ABTalks
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Pick a 60-day track. Build every day. Show the world you shipped.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            {account ? (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-base font-bold text-white">
                  {account.name[0]}
                </div>
                <div className="mt-3 text-sm font-semibold">{account.name}</div>
                <div className="text-xs text-zinc-500">{account.email}</div>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Signed in — opening your challenge…
                </p>
              </div>
            ) : GOOGLE_CLIENT_ID ? (
              <div>
                <div ref={googleBtn} className="flex justify-center" />
                <button
                  onClick={signIn}
                  className="mt-4 flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/10"
                >
                  <GoogleG className="h-5 w-5" />
                  Demo sign-in (mock)
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-60"
              >
                <GoogleG className="h-5 w-5" />
                {loading ? "Signing in…" : "Continue with Google"}
              </button>
            )}

            <div className="my-5 flex items-center gap-3 text-xs text-zinc-600">
              <span className="h-px flex-1 bg-white/10" />
              or
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-2">
              {TRACKS.map((t) => (
                <div
                  key={t}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3"
                >
                  <span className="text-sm text-zinc-300">{t}</span>
                  <span className="flex items-center gap-1 text-xs text-amber-400">
                    <Flame className="h-3.5 w-3.5" />
                    Day 1 of 60
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-relaxed text-zinc-600">
            {GOOGLE_CLIENT_ID
              ? "Signed in with Google — your session is stored locally for this demo."
              : "Real Google sign-in is wired and activates once a Google Client ID is added — until then this is the demo mock."}
            <br />
            By continuing you agree to ship something public every day.
          </p>
          <div className="mt-4 text-center">
            <Link href="/" className="text-xs font-medium text-violet-400 hover:text-violet-300">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

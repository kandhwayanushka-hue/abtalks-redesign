"use client";

import { useState } from "react";
import type { DayNode } from "@/data/journey";
import { skillColor } from "@/data/journey";
import { visualSteps } from "@/lib/visual";
import { isSpeechSupported, speak, stopSpeaking } from "@/lib/speech";
import { ArrowRight, Eye, Pause, Volume2 } from "@/components/icons";

function speakText(node: DayNode) {
  const steps = visualSteps(node);
  const text = [
    `Day ${node.day}. ${node.title}.`,
    node.blurb,
    ...steps.map((s, i) => `Step ${i + 1}: ${s.title}. ${s.body}`),
  ].join(" ");
  speak(text);
}

export default function TaskView({ node }: { node: DayNode }) {
  const [mode, setMode] = useState<"read" | "visual">("read");
  const [listening, setListening] = useState(false);
  const supported = isSpeechSupported();
  const steps = visualSteps(node);

  function toggleListen() {
    if (listening) {
      stopSpeaking();
      setListening(false);
    } else {
      setListening(true);
      speakText(node);
      if (supported) window.setTimeout(() => setListening(false), 1000);
    }
  }

  return (
    <div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-zinc-900/70 p-1">
          <button
            onClick={() => setMode("read")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              mode === "read" ? "bg-white text-zinc-950" : "text-zinc-400 hover:text-white"
            }`}
          >
            Read
          </button>
          <button
            onClick={() => setMode("visual")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              mode === "visual" ? "bg-white text-zinc-950" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Visual
          </button>
        </div>

        {supported && (
          <button
            onClick={toggleListen}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-white/10"
          >
            {listening ? (
              <>
                <Pause className="h-3.5 w-3.5 text-violet-400" />
                Stop narration
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-violet-400" />
                Listen to this task
              </>
            )}
          </button>
        )}
      </div>

      {mode === "read" ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm leading-relaxed text-zinc-300">
            {node.blurb}
          </div>
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm leading-relaxed text-zinc-400">
            Your PROMPTS.md is your receipts — make it readable, honest, and in
            the repo. Judges read it before they read your code.
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="relative">
            <div className="absolute bottom-4 left-6 top-4 w-px bg-gradient-to-b from-violet-500/60 via-white/15 to-white/15" />
            <ol className="space-y-3">
              {steps.map((step, i) => (
                <li key={step.title} className="relative flex gap-3">
                  <span
                    className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-900"
                    style={{ color: skillColor(node.skill) }}
                  >
                    <step.icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <div className="text-sm font-semibold">
                      <span className="mr-1.5 text-zinc-500">Step {i + 1}.</span>
                      {step.title}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-2.5 text-xs text-zinc-400">
            <ArrowRight className="h-3.5 w-3.5 text-violet-400" />
            Don’t like reading? Hit listen — the mentor narrates every step.
          </div>
        </div>
      )}
    </div>
  );
}

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function isSpeaking(): boolean {
  return isSpeechSupported() && (window.speechSynthesis.speaking || window.speechSynthesis.pending);
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return voices.find(
    (v) => /en[-_]?(IN|GB|US)/i.test(v.lang) && /female|zira|samantha|sonia|karen/i.test(v.name)
  );
}

export function speak(text: string, onEnd?: () => void) {
  if (!isSpeechSupported()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  currentUtterance = null;

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;
  utterance.rate = 0.98;
  utterance.pitch = 1.02;
  utterance.lang = "en-IN";

  const voice = pickVoice();
  if (voice) utterance.voice = voice;

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    if (currentUtterance === utterance) currentUtterance = null;
    onEnd?.();
  };
  utterance.onend = finish;
  utterance.onerror = finish;

  synth.speak(utterance);

  // Chrome/Edge load voices asynchronously; grab one when they arrive so a
  // previously empty list can't leave us without a chosen voice.
  if (synth.onvoiceschanged === null) {
    synth.onvoiceschanged = () => {
      if (currentUtterance && !currentUtterance.voice) {
        const v = pickVoice();
        if (v) currentUtterance.voice = v;
      }
    };
  }
}

export function stopSpeaking() {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

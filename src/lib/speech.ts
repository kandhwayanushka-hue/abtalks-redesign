export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, onEnd?: () => void) {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.98;
  utterance.pitch = 1.02;
  utterance.lang = "en-IN";
  const voices = window.speechSynthesis.getVoices();
  const female = voices.find(
    (v) => /en[-_]?(IN|GB|US)/i.test(v.lang) && /female|zira|samantha|sonia|karen/i.test(v.name)
  );
  if (female) utterance.voice = female;
  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
}

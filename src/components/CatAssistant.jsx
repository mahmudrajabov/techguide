import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, Trash2 } from "lucide-react";
import { generateResponse, suggestedQuestions } from "@/lib/catBrain";
import clsx from "clsx";

const STORAGE_KEY = "techguide-chat";
const CAT_NAME = "K0DE-K4T";

function CatHead({ className }) {
  // Geometric cat head built from glowing cyan lines.
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        {/* ears */}
        <path d="M14 16 L11 7 L19 13 Z" />
        <path d="M34 16 L37 7 L29 13 Z" />
        {/* head */}
        <path d="M13 18 Q13 34 24 38 Q35 34 35 18 Q24 14 13 18 Z" />
        {/* eyes */}
        <circle cx="19" cy="25" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="29" cy="25" r="1.6" fill="currentColor" stroke="none" />
        {/* whiskers */}
        <path d="M9 27 L16 28" />
        <path d="M9 30 L16 30" />
        <path d="M39 27 L32 28" />
        <path d="M39 30 L32 30" />
        {/* nose / mouth */}
        <path d="M23 30 L24 31.5 L25 30" />
      </g>
    </svg>
  );
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function CatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadHistory);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Seed a greeting on first ever open if empty.
  useEffect(() => {
    if (open && messages.length === 0) {
      const greet = {
        role: "cat",
        text: `Hi! I'm ${CAT_NAME}, your TechGuide assistant. Ask me about any article, track, or feature — or tap a quick command below.`,
      };
      setMessages([greet]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [displayed, messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const typeOut = (fullText, done) => {
    setTyping(true);
    setDisplayed("");
    let i = 0;
    const step = Math.max(1, Math.round(fullText.length / 60));
    const timer = setInterval(() => {
      i += step;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timer);
        setTyping(false);
        setDisplayed("");
        done(fullText);
      }
    }, 18);
  };

  const send = (text) => {
    const content = (text ?? input).trim();
    if (!content || typing) return;
    const userMsg = { role: "user", text: content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    const reply = generateResponse(content);
    // small think delay then type out
    setTimeout(() => typeOut(reply, (full) => setMessages((m) => [...m, { role: "cat", text: full }])), 280);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const lastCat = [...messages].reverse().find((m) => m.role === "cat");

  return (
    <>
      {/* Floating orb button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open K0DE-K4T assistant"}
        aria-expanded={open}
        className={clsx(
          "fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full border transition-all duration-300",
          "glass border-primary/40 text-primary shadow-[0_0_30px_-4px_hsl(var(--primary)/0.5)] hover:scale-105",
          open && "rotate-90"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <CatHead className="h-9 w-9" />}
        <span className="absolute inset-0 rounded-full animate-pulse-slow ring-1 ring-primary/30 pointer-events-none" />
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 w-[min(92vw,24rem)] glass rounded-xl border border-border shadow-2xl overflow-hidden flex flex-col"
          style={{ height: "min(70vh, 34rem)" }}
          role="dialog"
          aria-label={`${CAT_NAME} assistant`}
        >
          {/* header */}
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 bg-primary/5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-primary/40 text-primary bg-background/60">
                <CatHead className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-mono text-sm text-primary">{CAT_NAME}</p>
                <p className="font-mono text-[0.65rem] text-muted-foreground">online · grounded in TechGuide</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              aria-label="Clear chat history"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3 relative">
            {typing && <div className="absolute inset-x-0 top-0 h-12 scanline pointer-events-none" />}
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const isTypingThis = typing && m.role === "cat" && i === messages.length - 1;
              return (
                <div key={i} className={clsx("flex", isUser ? "justify-end" : "justify-start")}>
                  <div
                    className={clsx(
                      "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words",
                      isUser
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary/60 text-foreground rounded-bl-sm border border-border"
                    )}
                  >
                    {isTypingThis ? <span className="typing-caret">{displayed}</span> : m.text}
                  </div>
                </div>
              );
            })}
            {typing && !lastCat && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-secondary/60 border border-border px-3 py-2 text-sm text-muted-foreground">
                  <Sparkles className="inline h-3.5 w-3.5 mr-1 animate-pulse" /> compiling…
                </div>
              </div>
            )}
            <div aria-live="polite" className="sr-only">
              {typing ? `Assistant is typing: ${displayed}` : lastCat?.text}
            </div>
          </div>

          {/* suggestions */}
          {messages.length <= 1 && (
            <div className="px-3.5 pb-2 flex flex-wrap gap-1.5">
              {suggestedQuestions.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-background/40 px-2.5 py-1.5 text-[0.7rem] text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-border p-3 flex items-center gap-2 bg-background/40"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ask K0DE-K4T…"
              className="flex-1 bg-background/60 border border-border rounded-md px-3 h-10 text-sm outline-none focus:border-primary/60 placeholder:text-muted-foreground/70"
              aria-label="Message"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
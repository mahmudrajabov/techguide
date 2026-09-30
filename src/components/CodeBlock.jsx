import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("language-", "") || "code";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="group relative my-5 rounded-lg border border-border bg-[hsl(240_6%_6%)] overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2 bg-background/40">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-[0.7rem] text-muted-foreground">{lang}</span>
        </div>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[0.7rem] text-muted-foreground hover:text-primary transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-foreground">{children}</code>
      </pre>
    </div>
  );
}
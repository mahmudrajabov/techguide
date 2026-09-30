import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, Sun, Moon, Bookmark } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useBookmarks } from "@/lib/bookmarks";
import clsx from "clsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/articles", label: "Articles" },
  { to: "/bookmarks", label: "Bookmarks" },
];

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const { count } = useBookmarks();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/articles?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Mahmud Rajabov — TechGuide home">
            <img
              src="/m-cat-emblem.svg"
              alt="Mahmud Rajabov — cat emblem logo"
              width="32"
              height="32"
              className="h-7 w-7 md:h-8 md:w-8 shrink-0"
            />
            <span className="font-heading text-lg md:text-xl leading-none tracking-tight group-hover:text-primary transition-colors">
              Mahmud Rajabov
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => {
              const active = l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={clsx(
                    "px-3 h-10 inline-flex items-center rounded-md text-sm transition-colors",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {l.label}
                  {l.label === "Bookmarks" && count > 0 && (
                    <span className="ml-1.5 rounded-full bg-primary/15 px-1.5 text-[0.65rem] font-mono text-primary">
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={submitSearch} className="hidden sm:flex items-center">
              <div className="flex items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 h-10 w-44 lg:w-56 focus-within:border-primary/60 transition-colors">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="search articles…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                  aria-label="Search articles"
                />
              </div>
            </form>

            <button
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="px-4 py-4 space-y-1">
            <form onSubmit={submitSearch} className="flex items-center gap-2 rounded-md border border-border px-2.5 h-11 mb-2">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="search articles…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                aria-label="Search articles"
              />
            </form>
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-md px-3 h-12 text-base text-muted-foreground hover:text-primary hover:bg-primary/5"
              >
                {l.label}
                {l.label === "Bookmarks" && count > 0 && (
                  <span className="inline-flex items-center gap-1 text-primary">
                    <Bookmark className="h-4 w-4 fill-primary" /> {count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
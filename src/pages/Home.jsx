import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Clock, Bookmark } from "lucide-react";
import { categories, featuredArticles, popularArticles, newestArticles } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import { useBookmarks } from "@/lib/bookmarks";

const tickerItems = [
  "New: The Anatomy of a Modern Frontend Stack",
  "Active learners: 12,480",
  "New: Deploy a React App to Netlify in 5 Steps",
  "Tracks: 7 · Articles: 14",
  "New: React Hooks — A Mental Model That Sticks",
];

export default function Home() {
  const featured = featuredArticles();
  const popular = popularArticles();
  const newest = newestArticles().slice(0, 5);
  const hero = featured[0];
  const rest = featured.slice(1);
  const { count } = useBookmarks();

  return (
    <div>
      {/* Pulse stream ticker */}
      <div className="border-b border-border bg-background/40 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-2">
          <span className="font-mono-label shrink-0 text-primary">pulse</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex gap-10 whitespace-nowrap animate-[ticker_30s_linear_infinite] font-mono text-xs text-muted-foreground">
              {[...tickerItems, ...tickerItems].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero — split screen */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: tech stack selector */}
          <div>
            <p className="font-mono-label text-primary mb-4">// the integrated cognitive environment</p>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              The syntax of <span className="italic text-primary text-glow">structure</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
              A system dashboard for frontend and AI mastery — articles on React, Git, Netlify, and the portfolio that gets you hired.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 h-12 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Browse the index <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/article/react-hooks-a-mental-model-that-sticks"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 h-12 text-sm hover:border-primary/50 hover:text-primary transition-colors"
              >
                Start with React hooks
              </Link>
            </div>

            {/* Stack selector list */}
            <div className="mt-10 border-t border-border pt-6">
              <p className="font-mono-label mb-3">tech stack</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/articles?category=${c.slug}`}
                    className="group inline-flex items-center gap-2 rounded-md border border-border px-3 h-10 text-sm hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-mono text-xs text-primary/70 group-hover:text-primary">{c.glyph}</span>
                    <span className="text-muted-foreground group-hover:text-foreground">{c.short}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: featured node — glass card */}
          <div className="relative">
            <div className="bracket-frame rounded-xl glass border border-border p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> featured node
                </span>
                <span className="font-mono text-[0.7rem] text-muted-foreground">{hero.readTime} min read</span>
              </div>
              <Link to={`/article/${hero.slug}`}>
                <h2 className="font-heading text-3xl sm:text-4xl leading-tight hover:text-primary transition-colors">
                  {hero.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{hero.excerpt}</p>
              </Link>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono text-xs text-muted-foreground">{hero.author} · {hero.date}</span>
                <Link
                  to={`/article/${hero.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:gap-2.5 transition-all"
                >
                  Read <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-primary/5 blur-3xl" />
          </div>
        </div>
      </section>

      <div className="circuit-line mx-auto max-w-7xl" />

      {/* Featured grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono-label text-primary mb-2">// curated</p>
            <h2 className="font-heading text-3xl sm:text-4xl">Featured articles</h2>
          </div>
          <Link to="/articles" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:gap-2.5 transition-all">
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      <div className="circuit-line mx-auto max-w-7xl" />

      {/* Popular + Newest */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-2xl">Popular now</h2>
            </div>
            <div className="space-y-1">
              {popular.map((a) => (
                <ArticleCard key={a.id} article={a} variant="compact" />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-2xl">Newest</h2>
            </div>
            <div className="space-y-1">
              {newest.map((a) => (
                <ArticleCard key={a.id} article={a} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="circuit-line mx-auto max-w-7xl" />

      {/* Bookmarks CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="bracket-frame rounded-xl border border-border bg-card/40 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-mono-label text-primary mb-2">// local-first</p>
            <h2 className="font-heading text-3xl">Your reading list lives here</h2>
            <p className="mt-3 text-muted-foreground max-w-lg">
              Bookmark any article with one tap — saved to your browser, no account. {count > 0 ? `You have ${count} saved.` : "Nothing saved yet."}
            </p>
          </div>
          <Link
            to="/bookmarks"
            className="inline-flex items-center gap-2 rounded-md border border-primary/50 px-5 h-12 text-sm text-primary hover:bg-primary/10 transition-colors shrink-0"
          >
            <Bookmark className="h-4 w-4" /> Open bookmarks
          </Link>
        </div>
      </section>
    </div>
  );
}
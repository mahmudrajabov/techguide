import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Bookmark, Clock, ArrowLeft, ArrowRight, ChevronRight, Terminal } from "lucide-react";
import { getArticleBySlug, getCategory, articles } from "@/data/articles";
import { useBookmarks } from "@/lib/bookmarks";
import CodeBlock from "@/components/CodeBlock";
import ArticleCard from "@/components/ArticleCard";
import clsx from "clsx";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function ArticleDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug);
  const { isBookmarked, toggle } = useBookmarks();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="font-mono-label text-primary mb-3">// 404</p>
        <h1 className="font-heading text-4xl mb-4">Article not found</h1>
        <Link to="/articles" className="text-primary hover:underline">Back to the catalog</Link>
      </div>
    );
  }

  const cat = getCategory(article.category);
  const marked = isBookmarked(article.id);
  const idx = articles.findIndex((a) => a.id === article.id);
  const prev = articles[idx - 1];
  const next = articles[idx + 1];
  const related = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 2);

  return (
    <div>
      {/* reading progress bar */}
      <div className="fixed top-16 left-0 right-0 z-30 h-0.5 bg-transparent">
        <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* breadcrumb */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8">
        <nav className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/articles" className="hover:text-primary">articles</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/articles?category=${article.category}`} className="hover:text-primary">{cat.short}</Link>
        </nav>
      </div>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        {/* header */}
        <header className="mb-10">
          <Link
            to={`/articles?category=${article.category}`}
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary/80 hover:text-primary mb-4"
          >
            <span className="grid h-6 w-6 place-items-center rounded border border-primary/30 bg-primary/5 text-[0.65rem]">{cat.glyph}</span>
            {cat.name}
          </Link>
          <h1 className="font-heading text-4xl sm:text-5xl leading-[1.05] tracking-tight">{article.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground border-t border-border pt-5">
            <span>{article.author}</span>
            <span>{formatDate(article.date)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {article.readTime} min</span>
            <span className="inline-flex items-center gap-1.5">{article.tags.map((t) => `#${t}`).join(" ")}</span>
          </div>
        </header>

        {/* content */}
        <div className="prose-content">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="font-heading text-2xl mt-10 mb-3 text-foreground">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-heading text-xl mt-7 mb-2 text-foreground">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-[1.0625rem] leading-[1.7] text-foreground/90 my-4">{children}</p>
              ),
              ul: ({ children }) => <ul className="my-4 space-y-2 pl-1">{children}</ul>,
              ol: ({ children }) => <ol className="my-4 space-y-2 pl-1 list-decimal list-inside marker:text-primary">{children}</ol>,
              li: ({ children }) => (
                <li className="text-[1.0625rem] leading-[1.7] text-foreground/90 flex gap-2">
                  <span className="text-primary mt-1.5">▹</span>
                  <span>{children}</span>
                </li>
              ),
              code: ({ inline, className, children }) =>
                inline ? (
                  <code className="rounded bg-secondary/70 border border-border px-1.5 py-0.5 font-mono text-[0.85em] text-primary">{children}</code>
                ) : (
                  <CodeBlock className={className}>{children}</CodeBlock>
                ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-primary pl-4 my-5 italic text-muted-foreground">{children}</blockquote>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-primary underline underline-offset-2 hover:no-underline">{children}</a>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* toolbox / bookmark CTA */}
        <div className="mt-12 bracket-frame rounded-lg border border-border bg-card/40 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono-label text-primary mb-1">knowledge toolbox</p>
            <p className="text-sm text-muted-foreground">
              {marked ? "Bookmarked — find it in your reading list." : "Save this to your local reading list."}
            </p>
          </div>
          <button
            onClick={() => toggle(article.id)}
            className={clsx(
              "inline-flex items-center gap-2 rounded-md px-4 h-11 text-sm transition-colors shrink-0",
              marked ? "bg-primary text-primary-foreground" : "border border-primary/50 text-primary hover:bg-primary/10"
            )}
          >
            <Bookmark className={clsx("h-4 w-4", marked && "fill-primary-foreground")} />
            {marked ? "Saved" : "Bookmark"}
          </button>
        </div>

        {/* prev / next */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link to={`/article/${prev.slug}`} className="group rounded-lg border border-border p-4 hover:border-primary/40 transition-colors">
              <span className="font-mono text-[0.7rem] text-muted-foreground inline-flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> previous</span>
              <p className="mt-1.5 text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{prev.title}</p>
            </Link>
          ) : <div />}
          {next && (
            <Link to={`/article/${next.slug}`} className="group rounded-lg border border-border p-4 hover:border-primary/40 transition-colors text-right">
              <span className="font-mono text-[0.7rem] text-muted-foreground inline-flex items-center gap-1 ml-auto">next <ArrowRight className="h-3 w-3" /></span>
              <p className="mt-1.5 text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{next.title}</p>
            </Link>
          )}
        </div>
      </article>

      {/* related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 border-t border-border mt-8">
          <p className="font-mono-label text-primary mb-2">// related</p>
          <h2 className="font-heading text-2xl mb-6">More in {cat.name}</h2>
          <div className="grid gap-5 sm:grid-cols-2 max-w-3xl">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
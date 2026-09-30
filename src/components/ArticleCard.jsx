import { Link } from "react-router-dom";
import { Bookmark, Clock, ArrowUpRight } from "lucide-react";
import { getCategory } from "@/data/articles";
import { useBookmarks } from "@/lib/bookmarks";
import clsx from "clsx";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function ArticleCard({ article, variant = "row" }) {
  const { isBookmarked, toggle } = useBookmarks();
  const cat = getCategory(article.category);
  const marked = isBookmarked(article.id);

  if (variant === "compact") {
    return (
      <Link
        to={`/article/${article.slug}`}
        className="group flex items-start gap-3 rounded-md p-3 hover:bg-primary/5 transition-colors"
      >
        <span className="mt-0.5 font-mono text-xs text-primary/70">{cat?.glyph}</span>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </p>
          <p className="mt-1 font-mono text-[0.7rem] text-muted-foreground">
            {article.readTime} min · {formatDate(article.date)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <article className="bracket-frame group relative rounded-lg border border-border bg-card/40 p-5 hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between gap-3 mb-3">
        <Link
          to={`/articles?category=${article.category}`}
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary/80 hover:text-primary"
        >
          <span className="grid h-6 w-6 place-items-center rounded border border-primary/30 bg-primary/5 text-[0.65rem]">
            {cat?.glyph}
          </span>
          {cat?.short}
        </Link>
        <button
          onClick={() => toggle(article.id)}
          aria-label={marked ? "Remove bookmark" : "Bookmark article"}
          aria-pressed={marked}
          className={clsx(
            "grid h-8 w-8 place-items-center rounded-md border transition-colors",
            marked
              ? "border-primary/50 bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"
          )}
        >
          <Bookmark className={clsx("h-4 w-4", marked && "fill-primary")} />
        </button>
      </div>

      <Link to={`/article/${article.slug}`} className="block">
        <h3 className="font-heading text-xl leading-snug group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
      </Link>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
        <span className="font-mono text-[0.7rem] text-muted-foreground">
          {article.author} · {formatDate(article.date)}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-muted-foreground">
          <Clock className="h-3 w-3" /> {article.readTime} min
        </span>
      </div>

      <Link
        to={`/article/${article.slug}`}
        className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Read ${article.title}`}
      >
        <ArrowUpRight className="h-4 w-4 text-primary" />
      </Link>
    </article>
  );
}
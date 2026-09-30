import { Link } from "react-router-dom";
import { Bookmark, ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { useBookmarks } from "@/lib/bookmarks";
import ArticleCard from "@/components/ArticleCard";

export default function Bookmarks() {
  const { ids } = useBookmarks();
  const saved = articles.filter((a) => ids.includes(a.id));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <p className="font-mono-label text-primary mb-2">// local-first</p>
      <h1 className="font-heading text-4xl sm:text-5xl mb-2">Your bookmarks</h1>
      <p className="text-muted-foreground mb-8">
        {saved.length > 0
          ? `${saved.length} article${saved.length !== 1 ? "s" : ""} saved on this device.`
          : "Nothing bookmarked yet — tap the bookmark icon on any article."}
      </p>

      {saved.length === 0 ? (
        <div className="bracket-frame rounded-xl border border-border bg-card/40 p-12 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-border text-muted-foreground mb-4">
            <Bookmark className="h-6 w-6" />
          </span>
          <p className="font-mono text-sm text-muted-foreground mb-6">your reading list is empty.</p>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 h-12 text-sm text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Browse articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
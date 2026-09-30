import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, X, ChevronRight, SlidersHorizontal } from "lucide-react";
import { articles, categories } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import clsx from "clsx";

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const activeCat = params.get("category") || "all";
  const qParam = params.get("q") || "";
  const [q, setQ] = useState(qParam);
  const [sort, setSort] = useState("newest");

  useEffect(() => setQ(qParam), [qParam]);

  const setCategory = (slug) => {
    const next = new URLSearchParams(params);
    if (slug === "all") next.delete("category");
    else next.set("category", slug);
    setParams(next, { replace: true });
  };

  const clearSearch = () => {
    setQ("");
    const next = new URLSearchParams(params);
    next.delete("q");
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = articles;
    if (activeCat !== "all") list = list.filter((a) => a.category === activeCat);
    const term = q.trim().toLowerCase();
    if (term) {
      list = list.filter((a) =>
        `${a.title} ${a.excerpt} ${a.tags.join(" ")} ${a.author}`.toLowerCase().includes(term)
      );
    }
    list = [...list];
    if (sort === "newest") list.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sort === "popular") list.sort((a, b) => Number(b.popular) - Number(a.popular));
    else list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [activeCat, q, sort]);

  const activeCategory = categories.find((c) => c.slug === activeCat);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <p className="font-mono-label text-primary mb-2">// the index</p>
      <h1 className="font-heading text-4xl sm:text-5xl mb-8">
        {activeCategory ? activeCategory.name : "Article catalog"}
      </h1>

      {/* Smart filter terminal */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 h-12 flex-1 focus-within:border-primary/60 transition-colors">
            <Search className="h-4 w-4 text-primary shrink-0" />
            <span className="font-mono text-primary text-sm shrink-0">$</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const next = new URLSearchParams(params);
                  if (q.trim()) next.set("q", q.trim());
                  else next.delete("q");
                  setParams(next, { replace: true });
                }
              }}
              placeholder="search — try “react hooks” or “netlify”…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
              aria-label="Search articles"
            />
            {q && (
              <button onClick={clearSearch} aria-label="Clear search" className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 h-12">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-sm outline-none cursor-pointer"
              aria-label="Sort articles"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="alpha">A–Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[16rem_1fr] gap-10">
        {/* Directory tree — categories */}
        <aside className="lg:sticky lg:top-20 h-max">
          <p className="font-mono-label mb-3">tracks</p>
          <ul className="space-y-0.5">
            <li>
              <button
                onClick={() => setCategory("all")}
                className={clsx(
                  "w-full flex items-center gap-2 rounded-md px-3 h-11 text-sm transition-colors text-left",
                  activeCat === "all" ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <ChevronRight className={clsx("h-3.5 w-3.5", activeCat === "all" && "rotate-90 text-primary")} />
                <span className="font-mono text-xs text-primary/60">{"*"}</span> All articles
                <span className="ml-auto font-mono text-[0.65rem] text-muted-foreground">{articles.length}</span>
              </button>
            </li>
            {categories.map((c) => {
              const active = activeCat === c.slug;
              const count = articles.filter((a) => a.category === c.slug).length;
              return (
                <li key={c.slug}>
                  <button
                    onClick={() => setCategory(c.slug)}
                    className={clsx(
                      "w-full flex items-center gap-2 rounded-md px-3 h-11 text-sm transition-colors text-left pl-6",
                      active ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    <ChevronRight className={clsx("h-3.5 w-3.5", active && "rotate-90 text-primary")} />
                    <span className="font-mono text-xs text-primary/60">{c.glyph}</span> {c.short}
                    <span className="ml-auto font-mono text-[0.65rem] text-muted-foreground">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* List-detail hybrid */}
        <div>
          <p className="font-mono text-xs text-muted-foreground mb-4">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {qParam && <> for “{qParam}”</>}
          </p>
          {filtered.length === 0 ? (
            <div className="bracket-frame rounded-lg border border-border bg-card/40 p-10 text-center">
              <p className="font-mono text-sm text-muted-foreground">no matches found.</p>
              <button onClick={clearSearch} className="mt-4 text-sm text-primary hover:underline">
                clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {filtered.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}

          <div className="mt-10 rounded-md border border-dashed border-border p-4 font-mono text-xs text-muted-foreground">
            <span className="text-primary">tip:</span> press <kbd className="rounded border border-border px-1.5 py-0.5 bg-background">/</kbd> to focus search — or just ask K0DE-K4T in the corner.
          </div>
        </div>
      </div>
    </div>
  );
}
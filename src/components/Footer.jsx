import { Link } from "react-router-dom";
import { categories } from "@/data/articles";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Mahmud Rajabov — home">
              <img
                src="/m-cat-emblem.svg"
                alt="Mahmud Rajabov — cat emblem logo"
                width="28"
                height="28"
                className="h-7 w-7 shrink-0"
              />
              <span className="font-heading text-xl tracking-tight">
                Mahmud Rajabov
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              The syntax of structure — an integrated cognitive environment for frontend and AI mastery.
            </p>
          </div>

          <div>
            <p className="font-mono-label mb-4">Navigate</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/articles" className="text-muted-foreground hover:text-primary transition-colors">All Articles</Link></li>
              <li><Link to="/bookmarks" className="text-muted-foreground hover:text-primary transition-colors">Bookmarks</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono-label mb-4">Tracks</p>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link to={`/articles?category=${c.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono-label mb-4">Tracks</p>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(4).map((c) => (
                <li key={c.slug}>
                  <Link to={`/articles?category=${c.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="circuit-line my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="font-mono">© {new Date().getFullYear()} TechGuide — a standalone demo.</p>
          <p className="font-mono">Built for Netlify · No login required</p>
        </div>
      </div>
    </footer>
  );
}
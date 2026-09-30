import { Link } from "react-router-dom";
import { Home as HomeIcon, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-28 text-center">
      <p className="font-mono-label text-primary mb-3">// err.not_found</p>
      <h1 className="font-heading text-7xl text-glow">404</h1>
      <div className="circuit-line w-16 mx-auto my-6" />
      <h2 className="font-heading text-2xl mb-3">This route doesn't compile</h2>
      <p className="text-muted-foreground mb-8 inline-flex items-center gap-2 justify-center">
        <Terminal className="h-4 w-4 text-primary" /> The page you requested is not part of TechGuide.
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 h-12 text-sm text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <HomeIcon className="h-4 w-4" /> Return home
        </Link>
      </div>
    </div>
  );
}
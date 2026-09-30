import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "techguide-bookmarks";

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("techguide-bookmarks-change"));
}

export function useBookmarks() {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    const sync = () => setIds(read());
    window.addEventListener("techguide-bookmarks-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("techguide-bookmarks-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isBookmarked = useCallback((id) => ids.includes(id), [ids]);

  const toggle = useCallback((id) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    write(next);
    setIds(next);
    return next.includes(id);
  }, []);

  return { ids, isBookmarked, toggle, count: ids.length };
}
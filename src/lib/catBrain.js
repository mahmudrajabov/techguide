import { articles, categories, getArticleBySlug, featuredArticles, popularArticles, newestArticles } from "@/data/articles";

// A small, deterministic "AI" that answers questions about TechGuide.
// It is grounded in the site's own article data. When it can't find a match,
// it admits it — never invents.

const SUGGESTIONS = [
  "What is TechGuide?",
  "Show me React articles",
  "How do I deploy to Netlify?",
  "Give me Git tips",
  "What are the latest articles?",
  "How do bookmarks work?",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function listArticles(list) {
  return list
    .map((a) => `• ${a.title} — /article/${a.slug}`)
    .join("\n");
}

function findArticlesByKeyword(query) {
  const q = query.toLowerCase();
  return articles.filter((a) => {
    const haystack = `${a.title} ${a.excerpt} ${a.tags.join(" ")} ${a.category}`.toLowerCase();
    return haystack.includes(q);
  });
}

function matchCategory(query) {
  const q = query.toLowerCase();
  return categories.find((c) => {
    const names = [c.name, c.short, c.slug].map((s) => s.toLowerCase());
    return names.some((n) => q.includes(n));
  });
}

export function generateResponse(rawInput) {
  const input = (rawInput || "").trim();
  if (!input) return "Ask me anything about TechGuide — articles, categories, or how the site works.";
  const q = input.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|yo|sup|good (morning|evening|afternoon))\b/.test(q)) {
    return pick([
      "Hello! I'm K0DE-K4T, your TechGuide assistant. Ask me about any article, category, or feature.",
      "Hey there! Want me to point you to an article on React, Git, or Netlify?",
    ]);
  }

  // What is TechGuide
  if (q.includes("what is techguide") || q.includes("about techguide") || q.includes("what's techguide")) {
    return `TechGuide is an integrated cognitive environment for learning modern web development. It covers ${categories.length} tracks: ${categories.map((c) => c.name).join(", ")}. Browse the full catalog at /articles, or ask me to recommend something specific.`;
  }

  // Bookmarks
  if (q.includes("bookmark")) {
    return "Bookmarks are saved in your browser's localStorage — no account needed. Open any article and tap the bookmark toggle in the toolbox, then revisit them anytime at /bookmarks. They persist across sessions on this device.";
  }

  // Dark mode / theme
  if (q.includes("dark mode") || q.includes("theme") || q.includes("light mode")) {
    return "TechGuide defaults to an obsidian dark theme. Use the sun/moon toggle in the navbar to switch to a light theme. Your choice is remembered in localStorage.";
  }

  // Latest / newest
  if (q.includes("latest") || q.includes("newest") || q.includes("new articles") || q.includes("recent")) {
    const list = newestArticles().slice(0, 4);
    return `Here are the newest lessons on TechGuide:\n${listArticles(list)}\n\nThe freshest is "${list[0].title}".`;
  }

  // Popular
  if (q.includes("popular") || q.includes("trending") || q.includes("best")) {
    const list = popularArticles();
    return `These are the most-read articles right now:\n${listArticles(list)}`;
  }

  // Featured
  if (q.includes("featured") || q.includes("hero") || q.includes("highlight")) {
    const list = featuredArticles();
    return `Featured nodes on the home page:\n${listArticles(list)}`;
  }

  // Categories list
  if (q.includes("categor") || q.includes("topics") || q.includes("tracks")) {
    return `TechGuide has ${categories.length} tracks:\n${categories.map((c) => `• ${c.name} — /articles?category=${c.slug}`).join("\n")}`;
  }

  // Search by category keyword
  const cat = matchCategory(q);
  if (cat) {
    const list = articles.filter((a) => a.category === cat.slug);
    if (list.length) {
      return `Here are the ${cat.name} articles:\n${listArticles(list)}`;
    }
  }

  // Deploy / netlify
  if (q.includes("deploy") || q.includes("netlify") || q.includes("host") || q.includes("publish")) {
    const a = getArticleBySlug("deploy-a-react-app-to-netlify-in-5-steps");
    return `To deploy to Netlify: build locally, push to GitHub, connect the repo, set build command "npm run build" and publish dir "dist", then deploy. The one gotcha for SPAs is routing — add a public/_redirects file with "/* /index.html 200". Full guide: /article/${a.slug}`;
  }

  // Git
  if (q.includes("git") || q.includes("branch") || q.includes("commit") || q.includes("merge")) {
    return `Git tip: your changes live in three places — working directory, staging, and the repo. "git status" and "git log --oneline --graph --all" answer almost every "where am I" question. For the full mental model, see /article/git-in-20-minutes-the-mental-model and /article/github-pull-requests-that-get-merged-fast.`;
  }

  // React
  if (q.includes("react") || q.includes("hook") || q.includes("jsx") || q.includes("component")) {
    const list = articles.filter((a) => a.category === "react");
    return `React on TechGuide:\n${listArticles(list)}\n\nThe key idea: a component is a function of its props, and every render is a fresh call. Start with the hooks mental model.`;
  }

  // HTML/CSS/JS
  if (q.includes("html") || q.includes("css") || q.includes("javascript") || q.includes("js") || q.includes("async")) {
    const list = articles.filter((a) => a.category === "html-css-js");
    return `HTML, CSS & JavaScript articles:\n${listArticles(list)}`;
  }

  // AI
  if (q.includes("ai") || q.includes("llm") || q.includes("machine learning") || q.includes("model")) {
    const a = getArticleBySlug("why-ai-development-is-reshaping-the-web");
    return `AI development on TechGuide: ${a.title} — ${a.excerpt} Read it at /article/${a.slug}. The core idea: treat the model as a typed runtime, ground it with retrieval, and design for streaming.`;
  }

  // Portfolio / CV
  if (q.includes("portfolio") || q.includes("cv") || q.includes("resume") || q.includes("career") || q.includes("job") || q.includes("hire")) {
    const list = articles.filter((a) => a.category === "portfolio");
    return `Portfolio & CV guidance:\n${listArticles(list)}\n\nThe throughline: make the site itself the portfolio — fast, accessible, responsive.`;
  }

  // Search / find keyword
  if (q.startsWith("find") || q.startsWith("search") || q.startsWith("show me")) {
    const term = q.replace(/^(find|search|show me)\s+(articles?\s+)?(about\s+)?/, "").trim();
    if (term) {
      const found = findArticlesByKeyword(term);
      if (found.length) return `Found ${found.length} article(s) for "${term}":\n${listArticles(found)}`;
    }
  }

  // Generic keyword fallback against titles/excerpts
  const words = q.split(/\s+/).filter((w) => w.length > 3);
  for (const w of words) {
    const found = findArticlesByKeyword(w);
    if (found.length) {
      return `That sounds related to:\n${listArticles(found.slice(0, 4))}`;
    }
  }

  // Unknown
  return pick([
    "I don't know that one yet — I only know about TechGuide's articles and features. Try asking me to show React articles, explain Netlify deployment, or list the categories.",
    "Hmm, I'm not sure about that. I can help with TechGuide's content: articles, categories, bookmarks, and the site itself. Want me to suggest a topic?",
    "I don't have an answer for that. I'm focused on TechGuide — ask me about a track like Git, React, or Portfolio & CV, or say \"latest articles\".",
  ]);
}

export const suggestedQuestions = SUGGESTIONS;
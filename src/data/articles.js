// TechGuide article dataset — standalone demo content. No backend.
// Each article is self-contained markdown rendered with react-markdown.

export const categories = [
  { slug: "frontend", name: "Frontend Development", short: "Frontend", glyph: "FE" },
  { slug: "ai", name: "AI Development", short: "AI", glyph: "AI" },
  { slug: "html-css-js", name: "HTML, CSS & JavaScript", short: "HTML/CSS/JS", glyph: "{}" },
  { slug: "react", name: "React", short: "React", glyph: "⚛" },
  { slug: "git", name: "GitHub & Git", short: "Git", glyph: "⎇" },
  { slug: "netlify", name: "Netlify Deployment", short: "Netlify", glyph: "▲" },
  { slug: "portfolio", name: "Portfolio & CV", short: "Portfolio", glyph: "✎" },
];

export const articles = [
  {
    id: "a01",
    slug: "anatomy-of-a-modern-frontend-stack",
    title: "The Anatomy of a Modern Frontend Stack",
    category: "frontend",
    excerpt:
      "A field guide to the layers that make up a 2026 frontend — from the build pipeline to the component contract — and why understanding the stack beats memorizing the tools.",
    author: "Mira Okafor",
    date: "2026-09-22",
    readTime: 9,
    tags: ["architecture", "tooling", "fundamentals"],
    featured: true,
    popular: true,
    content: `## The stack is a system, not a list

A modern frontend is not a pile of libraries. It is a *system*: a build pipeline that transforms intent into bytes, a rendering layer that turns state into pixels, and a contract layer that keeps teams sane as the codebase grows.

The layers, in order of how a request flows through them:

1. **Tooling** — Vite, esbuild, the bundler. It decides what ships.
2. **Framework** — React, Vue, Svelte. It decides how state becomes UI.
3. **Styling** — Tailwind, CSS Modules, a design token pipeline. It decides how UI looks and scales.
4. **Data** — fetch, TanStack Query, a server-state cache. It decides what the UI knows.
5. **Delivery** — Netlify, a CDN, edge functions. It decides how fast it arrives.

### The component contract

The single most important idea: a component is a *function of its props*. Everything else — effects, refs, context — is an escape hatch. When you treat components as pure mappings from input to output, your codebase becomes predictable, testable, and refactorable.

\`\`\`tsx
// A component is a function of its props.
function PriceTag({ price, currency = "USD" }) {
  return <span className="font-mono">{currency} {price.toFixed(2)}</span>;
}
\`\`\`

### Why the stack keeps changing

Tools change every year; the layers do not. Learn the layers, and every new framework becomes a variation on a theme you already know.`,
  },
  {
    id: "a02",
    slug: "why-ai-development-is-reshaping-the-web",
    title: "Why AI Development Is Reshaping the Web",
    category: "ai",
    excerpt:
      "Generative models are not a feature you bolt on. They are a new runtime primitive — and the interfaces that win treat them that way.",
    author: "Dev Patel",
    date: "2026-09-19",
    readTime: 11,
    tags: ["llm", "ux", "patterns"],
    featured: true,
    popular: false,
    content: `## From request/response to prompt/stream

For two decades the web was request/response: a user clicks, the server answers. AI introduces a third tempo — *streaming*. The interface renders progressively, token by token, and the user can interrupt at any moment.

This changes three things about how you build:

1. **State is now a conversation**, not a form. You keep history, not just fields.
2. **Loading is a spectrum.** Partial answers are useful answers.
3. **Errors are negotiable.** A wrong answer can be corrected by replying, not by reloading.

### The model is a runtime, not a database

Treat the model like a function: give it a typed input, expect a typed output, validate it. Do not treat it like a search box that magically knows your data — it doesn't. Ground it with retrieval, constrain it with a schema.

\`\`\`ts
// Constrain the model with a schema, then validate.
const result = await invokeLLM({
  prompt,
  response_json_schema: {
    type: "object",
    properties: { summary: { type: "string" }, tags: { type: "array", items: { type: "string" } } },
    required: ["summary", "tags"],
  },
});
\`\`\`

### What stays the same

Performance, accessibility, and clear copy still win. AI amplifies good fundamentals; it exposes bad ones faster.`,
  },
  {
    id: "a03",
    slug: "semantic-html-the-foundation-you-keep-skipping",
    title: "Semantic HTML: The Foundation You Keep Skipping",
    category: "html-css-js",
    excerpt:
      "Divs are easy. Semantics are free accessibility, better SEO, and code that reads itself. Here is the minimum that actually matters.",
    author: "Lena Cruz",
    date: "2026-09-15",
    readTime: 6,
    tags: ["html", "accessibility", "fundamentals"],
    featured: false,
    popular: true,
    content: `## The five tags that do real work

You do not need every element. You need the ones that carry meaning a screen reader and a search engine can use:

- \`<header>\`, \`<main>\`, \`<footer>\` — the page skeleton.
- \`<nav>\` — a group of navigation links.
- \`<article>\` — a self-contained piece of content.
- \`<section>\` — a thematic grouping with a heading.
- \`<button>\` vs \`<a>\` — action vs navigation. This one trips everyone.

### The button/link rule

If clicking it *changes state on the current page*, it is a \`<button>\`. If it *navigates somewhere*, it is an \`<a>\`. A \`<div onclick>\` is neither — it is invisible to keyboards and to assistive tech.

\`\`\`html
<!-- Wrong: a div pretending to be a button -->
<div onclick="save()">Save</div>

<!-- Right -->
<button type="button" onclick="save()">Save</button>
\`\`\`

### Headings are an outline, not a style

Use one \`<h1>\` per page, then descend in order. Don't skip levels to get a smaller font — that's what CSS is for. The heading tree is how non-sighted users navigate your document.`,
  },
  {
    id: "a04",
    slug: "css-grid-in-2026-layouts-that-finally-feel-right",
    title: "CSS Grid in 2026: Layouts That Finally Feel Right",
    category: "html-css-js",
    excerpt:
      "Grid is no longer the scary one. With subgrid and container queries, the layouts you used to fight are now a few declarative lines.",
    author: "Lena Cruz",
    date: "2026-09-10",
    readTime: 8,
    tags: ["css", "layout", "responsive"],
    featured: false,
    popular: true,
    content: `## Grid thinks in two dimensions

Flexbox is a line. Grid is a plane. The moment you need rows *and* columns that relate to each other, Grid is the right tool — and it is finally intuitive.

### The holy grail, in six lines

\`\`\`css
.layout {
  display: grid;
  grid-template:
    "header header" auto
    "sidebar main" 1fr
    "footer footer" auto
    / 16rem 1fr;
}
\`\`\`

Name your regions, assign children with \`grid-area: header\`, and you are done. No floats, no hacks, no \`calc(100vh - 60px)\`.

### Subgrid: the missing piece

For years a child couldn't align to its parent's columns. Subgrid fixes that — a card's children can now line up across a whole row of cards without magic numbers:

\`\`\`css
.cards { display: grid; grid-template-columns: repeat(3, 1fr); }
.card { display: grid; grid-template-rows: subgrid; grid-row: span 3; }
\`\`\`

### Container queries: responsive by component

Media queries asked "how wide is the viewport?" Container queries ask "how wide is *my container*?" — which is the question a reusable component actually needs answered.`,
  },
  {
    id: "a05",
    slug: "javascript-from-callbacks-to-async-await",
    title: "JavaScript: From Callbacks to Async/Await",
    category: "html-css-js",
    excerpt:
      "Async JavaScript has one mental model. Once you see it, callbacks, promises, and await all become the same idea wearing different clothes.",
    author: "Sam Wei",
    date: "2026-09-06",
    readTime: 7,
    tags: ["javascript", "async", "fundamentals"],
    featured: false,
    popular: false,
    content: `## A promise is a value in a box that opens later

That's the whole model. A callback is "call me when it opens." A promise is "the box itself, and you can chain on it." \`await\` is "pause until the box opens, then hand me the value."

\`\`\`js
// Three syntaxes, one idea
fetchUser(cb);                          // callback
fetchUser().then(u => render(u));       // promise
const u = await fetchUser(); render(u); // async/await
\`\`\`

### The two mistakes everyone makes

**1. Forgetting that async functions return a promise.** \`async function\` always returns a promise, even if you return a plain value. The caller still needs \`await\` or \`.then\`.

**2. Sequential when you meant parallel.** Two \`await\`s in a row run one after the other. If they're independent, fire them together:

\`\`\`js
// Slow: ~2s
const a = await getData("a");
const b = await getData("b");

// Fast: ~1s
const [a, b] = await Promise.all([getData("a"), getData("b")]);
\`\`\`

### Errors still need handling

\`await\` unwraps a rejected promise into a thrown error. Wrap the user-facing path in try/catch; let the rest bubble up so you actually see the bug.`,
  },
  {
    id: "a06",
    slug: "react-hooks-a-mental-model-that-sticks",
    title: "React Hooks: A Mental Model That Sticks",
    category: "react",
    excerpt:
      "Hooks confuse people because they look like magic. They're not — they're a timeline. Here is the one picture that makes useState, useEffect, and useRef click.",
    author: "Mira Okafor",
    date: "2026-09-03",
    readTime: 10,
    tags: ["react", "hooks", "state"],
    featured: true,
    popular: true,
    content: `## A component is a function that runs again and again

Every render is a fresh call. \`useState\` doesn't "store" a value between renders — it remembers a value *across* renders, and hands you the version that belongs to the render you're currently in.

That's why this looks broken:

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

It isn't broken. Each render gets its own \`count\`, frozen to that render's value. \`setCount\` asks for a *new* render with a new value.

### useEffect is a subscription, not a lifecycle

People read \`useEffect\` as "do X after mount." Read it instead as "keep this true: whenever these dependencies change, re-sync with the outside world."

\`\`\`jsx
useEffect(() => {
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id); // clean up the previous sync
}, []);
\`\`\`

### useRef is an escape hatch

When you need a value that *doesn't* trigger a render (a DOM node, a timer id, a mutable bag), \`useRef\` is the box that persists across renders without notifying React.

### The rule that prevents 90% of bugs

Never lie about your dependency array. If your effect uses a value, list it. Linters exist to catch this — read their warnings, don't silence them.`,
  },
  {
    id: "a07",
    slug: "component-composition-patterns-in-react",
    title: "Component Composition Patterns in React",
    category: "react",
    excerpt:
      "Inheritance is gone. Composition is everything. Four patterns — slots, render props, compound components, and context — cover almost every real UI.",
    author: "Sam Wei",
    date: "2026-08-28",
    readTime: 9,
    tags: ["react", "patterns", "composition"],
    featured: false,
    popular: false,
    content: `## Slots: let the parent decide the inside

When a component shouldn't know what its children are, use \`children\` — or named slots via props. The shell stays stable; the content is the caller's business.

\`\`\`jsx
function Card({ header, children }) {
  return (
    <section className="card">
      <header>{header}</header>
      <div>{children}</div>
    </section>
  );
}
<Card header={<h2>Sign in</h2>}>{form}</Card>
\`\`\`

### Compound components: a family that shares state

Tabs, accordions, menus — a set of parts that belong together and share hidden state. Expose them as static properties so the API reads like a sentence:

\`\`\`jsx
<Tabs>
  <Tabs.List>
    <Tabs.Tab id="a">A</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel id="a">Content</Tabs.Panel>
  </Tabs.Panels>
</Tabs>
\`\`\`

Context carries the shared state; each part just reads what it needs.

### When to reach for context

Context is for *rarely-changing, widely-read* state — theme, locale, current user. For high-frequency state, it re-renders every consumer. Reach for it deliberately, not by default.`,
  },
  {
    id: "a08",
    slug: "git-in-20-minutes-the-mental-model",
    title: "Git in 20 Minutes: The Mental Model",
    category: "git",
    excerpt:
      "Git stops being scary the moment you stop memorizing commands and start visualizing the three places your changes live.",
    author: "Dev Patel",
    date: "2026-08-24",
    readTime: 7,
    tags: ["git", "fundamentals", "workflow"],
    featured: false,
    popular: true,
    content: `## Three places, not one

Your changes live in one of three places at all times:

1. **Working directory** — the files on disk you're editing now.
2. **Staging area (index)** — the snapshot you've prepared for the next commit.
3. **The repository** — the committed history.

Every command is just a move between these.

\`\`\`bash
git add .        # working → staging
git commit -m "" # staging → repository
git checkout -- file # repository → working (discard edits)
\`\`\`

### Branches are labels, not copies

A branch is a movable pointer to a commit. Making a branch is cheap; switching is just moving your HEAD. Don't hoard branches — make them, merge them, delete them.

### The two commands that save you

\`\`\`bash
git status          # where am I, what's changed?
git log --oneline --graph --all # the map of everything
\`\`\`

If you're confused, run those two. They never make things worse.

### Undoing, without panic

- Last commit was wrong? \`git commit --amend\`.
- Committed something you shouldn't have? \`git reset HEAD~1\` (keeps the changes).
- Need to throw away uncommitted work? \`git restore .\``,
  },
  {
    id: "a09",
    slug: "github-pull-requests-that-get-merged-fast",
    title: "GitHub Pull Requests That Get Merged Fast",
    category: "git",
    excerpt:
      "A PR is a conversation, not a dump. Small, well-named, well-described requests get reviewed. Large ones rot.",
    author: "Mira Okafor",
    date: "2026-08-20",
    readTime: 6,
    tags: ["github", "workflow", "collaboration"],
    featured: false,
    popular: false,
    content: `## Size is the single biggest predictor

A 50-line PR gets reviewed today. A 500-line PR gets reviewed next week, badly. If your change is big, it's probably several changes — split them into a stack.

### The PR description is a contract

Tell the reviewer three things:

1. **What** — the change in one sentence.
2. **Why** — the problem it solves, with a link to the issue.
3. **How to test** — the exact steps to see it work.

\`\`\`markdown
## What
Add a loading skeleton to the article list.

## Why
The list flashes empty for ~400ms while fetching (issue #142).

## How to test
1. Open /articles on a slow connection
2. Expect a shimmer skeleton before cards render
\`\`\`

### Review for the reviewer

- Give the PR a title that reads as a complete sentence: "Add loading skeleton to article list."
- Self-review the diff before requesting review — catch your own typos first.
- Respond to every comment, even with "good point, fixed." Silence reads as ignoring.`,
  },
  {
    id: "a10",
    slug: "deploy-a-react-app-to-netlify-in-5-steps",
    title: "Deploy a React App to Netlify in 5 Steps",
    category: "netlify",
    excerpt:
      "From a local Vite project to a live HTTPS URL in under five minutes — no DevOps degree required.",
    author: "Sam Wei",
    date: "2026-08-16",
    readTime: 5,
    tags: ["netlify", "deployment", "react"],
    featured: true,
    popular: true,
    content: `## The five steps

1. **Build it locally first.** Make sure \`npm run build\` produces a \`dist/\` folder.
2. **Push to GitHub.** Netlify deploys from a repo, not your laptop.
3. **Connect the repo.** In Netlify: *Add new site → Import from Git*.
4. **Set the build config.** Build command: \`npm run build\`. Publish directory: \`dist\`.
5. **Deploy.** Every push to your main branch now ships automatically.

### SPA routing: the one gotcha

React Router uses client-side paths like \`/articles\`. Refresh that URL on Netlify and you'll get a 404 — unless you tell Netlify to serve \`index.html\` for everything. Add a \`public/_redirects\` file:

\`\`\`
/*    /index.html   200
\`\`\`

That single line is the difference between "it works" and "it works after refresh."

### Environment variables

Set them in the Netlify dashboard (*Site settings → Environment*), not in your repo. Anything secret in a committed \`.env\` is public the moment you push.`,
  },
  {
    id: "a11",
    slug: "continuous-deployment-on-netlify-branch-previews",
    title: "Continuous Deployment on Netlify: Branch Previews",
    category: "netlify",
    excerpt:
      "Every pull request gets its own URL. That changes how you review, how you test, and how you ship.",
    author: "Dev Patel",
    date: "2026-08-12",
    readTime: 6,
    tags: ["netlify", "ci", "workflow"],
    featured: false,
    popular: false,
    content: `## Deploy previews are the point

Open a PR and Netlify builds a unique, isolated URL with that exact change. You share the link; stakeholders click and see the real thing — no "it works on my machine," no local checkout.

### The branching rhythm

- \`main\` — production. Protected, always green.
- \`feature/*\` — your work. Each gets a preview deploy.
- PR merges \`feature\` into \`main\`, which triggers the production deploy.

\`\`\`bash
git checkout -b feature/dark-mode
# ...work, commit, push
git push -u origin feature/dark-mode
# open a PR → Netlify posts a preview URL on it
\`\`\`

### Sniff the environment

Netlify exposes \`$BRANCH\`, \`$COMMIT_REF\`, and \`$CONTEXT\` (deploy, deploy-preview, production). Use them to gate analytics, seed test data, or swap an API endpoint on previews only.`,
  },
  {
    id: "a12",
    slug: "build-a-portfolio-that-recruiters-actually-read",
    title: "Build a Portfolio That Recruiters Actually Read",
    category: "portfolio",
    excerpt:
      "Recruiters spend ~7 seconds on your portfolio. Here's how to make those seconds count — and what to cut without mercy.",
    author: "Lena Cruz",
    date: "2026-08-08",
    readTime: 8,
    tags: ["portfolio", "career", "design"],
    featured: false,
    popular: true,
    content: `## The 7-second test

A recruiter opens your site, scrolls once, and decides. In that scroll they want to answer three questions:

1. **What can you build?** (Show projects, not skills lists.)
2. **Can you communicate?** (Show writing, not buzzwords.)
3. **How do I reach you?** (An email and a link, above the fold.)

### Lead with one hero project

Pick the single project that best represents you. Give it a full case study: the problem, your role, the trade-offs, the result with numbers. Everything else is supporting cast.

\`\`\`markdown
## Case study: Shopper
- Problem: checkout abandoned at 38%
- Role: lead frontend
- Approach: rebuilt the flow as 3 steps, added inline validation
- Result: abandonment dropped to 22% in 6 weeks
\`\`\`

### Cut without mercy

- A "skills" wall of logos — replace with the tools inside each case study.
- Lorem ipsum and placeholder projects — recruiters can tell.
- A dark-mode-only site with no light mode and no focus styles — it signals you don't know accessibility.

### The one thing most people forget

Make the site itself the portfolio. A fast, accessible, responsive site *is* the evidence. A broken one is the disqualification.`,
  },
  {
    id: "a13",
    slug: "your-cv-in-2026-what-hiring-managers-scan-for",
    title: "Your CV in 2026: What Hiring Managers Scan For",
    category: "portfolio",
    excerpt:
      "Your CV is parsed by a machine, skimmed by a human, and judged in 20 seconds. Optimize for all three in that order.",
    author: "Mira Okafor",
    date: "2026-08-04",
    readTime: 7,
    tags: ["cv", "career", "writing"],
    featured: false,
    popular: false,
    content: `## Three readers, one document

1. **The parser** — an ATS extracts text. Use a single column, standard headings (Experience, Education, Skills), and real text (not images of text).
2. **The recruiter** — skims for keywords and titles. Put the role you want at the top, not the one you had.
3. **The hiring manager** — reads for impact. They want outcomes, not tasks.

### The bullet that works

Every bullet is: *verb + what + measurable outcome*.

\`\`\`
- Reduced initial load time by 40% by code-splitting routes and lazy-loading images
- Shipped 12 features in a 6-month contract; 0 rollbacks
- Mentored 3 juniors; 2 promoted within a year
\`\`\`

### What to drop

- "Proficient in Microsoft Word." Everyone is.
- A photo, age, or marital status — in most markets it's noise at best, bias at worst.
- Five pages. One page per decade of experience, capped at two.

### The line that gets you the interview

A two-line summary at the top: who you are, what you specialize in, what you're looking for. It's the only thing guaranteed to be read in full.`,
  },
  {
    id: "a14",
    slug: "from-tutorials-to-hired-a-learning-roadmap",
    title: "From Tutorials to Hired: A Learning Roadmap",
    category: "frontend",
    excerpt:
      "Tutorial hell is real, and the exit is the same for everyone: stop following and start building. A staged path from first tag to first offer.",
    author: "Sam Wei",
    date: "2026-07-30",
    readTime: 10,
    tags: ["learning", "career", "roadmap"],
    featured: false,
    popular: false,
    content: `## The four stages

**1. Foundations (weeks 1–4)** — HTML semantics, CSS layout (Flexbox + Grid), JavaScript variables, functions, arrays, async. One goal: build a static personal page that works on mobile.

**2. A framework (weeks 5–10)** — Pick React. Learn components, props, state, effects, routing. One goal: a small app that fetches and displays data from a public API.

**3. The full stack edge (weeks 11–16)** — Git, GitHub, deployment. One goal: ship the app to Netlify with a real URL you can send to people.

**4. Proof (weeks 17+)** — Build one substantial project you can talk about for 20 minutes. This is what gets you hired.

### The anti-pattern: collecting tutorials

Watching the 40th "React for beginners" video teaches you nothing the 39th didn't. The knowledge only crystallizes when you hit a bug *you* have to solve.

\`\`\`
watch tutorial → build → get stuck → search → fix → repeat
\`\`\`

### How to know you're ready

You can explain a project you built, out loud, for ten minutes — the problem, the architecture, the mistakes, the trade-offs. If you can do that, you're ready to interview. If you can't, you're not done building.`,
  },
];

export const getArticleBySlug = (slug) => articles.find((a) => a.slug === slug);
export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const featuredArticles = () => articles.filter((a) => a.featured);
export const popularArticles = () => articles.filter((a) => a.popular);
export const newestArticles = () =>
  [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
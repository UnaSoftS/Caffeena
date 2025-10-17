// app/search/page.tsx
// ^ The /search results page (App Router). It receives ?q= via searchParams.

// Import React (handy for JSX typing and utility).
import * as React from "react";

// Import the SearchBar we built above.
// If you don't use the "@/..." alias, change this path to "../../components/SearchBar".
import SearchBar from "@/components/SearchBar";

// A small TypeScript type for our demo item shape.
type Item = {
  id: number;           // ^ Unique id per result.
  title: string;        // ^ Result title.
  description: string;  // ^ Short summary/snippet.
  tags: string[];       // ^ Keywords to match against.
  url?: string;         // ^ Optional detail link.
};

// Demo data so the page works instantly. Replace with DB/API later.
const ITEMS: Item[] = [
  { id: 1, title: "Brand Identity Design", description: "Practical tips to build a strong brand.", tags: ["branding", "design"] },
  { id: 2, title: "Next.js Hooks", description: "useState/useEffect/useMemo in real projects.", tags: ["nextjs", "react", "hooks"] },
  { id: 3, title: "Master Tailwind CSS", description: "Best practices for responsive UIs.", tags: ["tailwind", "css"] },
  { id: 4, title: "Skin Retouching Workflow", description: "Keep natural texture while polishing.", tags: ["retouch", "photoshop"] },
  { id: 5, title: "AI for IoT Security", description: "Anomaly detection with federated learning.", tags: ["federated", "iot", "security"] },
  { id: 6, title: "UI/UX Guide", description: "Designing usable digital experiences.", tags: ["ux", "ui", "product"] },
];
// ^ Six mock items to demonstrate filtering and highlighting.

// A tiny search function: matches query inside title/description/tags.
function searchItems(query: string, items: Item[]): Item[] {
  // ^ Accepts the query and all items; returns only matches.
  if (!query) return [];                        // ^ Empty query => show nothing.
  const q = query.toLowerCase();                // ^ Case-insensitive matching.
  return items.filter((it) => {
    // ^ Keep only items whose concatenated text includes the query.
    const haystack = (it.title + " " + it.description + " " + it.tags.join(" ")).toLowerCase();
    return haystack.includes(q);                // ^ Simple substring match.
  });
}

// Simple highlighter: wraps matched parts with <mark>.
function highlight(text: string, query: string) {
  // ^ Used to visually emphasize the matched string.
  if (!query) return text;                      // ^ No query => return as is.
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // ^ Escape regex meta chars inside the user query.
  const re = new RegExp(`(${safe})`, "ig");
  // ^ Global + case-insensitive match of the query.
  return text.split(re).map((part, i) =>
    re.test(part) ? <mark key={i} className="bg-yellow-200 rounded px-1">{part}</mark> : part
  );
  // ^ Split by matches and wrap the matched parts in <mark>.
}

// Optional metadata for SEO and browser tab title.
export const metadata = {
  title: "Search Results",
  description: "Search results page",
};

// Type for App Router page props (searchParams comes from Next automatically).
type PageProps = {
  searchParams: { q?: string }; // ^ The /search?q=... parameter.
};

// Server Component page by default.
export default function SearchPage({ searchParams }: PageProps) {
  // ^ The framework injects searchParams on the server.

  const query = (searchParams.q ?? "").trim();  // ^ Read q and trim whitespace.
  const results = searchItems(query, ITEMS);    // ^ Run the filter over our data.

  return (
    // Main layout container with spacing.
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* Page title */}
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
        Search Results
      </h1>

      {/* The search bar appears on the results page too (pre-filled). */}
      <SearchBar defaultValue={query} />

      {/* Spacer */}
      <div className="h-6" />

      {/* Small info line: what we searched and how many matches. */}
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
        {query ? (
          <>
            Found <strong>{results.length}</strong> result{results.length === 1 ? "" : "s"} for{" "}
            <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">{query}</code>
          </>
        ) : (
          <>Type a keyword and press Enter.</>
        )}
      </p>

      {/* Results list */}
      <ul className="space-y-4">
        {results.map((item) => (
          // Each result shown as a simple card.
          <li key={item.id} className="
              rounded-xl border border-slate-200/70 dark:border-slate-700/60
              bg-white dark:bg-slate-900 p-4 shadow-sm
            ">
            {/* Title with highlighted match */}
            <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100">
              {highlight(item.title, query)}
            </h2>

            {/* Description */}
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              {highlight(item.description, query)}
            </p>

            {/* Tags */}
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="text-xs rounded-full px-2 py-0.5 bg-slate-100 dark:bg-slate-800">
                  #{highlight(t, query)}
                </span>
              ))}
            </div>

            {/* Optional “details” link if a URL is provided. */}
            {item.url && (
              <a
                href={item.url}                           // ^ Navigate to details.
                className="mt-3 inline-block text-sm text-sky-600 hover:underline"
              >
                Open details
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Empty state when there is a query but nothing matched. */}
      {query && results.length === 0 && (
        <div className="mt-8 text-slate-500 dark:text-slate-400">
          No results. Try a shorter term or a synonym.
        </div>
      )}
    </main>
  );
}

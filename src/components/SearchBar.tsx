// components/SearchBar.tsx
// ^ File path: a reusable SearchBar component you can drop anywhere.

// We use React for JSX types and utilities.
import * as React from "react";

// Public props so a page can preset the value from the URL (?q=...).
export type SearchBarProps = {
  defaultValue?: string; // ^ Initial value inside the input (e.g., current query).
  className?: string;    // ^ Optional extra class names from parent.
};

// Server Component by default (no "use client"); the <form> will do a GET submit.
export default function SearchBar({ defaultValue = "", className }: SearchBarProps) {
  // ^ Functional component; defaultValue falls back to an empty string.

  return (
    
    // Wrapper that centers the bar and constrains its width.
    <div className={["w-full max-w-xs mx-auto", className].filter(Boolean).join(" ")}>
      {/* ^ Merge external className if provided */}

      {/* HTML form: GET submit to /search so the query shows as ?q=... */}
      <form
        role="search"                 // ^ Accessibility role for assistive tech.
        method="GET"                  // ^ Use GET so the query appears in the URL.
        action="/search"              // ^ Send the user to the results page.
        className="
          group relative rounded-2xl
          bg-gradient-to-b from-slate-50 to-slate-100
          dark:from-slate-800 dark:to-slate-900
          ring-1 ring-slate-200/70 dark:ring-slate-700/60
          shadow-[inset_0_1px_0_rgba(255,255,255,0.60),0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.06)]
          px-5 py-3 transition focus-within:ring-amber-300 focus-within:shadow-[0_0_0_3px_rgba(251,191,36,0.40)]
        "
      >
        {/* ^ Neumorphic look: soft gradient + rounded corners + inner/outer shadows. */}

        {/* Hidden label keeps screen readers happy. */}
        <label htmlFor="q" className="sr-only">
          Search
        </label>

        {/* The actual input field. */}
        <input
          id="q"                          // ^ Ties the label to this field.
          type="search"                   // ^ Browser search behaviors (Esc to clear, etc.).
          name="q"                        // ^ The key used in the URL (?q=...).
          defaultValue={defaultValue}     // ^ Pre-fill from current query if any.
          placeholder="Search..."         // ^ Matches your screenshot text.
          autoComplete="off"              // ^ No browser suggestions.
          className="
            w-full bg-transparent
            text-slate-700 dark:text-slate-200
            placeholder-slate-400/90
            outline-none pe-10
          "
        />
        {/* ^ Full width, transparent bg, space on the right for the icon. */}

        {/* Submit button (magnifier icon) positioned at the right edge. */}
        <button
          type="submit"                   // ^ Triggers GET submit to /search.
          aria-label="Execute search"     // ^ Accessible name for the icon button.
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            p-2 rounded-full
            hover:scale-105 active:scale-95 transition
          "
        >
          {/* Simple inline SVG icon; takes current text color. */}
          <svg
            xmlns="http://www.w3.org/2000/svg" // ^ SVG namespace.
            viewBox="0 0 24 24"                // ^ Logical drawing box.
            fill="none"                         // ^ No interior fill.
            stroke="currentColor"               // ^ Use CSS text color for the stroke.
            strokeWidth="1.6"                   // ^ Line thickness.
            className="h-5 w-5 text-slate-500/80">   
            <circle cx="11" cy="11" r="7" />    {/* ^ Lens circle */}
            <path d="M20 20 L16.65 16.65" />     {/* ^ Handle line */}
          </svg>
        </button>
      </form>
    </div>
  );
}

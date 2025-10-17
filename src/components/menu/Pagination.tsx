// components/Pagination.tsx
// -----------------------------------------------------------------------------
// Fully accessible, server-component friendly pagination for Next.js (App Router)
//
// ✅ Preserves existing search params (filters, sorts, etc.)
// ✅ Renders First/Prev/numbered/Next/Last with smart ellipses
// ✅ Works without client JS (pure <Link> navigation)
// ✅ TailwindCSS styling
// -----------------------------------------------------------------------------
// NOTE: Designed to run as a Server Component and uses only <Link> navigation,
// so it works even if JavaScript is disabled on the client.
// -----------------------------------------------------------------------------

import React from "react";
import Link from "next/link";

/* ============================================================================
   Types
   Strongly-typed props for clarity and better DX.
============================================================================ */

export type SearchParams = Record<string, string | string[] | undefined>;

export type PaginationLabels = {
  first: string;
  prev: string;
  next: string;
  last: string;
  pageAria: (n: number) => string;
  summaryText: (page: number, total: number) => string;
};

export type PaginationProps = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  searchParams?: SearchParams;
  pageParamName?: string;
  className?: string;
  maxLength?: number;
  siblingCount?: number;
  omitPageParamOnFirstPage?: boolean;
  labels?: Partial<PaginationLabels>;
};

/* ============================================================================
   Constants & Utility Functions
============================================================================ */

const ELLIPSIS = "…" as const;
type PageItem = number | typeof ELLIPSIS;

const DEFAULT_MAX_LENGTH = 9;
const DEFAULT_SIBLING_COUNT = 1;

const defaultLabels: PaginationLabels = {
  first: "« First",
  prev: "‹ Prev",
  next: "Next ›",
  last: "Last »",
  pageAria: (n) => `Go to page ${n}`,
  summaryText: (p, t) => `Page ${p} of ${t}`,
};

/**
 * Clamps a number between [min, max].
 */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

/**
 * Converts Next.js searchParams (object) into a URLSearchParams instance.
 * Safely handles arrays and undefined values.
 */
function toURLSearchParams(obj: SearchParams | undefined) {
  const params = new URLSearchParams();
  if (!obj) return params;

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) params.append(key, v);
    } else {
      params.set(key, value);
    }
  }
  return params;
}

/**
 * Builds a compact array of page numbers with ellipses.
 * Example: [1, "…", 7, 8, 9, "…", 20]
 */
export function buildPages(
  current: number,
  total: number,
  maxLength: number = DEFAULT_MAX_LENGTH,
  siblingCount: number = DEFAULT_SIBLING_COUNT
): PageItem[] {
  if (total <= maxLength) return Array.from({ length: total }, (_, i) => i + 1);

  const result: PageItem[] = [];
  const left = Math.max(2, current - siblingCount);
  const right = Math.min(total - 1, current + siblingCount);

  result.push(1);
  if (left > 2) result.push(ELLIPSIS);

  for (let p = left; p <= right; p++) result.push(p);

  if (right < total - 1) result.push(ELLIPSIS);
  result.push(total);

  // Expand if the result is shorter than the maxLength
  while (result.length < maxLength) {
    // Extend left
    const idxAfterFirst = 1;
    const firstAfter = result[idxAfterFirst];
    const firstNum =
      typeof firstAfter === "number"
        ? firstAfter
        : typeof result[idxAfterFirst + 1] === "number"
        ? (result[idxAfterFirst + 1] as number)
        : 2;

    if (firstNum > 2) {
      const candidate = firstNum - 1;
      if (result[idxAfterFirst] === ELLIPSIS) {
        result.splice(idxAfterFirst, 1, candidate);
      } else {
        result.splice(idxAfterFirst, 0, candidate);
      }
      continue;
    }

    // Extend right
    const idxBeforeLast = result.length - 2;
    const lastBefore = result[idxBeforeLast];
    const lastNum =
      typeof lastBefore === "number"
        ? lastBefore
        : typeof result[idxBeforeLast - 1] === "number"
        ? (result[idxBeforeLast - 1] as number)
        : total - 1;

    if (lastNum < total - 1) {
      const candidate = lastNum + 1;
      if (result[idxBeforeLast] === ELLIPSIS) {
        result.splice(idxBeforeLast, 1, candidate);
      } else {
        result.splice(idxBeforeLast + 1, 0, candidate);
      }
      continue;
    }

    break;
  }

  return result;
}

/* ============================================================================
   Component
============================================================================ */

export default function Pagination({
  totalItems,
  pageSize,
  currentPage,
  searchParams,
  pageParamName = "page",
  className = "",
  maxLength = DEFAULT_MAX_LENGTH,
  siblingCount = DEFAULT_SIBLING_COUNT,
  omitPageParamOnFirstPage = false,
  labels: customLabels,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = clamp(currentPage, 1, totalPages);
  const labels = { ...defaultLabels, ...customLabels };

  /**
   * Generates an href string preserving current search params.
   * Optionally omits ?page=1 for cleaner URLs.
   */
  const createHref = (p: number) => {
    const params = toURLSearchParams(searchParams);
    if (omitPageParamOnFirstPage && p === 1) {
      params.delete(pageParamName);
    } else {
      params.set(pageParamName, String(p));
    }
    const qs = params.toString();
    return qs ? `?${qs}` : "?";
  };

  const pages = buildPages(page, totalPages, maxLength, siblingCount);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-between gap-3 ${className}`}
    >
      {/* Screen-reader friendly live summary */}
      <div className="text-sm text-muted-foreground" aria-live="polite">
        {labels.summaryText(page, totalPages)}
      </div>

      {/* Pagination Controls */}
      <ul className="flex items-center gap-1">
        {/* First */}
        <li>
          {canPrev ? (
            <Link
              href={createHref(1)}
              className="inline-flex h-9 items-center rounded-md border px-3 text-sm hover:bg-accent"
              aria-label={labels.first}
            >
              {labels.first}
            </Link>
          ) : (
            <span
              role="link"
              aria-disabled="true"
              className="inline-flex h-9 items-center rounded-md border px-3 text-sm opacity-50 select-none"
            >
              {labels.first}
            </span>
          )}
        </li>

        {/* Previous */}
        <li>
          {canPrev ? (
            <Link
              href={createHref(page - 1)}
              rel="prev"
              className="inline-flex h-9 items-center rounded-md border px-3 text-sm hover:bg-accent"
              aria-label={labels.prev}
            >
              {labels.prev}
            </Link>
          ) : (
            <span
              role="link"
              aria-disabled="true"
              className="inline-flex h-9 items-center rounded-md border px-3 text-sm opacity-50 select-none"
            >
              {labels.prev}
            </span>
          )}
        </li>

        {/* Numbered Pages */}
        {pages.map((p, i) => (
          <li key={`${p}-${i}`}>
            {p === ELLIPSIS ? (
              <span className="inline-flex h-9 items-center px-2 text-sm select-none">
                {ELLIPSIS}
              </span>
            ) : p === page ? (
              <span
                aria-current="page"
                className="inline-flex h-9 items-center rounded-md border px-3 text-sm font-semibold bg-primary/10 border-primary"
              >
                {p}
              </span>
            ) : (
              <Link
                href={createHref(p)}
                className="inline-flex h-9 items-center rounded-md border px-3 text-sm hover:bg-accent"
                aria-label={labels.pageAria(p)}
              >
                {p}
              </Link>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          {canNext ? (
            <Link
              href={createHref(page + 1)}
              rel="next"
              className="inline-flex h-9 items-center rounded-md border px-3 text-sm hover:bg-accent"
              aria-label={labels.next}
            >
              {labels.next}
            </Link>
          ) : (
            <span
              role="link"
              aria-disabled="true"
              className="inline-flex h-9 items-center rounded-md border px-3 text-sm opacity-50 select-none"
            >
              {labels.next}
            </span>
          )}
        </li>

        {/* Last */}
        <li>
          {canNext ? (
            <Link
              href={createHref(totalPages)}
              className="inline-flex h-9 items-center rounded-md border px-3 text-sm hover:bg-accent"
              aria-label={labels.last}
            >
              {labels.last}
            </Link>
          ) : (
            <span
              role="link"
              aria-disabled="true"
              className="inline-flex h-9 items-center rounded-md border px-3 text-sm opacity-50 select-none"
            >
              {labels.last}
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

/* ============================================================================
   Example Usage (App Router)
=============================================================================

// app/products/page.tsx
import Pagination, { type SearchParams } from "@/components/Pagination";

const PAGE_SIZE = 12;

export default async function ProductsPage({
  searchParams,
}: { searchParams: SearchParams }) {
  const page = Number(searchParams?.page ?? 1) || 1;
  const offset = (page - 1) * PAGE_SIZE;

  const res = await fetch(
    `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${offset}`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Products</h1>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.products.map((p: any) => (
          <li key={p.id} className="rounded-lg border p-3">
            <div className="text-sm font-medium line-clamp-1">{p.title}</div>
            <div className="text-xs text-muted-foreground">${p.price}</div>
          </li>
        ))}
      </ul>

      <Pagination
        totalItems={data.total}
        pageSize={PAGE_SIZE}
        currentPage={page}
        searchParams={searchParams}
        omitPageParamOnFirstPage
        labels={{
          summaryText: (p, t) => `Page ${p} of ${t}`,
          pageAria: (n) => `Go to page ${n}`,
        }}
      />
    </div>
  );
}

============================================================================ */

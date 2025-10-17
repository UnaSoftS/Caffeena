// lib/clover.ts
const ENV = process.env.CLOVER_ENV ?? "sandbox";
const REGION = process.env.CLOVER_REGION ?? "na";
const MID = process.env.CLOVER_MERCHANT_ID!;
const TOKEN = process.env.CLOVER_ACCESS_TOKEN!;

function cloverHost() {
  if (ENV === "sandbox") return "apisandbox.dev.clover.com";
  if (REGION === "eu") return "api.eu.clover.com";
  if (REGION === "la") return "api.la.clover.com";
  return "api.clover.com"; // na
}

function epochSeconds(d: Date) {
  return Math.floor(d.getTime() / 1000);
}

type PaymentsQuery = {
  start?: Date; // inclusive (createdTime >=)
  end?: Date;   // inclusive (createdTime <=)
  limit?: number;
  expand?: string[];
};

export async function fetchPayments(q: PaymentsQuery = {}) {
  const host = cloverHost();
  const url = new URL(`/v3/merchants/${MID}/payments`, `https://${host}`);

  // Clover يسمح بتكرار filter لعدة شروط، وفيه حد 90 يوم للمجال الزمني لكل طلب
  // مثال رسمي: filter=createdTime>=[unix]&filter=createdTime<=[unix]
  if (q.start) url.searchParams.append("filter", `createdTime>=${epochSeconds(q.start)}`);
  if (q.end)   url.searchParams.append("filter", `createdTime<=${epochSeconds(q.end)}`);

  // توسعات مفيدة: tender، order، و lineItems بعمق نقطي
  const expand = q.expand?.length
    ? q.expand.join(",")
    : "tender,order,order.lineItems";
  url.searchParams.set("expand", expand);

  url.searchParams.set("limit", String(q.limit ?? 50));
  url.searchParams.set("orderBy", "createdTime DESC");

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/json",
    },
    // لا نكاش حتى تظهر أحدث المدفوعات
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Clover ${res.status}: ${txt}`);
  }
  return res.json();
}

// مساعدات تجميع
export function sumCents(arr: number[] = []) {
  return arr.reduce((a, b) => a + (b || 0), 0);
}
export function formatMoney(cents: number, currency = process.env.CLOVER_CURRENCY ?? "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format((cents || 0) / 100);
}

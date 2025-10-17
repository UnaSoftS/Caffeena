// app/(dashboard)/payments/page.tsx
// نسخة شكلية فقط (Skeleton) — لا تجلب بيانات ولا تحتاج ENV

export const revalidate = 0;
export const dynamic = "force-dynamic";
export default function CloverPaymentsDashboardSkeleton() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Clover — Payments Dashboard</h1>
      {/* Cards (Skeleton) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </section>
      {/* Recent payments table (Skeleton) */}
      <section className="bg-white/50 rounded-2xl p-4 shadow-sm border">
       <h2 className="text-lg font-medium mb-3">Recent Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left border-b">
              <tr>
                <th className="py-2 pr-3">Time</th>
                <th className="py-2 pr-3">Amount</th>
                <th className="py-2 pr-3">Tip</th>
                <th className="py-2 pr-3">Result</th>
                <th className="py-2 pr-3">Tender</th>
                <th className="py-2 pr-3">Order</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="border-b">
                  <TdSkeleton />
                  <TdSkeleton wide />
                  <TdSkeleton />
                  <td className="py-2 pr-3">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs">
                      <span className="h-4 w-20 rounded-full bg-gray-200 animate-pulse inline-block" />
                    </span>
                  </td>
                  <TdSkeleton />
                  <TdSkeleton />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
function CardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white/60 p-4 shadow-sm">
      <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-2" />
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}

function TdSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <td className="py-2 pr-3">
      <span
        className={`block bg-gray-200 rounded animate-pulse ${
          wide ? "h-4 w-24" : "h-4 w-16"
        }`}
      />
    </td>
  );
}

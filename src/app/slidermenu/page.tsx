// app/coffee/page.tsx
import CoffeeShowcase from "@/components/slidercoffee/CoffeeShowcase";
import coffeeData from "@/lib/coffeeData";

export const metadata = {
  title: "Coffee Flavours",
  description: "Split-scrolling coffee showcase.",
};

export default function Page() {
  return (
    <main className="min-h-[100svh] bg-white">
      {/* شريط علوي بسيط (اختياري) */}
      <header className="absolute left-0 top-0 z-50 w-full px-6 py-4 flex items-center justify-between">
        <div className="font-semibold tracking-wide">coffee flavours</div>
        <nav className="hidden md:flex gap-4 text-zinc-600">
          <a href="#" className="hover:text-black">fb</a>
          <a href="#" className="hover:text-black">ig</a>
          <a href="#" className="hover:text-black">yt</a>
        </nav>
      </header>

      <CoffeeShowcase data={coffeeData} />
    </main>
  );
}

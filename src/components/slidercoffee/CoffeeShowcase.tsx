// components/CoffeeShowcase.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import DotNav from "@/components/slidercoffee/DotNav";
import ScrollButton from "../menu/ScrollButton";
import type { Coffee } from "@/lib/coffeeData";

function useViewportHeight() {
  const [vh, setVh] = useState(0);
  useEffect(() => {
    const set = () => setVh(window.innerHeight || 0);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
  return vh;
}

export default function CoffeeShowcase({ data }: { data: Coffee[] }) {
  const N = Math.max(1, data.length);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const vh = useViewportHeight();

  // الطول القابل للتمرير = (عدد الشرائح - 1) * ارتفاع الشاشة
  const travel = Math.max(0, (N - 1) * vh);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // تحريك اللوحة اليسرى للأسفل واليمين للأعلى بنفس السرعة
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, travel]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  // تحديد الشريحة الحالية لأغراض التنقل/النقاط
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setIndex(Math.round(v * (N - 1)));
    });
    return () => unsub();
  }, [N, scrollYProgress]);

  // قفز إلى شريحة معينة
  const jumpTo = (i: number) => {
    const rootTop = containerRef.current?.getBoundingClientRect().top ?? 0;
    const pageScroll = window.scrollY || window.pageYOffset;
    const containerTop = pageScroll + rootTop;
    window.scrollTo({
      top: containerTop + i * vh,
      behavior: "smooth",
    });
  };

  // تحكم بالأسهم ↑/↓
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        jumpTo(Math.min(N - 1, index + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        jumpTo(Math.max(0, index - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, N]);

  // نقاط التوقيت لكل شريحة لاستخدامها في التلاشي المتقاطع
  const stops = useMemo(
    () => (N === 1 ? [0] : Array.from({ length: N }, (_, i) => i / (N - 1))),
    [N]
  );

  return (
    <section ref={containerRef} className="relative">
      {/* عنصر sticky يغطي الشاشة أثناء التمرير */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] grid grid-cols-1 md:grid-cols-2"
        style={{
          background:
            data[0]?.bgRight ??
            "linear-gradient(90deg,#eef0f2 0%,#f6efe8 100%)",
        }}
      >
        {/* اللوحة اليسرى (صورة القهوة) */}
        <motion.div
          style={{ y: yLeft }}
          className="relative overflow-hidden bg-[#cfd4d8]"
        >
          {/* طبّق لون مخصّص لو وجد */}
          <div
            className="absolute inset-0"
            style={{ background: data[index]?.bgLeft ?? "#cfd4d8" }}
          />
          {/* صور الشرائح مكدّسة مع تلاشي متقاطع */}
          {data.map((c, i) => {
            const start = (stops[i] ?? 0) - 0.12;
            const mid = stops[i] ?? 0;
            const end = (stops[i] ?? 0) + 0.12;
            const opacity = useTransform(
              scrollYProgress,
              [start, mid, end],
              [0, 1, 0]
            );
            const scale = useTransform(
              scrollYProgress,
              [start, mid, end],
              [0.98, 1, 0.98]
            );
            return (
              <motion.div
                key={c.id}
                className="absolute inset-0 grid place-items-center"
                style={{ opacity, scale }}
                aria-hidden={index !== i}
              >
                <div className="relative w-[70%] max-w-[520px] aspect-square">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(min-width: 1024px) 35vw, 70vw"
                    priority={i === 0}
                    className="object-contain drop-shadow"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* اللوحة اليمنى (النص/الزر) */}
        <motion.div
          style={{ y: yRight }}
          className="relative flex items-center justify-center bg-[#f4ece3]"
        >
          <div
            className="absolute inset-0"
            style={{ background: data[index]?.bgRight ?? "#f4ece3" }}
          />
          {data.map((c, i) => {
            const start = (stops[i] ?? 0) - 0.12;
            const mid = stops[i] ?? 0;
            const end = (stops[i] ?? 0) + 0.12;
            const opacity = useTransform(
              scrollYProgress,
              [start, mid, end],
              [0, 1, 0]
            );
            const y = useTransform(
              scrollYProgress,
              [start, mid, end],
              [20, 0, -20]
            );
            return (
              <motion.article
                key={c.id}
                className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
                style={{ opacity, y }}
                aria-hidden={index !== i}
              >
                <div className="max-w-xl">
                  {/* عداد الشريحة */}
                  <div className="mb-6 text-sm tracking-widest text-zinc-600">
                    {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                  </div>
                  {/* العنوان */}
                  <h1 className="font-serif text-5xl md:text-6xl font-bold text-zinc-900">
                    {c.name}
                  </h1>

                  {/* الوصف */}
                  <p className="mt-6 text-zinc-700 leading-relaxed">
                    {c.description}
                  </p>

                  {/* زر الطلب */}
                  <button
                    className="mt-10 inline-flex items-center rounded-md border border-amber-900/20 bg-amber-700/90 px-6 py-3 text-sm font-semibold text-white shadow hover:translate-y-[-2px] hover:shadow-lg transition"
                    onClick={() => alert(`Ordering: ${c.name}`)}
                  >
                    ORDER NOW
                  </button>
                </div>
              </motion.article>
            );
          })}

          {/* نقاط على الحد الفاصل (يمين) */}
          <DotNav
            count={N}
            active={index}
            onJump={(i) => jumpTo(i)}
          />
        </motion.div>
      </div>

      {/* مسافة التمرير (تحدد طول الحركة) */}
      <div style={{ height: `${Math.max(0, (N - 1) * 100)}vh` }} />

      {/* زر التمرير (أسفل يمين) */}
      <ScrollButton
        isLast={index === N - 1}
        onClick={() => jumpTo(index === N - 1 ? 0 : index + 1)}
      />
    </section>
  );
}

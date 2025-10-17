// components/PageHeader.tsx
import React from "react";

interface PageHeaderProps {
  title: string;        // اسم الصفحة
  subtitle?: string;    // نص صغير فوق العنوان (اختياري)
  background?: string;  // رابط الصورة الخلفية
}
export default function FeaturesHeader({ title, subtitle, background }: PageHeaderProps) {
  return (
    <div
      className="w-full h-[280px] flex flex-col items-center justify-center text-white relative"
      style={{
        backgroundImage: `url(${background || "/images/header-bg.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay غامق عشان يوضح النص */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative text-center z-10">
      
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
          {subtitle && (
          <p className="uppercase tracking-[3px] text-sm font-medium mb-2">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

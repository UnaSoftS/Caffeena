"use client";

import { useId } from "react";
/* هذا الكود يقوم بعمل تمويج لاي محتوى انت تريده */


type TornEdgeProps = {
  /** مكان التموج */
  position?: "top" | "bottom";
  /** نوع التعبئة: لون صلب أو تدرّج خطي/دائري */
  variant?: "solid" | "linear" | "radial";
  /** لون الحافة (إن لم يُحدَّد، يستخدم currentColor من className) */
  color?: string;
  /** ارتفاع التموج (سكيل عمودي)؛ 1 = الإفتراضي */
  intensity?: number;
  /** فئات Tailwind إضافية للتحكم في الحجم مثل h-12, h-16 */
  className?: string;
};

/**
 * تموج/حافة ممزّقة قابلة لإعادة الاستخدام لأي Section.
 * - ضع المكوّن داخل القسم، والقسم يجب أن يكون position: relative.
 * - يتمدّد على العرض بالكامل، ويمكن تغيير اللون من الأب عبر text-*. 
 * - لو تريده أعلى القسم: position="top". أسفله: position="bottom" (الافتراضي).
 */
export default function TornEdge({
  position = "bottom",
  variant = "radial",
  color,
  intensity = 1,
  className = "h-16",
}: TornEdgeProps) {
  const id = useId().replace(/[:]/g, "");
  const radialId = `edgeRadial_${id}`;
  const linearId = `edgeLinear_${id}`;

  const posClass = position === "top" ? "top-0 rotate-180" : "bottom-0";
  const svgClass = `pointer-events-none absolute left-0 w-full ${posClass} ${className}`;

  const fill =
    variant === "solid"
      ? "currentColor"
      : variant === "radial"
      ? `url(#${radialId})`
      : `url(#${linearId})`;

  return (
    <svg
      viewBox="0 0 1440 64"
      className={svgClass}
      preserveAspectRatio="none"
      aria-hidden
      style={{ color, transform: `scaleY(${intensity})` }}
    >
      <defs>
        {/* تدرّج دائري يغطي جميع الجوانب */}
        <radialGradient id={radialId} cx="50%" cy="50%" r="90%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="70%" stopColor="currentColor" stopOpacity="0.92" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.82" />
        </radialGradient>
        {/* تدرّج رأسي ناعم من أعلى لأسفل */}
        <linearGradient id={linearId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.96" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.82" />
        </linearGradient>
      </defs>

      <path
        d="M0 24c80 24 160-24 240 0s160 24 240 0 160-24 240 0 160 24 240 0 160-24 240 0 160 24 240 0v40H0z"
        fill={fill}
      />
    </svg>
  );
}

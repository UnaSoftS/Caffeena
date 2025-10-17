"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import  {useRouter} from "next/navigation";

/**
 * Login / Register screen with polished spacing, accessibility, and motion.
 * - Responsive sizing: login is slightly wider than register for visual balance.
 * - Clear vertical rhythm and consistent input/button sizes.
 * - Accessible labels, focus states, and descriptive titles.
 * - Reduced-motion friendly.
 * - Social buttons are wired for future Auth.js integration.
 */

const bg = "/images/beanscoffee.jpg"; // swap to your asset path


type Provider = "google" | "facebook" | "x";

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const prefersReducedMotion = useReducedMotion();

  const toggleTo = (next: Mode) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMode(next);
  };

  const handleSocial = (provider: Provider) => (e: React.MouseEvent) => {
    e.preventDefault();
    // For Auth.js later:
    // const { signIn } = await import("next-auth/react");
    // signIn(provider, { callbackUrl: "/" });
    console.log(`Social ${mode}:`, provider);
  };

  // Size tokens — compact register for a tighter visual footprint
  const isRegister = mode === "register";
  const cardWidth = isRegister
    ? "w-[min(92vw,520px)] md:w-[min(88vw,560px)]"
    : "w-[min(92vw,560px)] md:w-[min(90vw,600px)]";
  const headPad = isRegister ? "px-7 md:px-8 pt-7" : "px-8 md:px-10 pt-8";
  const bodyPadX = isRegister ? "px-7 md:px-8" : "px-8 md:px-10";
  const dividerMX = isRegister ? "mx-7 md:mx-8 my-4" : "mx-8 md:mx-10 my-5";
  const inputSize = isRegister ? "px-3.5 h-11 text-[14px]" : "px-4 h-12 text-[15px]";
  const submitSize = isRegister ? "px-4 py-2 text-[15px]" : "px-5 py-2.5 text-base";
  const socialGap = isRegister ? "gap-3 md:gap-4" : "gap-4 md:gap-5";
  const socialBtnSize = isRegister ? "size-[44px] md:size-[48px]" : "size-[48px] md:size-[52px]";
  const tailPad = isRegister ? "pb-6" : "pb-7";

  return (
    <main className="relative min-h-[100svh] grid place-items-center px-4 py-10">
      {/* Background layer */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src={bg}
          alt="Coffee beans background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Frame */}
      <section className="relative w-full max-w-[1200px] overflow-visible">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-y-8">
          {/* Heading column */}
          <header className="flex items-center justify-center md:justify-start">
            <h1 className="text-white/95 drop-shadow-md ps-4 md:ps-16">
              <span className="block text-6xl md:text-7xl font-extrabold tracking-wide">
                {mode === "login" ? "Login" : "Register"}
              </span>
            </h1>
          </header>

          {/* Card column */}
          <div className="flex items-start justify-center p-4 md:p-6">
            <motion.div
              layout
              whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                layout: prefersReducedMotion ? { duration: 0 } : { duration: 0.25 },
              }}
              className={`relative ${cardWidth} rounded-3xl border border-white/25 bg-white/15 backdrop-blur-xl text-white shadow-2xl max-h-[85svh] overflow-y-auto`}
            >
              {/* Card head */}
              <div className={`flex items-center justify-between ${headPad}`}>
                <h2 className="text-2xl md:text-3xl font-semibold">
                  {mode === "login" ? "Log In" : "Create Account"}
                </h2>

                {mode === "login" ? (
                  <Link
                    href="#"
                    onClick={toggleTo("register")}
                    className="text-sm text-white/90 hover:text-white underline underline-offset-4"
                  >
                    Register
                  </Link>
                ) : (
                  <Link
                    href="#"
                    onClick={toggleTo("login")}
                    className="text-sm text-white/90 hover:text-white underline underline-offset-4"
                  >
                    Back to Login
                  </Link>
                )}
              </div>

              <div className={`${dividerMX} h-px bg-white/25`} />

              {/* Forms (animated switch) */}
              <div className={`${bodyPadX} pb-6`}>
                <AnimatePresence mode="wait" initial={false}>
                  {mode === "login" ? (
                    <motion.form
                      key="login"
                      initial={prefersReducedMotion ? false : { y: 16, opacity: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { y: -16, opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                      className="pt-1 space-y-6"
                      autoComplete="on"
                    >
                      <FormField id="email" label="Email">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="admin@bincastlecoffeehouse.comcom"
                          autoComplete="email"
                          required
                          className={`block w-full rounded-lg bg-white/85 text-gray-900 placeholder:text-gray-500 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${inputSize}`}
                        />
                      </FormField>

                      <FormField id="password" label="Password">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          autoComplete="current-password"
                          required
                          className={`block w-full rounded-lg bg-white/85 text-gray-900 placeholder:text-gray-500 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${inputSize}`}
                        />
                      </FormField>

                      <div className="flex items-center justify-between pt-1">
                        <Link
                          href="#"
                          className="text-sm text-white/90 hover:text-white underline underline-offset-4"
                        >
                          Forgot Password?
                        </Link>
                        <button
                          type="submit"
                          className={`rounded-md bg-white text-gray-900 font-semibold hover:bg-white/90 active:scale-[.99] transition ${submitSize}`}
                        >
                          Log In
                        </button>
                      </div>

                      {/* Divider */}
                      <Divider label="OR" />

                      {/* Social login */}
                      <SocialRow
                        mode="login"
                        gapClass={socialGap}
                        btnSizeClass={socialBtnSize}
                        onGoogle={handleSocial("google")}
                        onFacebook={handleSocial("facebook")}
                        onX={handleSocial("x")}
                      />

                      {/* Tail text */}
                      <p className={`${tailPad} text-sm text-white/90`}>
                        Don’t have an account?{" "}
                        <a
                          href="#"
                          onClick={toggleTo("register")}
                          className="underline underline-offset-4 hover:text-white"
                        >
                          Sign up
                        </a>
                      </p>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="register"
                      initial={prefersReducedMotion ? false : { y: 16, opacity: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { y: -16, opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                      className="pt-1 space-y-6"
                      autoComplete="on"
                    >
                      {/* Social sign-up */}
                      <SocialRow
                        mode="register"
                        gapClass={socialGap}
                        btnSizeClass={socialBtnSize}
                        onGoogle={handleSocial("google")}
                        onFacebook={handleSocial("facebook")}
                        onX={handleSocial("x")}
                      />

                      {/* Divider */}
                      <Divider label="OR" topMargin="mt-5" />

                      {/* Fields */}
                      <FormField id="name" label="Full Name">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          autoComplete="name"
                          required
                          className={`block w-full rounded-lg bg-white/85 text-gray-900 placeholder:text-gray-500 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${inputSize}`}
                        />
                      </FormField>

                      <FormField id="reg-email" label="Email">
                        <input
                          id="reg-email"
                          name="email"
                          type="email"
                          placeholder="admin@bincastlecoffeehouse.com"
                          autoComplete="email"
                          required
                          className={`block w-full rounded-lg bg-white/85 text-gray-900 placeholder:text-gray-500 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${inputSize}`}
                        />
                      </FormField>

                      <FormField id="reg-password" label="Password">
                        <input
                          id="reg-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          required
                          className={`block w-full rounded-lg bg-white/85 text-gray-900 placeholder:text-gray-500 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${inputSize}`}
                        />
                      </FormField>

                      <FormField id="confirm-password" label="Confirm Password">
                        <input
                          id="confirm-password"
                          name="confirmPassword"
                          type="password"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          required
                          className={`block w-full rounded-lg bg-white/85 text-gray-900 placeholder:text-gray-500 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${inputSize}`}
                        />
                      </FormField>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          required
                          className="rounded border-white/40 bg-white/80 text-gray-900 focus:ring-white/70"
                        />
                        <label htmlFor="terms" className="text-sm text-white/90">
                          I agree to the Terms & Privacy Policy
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={toggleTo("login")}
                          className="text-sm text-white/90 hover:text-white underline underline-offset-4"
                        >
                          Back to Login
                        </button>
                        <button
                          type="submit"
                          className={`rounded-md bg-white text-gray-900 font-semibold hover:bg-white/90 active:scale-[.99] transition ${submitSize}`}
                        >
                          Create Account
                        </button>
                      </div>

                      <p className={`${tailPad} text-sm text-white/90`}>
                        Already have an account?{" "}
                        <a
                          href="#"
                          onClick={toggleTo("login")}
                          className="underline underline-offset-4 hover:text-white"
                        >
                          Log in
                        </a>
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Utility components **/
function FormField({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-white/90">
        {label}
      </label>
      {children}
    </div>
  );
}

function Divider({ label, topMargin = "mt-6" }: { label: string; topMargin?: string }) {
  return (
    <div className={`${topMargin} flex items-center gap-4`}>
      <div className="h-px w-full bg-white/30" />
      <span className="text-white/90 text-sm">{label}</span>
      <div className="h-px w-full bg-white/30" />
    </div>
  );
}

function SocialRow({
  mode,
  gapClass,
  btnSizeClass,
  onGoogle,
  onFacebook,
  onX,
}: {
  mode: "login" | "register";
  gapClass: string;
  btnSizeClass: string;
  onGoogle?: (e: React.MouseEvent) => void;
  onFacebook?: (e: React.MouseEvent) => void;
  onX?: (e: React.MouseEvent) => void;
}) {
  return (
    <div className={`flex items-center ${gapClass}`}>
      <SocialButton
        label={`${mode === "login" ? "Continue" : "Sign up"} with Google`}
        onClick={onGoogle}
        sizeClass={btnSizeClass}
      >
        {/* Simple monogram. Replace with your SVG if needed. */}
        <span className="text-xl font-bold" aria-hidden>
          G
        </span>
      </SocialButton>

      <SocialButton
        label={`${mode === "login" ? "Continue" : "Sign up"} with Facebook`}
        ariaLabel="Facebook"
        onClick={onFacebook}
        sizeClass={btnSizeClass}
      >
        {/* Facebook glyph */}
        <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current" aria-hidden>
          <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.86c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.22.2 2.22.2v2.44h-1.25c-1.23 0-1.62.77-1.62 1.56v1.88h2.76l-.44 2.9h-2.32v7.03C18.34 21.21 22 17.06 22 12.06z" />
        </svg>
      </SocialButton>

      <SocialButton
        label={`${mode === "login" ? "Continue" : "Sign up"} with X (Twitter)`}
        ariaLabel="X"
        onClick={onX}
        sizeClass={btnSizeClass}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current" aria-hidden>
          <path d="M18.244 2H21l-6.55 7.48L22 22h-6.8l-4.73-6.18L4.9 22H2l7.1-8.11L2 2h6.89l4.33 5.73L18.244 2zM8.24 3.7H5.72l9.2 12.25h2.62L8.24 3.7z" />
        </svg>
      </SocialButton>
    </div>
  );
}

function SocialButton({
  children,
  label,
  ariaLabel,
  onClick,
  sizeClass,
}: {
  children: React.ReactNode;
  label: string;
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent) => void;
  sizeClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      title={label}
      className={`inline-flex items-center justify-center rounded-xl bg-white/90 text-gray-900 hover:bg-white transition border border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${sizeClass}`}
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}

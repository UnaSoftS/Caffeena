'use client';
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import styles from "./header.module.css";
import { IoPersonSharp } from "react-icons/io5";
import Image from "next/image";

const navItems = ["Home", "Locations" ,"Partnership", "Contact Us", "Menu","App","Admin"];


export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative text-[#3a2a05]">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="absolute inset-0 w-full z-40 top-0 left-0 bg-transparent shadow-none"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={150}
            priority
          />

          {/* ===== Mobile Backdrop (click to close) ===== */}
          {toggle && (
            <button
              className={styles.backdrop + " md:hidden"}
              aria-label="Close menu"
              onClick={() => setToggle(false)}
            />
          )}

          {/* ===== Navigation (Desktop + Mobile Panel) ===== */}
          <nav
            id="main-nav"
            className={`${styles.navLinksWrapper} ${toggle ? styles.open : ""}`}
            aria-hidden={!toggle && typeof window !== "undefined" && window.innerWidth < 768}
          >
            {/* Header inside mobile panel with Close button */}
            <div className={styles.panelHeader + " md:hidden"}>
              <span className="font-semibold">Menu</span>
              <button
                className={styles.closeBtn}
                aria-label="Close"
                onClick={() => setToggle(false)}
              >
                <IoMdClose />
              </button>
            </div>

            <ul className={`${styles.navLinks} flex flex-col md:flex-row md:space-x-8`}>
              {navItems.map((item) => (
                <li key={item} className="hover:text-blue-600 transition duration-300 text-lg md:text-base font-medium">
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, '')}`}
                    onClick={() => setToggle(false)}
                    className={styles.navLink}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Links */}
            <ul className={`${styles.mobileAuthLinks} mt-6 md:hidden flex flex-col space-y-4`}>
              <li>
                <Link
                  href="/login"
                  className="links_sing text-base font-semibold hover:text-blue-600 flex items-center gap-2"
                  onClick={() => setToggle(false)}
                >
                  Logins <IoPersonSharp className="text-[#533d07]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="links_sing text-base font-semibold hover:text-blue-600"
                  onClick={() => setToggle(false)}
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>

          {/* ===== Desktop Auth Links ===== */}
          <ul className="hidden md:flex space-x-6 font-semibold">
            <li>
              <Link href="/login" className="hover:text-blue-600 flex items-center">
                <IoPersonSharp className="text-[#433004]" />
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-blue-600">Login</Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-blue-600">Register</Link>
            </li>
          </ul>

          {/* ===== Burger (Mobile) ===== */}
          <div className="md:hidden text-2xl cursor-pointer">
            {toggle ? (
              <IoMdClose onClick={() => setToggle(false)} aria-label="Close menu" />
            ) : (
              <AiOutlineMenu onClick={() => setToggle(true)} aria-label="Open menu" />
            )}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

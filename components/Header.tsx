// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { createClient } from "@/utils/superbase/client";
import { User } from "@supabase/supabase-js";
// import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/club", label: "Club" },
    { href: "/join-us", label: "Join Us" },
    { href: "/writers", label: "Writers" },
    { href: "/about-us", label: "About Us" },
  ];

  const links = user
    ? [...baseLinks, { href: "/profile", label: "Profile" }]
    : [...baseLinks, { href: "/login-signup", label: "Sign in" }];

  return (
    <header className="container mx-auto py-4 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-[#a87c9f]">
          Book<span className="text-[#8d6e63]">Space</span>
        </h1>

        <nav className="hidden md:flex space-x-6">
          {!loading &&
            links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[#8d6e63] hover:text-[#a87c9f] transition-colors"
              >
                {label}
              </Link>
            ))}
          {/* {loading && <span className="text-[#8d6e63]">Loading...</span>} */}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[#8d6e63]"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col mt-4 space-y-3 md:hidden">
          {!loading &&
            links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[#8d6e63] hover:text-[#a87c9f] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          {loading && <span className="text-[#8d6e63]">Loading...</span>}
        </nav>
      )}
    </header>
  );
}

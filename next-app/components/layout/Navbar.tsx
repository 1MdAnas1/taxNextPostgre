"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleLogout = () => {
    logout();
    console.log("User logged out");
    // router.replace("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/team", label: "Team" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="navbar">
      <div className="container">
        <Link href="/" className="logo">
          <div className="logo-icon">MTS</div>
          <div className="logo-text">
            <span className="brand">MyTaxSite</span>
            <span className="tagline">Accounting Solutions</span>
          </div>
        </Link>

        <nav className="nav-links">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? "active" : ""}
            >
              {label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className={pathname === "/admin" ? "active" : ""}
            >
              Admin Dashboard
            </Link>
          )}
        </nav>

        <div className="nav-actions">
          {!user ? (
            // <Link href="/login">
            <Link href="/">
              {/* <button className="btn-login">Login</button> */}
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="cursor-pointer text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
            // </Link>
          )}

          <Link href="/contact">
            <button className="btn-premium hidden sm:inline-flex">
              Get a Quote
            </button>
          </Link>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      {/* mobile menu */}
      {mobileOpen && (
        <div className="mobile-nav open">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={pathname === href ? "active" : ""}
            >
              {label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className={pathname === "/admin" ? "active" : ""}
            >
              Dashboard
            </Link>
          )}
          {!user ? (
            <Link href="" onClick={() => setMobileOpen(false)}>
              {/* <button className="btn-login w-full">Login</button> */}
            </Link>
          ) : (
            // <button onClick={() => { logout(); setMobileOpen(false); }} className="text-left text-red-600 font-medium py-2">
            //   Logout
            // </button>
            <button
              onClick={handleLogout}
              className="cursor-pointer text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}

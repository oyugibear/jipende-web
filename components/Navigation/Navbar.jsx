"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FiArrowRight, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi"
import { useAuth } from "@/context/AuthContext"
import { roles } from "@/data/platformData"

const links = [
  { label: "Services", href: "/services" },
  { label: "Therapists", href: "/therapists" },
  { label: "Resources", href: "/resources" },
  { label: "Platform", href: "/#platform" },
  { label: "Contact", href: "/#contact" },
]

const portalLinks = [
  { label: "Client", href: "/client" },
  { label: "Therapist", href: "/therapist" },
  { label: "Admin", href: "/admin" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const roleHome = roles.find((role) => role.key === user?.role)?.home || "/client"

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E1D5] bg-[#FAFAF8]/92 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Africa Jipende Wellness home">
          <Image src="/assets/logo1.png" alt="Africa Jipende Wellness logo" width={56} height={56} className="h-12 w-auto" priority />
          <div className="hidden sm:block">
            <p className="text-sm font-black leading-tight text-[#0F1115]">Africa Jipende</p>
            <p className="text-xs font-semibold text-[#6D675E]">Wellness platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-black text-[#4B4740] transition hover:bg-[#FFF8D7] hover:text-[#0F1115]"
            >
              {link.label}
            </Link>
          ))}
          <div className="mx-2 h-6 w-px bg-[#E8E1D5]" />
          {portalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-black text-[#4B4740] transition hover:bg-white hover:text-[#0F1115]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {isAuthenticated ? (
            <>
              <Link
                href={roleHome}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E8E1D5] bg-white px-4 text-sm font-black text-[#0F1115] hover:bg-[#F4F5F7]"
              >
                <FiUser aria-hidden="true" />
                {user?.first_name || user?.firstName || "Account"}
              </Link>
              <button
                onClick={logout}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E8E1D5] bg-white px-4 text-sm font-black text-[#0F1115] hover:bg-[#F4F5F7]"
              >
                <FiLogOut aria-hidden="true" />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex min-h-11 items-center rounded-full border border-[#E8E1D5] bg-white px-4 text-sm font-black text-[#0F1115] hover:bg-[#F4F5F7]"
            >
              Login
            </Link>
          )}
          <Link
            href="/forms"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0F1115] px-5 text-sm font-black text-white shadow-[0_12px_26px_rgba(15,17,21,0.14)] transition hover:-translate-y-0.5 hover:bg-[#1A1D23]"
          >
            Book session
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E1D5] bg-white text-[#0F1115] lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#E8E1D5] bg-white px-4 py-4 shadow-2xl shadow-neutral-950/10 lg:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {[...links, ...portalLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-black text-[#4B4740] hover:bg-[#FFF8D7] hover:text-[#0F1115]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid gap-2 border-t border-[#E8E1D5] pt-4">
            <Link
              href="/forms"
              onClick={closeMenu}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F1115] px-5 text-sm font-black text-white"
            >
              Book session
              <FiArrowRight aria-hidden="true" />
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout()
                  closeMenu()
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#E8E1D5] bg-white px-5 text-sm font-black text-[#0F1115]"
              >
                <FiLogOut aria-hidden="true" />
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                onClick={closeMenu}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E8E1D5] bg-white px-5 text-sm font-black text-[#0F1115]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}

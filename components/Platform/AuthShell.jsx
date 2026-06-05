"use client"

import Image from "next/image"
import Link from "next/link"
import { FaApple, FaMicrosoft } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { FiCheckCircle, FiLock, FiShield } from "react-icons/fi"

const socialProviders = [
  { label: "Google", icon: FcGoogle },
  { label: "Microsoft", icon: FaMicrosoft },
  { label: "Apple", icon: FaApple },
]

export function SocialSignInButtons({ onProviderClick, mode = "sign in" }) {
  return (
    <div className="grid gap-3">
      {socialProviders.map((provider) => {
        const Icon = provider.icon
        return (
          <button
            key={provider.label}
            type="button"
            onClick={() => onProviderClick?.(provider.label)}
            className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg border border-[#E8E1D5] bg-white px-4 text-sm font-black text-[#0F1115] transition duration-200 hover:-translate-y-0.5 hover:border-[#F4C542] hover:bg-[#FFF8D7]"
          >
            <Icon aria-hidden="true" />
            Continue with {provider.label}
          </button>
        )
      })}
      <p className="text-center text-xs leading-5 text-neutral-500">
        Social {mode} requires provider credentials and callback URLs to be enabled on the API.
      </p>
    </div>
  )
}

export default function AuthShell({ eyebrow, title, description, children, footer }) {
  const benefits = [
    "Protected client, therapist, and admin portals",
    "Session links, locations, invoices, and care files in one place",
    "Secure conversations with role-based access",
  ]

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-8 text-[#0F1115] sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="ajw-fade-up rounded-lg border border-[#E8E1D5] bg-white p-6 shadow-[0_14px_36px_rgba(15,17,21,0.05)] md:p-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/assets/logo1.png" alt="Africa Jipende Wellness logo" width={56} height={56} className="h-12 w-auto" />
            <div>
              <p className="text-sm font-black">Africa Jipende Wellness</p>
              <p className="text-xs font-semibold text-[#6D675E]">Therapy platform</p>
            </div>
          </Link>

          <p className="mt-10 text-xs font-black uppercase tracking-[0.18em] text-[#8A6710]">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#5C5850]">{description}</p>

          <div className="mt-8 grid gap-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-lg bg-[#FFF8D7] p-4">
                <FiCheckCircle className="mt-1 shrink-0 text-[#8A6710]" aria-hidden="true" />
                <p className="text-sm font-semibold leading-6 text-[#4B4740]">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 rounded-lg border border-[#E8E1D5] bg-[#F4F5F7] p-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <FiShield className="mt-1 shrink-0 text-[#0F1115]" aria-hidden="true" />
              <p className="text-sm leading-6 text-[#5C5850]">Client records are role-scoped and protected by token authentication.</p>
            </div>
            <div className="flex items-start gap-3">
              <FiLock className="mt-1 shrink-0 text-[#0F1115]" aria-hidden="true" />
              <p className="text-sm leading-6 text-[#5C5850]">Messaging is for care coordination, not emergency support.</p>
            </div>
          </div>
        </section>

        <section className="ajw-fade-up rounded-lg border border-[#E8E1D5] bg-white p-5 shadow-[0_14px_36px_rgba(15,17,21,0.05)] md:p-8">
          {children}
          {footer ? <div className="mt-6">{footer}</div> : null}
        </section>
      </div>
    </main>
  )
}

import Image from "next/image"
import Link from "next/link"
import { BsTwitterX } from "react-icons/bs"
import { FiMail, FiMapPin, FiPhone, FiShield } from "react-icons/fi"
import { PiFacebookLogo, PiInstagramLogo, PiTiktokLogo, PiYoutubeLogo } from "react-icons/pi"
import { brand } from "@/data/platformData"

const footerGroups = [
  {
    title: "Care",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Intake", href: "/forms" },
      { label: "Resources", href: "/Blogs" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Client portal", href: "/client" },
      { label: "Therapist portal", href: "/therapist" },
      { label: "Admin dashboard", href: "/admin" },
      { label: "Login", href: "/auth/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms and privacy", href: "/terms" },
      { label: "About", href: "/about" },
      { label: "Programs", href: "/serviceDescription" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
]

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/jipendewellness/", icon: PiFacebookLogo },
  { label: "Instagram", href: "https://www.instagram.com/jipendewellness/?hl=en", icon: PiInstagramLogo },
  { label: "X", href: "https://x.com/jipendewellness?lang=en", icon: BsTwitterX },
  { label: "YouTube", href: "https://www.youtube.com/@africajipendewellness9825", icon: PiYoutubeLogo },
  { label: "TikTok", href: "https://vm.tiktok.com/ZMBHgQncU/", icon: PiTiktokLogo },
]

export default function Footer() {
  return (
    <footer className="border-t border-yellow-200 bg-white text-neutral-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/assets/logo1.png" alt="Africa Jipende Wellness logo" width={64} height={64} className="h-14 w-auto rounded-2xl bg-yellow-50 p-1" />
            <div>
              <p className="text-lg font-black">Africa Jipende Wellness</p>
              <p className="text-sm text-neutral-500">{brand.onlineArea}</p>
            </div>
          </Link>
          <div className="mt-6 grid gap-3 text-sm text-neutral-700">
            <p className="flex items-center gap-2">
              <FiMapPin aria-hidden="true" />
              {brand.location}
            </p>
            <p className="flex items-center gap-2">
              <FiMail aria-hidden="true" />
              {brand.email}
            </p>
            <p className="flex items-center gap-2">
              <FiPhone aria-hidden="true" />
              {brand.phone}
            </p>
          </div>
          <div className="mt-6 rounded-3xl border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <FiShield className="mt-1 shrink-0 text-neutral-950" aria-hidden="true" />
              <p className="text-sm leading-7 text-neutral-700">{brand.crisisText}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-yellow-700">{group.title}</h2>
              <div className="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm font-semibold text-neutral-600 hover:text-neutral-950">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-yellow-100 bg-yellow-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-sm text-neutral-600">
            All Rights Reserved © 2026. Africa Jipende Wellness.
          </p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-yellow-200 bg-white text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                >
                  <Icon aria-hidden="true" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

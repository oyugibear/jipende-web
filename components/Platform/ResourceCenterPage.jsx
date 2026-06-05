"use client"

import Link from "next/link"
import { FiArrowRight, FiBookOpen, FiDownload, FiFileText, FiPlayCircle, FiSearch } from "react-icons/fi"
import { resourceHub } from "@/data/platformData"
import { ButtonLink, Card, SectionHeader, StatusPill } from "./UI"

const typeIcons = {
  Article: FiBookOpen,
  Guide: FiFileText,
  Worksheet: FiDownload,
  Video: FiPlayCircle,
}

export default function ResourceCenterPage() {
  const featured = resourceHub[0]
  const categories = ["All", "Guide", "Downloads", "Family", "Corporate wellness", "Clinical workflow"]

  return (
    <main className="bg-[#FAFAF8] text-[#0F1115]">
      <section className="border-b border-[#E8E1D5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid min-w-0 max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="min-w-0">
            <StatusPill label="Resource center" tone="yellow" />
            <h1 className="mt-6 break-words text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl">
              Practical mental health education for clients, families, and teams.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5C5850]">
              A long-term content hub for articles, guides, videos, downloads, and therapy worksheets that support the care journey before and between sessions.
            </p>
          </div>
          <div className="min-w-0 rounded-lg border border-[#E8E1D5] bg-white p-4 shadow-[0_14px_36px_rgba(15,17,21,0.05)]">
            <label className="relative block">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6D675E]" aria-hidden="true" />
              <input
                className="min-h-12 w-full rounded-full border border-[#E8E1D5] bg-[#F4F5F7] pl-11 pr-4 text-sm font-bold outline-none focus:border-[#F4C542] focus:bg-white focus:ring-2 focus:ring-[#F4C542]/20"
                placeholder="Search articles, guides, worksheets, videos"
                aria-label="Search resources"
              />
            </label>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {categories.map((category, index) => (
                <button key={category} className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${index === 0 ? "bg-[#0F1115] text-white" : "border border-[#E8E1D5] bg-white text-[#4B4740] hover:border-[#F4C542]"}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="bg-[#FFD95A] p-8">
              <StatusPill label="Featured guide" tone="dark" />
              <h2 className="mt-6 max-w-3xl text-4xl font-black leading-tight">{featured.title}</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#4B4740]">{featured.summary}</p>
              <Link href="/forms" className="mt-8 inline-flex items-center gap-2 text-sm font-black underline decoration-[#0F1115] decoration-2 underline-offset-4">
                Use this before intake
                <FiArrowRight aria-hidden="true" />
              </Link>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["Articles", "Education for therapy decisions, stigma, and everyday care."],
                ["Downloads", "Worksheets and guides clients can use between sessions."],
                ["Videos", "Short explainers for referrals, intake, and care planning."],
              ].map(([title, text]) => (
                <Card key={title} className="bg-white">
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5C5850]">{text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E8E1D5] bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Library"
            title="Built as a long-term SEO and care asset."
            description="Resources are tagged by type and audience so AJW can grow content around client education, family support, therapist workflows, and organizational wellness."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resourceHub.map((resource) => {
              const Icon = typeIcons[resource.type] || FiBookOpen
              return (
                <Card key={resource.title} className="bg-[#FAFAF8]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#FFF4BF] text-[#8A6710]">
                      <Icon aria-hidden="true" />
                    </div>
                    <StatusPill label={resource.type} tone="muted" />
                  </div>
                  <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-[#8A6710]">{resource.category}</p>
                  <h3 className="mt-3 text-xl font-black leading-tight">{resource.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#5C5850]">{resource.summary}</p>
                  <p className="mt-6 text-sm font-black text-[#6D675E]">{resource.readTime}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg border border-[#E8E1D5] bg-[#0F1115] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FFD95A]">Need personal support?</p>
            <h2 className="mt-3 text-3xl font-black">Resources help, but therapy gives you a care plan.</h2>
          </div>
          <ButtonLink href="/forms" variant="gold">
            Book Your First Session
          </ButtonLink>
        </div>
      </section>
    </main>
  )
}

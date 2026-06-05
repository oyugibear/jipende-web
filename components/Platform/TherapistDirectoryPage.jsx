"use client"

import Image from "next/image"
import { FiFilter, FiMapPin, FiSearch, FiVideo } from "react-icons/fi"
import { therapistDirectory, therapistFilters } from "@/data/platformData"
import { ButtonLink, Card, SectionHeader, StatusPill } from "./UI"

export default function TherapistDirectoryPage() {
  return (
    <main className="bg-[#FAFAF8] text-[#0F1115]">
      <section className="border-b border-[#E8E1D5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="min-w-0 max-w-4xl">
            <StatusPill label="Therapist directory" tone="yellow" />
            <h1 className="mt-6 break-words text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl">
              Find a therapist who fits your life, language, and care goals.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5C5850]">
              Search by specialty, session type, language, availability, and experience, then start intake with the right clinical context.
            </p>
          </div>

          <div className="mt-10 grid gap-4 rounded-lg border border-[#E8E1D5] bg-white p-4 shadow-[0_14px_36px_rgba(15,17,21,0.05)] lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6D675E]" aria-hidden="true" />
              <input
                className="min-h-12 w-full rounded-full border border-[#E8E1D5] bg-[#F4F5F7] pl-11 pr-4 text-sm font-bold outline-none focus:border-[#F4C542] focus:bg-white focus:ring-2 focus:ring-[#F4C542]/20"
                placeholder="Search by concern, therapist, or session type"
                aria-label="Search therapists"
              />
            </label>
            <ButtonLink href="/forms" variant="dark">
              Book Your First Session
            </ButtonLink>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0F1115] px-4 py-2 text-sm font-black text-white">
              <FiFilter aria-hidden="true" />
              Filters
            </span>
            {therapistFilters.map((filter) => (
              <button key={filter} className="shrink-0 rounded-full border border-[#E8E1D5] bg-white px-4 py-2 text-sm font-black text-[#4B4740] transition hover:border-[#F4C542] hover:bg-[#FFF8D7]">
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6">
          {therapistDirectory.map((therapist) => (
            <article key={therapist.name} className="grid overflow-hidden rounded-lg border border-[#E8E1D5] bg-white shadow-[0_14px_36px_rgba(15,17,21,0.05)] lg:grid-cols-[320px_1fr]">
              <div className="relative min-h-[320px] bg-[#F4F5F7]">
                <Image
                  src={therapist.image}
                  alt={therapist.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 320px, 100vw"
                />
              </div>
              <div className="grid gap-6 p-6 lg:grid-cols-[1fr_280px] lg:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill label={therapist.availability} tone="green" />
                    {therapist.sessionTypes.map((type) => (
                      <StatusPill key={type} label={type} tone={type === "Online" ? "blue" : "yellow"} icon={type === "Online" ? FiVideo : undefined} />
                    ))}
                  </div>
                  <h2 className="mt-5 text-3xl font-black">{therapist.name}</h2>
                  <p className="mt-2 font-bold text-[#6D675E]">{therapist.role}</p>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5C5850]">{therapist.profile}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8A6710]">Specializations</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {therapist.specialties.map((specialty) => (
                          <span key={specialty} className="rounded-full bg-[#F4F5F7] px-3 py-1 text-xs font-bold text-[#4B4740]">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8A6710]">Languages</p>
                      <p className="mt-3 text-sm font-bold text-[#4B4740]">{therapist.languages.join(", ")}</p>
                    </div>
                  </div>
                </div>
                <Card className="bg-[#FAFAF8] shadow-none">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8A6710]">Profile details</p>
                  <div className="mt-4 grid gap-4 text-sm">
                    <p className="flex items-start gap-2 font-semibold text-[#4B4740]">
                      <FiMapPin className="mt-1 shrink-0 text-[#8A6710]" aria-hidden="true" />
                      {therapist.location}
                    </p>
                    <p className="font-semibold leading-6 text-[#4B4740]">{therapist.experience}</p>
                  </div>
                  <div className="mt-6 grid gap-2">
                    <ButtonLink href="/forms" variant="dark">
                      Start intake
                    </ButtonLink>
                    <ButtonLink href="/auth/register" variant="light">
                      Create client profile
                    </ButtonLink>
                  </div>
                </Card>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#E8E1D5] bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Matching model"
            title="Fit is clinical, practical, and human."
            description="A strong match considers concern, care format, availability, language, referral needs, and whether the client needs individual, family, couples, group, corporate, or school support."
          />
        </div>
      </section>
    </main>
  )
}

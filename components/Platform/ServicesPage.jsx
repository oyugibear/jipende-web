"use client"

import Link from "next/link"
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiHeart,
  FiHome,
  FiMonitor,
  FiUsers,
} from "react-icons/fi"
import { brand, serviceCatalog } from "@/data/platformData"
import { ButtonLink, Card, SectionHeader, StatusPill } from "./UI"

const serviceIcons = {
  "Individual Therapy": FiHeart,
  "Couples Therapy": FiUsers,
  "Family Therapy": FiHome,
  "Group Therapy": FiUsers,
  "Adolescent Therapy": FiHeart,
  "Corporate Wellness": FiBriefcase,
  "School Wellness": FiMonitor,
}

export default function ServicesPage() {
  return (
    <main className="bg-[#FAFAF8] text-[#0F1115]">
      <section className="border-b border-[#E8E1D5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid min-w-0 max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="min-w-0">
            <StatusPill label="Online and in-person therapy in Kenya" tone="yellow" />
            <h1 className="mt-6 break-words text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl">
              Care pathways for clients, families, teams, and schools.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5C5850]">
              AJW services are designed as therapy programs with a clear process, expected outcomes, and portal support for sessions, payments, files, referrals, and progress.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/forms" variant="dark">
                Book Your First Session
              </ButtonLink>
              <ButtonLink href="/therapists" variant="light">
                Find the Right Therapist
              </ButtonLink>
            </div>
          </div>
          <div className="grid min-w-0 gap-3 rounded-lg border border-[#E8E1D5] bg-white p-5 shadow-[0_14px_36px_rgba(15,17,21,0.05)] sm:grid-cols-2">
            {[
              ["Hybrid delivery", "Online across Kenya, in-person in Nairobi"],
              ["Secure coordination", "Messages, worksheets, referrals, and invoices"],
              ["Progress aware", "Goals, milestones, notes, and outcomes"],
              ["Program ready", "Corporate and school wellness reporting"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg bg-[#F4F5F7] p-4">
                <p className="font-black">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[#5C5850]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Services"
            title="Choose the right support model."
            description="Each service is structured with benefits, process, expected outcomes, and a clear next step."
          />
          <div className="mt-10 grid gap-5">
            {serviceCatalog.map((service, index) => {
              const Icon = serviceIcons[service.title] || FiHeart
              return (
                <Card key={service.title} className="grid gap-6 bg-white md:grid-cols-[auto_1fr]">
                  <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#FFF4BF] text-[#8A6710]">
                    <Icon aria-hidden="true" />
                  </div>
                  <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-black">{service.title}</h2>
                        <StatusPill label={service.format} tone={index % 2 ? "muted" : "yellow"} />
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[#5C5850]">{service.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.benefits.map((benefit) => (
                          <span key={benefit} className="inline-flex items-center gap-2 rounded-full bg-[#F4F5F7] px-3 py-1 text-xs font-bold text-[#4B4740]">
                            <FiCheckCircle aria-hidden="true" />
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <div className="rounded-lg border border-[#E8E1D5] bg-[#FAFAF8] p-4">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8A6710]">Process</p>
                        <p className="mt-3 text-sm leading-6 text-[#4B4740]">{service.process}</p>
                      </div>
                      <div className="rounded-lg border border-[#E8E1D5] bg-[#FAFAF8] p-4">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8A6710]">Expected outcomes</p>
                        <p className="mt-3 text-sm leading-6 text-[#4B4740]">{service.outcomes}</p>
                      </div>
                      <Link href="/forms" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0F1115] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#1A1D23]">
                        Book this service
                        <FiArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E8E1D5] bg-[#0F1115] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FFD95A]">Need matching help?</p>
            <h2 className="mt-3 text-3xl font-black">Tell AJW what is happening, then choose the best pathway.</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">{brand.location} · {brand.onlineArea}</p>
          </div>
          <ButtonLink href="/forms" variant="gold">
            Start intake
          </ButtonLink>
        </div>
      </section>
    </main>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiGlobe,
  FiHeart,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiShield,
  FiUserCheck,
  FiUsers,
  FiVideo,
} from "react-icons/fi"
import {
  brand,
  credibility,
  faqs,
  resourceHub,
  resources,
  serviceLines,
  testimonials,
  therapistDirectory,
  therapyProcess,
} from "@/data/platformData"
import { ButtonLink, Card, SectionHeader, StatusPill } from "./UI"

export default function PublicHome() {
  return (
    <main className="bg-[#FAFAF8] text-[#0F1115]">
      <HeroSection />
      <TrustBar />
      <ProcessSection />
      <ServicesSection />
      <TherapistSection />
      <PlatformSection />
      <TestimonialsSection />
      <ResourcesSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FAFAF8]">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] min-w-0 max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
        <div className="min-w-0 max-w-3xl pt-8">
          <div className="mb-6 flex flex-wrap gap-2">
            <StatusPill label="Kenya-first mental health care" tone="yellow" icon={FiShield} />
            <StatusPill label="Online and in-person therapy" tone="dark" icon={FiVideo} />
          </div>
          <h1 className="break-words text-4xl font-black leading-[0.98] tracking-tight text-[#0F1115] sm:text-6xl lg:text-7xl">
            Therapy that meets you where you are.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4B4740] sm:text-xl">
            Africa Jipende Wellness brings premium, confidential therapy into one calm platform for clients, therapists, and care teams across Kenya and Africa.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/forms" variant="dark" icon={FiArrowRight}>
              Book Your First Session
            </ButtonLink>
            <ButtonLink href="/therapists" variant="light" icon={FiUserCheck}>
              Find the Right Therapist
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-3 border-l-4 border-[#F4C542] pl-5 sm:grid-cols-3">
            {[
              ["Hybrid care", "Video or Nairobi office sessions"],
              ["Secure portal", "Messages, files, payments, progress"],
              ["Kenya-first", "Built for local routines and referrals"],
            ].map(([title, text]) => (
              <div key={title}>
                <p className="text-sm font-black text-[#0F1115]">{title}</p>
                <p className="mt-1 text-sm leading-6 text-[#6D675E]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[560px] min-w-0 overflow-hidden rounded-lg border border-[#E8E1D5] bg-[#0F1115] shadow-[0_24px_70px_rgba(15,17,21,0.14)]">
          <Image
            src="/assets/homepage/homebg.jpg"
            alt="Calm therapy environment for Africa Jipende Wellness"
            fill
            priority
            className="object-cover opacity-78"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115]/82 via-[#0F1115]/12 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 grid gap-3">
            <div className="rounded-lg border border-white/15 bg-white/90 p-4 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8A6710]">Next available pathway</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-black text-[#0F1115]">Hybrid individual therapy</h2>
                  <p className="mt-1 text-sm text-[#5C5850]">Online this week, in-person in Kilimani next month.</p>
                </div>
                <StatusPill label="Accepting intake" tone="green" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-white">
              {["Messages", "Sessions", "Progress"].map((item) => (
                <div key={item} className="rounded-lg bg-[#0F1115]/72 p-3 text-center ring-1 ring-white/12 backdrop-blur">
                  <p className="text-xs font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  const stats = [
    ["2018", "Kenya-based wellness practice"],
    ["Hybrid", "Online and in-person sessions"],
    ["RBAC", "Client, therapist, admin portals"],
    ["KES", "Local payment and invoice history"],
  ]

  return (
    <section className="border-y border-[#E8E1D5] bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#E8E1D5] px-4 sm:px-6 lg:grid-cols-4 lg:divide-y-0 lg:px-8">
        {stats.map(([value, label]) => (
          <div key={label} className="py-7 text-center">
            <p className="text-3xl font-black tracking-tight text-[#0F1115]">{value}</p>
            <p className="mx-auto mt-2 max-w-[12rem] text-xs font-black uppercase tracking-[0.14em] text-[#6D675E]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="How therapy works"
          title="A clear path from intake to measurable progress."
          description="Every client should know what happens next: how they are matched, where sessions happen, what is due, and how therapy is progressing."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {therapyProcess.map((item) => (
            <Card key={item.step} className="bg-white">
              <p className="text-sm font-black text-[#8A6710]">{item.step}</p>
              <h3 className="mt-5 text-2xl font-black leading-tight text-[#0F1115]">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#5C5850]">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="border-y border-[#E8E1D5] bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Therapy services"
            title="Care pathways for real African routines."
            description="Support for individuals, couples, families, groups, schools, and workplaces, delivered through secure online care and in-person sessions in Nairobi."
          />
          <ButtonLink href="/services" variant="dark" icon={FiArrowRight}>
            Explore services
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceLines.map((service) => (
            <Card key={service.title} className="bg-[#FAFAF8]">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#FFF4BF] text-[#8A6710]">
                  {service.format === "Video" ? (
                    <FiVideo aria-hidden="true" />
                  ) : service.audience === "Organizations" ? (
                    <FiUsers aria-hidden="true" />
                  ) : (
                    <FiHeart aria-hidden="true" />
                  )}
                </div>
                <StatusPill label={service.format} tone="yellow" />
              </div>
              <h3 className="text-2xl font-black text-[#0F1115]">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#5C5850]">{service.description}</p>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#6D675E]">
                {service.audience}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function TherapistSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Therapist fit"
              title="Find the right support, not just the first slot."
              description="Therapist discovery is built around specialty, language, session type, availability, and the client’s context."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/therapists" variant="dark" icon={FiUserCheck}>
                View therapists
              </ButtonLink>
              <ButtonLink href="/forms" variant="light" icon={FiMessageCircle}>
                Ask for matching
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {therapistDirectory.map((therapist) => (
              <Link key={therapist.name} href="/therapists" className="group overflow-hidden rounded-lg border border-[#E8E1D5] bg-white shadow-[0_10px_26px_rgba(15,17,21,0.04)] transition duration-200 hover:-translate-y-1 hover:border-[#F4C542]">
                <div className="relative h-52 bg-[#F4F5F7]">
                  <Image
                    src={therapist.image}
                    alt={therapist.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <StatusPill label={therapist.availability} tone="green" />
                  <h3 className="mt-4 text-xl font-black">{therapist.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#6D675E]">{therapist.role}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {therapist.specialties.slice(0, 2).map((specialty) => (
                      <span key={specialty} className="rounded-full bg-[#F4F5F7] px-3 py-1 text-xs font-bold text-[#4B4740]">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PlatformSection() {
  const surfaces = [
    {
      title: "Client portal",
      href: "/client",
      text: "Appointments, meeting links, physical location details, messages, files, referrals, payments, and therapy progress.",
    },
    {
      title: "Therapist portal",
      href: "/therapist",
      text: "Assigned clients, notes, session workspaces, follow-up flags, meeting link management, messages, and calendar.",
    },
    {
      title: "Admin platform",
      href: "/admin",
      text: "Revenue, utilization, acquisition, retention, referrals, outcome trends, roles, audit logs, and operational alerts.",
    },
  ]

  return (
    <section id="platform" className="bg-[#0F1115] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Platform"
          title="A mental health operating system for hybrid care."
          description="Public booking is only the front door. The product depth lives in the private portals where care coordination, clinical work, and operations happen."
          inverse
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {surfaces.map((surface, index) => (
            <Link
              key={surface.title}
              href={surface.href}
              className="group rounded-lg border border-white/12 bg-white/[0.06] p-6 transition duration-200 hover:-translate-y-1 hover:bg-white/[0.1]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#F4C542] text-lg font-black text-[#0F1115]">
                  {index + 1}
                </span>
                <FiArrowRight className="transition group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <h3 className="mt-8 text-2xl font-black">{surface.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/68">{surface.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="border-b border-[#E8E1D5] bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Client experience"
          title="Calm support with clear next steps."
          description="The product experience is designed around privacy, clarity, and the practical details clients need before and after therapy."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="shadow-none">
              <p className="text-lg font-semibold leading-8 text-[#2F2D29]">"{item.quote}"</p>
              <div className="mt-6 border-t border-[#E8E1D5] pt-5">
                <p className="font-black">{item.name}</p>
                <p className="mt-1 text-sm text-[#6D675E]">{item.type}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResourcesSection() {
  const feature = resourceHub[0] || resources[0]
  const others = resourceHub.slice(1, 4)

  return (
    <section id="resources" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Resource center"
            title="Mental health education that can grow with the platform."
            description="Articles, guides, videos, and downloads make the site useful beyond booking and create a long-term SEO asset."
          />
          <ButtonLink href="/resources" variant="light" icon={FiBookOpen}>
            Open resources
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="bg-[#FFF8D7]">
            <StatusPill label={feature.category} tone="gold" />
            <h3 className="mt-5 max-w-2xl text-3xl font-black leading-tight">{feature.title}</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#5C5850]">{feature.summary}</p>
            <Link href="/resources" className="mt-8 inline-flex items-center gap-2 text-sm font-black underline decoration-[#0F1115] decoration-2 underline-offset-4">
              Read the guide
              <FiArrowRight aria-hidden="true" />
            </Link>
          </Card>
          <div className="grid gap-4">
            {others.map((resource) => (
              <Card key={resource.title} className="bg-white">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill label={resource.type} tone="muted" />
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-[#6D675E]">{resource.readTime}</span>
                </div>
                <h3 className="mt-4 text-xl font-black leading-tight">{resource.title}</h3>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="FAQs"
          title="Straight answers before you start."
          description="Clients can choose the care format that fits them, then manage the details inside the portal."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question} className="shadow-none">
              <h3 className="text-lg font-black">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5C5850]">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg border border-[#E8E1D5] bg-[#FFD95A] p-6 text-[#0F1115] shadow-[0_18px_50px_rgba(15,17,21,0.08)] md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6D4F09]">Start here</p>
          <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">Ready to talk to someone?</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#4B4740]">
            Complete the intake form and the AJW team can match the right therapy pathway, therapist, session mode, and next step.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/forms" variant="dark">
              Book Your First Session
            </ButtonLink>
            <ButtonLink href="/therapists" variant="light" icon={FiUserCheck}>
              Find the Right Therapist
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#4B4740]">
              <FiMapPin aria-hidden="true" className="text-[#0F1115]" />
              {brand.location}
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#4B4740]">
              <FiMail aria-hidden="true" className="text-[#0F1115]" />
              {brand.email}
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#4B4740]">
              <FiPhone aria-hidden="true" className="text-[#0F1115]" />
              {brand.phone}
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          <Card className="bg-white">
            <h3 className="text-2xl font-black">Newsletter</h3>
            <p className="mt-3 text-sm leading-7 text-[#5C5850]">
              Receive calm, practical mental wellness notes for clients, families, therapists, and organizations.
            </p>
            <div className="mt-5 grid gap-3">
              <input
                className="min-h-12 rounded-full border border-[#E8E1D5] bg-white px-4 text-sm outline-none focus:border-[#F4C542] focus:ring-2 focus:ring-[#F4C542]/20"
                placeholder="Email address"
                aria-label="Email address"
              />
              <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F1115] px-5 text-sm font-black text-white hover:bg-[#1A1D23]">
                Sign up
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </Card>
          <Card className="bg-white">
            <div className="flex items-start gap-3">
              <FiShield className="mt-1 shrink-0 text-red-600" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-black">Crisis disclaimer</h3>
                <p className="mt-2 text-sm leading-7 text-[#5C5850]">{brand.crisisText}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-black">
                  <Link href="/terms" className="text-[#0F1115] underline decoration-[#F4C542] decoration-2 underline-offset-4">
                    Privacy and terms
                  </Link>
                  <Link href="/contacts" className="text-[#0F1115] underline decoration-[#F4C542] decoration-2 underline-offset-4">
                    Contact details
                  </Link>
                </div>
              </div>
            </div>
          </Card>
          <Card className="bg-[#F4F5F7]">
            <div className="flex items-start gap-3">
              <FiGlobe className="mt-1 shrink-0 text-[#8A6710]" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-black">Kenya-first, Africa-ready</h3>
                <p className="mt-2 text-sm leading-7 text-[#5C5850]">
                  Built for Nairobi sessions, online continuity, referrals, and wellness programs that can scale across countries and organizations.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FiActivity,
  FiAlertCircle,
  FiAlertTriangle,
  FiArrowRight,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiDownload,
  FiFileText,
  FiLock,
  FiMapPin,
  FiMessageCircle,
  FiPaperclip,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShield,
  FiTrendingDown,
  FiTrendingUp,
  FiUser,
  FiUserCheck,
  FiUsers,
  FiVideo,
} from "react-icons/fi"

export function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

export const platformTheme = {
  black: "#0F1115",
  charcoal: "#1A1D23",
  gold: "#F4C542",
  amber: "#FFD95A",
  warmWhite: "#FAFAF8",
  softGray: "#F4F5F7",
  line: "#E8E1D5",
  green: "#315B45",
}

const toneClasses = {
  dark: "border-[#0F1115] bg-[#0F1115] text-white",
  charcoal: "border-[#1A1D23] bg-[#1A1D23] text-white",
  yellow: "border-[#F4C542]/45 bg-[#FFF4BF] text-[#0F1115]",
  gold: "border-[#F4C542] bg-[#F4C542] text-[#0F1115]",
  light: "border-[#E8E1D5] bg-white text-[#0F1115]",
  muted: "border-[#E8E1D5] bg-[#F4F5F7] text-[#4B4740]",
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  amber: "border-amber-200 bg-amber-50 text-amber-900",
  red: "border-red-200 bg-red-50 text-red-800",
  blue: "border-sky-200 bg-sky-50 text-sky-800",
}

export function SectionHeader({ eyebrow, title, description, align = "left", inverse = false }) {
  return (
    <div className={cx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className={cx("mb-3 text-xs font-black uppercase tracking-[0.18em]", inverse ? "text-[#FFD95A]" : "text-[#8A6710]")}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cx("text-3xl font-black leading-tight md:text-5xl", inverse ? "text-white" : "text-[#0F1115]")}>
        {title}
      </h2>
      {description ? (
        <p className={cx("mt-4 text-base leading-8 md:text-lg", inverse ? "text-white/70" : "text-[#5C5850]")}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function ButtonLink({ href, children, variant = "primary", icon: Icon = FiArrowRight, className = "" }) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#F4C542] focus:ring-offset-2"
  const variants = {
    primary: "bg-[#0F1115] text-white shadow-[0_12px_26px_rgba(15,17,21,0.16)] hover:bg-[#1A1D23]",
    gold: "bg-[#F4C542] text-[#0F1115] shadow-[0_12px_26px_rgba(244,197,66,0.24)] hover:bg-[#FFD95A]",
    dark: "bg-[#0F1115] text-white shadow-[0_12px_26px_rgba(15,17,21,0.16)] hover:bg-[#1A1D23]",
    light: "border border-[#E8E1D5] bg-white text-[#0F1115] hover:border-[#F4C542] hover:bg-[#FFF8D7]",
    ghost: "text-[#0F1115] hover:bg-[#F4F5F7]",
  }

  return (
    <Link href={href} className={cx(base, variants[variant] || variants.primary, className)}>
      <span>{children}</span>
      {Icon ? <Icon aria-hidden="true" /> : null}
    </Link>
  )
}

export function Card({ children, className = "", tone = "light", ...props }) {
  return (
    <section
      {...props}
      className={cx(
        "ajw-fade-up min-w-0 rounded-lg border p-5 shadow-[0_10px_28px_rgba(15,17,21,0.04)] transition duration-200 hover:shadow-[0_16px_36px_rgba(15,17,21,0.07)]",
        toneClasses[tone] || toneClasses.light,
        className
      )}
    >
      {children}
    </section>
  )
}

export function StatusPill({ label, tone = "muted", icon: Icon }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black",
        toneClasses[tone] || toneClasses.muted
      )}
    >
      {Icon ? <Icon aria-hidden="true" /> : null}
      {label}
    </span>
  )
}

export function ProgressBar({ value, label, tone = "yellow" }) {
  const bar = {
    yellow: "bg-[#F4C542]",
    green: "bg-emerald-600",
    blue: "bg-sky-500",
    red: "bg-red-500",
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-[#4B4740]">{label}</span>
        <span className="font-black text-[#0F1115]">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#ECE8DF]">
        <div
          className={cx("h-full rounded-full", bar[tone] || bar.yellow)}
          style={{ width: `${Math.min(Math.max(Number(value) || 0, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}

export function MetricCard({ label, value, change, detail, icon: Icon = FiTrendingUp }) {
  const trendIsNegative = String(change || "").trim().startsWith("-")
  return (
    <Card className="flex min-h-36 flex-col justify-between">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-[#6D675E]">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-[#0F1115]">{value}</p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#FFF4BF] text-[#8A6710]">
          <Icon aria-hidden="true" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm">
        <span className={cx("font-black", trendIsNegative ? "text-red-700" : "text-emerald-700")}>{change}</span>
        <span className="text-right text-[#6D675E]">{detail}</span>
      </div>
    </Card>
  )
}

export function ExecutiveMetricCard({ label, value, change, icon: Icon = FiActivity, tone = "gold" }) {
  const isNegative = String(change || "").includes("-")
  const iconTone = {
    gold: "bg-[#FFF4BF] text-[#8A6710]",
    green: "bg-[#E7EFE9] text-[#315B45]",
    red: "bg-red-50 text-red-700",
    charcoal: "bg-[#E9E8E3] text-[#0F1115]",
  }

  return (
    <Card className="min-h-36 p-6 shadow-[0_8px_22px_rgba(15,17,21,0.045)]">
      <div className="flex items-start justify-between gap-4">
        <div className={cx("grid h-11 w-11 place-items-center rounded-lg", iconTone[tone] || iconTone.gold)}>
          <Icon aria-hidden="true" />
        </div>
        <span className={cx("inline-flex items-center gap-1 text-sm font-black", isNegative ? "text-red-700" : "text-emerald-700")}>
          {isNegative ? <FiTrendingDown aria-hidden="true" /> : <FiTrendingUp aria-hidden="true" />}
          {change}
        </span>
      </div>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-[#4B4740]">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-[#0F1115]">{value}</p>
    </Card>
  )
}

export function SearchControl({ placeholder = "Search patients..." }) {
  return (
    <label className="relative block w-full max-w-xs">
      <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6D675E]" aria-hidden="true" />
      <input
        className="min-h-11 w-full rounded-full border border-[#E2DDD3] bg-[#F2F0EC] pl-11 pr-4 text-sm font-bold text-[#0F1115] outline-none transition focus:border-[#F4C542] focus:bg-white focus:ring-2 focus:ring-[#F4C542]/20"
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </label>
  )
}

export function DashboardShell({ role, title, subtitle, navItems, children, aside, topActions }) {
  const lowerRole = String(role || "").toLowerCase()

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#0F1115]">
      <div className="mx-auto grid w-full max-w-[1536px] gap-0 lg:grid-cols-[250px_1fr]">
        <aside className="border-b border-[#E8E1D5] bg-[#F3F1ED] px-4 py-4 lg:min-h-screen lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3 pb-5">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#0F1115] text-sm font-black text-[#F4C542]">
              AJ
            </div>
            <div>
              <p className="font-black leading-tight text-[#8A6710]">Africa Jipende</p>
              <p className="text-sm text-[#6D675E]">{role}</p>
            </div>
          </div>

          <nav className="grid gap-2" aria-label={`${role} navigation`}>
            {navItems.map((item) => {
              const Icon = item.icon || FiActivity
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cx(
                    "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-black transition",
                    item.active
                      ? "bg-[#FFD95A] text-[#0F1115] shadow-[0_8px_20px_rgba(244,197,66,0.18)]"
                      : "text-[#4B4740] hover:bg-white hover:text-[#0F1115]"
                  )}
                >
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-6">
            <Link
              href={lowerRole.includes("client") ? "/forms" : lowerRole.includes("therapist") ? "/therapist/appointments" : "/admin/appointments"}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#8A6710] px-4 text-sm font-black text-white shadow-[0_14px_28px_rgba(138,103,16,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0F1115]"
            >
              <FiPlus aria-hidden="true" />
              New session
            </Link>
          </div>

          {aside ? <div className="mt-6 border-t border-[#E2DDD3] pt-5">{aside}</div> : null}

          <div className="mt-8 hidden gap-2 border-t border-[#E2DDD3] pt-5 lg:grid">
            <Link href="/account" className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-bold text-[#4B4740] hover:bg-white hover:text-[#0F1115]">
              <FiSettings aria-hidden="true" />
              Settings
            </Link>
            <Link href="/contacts" className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-bold text-[#4B4740] hover:bg-white hover:text-[#0F1115]">
              <FiAlertCircle aria-hidden="true" />
              Support
            </Link>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-20 z-20 border-b border-[#E8E1D5] bg-[#FAFAF8]/92 px-4 py-4 backdrop-blur-xl md:px-8 lg:top-0">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-2xl font-black leading-tight text-[#8A6710] md:text-3xl">{title}</h1>
                <p className="mt-1 max-w-3xl text-sm font-semibold leading-6 text-[#4B4740]">{subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {topActions || (
                  <>
                    <StatusPill label="RBAC enabled" tone="dark" icon={FiShield} />
                    <StatusPill label="Protected records" tone="yellow" icon={FiLock} />
                  </>
                )}
              </div>
            </div>
          </header>

          <div className="px-4 py-6 md:px-8 md:py-8">{children}</div>
        </section>
      </div>
    </main>
  )
}

export function SessionCard({ session }) {
  const isOnline = session.mode === "Online"
  const location = isOnline ? session.meetingLink || session.location : session.location

  return (
    <Card className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill
            label={session.status}
            tone={String(session.status || "").includes("Confirmed") || String(session.status || "").toLowerCase() === "confirmed" ? "green" : "amber"}
            icon={FiCheckCircle}
          />
          <StatusPill label={session.mode} tone={isOnline ? "blue" : "yellow"} icon={isOnline ? FiVideo : FiMapPin} />
        </div>
        <h3 className="mt-4 text-xl font-black text-[#0F1115]">{session.type}</h3>
        <p className="mt-2 text-sm text-[#6D675E]">
          {session.date} at {session.time} with {session.therapist}
        </p>
        <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[#4B4740]">
          {isOnline ? <FiVideo className="mt-1 shrink-0" /> : <FiMapPin className="mt-1 shrink-0" />}
          <span>{location}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 md:min-w-44">
        {isOnline ? (
          <ButtonLink href={session.meetingLink || "#"} variant="dark" icon={FiVideo}>
            Join session
          </ButtonLink>
        ) : (
          <ButtonLink href="/contacts" variant="dark" icon={FiMapPin}>
            View details
          </ButtonLink>
        )}
        <ButtonLink href="/client/appointments" variant="light" icon={FiCalendar}>
          Reschedule
        </ButtonLink>
      </div>
    </Card>
  )
}

export function DataTable({ columns, rows }) {
  return (
    <div className="max-w-full overflow-x-auto rounded-lg border border-[#E8E1D5] bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-[#F4F1EA] text-[#0F1115]">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-4 font-black">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EEE8DD]">
          {rows.map((row, index) => (
            <tr key={row.id || row.name || row.ID || index} className="hover:bg-[#FFF8D7]/55">
              {columns.map((column) => (
                <td key={column} className="px-4 py-4 text-[#4B4740]">
                  {row[column] || row[column.toLowerCase()] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function messageAuthor(message) {
  const sender = message.sender || {}
  return message.author || sender.name || [sender.first_name, sender.second_name].filter(Boolean).join(" ") || "AJW user"
}

function messageRole(message) {
  return message.role || message.sender?.role || "Participant"
}

function messageTime(message) {
  const value = message.time || message.createdAt
  if (!value) return ""
  try {
    return new Date(value).toLocaleString("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  } catch {
    return value
  }
}

export function MessageThread({ messages = [], onSend, sending = false, disabled = false }) {
  const [body, setBody] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!body.trim() || !onSend) return
    await onSend(body.trim())
    setBody("")
  }

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black">Secure conversation</h2>
          <p className="mt-1 text-sm text-[#6D675E]">Threaded client-therapist messaging with timestamps and attachment context.</p>
        </div>
        <StatusPill label="Protected" tone="green" icon={FiLock} />
      </div>
      <div className="grid gap-4">
        {messages.length ? messages.map((message) => (
          <article
            key={message.id || message._id}
            className={cx(
              "rounded-lg border p-4",
              messageRole(message) === "Client"
                ? "border-[#F4C542]/45 bg-[#FFF8D7]"
                : "border-[#E8E1D5] bg-[#F7F7F4]"
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#0F1115] text-xs font-black text-[#F4C542]">
                  {messageAuthor(message)
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-black text-[#0F1115]">{messageAuthor(message)}</p>
                  <p className="text-xs text-[#6D675E]">{messageRole(message)}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-[#6D675E]">
                <FiClock aria-hidden="true" />
                {messageTime(message)}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#4B4740]">{message.body}</p>
            {(message.attachments || []).length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {message.attachments.map((attachment) => (
                  <span
                    key={attachment.title || attachment}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E8E1D5] bg-white px-3 py-1 text-xs font-bold text-[#4B4740]"
                  >
                    <FiPaperclip aria-hidden="true" />
                    {attachment.title || attachment}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        )) : (
          <div className="rounded-lg border border-dashed border-[#D7D1C5] bg-[#F7F7F4] p-5 text-sm font-semibold text-[#6D675E]">
            No messages yet. Start a secure thread when you need care coordination or follow-up.
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-3 rounded-lg border border-dashed border-[#D7D1C5] bg-white p-4 md:grid-cols-[1fr_auto]">
        <input
          value={body}
          onChange={(event) => setBody(event.target.value)}
          disabled={disabled || sending || !onSend}
          className="min-h-11 rounded-full border border-[#E8E1D5] px-4 text-sm outline-none focus:border-[#F4C542] focus:ring-2 focus:ring-[#F4C542]/20"
          placeholder={onSend ? "Write a secure message..." : "Messaging unlocks after login and assignment"}
          aria-label="Write a secure message"
        />
        <button disabled={disabled || sending || !onSend || !body.trim()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0F1115] px-5 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#1A1D23] disabled:cursor-not-allowed disabled:opacity-45">
          <FiMessageCircle aria-hidden="true" />
          {sending ? "Sending..." : "Send message"}
        </button>
      </form>
    </Card>
  )
}

export function TimelineList({ items, title, icon: Icon = FiFileText }) {
  return (
    <Card>
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#FFF4BF] text-[#8A6710]">
          <Icon aria-hidden="true" />
        </div>
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <article key={item.id || item.title || index} className="grid grid-cols-[auto_1fr] gap-3">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-[#F4C542] ring-4 ring-[#FFF4BF]" />
              {index < items.length - 1 ? <div className="h-full min-h-12 w-px bg-[#E8E1D5]" /> : null}
            </div>
            <div className="pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-black text-[#0F1115]">{item.theme || item.title || item.type}</h3>
                {item.tag ? <StatusPill label={item.tag} tone="muted" /> : null}
                {item.status ? <StatusPill label={item.status} tone="blue" /> : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-[#5C5850]">
                {item.body || item.nextStep || item.reason || item.detail}
              </p>
              {item.date ? <p className="mt-1 text-xs font-black text-[#6D675E]">{item.date}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </Card>
  )
}

export function ProfilePanel({ profile }) {
  return (
    <Card className="bg-[#0F1115] text-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#F4C542] text-lg font-black text-[#0F1115]">
            {profile.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <h2 className="text-2xl font-black">{profile.name}</h2>
            <p className="text-sm text-white/65">{profile.carePlan}</p>
          </div>
        </div>
        <StatusPill label={profile.risk} tone={profile.risk === "Low" ? "green" : "amber"} icon={FiShield} />
      </div>
      <p className="mt-5 text-sm leading-7 text-white/72">{profile.summary}</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["Therapist", profile.therapist],
          ["Location", profile.location],
          ["Primary concern", profile.primaryConcern],
          ["Referral source", profile.referralSource],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-white/8 p-3 ring-1 ring-white/10">
            <dt className="text-xs font-black uppercase tracking-[0.16em] text-[#FFD95A]">{label}</dt>
            <dd className="mt-2 text-sm text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}

export function ReminderCard({ item, onAction }) {
  const tone = item.tone === "Billing" ? "amber" : item.tone === "Care" ? "blue" : "green"
  return (
    <article className="rounded-lg border border-[#E8E1D5] bg-white p-4 shadow-[0_10px_24px_rgba(15,17,21,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-black text-[#0F1115]">{item.title}</h3>
        <StatusPill label={item.tone} tone={tone} />
      </div>
      <p className="mt-2 text-sm leading-6 text-[#5C5850]">{item.body}</p>
      {onAction ? (
        <button onClick={onAction} className="mt-4 text-sm font-black text-[#0F1115] underline decoration-[#F4C542] decoration-2 underline-offset-4">
          Mark read
        </button>
      ) : null}
    </article>
  )
}

export function AccessModel({ roles, schema }) {
  return (
    <Card>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black">Role-based access model</h2>
          <p className="mt-2 text-sm leading-6 text-[#5C5850]">
            Frontend routes are separated by role, while the data model keeps sensitive profile, note, invoice, and message records scoped.
          </p>
        </div>
        <StatusPill label="Analytics ready" tone="yellow" icon={FiActivity} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.key} className="rounded-lg border border-[#E8E1D5] bg-[#F7F7F4] p-4">
            <div className="flex items-center gap-2">
              <FiUser aria-hidden="true" />
              <h3 className="font-black">{role.label}</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {role.permissions.slice(0, 4).map((permission) => (
                <span key={permission} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#5C5850]">
                  {permission.replaceAll("_", " ")}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-[#F4C542]/40 bg-[#FFF8D7] p-4 text-[#0F1115]">
        <p className="text-sm font-black text-[#0F1115]">Analytics fields</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {schema.map((field) => (
            <span key={field} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#5C5850]">
              {field}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function OutcomeTrendChart({ data = [] }) {
  const points = data.length ? data : [
    { label: "Jan", clinic: 42, satisfaction: 31 },
    { label: "Mar", clinic: 51, satisfaction: 35 },
    { label: "May", clinic: 58, satisfaction: 33 },
    { label: "Jul", clinic: 48, satisfaction: 55 },
    { label: "Sep", clinic: 77, satisfaction: 47 },
    { label: "Nov", clinic: 69, satisfaction: 54 },
  ]
  const width = 720
  const height = 300
  const padding = 38
  const max = Math.max(...points.flatMap((point) => [point.clinic, point.satisfaction]), 100)
  const min = Math.min(...points.flatMap((point) => [point.clinic, point.satisfaction]), 0)
  const x = (index) => padding + (index * (width - padding * 2)) / Math.max(points.length - 1, 1)
  const y = (value) => height - padding - ((value - min) / Math.max(max - min, 1)) * (height - padding * 2)
  const path = (key) => points.map((point, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(point[key])}`).join(" ")
  const area = `${path("clinic")} L ${x(points.length - 1)} ${height - padding} L ${x(0)} ${height - padding} Z`

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-black">Outcome Trends</h2>
          <p className="mt-1 max-w-lg text-sm leading-6 text-[#4B4740]">
            Aggregate wellness progress scores across the clinic population.
          </p>
        </div>
        <div className="inline-flex w-fit rounded-lg bg-[#E9E7E2] p-1 text-sm font-black text-[#4B4740]">
          {["12M", "30D", "7D"].map((item, index) => (
            <span key={item} className={cx("rounded-md px-3 py-2", index === 0 && "bg-white text-[#0F1115] shadow-sm")}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[300px] w-full" role="img" aria-label="Outcome trend chart">
          <defs>
            <linearGradient id="clinicFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#315B45" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#315B45" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#clinicFill)" />
          <path d={path("clinic")} fill="none" stroke="#315B45" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={path("satisfaction")} fill="none" stroke="#8A6710" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} stroke="#E8E1D5" />
          {points.map((point, index) => (
            <text key={point.label} x={x(index)} y={height - 10} textAnchor="middle" className="fill-[#4B4740] text-[14px] font-bold">
              {point.label}
            </text>
          ))}
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap gap-5 text-sm font-bold text-[#0F1115]">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#315B45]" /> Clinic Resilience Index</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#8A6710]" /> Patient Satisfaction Score</span>
      </div>
    </Card>
  )
}

export function JourneyFunnel({ items = [], conversion = "6.9%", change = "+1.2%" }) {
  const rows = items.length ? items : [
    { label: "Website Visits", value: "42,109", percent: 100 },
    { label: "Inquiry Leads", value: "18,432", percent: 44 },
    { label: "Assessment Completed", value: "4,011", percent: 24 },
    { label: "Onboarded Patients", value: "1,284", percent: 14 },
  ]

  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-black">Patient Journey</h2>
        <FiAlertCircle className="text-[#6D675E]" aria-hidden="true" />
      </div>
      <div className="grid gap-4">
        {rows.map((item, index) => (
          <div key={item.label} className="relative overflow-hidden rounded-lg border border-[#E8E1D5] bg-[#F7F7F4] p-4">
            <div
              className={cx("absolute inset-y-0 left-0", index % 2 === 0 ? "bg-[#DDE5DE]" : "bg-[#DED7C8]")}
              style={{ width: `${Math.max(item.percent, 10)}%` }}
            />
            <div className="relative flex items-center justify-between gap-3">
              <p className="font-semibold text-[#0F1115]">{item.label}</p>
              <p className="text-sm font-bold text-[#0F1115]">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-[#E8E1D5] bg-[#F7F7F4] p-4">
        <p className="text-sm font-semibold text-[#4B4740]">Lead to Patient Conversion</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-lg font-black text-[#8A6710]">{conversion}</span>
          <span className="inline-flex items-center gap-1 text-sm font-black text-emerald-700">
            <FiTrendingUp aria-hidden="true" />
            {change}
          </span>
        </div>
      </div>
    </Card>
  )
}

export function CapacityHeatmap({ data = [] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const slots = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"]
  const values = data.length ? data : slots.flatMap((slot, rowIndex) => days.map((day, dayIndex) => ({
    slot,
    day,
    value: [2, 3, 1, 1, 3, 2, 4][(rowIndex + dayIndex) % 7],
  })))
  const color = (value) => ["bg-[#E7E4DF]", "bg-[#D8E0DA]", "bg-[#9DAFA5]", "bg-[#6F8B7B]", "bg-[#315B45]"][Math.min(Math.max(value, 0), 4)]

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-black">Therapist Capacity Heatmap</h2>
          <p className="mt-1 text-sm leading-6 text-[#4B4740]">Weekly availability distribution across the therapy team.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-[#4B4740]">
          <span>Free</span>
          {[0, 1, 2, 3, 4].map((value) => <span key={value} className={cx("h-4 w-4 rounded", color(value))} />)}
          <span>Booked</span>
        </div>
      </div>
      <div className="mt-7 overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[92px_repeat(7,1fr)] gap-3 text-sm font-black text-[#0F1115]">
            <span />
            {days.map((day) => <span key={day} className="text-center">{day}</span>)}
          </div>
          <div className="mt-4 grid gap-3">
            {slots.map((slot) => (
              <div key={slot} className="grid grid-cols-[92px_repeat(7,1fr)] gap-3">
                <span className="pt-3 text-sm font-bold text-[#4B4740]">{slot}</span>
                {days.map((day) => {
                  const item = values.find((entry) => entry.slot === slot && entry.day === day)
                  return <span key={`${slot}-${day}`} className={cx("h-12 rounded-lg", color(item?.value || 0))} aria-label={`${day} ${slot} capacity ${item?.value || 0}`} />
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

export function OperationalAlerts({ alerts = [] }) {
  const rows = alerts.length ? alerts : [
    { title: "Capacity Warning: Adolescent Trauma Unit", body: "Therapist utilization exceeded 95% for 3 consecutive days.", time: "2 mins ago", tone: "red" },
    { title: "New Practitioner Onboarded", body: "Dr. Amara Okoro has been added to Child Psychology.", time: "1 hour ago", tone: "amber" },
    { title: "Clinical Safety Audit Completed", body: "Compliance score: 100%. No outstanding vulnerabilities identified.", time: "5 hours ago", tone: "green" },
  ]
  const iconTone = {
    red: "bg-red-50 text-red-700",
    amber: "bg-[#FFF4BF] text-[#8A6710]",
    green: "bg-emerald-50 text-emerald-700",
  }

  return (
    <Card className="p-0">
      <div className="border-b border-[#E8E1D5] p-6">
        <h2 className="text-lg font-black">Recent Operational Alerts</h2>
      </div>
      <div className="divide-y divide-[#E8E1D5]">
        {rows.map((alert) => (
          <article key={alert.title} className="grid gap-4 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <div className={cx("grid h-10 w-10 place-items-center rounded-full", iconTone[alert.tone] || iconTone.amber)}>
              {alert.tone === "green" ? <FiCheckCircle aria-hidden="true" /> : alert.tone === "red" ? <FiAlertTriangle aria-hidden="true" /> : <FiUserCheck aria-hidden="true" />}
            </div>
            <div>
              <h3 className="font-black text-[#0F1115]">{alert.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#4B4740]">{alert.body}</p>
            </div>
            <p className="text-sm font-bold text-[#8A8175]">{alert.time}</p>
          </article>
        ))}
      </div>
    </Card>
  )
}

export function PortalLoading({ label = "Loading platform data..." }) {
  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 text-[#0F1115]">
      <div className="mx-auto grid min-h-[60vh] max-w-xl place-items-center text-center">
        <Card className="w-full">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#F4C542] border-t-[#0F1115]" />
          <p className="mt-5 text-sm font-bold text-[#5C5850]">{label}</p>
        </Card>
      </div>
    </main>
  )
}

export function PortalAccessPrompt({ title, description, role }) {
  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 text-[#0F1115]">
      <div className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center text-center">
        <Card className="w-full">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-[#0F1115] text-[#F4C542]">
            <FiLock aria-hidden="true" />
          </div>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#8A6710]">{role}</p>
          <h1 className="mt-3 text-3xl font-black md:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#5C5850]">{description}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/auth/login" variant="dark" icon={FiLock}>
              Login
            </ButtonLink>
            <ButtonLink href="/auth/register" variant="light" icon={FiUser}>
              Create account
            </ButtonLink>
          </div>
        </Card>
      </div>
    </main>
  )
}

export function PortalError({ title = "Could not load platform data", message, onRetry }) {
  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12 text-[#0F1115]">
      <div className="mx-auto grid min-h-[60vh] max-w-xl place-items-center text-center">
        <Card className="w-full border-red-200 bg-red-50">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-white text-red-700">
            <FiAlertTriangle aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-3xl font-black">{title}</h1>
          <p className="mt-3 text-sm leading-7 text-[#4B4740]">{message}</p>
          {onRetry ? (
            <button onClick={onRetry} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0F1115] px-5 text-sm font-black text-white">
              Try again
            </button>
          ) : null}
        </Card>
      </div>
    </main>
  )
}

export const dashboardIcons = {
  activity: FiActivity,
  alert: FiAlertTriangle,
  bell: FiBell,
  calendar: FiCalendar,
  chart: FiBarChart2,
  check: FiCheckCircle,
  credit: FiCreditCard,
  download: FiDownload,
  file: FiFileText,
  lock: FiLock,
  map: FiMapPin,
  message: FiMessageCircle,
  search: FiSearch,
  shield: FiShield,
  trend: FiTrendingUp,
  user: FiUser,
  users: FiUsers,
  video: FiVideo,
}

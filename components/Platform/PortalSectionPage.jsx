"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { roles } from "@/data/platformData"
import { useAuth } from "@/context/AuthContext"
import { platformAPI } from "@/utils/api"
import {
  ButtonLink,
  Card,
  DashboardShell,
  DataTable,
  MessageThread,
  PortalAccessPrompt,
  PortalError,
  PortalLoading,
  ReminderCard,
  SessionCard,
  StatusPill,
  TimelineList,
  dashboardIcons,
} from "./UI"

const roleConfig = {
  client: {
    role: "Client portal",
    requiredRoles: ["Client", "Admin"],
    title: "Your therapy hub",
    subtitle: "Focused access to your appointments, messages, payments, files, and care details.",
    fetcher: () => platformAPI.getClientDashboard(),
    accessTitle: "Login to access your therapy hub",
    accessDescription: "Your appointments, payments, messages, and files are protected behind your AJW account.",
    navItems: [
      { label: "Overview", href: "/client", icon: dashboardIcons.activity },
      { label: "Appointments", href: "/client/appointments", icon: dashboardIcons.calendar },
      { label: "Messages", href: "/client/messages", icon: dashboardIcons.message },
      { label: "Payments", href: "/client/payments", icon: dashboardIcons.credit },
      { label: "Files", href: "/client/files", icon: dashboardIcons.file },
    ],
  },
  therapist: {
    role: "Therapist portal",
    requiredRoles: ["Therapist", "Admin"],
    title: "Clinical workspace",
    subtitle: "Focused access to assigned sessions, secure conversations, client files, and billing context.",
    fetcher: () => platformAPI.getTherapistDashboard(),
    accessTitle: "Login to access your clinical workspace",
    accessDescription: "Assigned sessions, secure conversations, client files, and notes require therapist access.",
    navItems: [
      { label: "Overview", href: "/therapist", icon: dashboardIcons.users },
      { label: "Appointments", href: "/therapist/appointments", icon: dashboardIcons.calendar },
      { label: "Messages", href: "/therapist/messages", icon: dashboardIcons.message },
      { label: "Payments", href: "/therapist/payments", icon: dashboardIcons.credit },
      { label: "Files", href: "/therapist/files", icon: dashboardIcons.file },
    ],
  },
  admin: {
    role: "Founder/Admin dashboard",
    requiredRoles: ["Admin"],
    title: "Practice operations",
    subtitle: "Focused operational views for appointments, messages, payments, and client file workflows.",
    fetcher: () => platformAPI.getAdminDashboard(),
    accessTitle: "Login to access practice operations",
    accessDescription: "Payments, appointments, messages, files, and audit trails are protected behind admin access.",
    navItems: [
      { label: "Overview", href: "/admin", icon: dashboardIcons.activity },
      { label: "Appointments", href: "/admin/appointments", icon: dashboardIcons.calendar },
      { label: "Messages", href: "/admin/messages", icon: dashboardIcons.message },
      { label: "Payments", href: "/admin/payments", icon: dashboardIcons.credit },
      { label: "Files", href: "/admin/files", icon: dashboardIcons.file },
    ],
  },
}

function formatCurrency(value) {
  return `KES ${Number(value || 0).toLocaleString("en-KE")}`
}

function formatDate(value) {
  if (!value) return "Not scheduled"
  try {
    return new Date(value).toLocaleDateString("en-KE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  } catch {
    return value
  }
}

function serviceFromBooking(booking) {
  return Array.isArray(booking?.services) ? booking.services[0] : null
}

function bookingRows(bookings = []) {
  return bookings.map((booking) => {
    const service = serviceFromBooking(booking)
    return {
      ID: booking._id,
      Client: [booking.postedBy?.first_name, booking.postedBy?.second_name].filter(Boolean).join(" ") || "Client",
      Therapist: [booking.therapist?.first_name, booking.therapist?.second_name].filter(Boolean).join(" ") || "Unassigned",
      Type: service?.title || service?.name || "Therapy session",
      Date: formatDate(service?.date || booking.createdAt),
      Status: booking.status || "pending",
    }
  })
}

function paymentRows(payments = []) {
  return payments.map((payment) => ({
    ID: payment._id,
    Client: [payment.postedBy?.first_name, payment.postedBy?.second_name].filter(Boolean).join(" ") || "Client",
    Description: payment.services?.[0]?.title || "Therapy session",
    Amount: formatCurrency(payment.final_amount_invoiced || payment.amountPaid),
    Status: payment.payment_status || payment.paymentStatus || "Pending",
    Method: payment.payment_method || payment.paymentType || "Not recorded",
    Date: formatDate(payment.payment_date || payment.createdAt),
  }))
}

function normalizeMessages(dashboard, portal) {
  if (portal === "admin") {
    return dashboard?.messageThreads || dashboard?.threads || []
  }
  return dashboard?.messages || []
}

function normalizeFiles(dashboard, portal) {
  if (portal === "client") return dashboard?.files || []
  if (portal === "admin") return dashboard?.files || []
  return dashboard?.files || dashboard?.selectedClient?.files || []
}

function normalizeAppointments(dashboard, portal) {
  if (portal === "client") return dashboard?.appointments || []
  if (portal === "therapist") return dashboard?.calendar || []
  return dashboard?.bookings || []
}

function normalizePayments(dashboard, portal) {
  if (portal === "client") return dashboard?.invoices || []
  if (portal === "admin") return dashboard?.payments || []
  return []
}

export default function PortalSectionPage({ portal, section }) {
  const config = roleConfig[portal]
  const { isAuthenticated, loading: authLoading, user } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sendingMessage, setSendingMessage] = useState(false)

  const loadDashboard = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError("")
      const response = await config.fetcher()
      setDashboard(response?.data || null)
    } catch (err) {
      setError(err.message || "Unable to load dashboard data.")
    } finally {
      setLoading(false)
    }
  }, [config, isAuthenticated])

  useEffect(() => {
    if (!authLoading) loadDashboard()
  }, [authLoading, loadDashboard])

  const navItems = useMemo(() => (
    config.navItems.map((item) => ({
      ...item,
      active: item.href.endsWith(`/${section}`),
    }))
  ), [config.navItems, section])

  const handleSendMessage = async (body) => {
    if (portal === "admin") return
    const clientId = portal === "client" ? dashboard?.user?.id : dashboard?.selectedClient?.id || dashboard?.clients?.[0]?.id
    const therapistId = portal === "client" ? dashboard?.thread?.therapist?._id || dashboard?.therapySummary?.therapist?.id : dashboard?.therapist?.id
    if (!clientId || !therapistId) return
    setSendingMessage(true)
    try {
      await platformAPI.sendMessage({
        clientId,
        therapistId,
        threadId: dashboard?.thread?._id || dashboard?.activeThread?._id,
        body,
      })
      await loadDashboard()
    } finally {
      setSendingMessage(false)
    }
  }

  if (authLoading || loading) return <PortalLoading label={`Loading ${section}...`} />

  if (!isAuthenticated) {
    return (
      <PortalAccessPrompt
        role={config.role}
        title={config.accessTitle}
        description={config.accessDescription}
      />
    )
  }

  if (!config.requiredRoles.includes(user?.role)) {
    return (
      <PortalAccessPrompt
        role={config.role}
        title={`${config.requiredRoles[0]} access required`}
        description="This page is protected by role-based access controls."
      />
    )
  }

  if (error) return <PortalError message={error} onRetry={loadDashboard} />

  return (
    <DashboardShell
      role={config.role}
      title={sectionTitle(section)}
      subtitle={sectionSubtitle(portal, section)}
      navItems={navItems}
      aside={<SectionAside portal={portal} section={section} />}
    >
      {section === "appointments" ? <AppointmentsSection portal={portal} dashboard={dashboard} /> : null}
      {section === "messages" ? <MessagesSection portal={portal} dashboard={dashboard} onSend={handleSendMessage} sending={sendingMessage} /> : null}
      {section === "payments" ? <PaymentsSection portal={portal} dashboard={dashboard} /> : null}
      {section === "files" ? <FilesSection portal={portal} dashboard={dashboard} /> : null}
    </DashboardShell>
  )
}

function sectionTitle(section) {
  const titles = {
    appointments: "Appointments",
    messages: "Messages",
    payments: "Payments",
    files: "Files",
  }
  return titles[section] || "Dashboard"
}

function sectionSubtitle(portal, section) {
  const copy = {
    appointments: "Manage online and in-person therapy sessions with dates, statuses, meeting links, and location details.",
    messages: "Keep care coordination in one protected thread with timestamps and attachment context.",
    payments: portal === "therapist" ? "Therapists can view billing context for care coordination; payment operations stay with admin." : "Review invoice status, payment method, amounts, and receipts.",
    files: "Access worksheets, intake documents, care plan files, and shared client resources.",
  }
  return copy[section]
}

function SectionAside({ portal, section }) {
  const role = roles.find((item) => item.key.toLowerCase() === (portal === "admin" ? "admin" : portal))
  return (
    <div className="grid gap-4">
      <Card className="bg-yellow-50">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-yellow-700">Focused page</p>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          This dashboard view is intentionally narrow so repeated work stays quick and uncluttered.
        </p>
      </Card>
      {role ? (
        <Card>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">{role.label} permissions</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {role.permissions.slice(0, 4).map((permission) => (
              <span key={permission} className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                {permission.replaceAll("_", " ")}
              </span>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  )
}

function AppointmentsSection({ portal, dashboard }) {
  const appointments = normalizeAppointments(dashboard, portal)
  if (portal === "admin") {
    return (
      <Card>
        <SectionTop label="Appointments" count={appointments.length} actionHref="/admin" />
        <DataTable columns={["ID", "Client", "Therapist", "Type", "Date", "Status"]} rows={bookingRows(appointments)} />
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      <SectionTop label="Appointments" count={appointments.length} actionHref={portal === "client" ? "/forms" : `/${portal}`} actionLabel={portal === "client" ? "Request booking" : "Back to overview"} />
      {appointments.length ? appointments.map((session) => (
        <SessionCard key={session.id || session.bookingId} session={session} />
      )) : (
        <EmptyState title="No appointments yet" text="Confirmed online and in-person sessions will appear here." />
      )}
    </div>
  )
}

function MessagesSection({ portal, dashboard, onSend, sending }) {
  const messages = normalizeMessages(dashboard, portal)
  if (portal === "admin") {
    return (
      <Card>
        <SectionTop label="Message threads" count={messages.length} actionHref="/admin" />
        <DataTable
          columns={["Client", "Therapist", "Subject", "Status", "Last message"]}
          rows={messages.map((thread) => ({
            Client: [thread.client?.first_name, thread.client?.second_name].filter(Boolean).join(" ") || "Client",
            Therapist: [thread.therapist?.first_name, thread.therapist?.second_name].filter(Boolean).join(" ") || "Therapist",
            Subject: thread.subject,
            Status: thread.status,
            "Last message": formatDate(thread.lastMessageAt),
          }))}
        />
      </Card>
    )
  }

  return <MessageThread messages={messages} onSend={onSend} sending={sending} disabled={!onSend} />
}

function PaymentsSection({ portal, dashboard }) {
  const payments = normalizePayments(dashboard, portal)
  if (portal === "therapist") {
    return (
      <Card>
        <SectionTop label="Payment context" count={0} actionHref="/therapist" />
        <EmptyState
          title="Payment operations are admin-owned"
          text="Therapists can see session status and follow up on care coordination, while invoice creation, reconciliation, and revenue reporting remain in the admin dashboard."
        />
      </Card>
    )
  }

  return (
    <Card>
      <SectionTop label="Payments" count={payments.length} actionHref={portal === "admin" ? "/admin" : "/client"} />
      <DataTable
        columns={portal === "admin" ? ["ID", "Client", "Description", "Amount", "Status", "Method", "Date"] : ["ID", "Description", "Amount", "Status", "Method", "Date"]}
        rows={paymentRows(payments).map((row) => portal === "admin" ? row : {
          ID: row.ID,
          Description: row.Description,
          Amount: row.Amount,
          Status: row.Status,
          Method: row.Method,
          Date: row.Date,
        })}
      />
    </Card>
  )
}

function FilesSection({ portal, dashboard }) {
  const files = normalizeFiles(dashboard, portal)
  return (
    <div className="grid gap-4">
      <SectionTop label="Files" count={files.length} actionHref={`/${portal}`} />
      {files.length ? files.map((file) => (
        <article key={file._id || file.title} className="rounded-2xl border border-neutral-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-yellow-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-neutral-950">{file.title}</h2>
              <p className="mt-1 text-sm text-neutral-500">
                {file.fileType || "File"} | Due {formatDate(file.dueDate)} | {file.status || "Assigned"}
              </p>
            </div>
            {file.url ? (
              <Link href={file.url} target="_blank" className="inline-flex min-h-10 items-center justify-center rounded-full border border-neutral-200 px-4 text-sm font-bold text-neutral-950 hover:bg-yellow-50">
                Open file
              </Link>
            ) : (
              <StatusPill label="No file URL" tone="muted" />
            )}
          </div>
        </article>
      )) : (
        <EmptyState title="No files yet" text="Worksheets, receipts, care plans, and shared documents will appear here." />
      )}
    </div>
  )
}

function SectionTop({ label, count, actionHref, actionLabel = "Overview" }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-yellow-700">{label}</p>
        <h2 className="mt-1 text-2xl font-black text-neutral-950">{count} records</h2>
      </div>
      <ButtonLink href={actionHref} variant="light" icon={dashboardIcons.activity}>
        {actionLabel}
      </ButtonLink>
    </div>
  )
}

function EmptyState({ title, text }) {
  return (
    <Card className="border-dashed shadow-none">
      <h2 className="text-lg font-black text-neutral-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-neutral-500">{text}</p>
    </Card>
  )
}

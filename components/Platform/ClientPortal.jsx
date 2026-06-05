"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { roles } from "@/data/platformData"
import { useAuth } from "@/context/AuthContext"
import { platformAPI } from "@/utils/api"
import {
  ButtonLink,
  Card,
  DashboardShell,
  DataTable,
  MessageThread,
  MetricCard,
  PortalAccessPrompt,
  PortalError,
  PortalLoading,
  ProfilePanel,
  ProgressBar,
  ReminderCard,
  SessionCard,
  StatusPill,
  TimelineList,
  dashboardIcons,
} from "./UI"

const navItems = [
  { label: "Overview", href: "/client", icon: dashboardIcons.activity, active: true },
  { label: "Appointments", href: "/client/appointments", icon: dashboardIcons.calendar },
  { label: "Messages", href: "/client/messages", icon: dashboardIcons.message },
  { label: "Payments", href: "/client/payments", icon: dashboardIcons.credit },
  { label: "Files", href: "/client/files", icon: dashboardIcons.file },
]

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

function getAverageProgress(goals = []) {
  if (!goals.length) return 0
  return Math.round(goals.reduce((sum, goal) => sum + Number(goal.progress || 0), 0) / goals.length)
}

function buildProfile(dashboard) {
  const user = dashboard?.user || {}
  const summary = dashboard?.therapySummary || {}
  const profile = dashboard?.profile || {}

  return {
    id: user.id,
    name: user.name || "Client",
    location: user.country || "Kenya",
    therapist: summary.therapist?.name || "Therapist assignment pending",
    carePlan: summary.carePlan || "Therapy care plan",
    status: summary.status || "Pending",
    risk: dashboard?.notes?.find((note) => note.riskStatus)?.riskStatus || "Low",
    lastUpdated: formatDate(profile.lastUpdated || profile.updatedAt),
    primaryConcern: summary.primaryConcern || "Not yet recorded",
    referralSource: profile.referralSource || "Direct intake",
    privacyLevel: "Client, assigned therapist, and admin",
    summary:
      profile.therapyGoals ||
      "Your therapy plan, session details, progress, messages, referrals, and files will appear here as your care team updates them.",
  }
}

export default function ClientPortal() {
  const clientRole = roles.find((role) => role.key === "Client")
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
      const response = await platformAPI.getClientDashboard()
      setDashboard(response?.data || null)
    } catch (err) {
      setError(err.message || "Unable to load your client portal.")
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!authLoading) loadDashboard()
  }, [authLoading, loadDashboard])

  const profile = useMemo(() => buildProfile(dashboard), [dashboard])
  const goals = dashboard?.goals || []
  const appointments = dashboard?.appointments || []
  const sessionHistory = dashboard?.sessionHistory || []
  const notifications = dashboard?.notifications || []
  const invoices = dashboard?.invoices || []
  const referrals = dashboard?.referrals || []
  const files = dashboard?.files || []
  const messages = dashboard?.messages || []
  const progressAverage = getAverageProgress(goals)
  const dueInvoices = invoices.filter((invoice) => !["Completed", "paid", "Paid"].includes(invoice.payment_status || invoice.paymentStatus))
  const unread = notifications.filter((notification) => notification.status !== "Read")

  const handleSendMessage = async (body) => {
    const therapistId = dashboard?.thread?.therapist?._id || dashboard?.therapySummary?.therapist?.id
    if (!dashboard?.user?.id || !therapistId) return

    setSendingMessage(true)
    try {
      await platformAPI.sendMessage({
        clientId: dashboard.user.id,
        therapistId,
        threadId: dashboard.thread?._id,
        body,
      })
      await loadDashboard()
    } finally {
      setSendingMessage(false)
    }
  }

  const markNotificationRead = async (id) => {
    await platformAPI.markNotificationRead(id)
    await loadDashboard()
  }

  if (authLoading || loading) return <PortalLoading label="Loading your client portal..." />

  if (!isAuthenticated) {
    return (
      <PortalAccessPrompt
        role="Client portal"
        title="Login to access your therapy hub"
        description="Your appointments, messages, invoices, worksheets, and case information are protected behind your AJW account."
      />
    )
  }

  if (user?.role !== "Client" && user?.role !== "Admin") {
    return (
      <PortalAccessPrompt
        role="Client portal"
        title="Client access required"
        description="This area is scoped to client records. Use the therapist or admin portal for your role."
      />
    )
  }

  if (error) return <PortalError message={error} onRetry={loadDashboard} />

  return (
    <DashboardShell
      role="Client portal"
      title="Your therapy hub"
      subtitle="A calm private space for your care plan, upcoming sessions, secure therapist messages, invoices, referrals, and progress tracking."
      navItems={navItems}
      aside={<ClientAside role={clientRole} />}
    >
      <div className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Therapy progress" value={`${progressAverage}%`} change={`${goals.length} goals`} detail="active plan" icon={dashboardIcons.trend} />
          <MetricCard label="Upcoming sessions" value={appointments.length} change={`${appointments.filter((item) => item.mode === "Online").length} online`} detail={`${appointments.filter((item) => item.mode !== "Online").length} in-person`} icon={dashboardIcons.calendar} />
          <MetricCard label="Invoices due" value={formatCurrency(dueInvoices.reduce((sum, invoice) => sum + Number(invoice.final_amount_invoiced || 0), 0))} change={`${dueInvoices.length} due`} detail="payment records" icon={dashboardIcons.credit} />
          <MetricCard label="Unread updates" value={unread.length} change={`${notifications.length} total`} detail="reminders and care notes" icon={dashboardIcons.message} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <ProfilePanel profile={profile} />
          <Card>
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black">Upcoming appointments</h2>
                <p className="mt-1 text-sm text-neutral-500">Meeting links and physical session details stay visible here.</p>
              </div>
              <ButtonLink href="/forms" variant="light" icon={dashboardIcons.calendar}>
                Request booking
              </ButtonLink>
            </div>
            <div className="grid gap-4">
              {appointments.length ? appointments.map((session) => (
                <SessionCard key={session.id} session={session} />
              )) : (
                <EmptyState title="No upcoming appointments" text="Your confirmed online and in-person sessions will appear here." />
              )}
            </div>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">Goals and progress</h2>
                <p className="mt-1 text-sm text-neutral-500">Progress tracking for your active care plan.</p>
              </div>
              <StatusPill label={profile.status} tone="green" icon={dashboardIcons.check} />
            </div>
            <div className="grid gap-5">
              {goals.length ? goals.map((goal) => (
                <div key={goal._id || goal.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-black text-neutral-950">{goal.title}</h3>
                    <StatusPill label={goal.status} tone={goal.status === "Improving" ? "green" : goal.status === "Needs support" ? "amber" : "blue"} />
                  </div>
                  <ProgressBar value={Number(goal.progress || 0)} label={goal.description || "Progress"} />
                </div>
              )) : (
                <EmptyState title="No goals yet" text="Your therapist can add progress goals after intake or your first session." />
              )}
            </div>
          </Card>

          <div className="grid gap-4">
            {notifications.length ? notifications.map((item) => (
              <ReminderCard key={item._id || item.title} item={item} onAction={item.status !== "Read" ? () => markNotificationRead(item._id) : null} />
            )) : (
              <EmptyState title="No notifications" text="Session reminders and follow-ups will appear here." />
            )}
          </div>
        </div>

        <div id="messages">
          <MessageThread messages={messages} onSend={handleSendMessage} sending={sendingMessage} disabled={!dashboard?.thread && !dashboard?.therapySummary?.therapist?.id} />
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <TimelineList
            items={sessionHistory.map((session) => ({
              id: session.id,
              title: session.type,
              body: `${session.mode} session with ${session.therapist?.name || "therapist"}`,
              status: session.status,
              date: formatDate(session.date),
            }))}
            title="Session history"
            icon={dashboardIcons.file}
          />
          <TimelineList
            items={referrals.map((referral) => ({
              id: referral._id,
              title: referral.type,
              body: referral.reason,
              status: referral.status,
              date: formatDate(referral.createdAt),
            }))}
            title="Referrals and important notes"
            icon={dashboardIcons.shield}
          />
        </div>

        <div id="billing" className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">Invoices and payment history</h2>
                <p className="mt-1 text-sm text-neutral-500">KES billing records, statuses, and receipt history.</p>
              </div>
              <StatusPill label="Payment data scoped" tone="yellow" icon={dashboardIcons.lock} />
            </div>
            <DataTable
              columns={["ID", "Description", "Amount", "Status", "Method", "Date"]}
              rows={invoices.map((invoice) => ({
                ID: invoice._id,
                Description: invoice.services?.[0]?.title || "Therapy session",
                Amount: formatCurrency(invoice.final_amount_invoiced),
                Status: invoice.payment_status || invoice.paymentStatus || "Pending",
                Method: invoice.payment_method || invoice.paymentType || "Not recorded",
                Date: formatDate(invoice.payment_date || invoice.createdAt),
              }))}
            />
          </Card>

          <Card id="files">
            <div className="mb-5">
              <h2 className="text-xl font-black">Files and worksheets</h2>
              <p className="mt-1 text-sm text-neutral-500">Therapist-assigned materials stay organized by status and due date.</p>
            </div>
            <div className="grid gap-3">
              {files.length ? files.map((file) => (
                <article key={file._id || file.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-neutral-950">{file.title}</h3>
                      <p className="mt-1 text-sm text-neutral-500">{file.fileType} | Due {formatDate(file.dueDate)}</p>
                    </div>
                    <StatusPill label={file.status} tone={file.status === "Assigned" ? "yellow" : "blue"} />
                  </div>
                </article>
              )) : (
                <EmptyState title="No files assigned" text="Worksheets, care plans, and shared documents will appear here." />
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

function EmptyState({ title, text }) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-5">
      <h3 className="font-black text-neutral-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-500">{text}</p>
    </div>
  )
}

function ClientAside({ role }) {
  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600">Account access</p>
        <div className="mt-4 grid gap-2">
          <ButtonLink href="/auth/login" variant="primary" icon={dashboardIcons.lock}>
            Login
          </ButtonLink>
          <ButtonLink href="/auth/register" variant="light" icon={dashboardIcons.users}>
            Sign up
          </ButtonLink>
        </div>
      </div>
      <div className="rounded-2xl border border-yellow-200 bg-white p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600">Client permissions</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {role.permissions.slice(0, 5).map((permission) => (
            <span key={permission} className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-neutral-700">
              {permission.replaceAll("_", " ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

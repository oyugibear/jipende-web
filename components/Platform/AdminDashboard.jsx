"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { executiveDashboard } from "@/data/platformData"
import { platformAPI } from "@/utils/api"
import {
  AccessModel,
  CapacityHeatmap,
  Card,
  DashboardShell,
  DataTable,
  ExecutiveMetricCard,
  JourneyFunnel,
  MetricCard,
  OperationalAlerts,
  OutcomeTrendChart,
  PortalAccessPrompt,
  PortalError,
  PortalLoading,
  ProgressBar,
  SearchControl,
  StatusPill,
  TimelineList,
  dashboardIcons,
} from "./UI"

const navItems = [
  { label: "Overview", href: "/admin", icon: dashboardIcons.activity, active: true },
  { label: "Appointments", href: "/admin/appointments", icon: dashboardIcons.calendar },
  { label: "Messages", href: "/admin/messages", icon: dashboardIcons.message },
  { label: "Payments", href: "/admin/payments", icon: dashboardIcons.credit },
  { label: "Files", href: "/admin/files", icon: dashboardIcons.file },
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

function sessionType(booking) {
  const service = Array.isArray(booking.services) ? booking.services[0] : null
  return service?.title || service?.name || "Therapy session"
}

function sessionDate(booking) {
  const service = Array.isArray(booking.services) ? booking.services[0] : null
  return service?.date || booking.createdAt
}

export default function AdminDashboard() {
  const { isAuthenticated, loading: authLoading, user } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadDashboard = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError("")
      const response = await platformAPI.getAdminDashboard()
      setDashboard(response?.data || null)
    } catch (err) {
      setError(err.message || "Unable to load admin dashboard.")
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!authLoading) loadDashboard()
  }, [authLoading, loadDashboard])

  const metrics = dashboard?.metrics || {}
  const finance = dashboard?.finance || {}
  const outcomes = dashboard?.outcomes || {}
  const acquisition = dashboard?.acquisition || {}
  const roles = dashboard?.roles || []
  const analyticsSchema = dashboard?.analyticsSchema || []

  const metricCards = useMemo(() => [
    {
      label: "Active clients",
      value: metrics.activeClients || 0,
      change: `${metrics.totalClients || 0} total`,
      detail: "client records",
      icon: dashboardIcons.users,
    },
    {
      label: "Therapists",
      value: metrics.totalTherapists || 0,
      change: `${metrics.totalBookings || 0} bookings`,
      detail: "capacity",
      icon: dashboardIcons.activity,
    },
    {
      label: "Revenue",
      value: formatCurrency(metrics.totalRevenue),
      change: formatCurrency(metrics.outstandingAmount),
      detail: "outstanding",
      icon: dashboardIcons.credit,
    },
    {
      label: "Retention",
      value: `${metrics.retentionRate || 0}%`,
      change: `${metrics.averageProgress || 0}%`,
      detail: "avg progress",
      icon: dashboardIcons.trend,
    },
  ], [metrics])

  const executiveMetrics = useMemo(() => {
    const fallback = executiveDashboard.metrics
    return [
      {
        label: "Active Clients",
        value: Number(metrics.activeClients || metrics.totalClients || 0).toLocaleString("en-KE") || fallback[0].value,
        change: fallback[0].change,
        tone: "gold",
        icon: dashboardIcons.user,
      },
      {
        label: "Retention Rate",
        value: `${metrics.retentionRate || 94.2}%`,
        change: fallback[1].change,
        tone: "green",
        icon: dashboardIcons.trend,
      },
      {
        label: "Therapist Util.",
        value: `${metrics.therapistUtilization || 78.5}%`,
        change: fallback[2].change,
        tone: "red",
        icon: dashboardIcons.activity,
      },
      {
        label: "MRR Growth",
        value: metrics.totalRevenue ? formatCurrency(metrics.totalRevenue) : fallback[3].value,
        change: fallback[3].change,
        tone: "gold",
        icon: dashboardIcons.credit,
      },
    ]
  }, [metrics])

  if (authLoading || loading) return <PortalLoading label="Loading founder dashboard..." />

  if (!isAuthenticated) {
    return (
      <PortalAccessPrompt
        role="Founder/Admin dashboard"
        title="Login to access practice operations"
        description="Operational metrics, audit logs, billing, and role information are protected behind admin access."
      />
    )
  }

  if (user?.role !== "Admin") {
    return (
      <PortalAccessPrompt
        role="Founder/Admin dashboard"
        title="Admin access required"
        description="This dashboard contains organization-wide operational and financial data."
      />
    )
  }

  if (error) return <PortalError message={error} onRetry={loadDashboard} />

  const BellIcon = dashboardIcons.bell

  return (
    <DashboardShell
      role="Founder/Admin dashboard"
      title="Wellness Overview"
      subtitle="Real-time clinical insights and operations across care quality, growth, capacity, revenue, and client progress."
      navItems={navItems}
      topActions={
        <>
          <SearchControl placeholder="Search patients..." />
          <button className="grid h-11 w-11 place-items-center rounded-full border border-[#E8E1D5] bg-white text-[#0F1115] shadow-sm" aria-label="Notifications">
            <BellIcon aria-hidden="true" />
          </button>
          <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-[#0F1115] text-xs font-black text-[#F4C542]">
            AJ
          </div>
        </>
      }
      aside={<AdminAside />}
    >
      <div className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {executiveMetrics.map((metric) => (
            <ExecutiveMetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_0.48fr]">
          <OutcomeTrendChart data={executiveDashboard.trend} />
          <JourneyFunnel items={executiveDashboard.journey} />
        </div>

        <CapacityHeatmap />

        <OperationalAlerts alerts={executiveDashboard.alerts} />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <Card id="clients">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black">Client management</h2>
                <p className="mt-1 text-sm text-neutral-500">Operational records without exposing full case notes on the overview screen.</p>
              </div>
              <StatusPill label="Sensitive data protected" tone="green" icon={dashboardIcons.lock} />
            </div>
            <DataTable
              columns={["Name", "Email", "Phone", "Status", "Country", "Role"]}
              rows={(dashboard?.clients || []).map((client) => ({
                Name: client.name,
                Email: client.email,
                Phone: client.phone,
                Status: client.profileStatus || "Pending",
                Country: client.country,
                Role: client.role,
              }))}
            />
          </Card>

          <Card id="therapists">
            <div className="mb-5">
              <h2 className="text-xl font-black">Therapist management</h2>
              <p className="mt-1 text-sm text-neutral-500">Caseload, booking count, role, and active client coverage.</p>
            </div>
            <div className="grid gap-3">
              {(dashboard?.therapists || []).length ? dashboard.therapists.map((person) => (
                <article key={person.id} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-neutral-950">{person.name}</h3>
                      <p className="mt-1 text-sm text-neutral-500">{person.email}</p>
                    </div>
                    <StatusPill label={`${person.clientCount || 0} clients`} tone="green" />
                  </div>
                  <div className="mt-4">
                    <ProgressBar value={Math.min(Number(person.bookingCount || 0) * 5, 100)} label={`${person.bookingCount || 0} bookings`} />
                  </div>
                </article>
              )) : (
                <EmptyState title="No therapists yet" text="Therapist users will appear here after they are created." />
              )}
            </div>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <Card id="bookings">
            <div className="mb-5">
              <h2 className="text-xl font-black">Booking overview</h2>
              <p className="mt-1 text-sm text-neutral-500">Online, in-person, group, and organizational sessions.</p>
            </div>
            <DataTable
              columns={["ID", "Client", "Therapist", "Type", "Date", "Status"]}
              rows={(dashboard?.bookings || []).map((booking) => ({
                ID: booking._id,
                Client: [booking.postedBy?.first_name, booking.postedBy?.second_name].filter(Boolean).join(" ") || "Client",
                Therapist: [booking.therapist?.first_name, booking.therapist?.second_name].filter(Boolean).join(" ") || "Unassigned",
                Type: sessionType(booking),
                Date: formatDate(sessionDate(booking)),
                Status: booking.status,
              }))}
            />
          </Card>

          <Card id="finance">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">Invoice and payment overview</h2>
                <p className="mt-1 text-sm text-neutral-500">Revenue, outstanding balances, paid invoice count, and collection status.</p>
              </div>
              <StatusPill label="KES" tone="yellow" icon={dashboardIcons.credit} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Total revenue", formatCurrency(finance.totalRevenue)],
                ["Outstanding", formatCurrency(finance.outstandingAmount)],
                ["Paid invoices", finance.paidCount || 0],
                ["Outstanding invoices", finance.outstandingCount || 0],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">{label}</p>
                  <p className="mt-3 text-2xl font-black text-neutral-950">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <OpsPanel title="Acquisition metrics" items={Object.entries(acquisition).map(([label, value]) => ({ label: label.replace(/([A-Z])/g, " $1"), value }))} />
          <OpsPanel title="Progress and outcome metrics" items={Object.entries(outcomes).map(([label, value]) => ({ label: label.replace(/([A-Z])/g, " $1"), value }))} />
          <Card>
            <h2 className="text-xl font-black">Referral metrics</h2>
            <div className="mt-5 grid gap-4">
              <ProgressBar value={outcomes.referralCompletionRate || 0} label="Referral completion" tone="green" />
              <ProgressBar value={Math.min(Number(acquisition.corporateReferrals || 0) * 10, 100)} label="Corporate source share" tone="yellow" />
              <ProgressBar value={Math.min(Number(acquisition.therapistReferrals || 0) * 10, 100)} label="Therapist referral share" tone="blue" />
              <ProgressBar value={Math.min(Number(outcomes.highRiskEscalations || 0) * 10, 100)} label="High-risk escalations" tone="red" />
            </div>
          </Card>
        </div>

        <AccessModel roles={roles} schema={analyticsSchema} />

        <div id="audit" className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <TimelineList
            items={(dashboard?.auditLogs || []).map((log) => ({
              id: log._id,
              title: log.action,
              body: `${log.actor?.first_name || log.actorRole || "System"} | ${log.scope}`,
              date: formatDate(log.createdAt),
            }))}
            title="Audit logs"
            icon={dashboardIcons.file}
          />
          <Card>
            <div className="mb-5">
              <h2 className="text-xl font-black">Role management</h2>
              <p className="mt-1 text-sm text-neutral-500">Clear separation between public, client, therapist, and admin surfaces.</p>
            </div>
            <DataTable
              columns={["Role", "Home", "Permissions"]}
              rows={roles.map((role) => ({
                Role: role.label,
                Home: role.home,
                Permissions: role.permissions.length,
              }))}
            />
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

function OpsPanel({ title, items }) {
  return (
    <Card>
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.length ? items.map((item) => (
          <article key={item.label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-sm font-semibold capitalize text-neutral-500">{item.label}</p>
            <p className="mt-3 text-3xl font-black text-neutral-950">{item.value}</p>
          </article>
        )) : (
          <EmptyState title="No metrics yet" text="Metrics appear as client, session, referral, and payment data grows." />
        )}
      </div>
    </Card>
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

function AdminAside() {
  return (
    <div className="grid gap-4">
      <div className="rounded-2xl bg-yellow-300 p-4 text-neutral-950">
        <p className="text-xs font-black uppercase tracking-[0.16em]">Founder view</p>
        <p className="mt-3 text-sm font-semibold leading-6">
          Monitor growth without losing sight of care quality, privacy, therapist capacity, and clinical outcomes.
        </p>
      </div>
      <div className="rounded-2xl border border-yellow-200 bg-white p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600">Protected entities</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Profiles", "Sessions", "Notes", "Invoices", "Referrals", "Messages"].map((item) => (
            <span key={item} className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-neutral-700">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

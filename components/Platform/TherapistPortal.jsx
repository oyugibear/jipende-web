"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { clientProfile, quickUpdateFields, roles } from "@/data/platformData"
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
  ProgressBar,
  StatusPill,
  TimelineList,
  dashboardIcons,
} from "./UI"

const navItems = [
  { label: "Caseload", href: "/therapist", icon: dashboardIcons.users, active: true },
  { label: "Appointments", href: "/therapist/appointments", icon: dashboardIcons.calendar },
  { label: "Messages", href: "/therapist/messages", icon: dashboardIcons.message },
  { label: "Payments", href: "/therapist/payments", icon: dashboardIcons.credit },
  { label: "Files", href: "/therapist/files", icon: dashboardIcons.file },
]

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

export default function TherapistPortal() {
  const therapistRole = roles.find((role) => role.key === "Therapist")
  const { isAuthenticated, loading: authLoading, user } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [selectedClientId, setSelectedClientId] = useState("")
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
      const response = await platformAPI.getTherapistDashboard({ clientId: selectedClientId || undefined })
      const nextData = response?.data || null
      setDashboard(nextData)
      if (!selectedClientId && nextData?.selectedClient?.id) {
        setSelectedClientId(nextData.selectedClient.id)
      }
    } catch (err) {
      setError(err.message || "Unable to load therapist portal.")
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, selectedClientId])

  useEffect(() => {
    if (!authLoading) loadDashboard()
  }, [authLoading, loadDashboard])

  const selectedClient = useMemo(() => {
    if (!dashboard?.clients?.length) return null
    return dashboard.clients.find((client) => client.id === selectedClientId) || dashboard.selectedClient || dashboard.clients[0]
  }, [dashboard, selectedClientId])

  const selectedClientGoals = (dashboard?.goals || []).filter((goal) => {
    const goalClientId = goal.client?._id || goal.client?.id || goal.client
    return selectedClient?.id && goalClientId?.toString() === selectedClient.id.toString()
  })

  const handleSendMessage = async (body) => {
    if (!selectedClient?.id || !dashboard?.therapist?.id) return

    setSendingMessage(true)
    try {
      await platformAPI.sendMessage({
        clientId: selectedClient.id,
        therapistId: dashboard.therapist.id,
        threadId: dashboard.activeThread?._id,
        body,
      })
      await loadDashboard()
    } finally {
      setSendingMessage(false)
    }
  }

  const handleCreateNote = async (noteData) => {
    await platformAPI.createNote({
      ...noteData,
      clientId: selectedClient.id,
      therapistId: dashboard.therapist.id,
    })
    await loadDashboard()
  }

  const handleCreateReferral = async (referralData) => {
    await platformAPI.createReferral({
      ...referralData,
      clientId: selectedClient.id,
      therapistId: dashboard.therapist.id,
    })
    await loadDashboard()
  }

  const handleUpdateSession = async (sessionId, sessionData) => {
    await platformAPI.updateSession(sessionId, sessionData)
    await loadDashboard()
  }

  if (authLoading || loading) return <PortalLoading label="Loading therapist workspace..." />

  if (!isAuthenticated) {
    return (
      <PortalAccessPrompt
        role="Therapist portal"
        title="Login to access your clinical workspace"
        description="Assigned clients, notes, session details, referrals, and messages are protected behind therapist access."
      />
    )
  }

  if (user?.role !== "Therapist" && user?.role !== "Admin") {
    return (
      <PortalAccessPrompt
        role="Therapist portal"
        title="Therapist access required"
        description="This workspace is scoped to therapist assignments. Use the client portal for your personal care records."
      />
    )
  }

  if (error) return <PortalError message={error} onRetry={loadDashboard} />

  const metrics = dashboard?.metrics || {}
  const clients = dashboard?.clients || []
  const calendar = dashboard?.calendar || []
  const notes = dashboard?.notes || []
  const referrals = dashboard?.referrals || []

  return (
    <DashboardShell
      role="Therapist portal"
      title="Clinical workspace"
      subtitle="A focused workbench for assigned clients, secure conversations, notes, progress tracking, meeting links, referrals, and follow-up actions."
      navItems={navItems}
      aside={<TherapistAside role={therapistRole} />}
    >
      <div className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricTile label="Assigned clients" value={metrics.assignedClients || clients.length} pill={`${clients.filter((client) => client.flags?.length).length} need follow-up`} icon={dashboardIcons.users} />
          <MetricTile label="Today sessions" value={metrics.todaySessions || 0} pill="calendar synced" icon={dashboardIcons.calendar} />
          <MetricTile label="Open notes" value={metrics.openNotes || 0} pill="clinical docs" icon={dashboardIcons.file} />
          <MetricTile label="Risk watch" value={metrics.riskWatch || 0} pill="monitor" icon={dashboardIcons.shield} tone="red" />
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black">Assigned clients</h2>
                <p className="mt-1 text-sm text-neutral-500">Risk, progress, next session, and follow-up flags at a glance.</p>
              </div>
              <ButtonLink href="/therapist#quick-update" variant="dark" icon={dashboardIcons.file}>
                Quick update
              </ButtonLink>
            </div>
            <div className="grid gap-3">
              {clients.length ? clients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={`rounded-2xl border p-4 text-left transition ${selectedClient?.id === client.id ? "border-neutral-950 bg-yellow-50" : "border-neutral-200 bg-neutral-50 hover:border-yellow-300"}`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-black text-neutral-950">{client.name}</h3>
                        <StatusPill label={client.risk || "Low"} tone={client.risk === "Low" ? "green" : "amber"} />
                        <StatusPill label={client.status || "Active"} tone={client.status === "Monitor" ? "amber" : "blue"} />
                      </div>
                      <p className="mt-2 text-sm text-neutral-600">
                        {client.plan} | Next: {client.nextSession?.date ? formatDate(client.nextSession.date) : "Not scheduled"}
                      </p>
                    </div>
                    <div className="min-w-52">
                      <ProgressBar value={Number(client.progress || 0)} label="Progress" tone={client.progress > 70 ? "green" : "yellow"} />
                    </div>
                  </div>
                </button>
              )) : (
                <EmptyState title="No assigned clients" text="Clients appear here after admin assigns you to a booking." />
              )}
            </div>
          </Card>

          <ClientDetailCard client={selectedClient} goals={selectedClientGoals} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <Card id="calendar">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">Calendar</h2>
                <p className="mt-1 text-sm text-neutral-500">Session mode, preparation task, and client context.</p>
              </div>
              <StatusPill label="Live bookings" tone="yellow" icon={dashboardIcons.calendar} />
            </div>
            <div className="grid gap-3">
              {calendar.length ? calendar.map((event) => (
                <article key={event.id} className="grid grid-cols-[92px_1fr] gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <p className="text-sm font-black text-neutral-950">{event.time || "TBD"}</p>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black">{event.type}</h3>
                      <StatusPill label={event.mode} tone={event.mode === "Online" ? "blue" : "yellow"} />
                    </div>
                    <p className="mt-2 text-sm text-neutral-600">{formatDate(event.date)} | {event.location}</p>
                  </div>
                </article>
              )) : (
                <EmptyState title="No sessions scheduled" text="Your assigned bookings will appear here." />
              )}
            </div>
          </Card>

          <MeetingLinkManager sessions={calendar} onUpdate={handleUpdateSession} />
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <div id="notes">
            <TimelineList
              items={notes.map((note) => ({
                id: note._id,
                title: note.title,
                body: note.body,
                status: note.riskStatus,
                tag: note.noteType,
                date: formatDate(note.createdAt),
              }))}
              title="Session and progress notes"
              icon={dashboardIcons.file}
            />
          </div>
          <QuickUpdateForm onSubmit={handleCreateNote} disabled={!selectedClient} />
        </div>

        <div id="inbox">
          <MessageThread messages={dashboard?.messages || []} onSend={handleSendMessage} sending={sendingMessage} disabled={!selectedClient} />
        </div>

        <div id="referrals" className="grid gap-5 xl:grid-cols-2">
          <TimelineList
            items={referrals.map((referral) => ({
              id: referral._id,
              title: referral.type,
              body: referral.reason,
              status: referral.status,
              date: formatDate(referral.createdAt),
            }))}
            title="Referral tracking"
            icon={dashboardIcons.shield}
          />
          <ReferralForm onSubmit={handleCreateReferral} disabled={!selectedClient} />
        </div>
      </div>
    </DashboardShell>
  )
}

function MetricTile({ label, value, pill, icon: Icon, tone = "yellow" }) {
  return (
    <Card className="flex min-h-40 flex-col justify-between">
      <p className="text-sm font-semibold text-neutral-500">{label}</p>
      <p className="text-4xl font-black">{value}</p>
      <StatusPill label={pill} tone={tone} icon={Icon} />
    </Card>
  )
}

function ClientDetailCard({ client, goals }) {
  const displayName = client?.name || "No client selected"
  return (
    <Card tone="dark">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600">Selected client</p>
          <h2 className="mt-3 text-3xl font-black">{displayName}</h2>
          <p className="mt-2 text-sm text-neutral-700">{client?.plan || clientProfile.primaryConcern}</p>
        </div>
        <StatusPill label={client?.risk || "Low"} tone={client?.risk === "Low" ? "green" : "amber"} icon={dashboardIcons.shield} />
      </div>
      <p className="mt-5 text-sm leading-7 text-neutral-700">
        {client ? "Use this view to keep the next clinical action clear before messaging, notes, referrals, or session updates." : clientProfile.summary}
      </p>
      <div className="mt-6 grid gap-3">
        {goals.length ? goals.map((goal) => (
          <div key={goal._id || goal.title} className="rounded-2xl bg-white/70 p-4">
            <ProgressBar value={Number(goal.progress || 0)} label={goal.title} tone={goal.progress > 65 ? "green" : "yellow"} />
          </div>
        )) : (
          <div className="rounded-2xl bg-white/70 p-4 text-sm font-semibold text-neutral-600">
            No goals recorded for this client yet.
          </div>
        )}
      </div>
    </Card>
  )
}

function MeetingLinkManager({ sessions, onUpdate }) {
  const [bookingId, setBookingId] = useState("")
  const [googleMeetLink, setGoogleMeetLink] = useState("")
  const [status, setStatus] = useState("confirmed")
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!bookingId) return
    setSaving(true)
    try {
      await onUpdate(bookingId, { googleMeetLink, status })
      setGoogleMeetLink("")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-xl font-black">Meeting link management</h2>
        <p className="mt-1 text-sm text-neutral-500">Update Google Meet links and session confirmation status.</p>
      </div>
      <DataTable
        columns={["ID", "Type", "Mode", "Status", "Location"]}
        rows={sessions.map((session) => ({
          ID: session.bookingId || session.id,
          Type: session.type,
          Mode: session.mode,
          Status: session.status,
          Location: session.mode === "Online" ? session.meetingLink || "No link yet" : session.location,
        }))}
      />
      <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
        <label className="grid gap-2 text-sm font-bold text-neutral-700">
          Booking
          <select value={bookingId} onChange={(event) => setBookingId(event.target.value)} className="min-h-11 rounded-2xl border border-neutral-200 bg-white px-4">
            <option value="">Select booking</option>
            {sessions.map((session) => (
              <option key={session.bookingId || session.id} value={session.bookingId || session.id}>
                {session.type} | {formatDate(session.date)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-neutral-700">
          Google Meet link
          <input value={googleMeetLink} onChange={(event) => setGoogleMeetLink(event.target.value)} className="min-h-11 rounded-2xl border border-neutral-200 bg-white px-4" placeholder="https://meet.google.com/..." />
        </label>
        <label className="grid gap-2 text-sm font-bold text-neutral-700">
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="min-h-11 rounded-2xl border border-neutral-200 bg-white px-4">
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <button disabled={saving || !bookingId} className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-bold text-white disabled:opacity-45">
          {saving ? "Saving..." : "Save session update"}
        </button>
      </form>
    </Card>
  )
}

function QuickUpdateForm({ onSubmit, disabled }) {
  const [values, setValues] = useState({
    title: "",
    body: "",
    moodRating: "",
    riskStatus: "Low",
    nextStep: "",
    visibleToClient: false,
    followUpRequired: false,
  })
  const [saving, setSaving] = useState(false)

  const updateValue = (field, value) => setValues((current) => ({ ...current, [field]: value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (disabled || !values.title || !values.body) return
    setSaving(true)
    try {
      await onSubmit({
        ...values,
        noteType: "Progress note",
        moodRating: values.moodRating ? Number(values.moodRating) : undefined,
      })
      setValues({ title: "", body: "", moodRating: "", riskStatus: "Low", nextStep: "", visibleToClient: false, followUpRequired: false })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card id="quick-update">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black">Quick update form</h2>
          <p className="mt-1 text-sm text-neutral-500">Capture essential post-session data without opening a long note.</p>
        </div>
        <StatusPill label="Draft safe" tone="green" icon={dashboardIcons.lock} />
      </div>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <label className="grid gap-2 text-sm font-bold text-neutral-700">
          Note title
          <input value={values.title} onChange={(event) => updateValue("title", event.target.value)} className="min-h-11 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm font-normal outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200" placeholder="Session summary" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-neutral-700">
          Note body
          <textarea value={values.body} onChange={(event) => updateValue("body", event.target.value)} className="min-h-28 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-normal outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200" placeholder="What changed, what was agreed, what should happen next?" />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickUpdateFields.slice(0, 3).map((field) => (
            <label key={field} className="grid gap-2 text-sm font-bold text-neutral-700">
              {field}
              <input className="min-h-11 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm font-normal outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200" placeholder={field} />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Risk status
            <select value={values.riskStatus} onChange={(event) => updateValue("riskStatus", event.target.value)} className="min-h-11 rounded-2xl border border-neutral-200 bg-neutral-50 px-4">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Crisis">Crisis</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700">
            Mood rating
            <input value={values.moodRating} onChange={(event) => updateValue("moodRating", event.target.value)} type="number" min="1" max="10" className="min-h-11 rounded-2xl border border-neutral-200 bg-neutral-50 px-4" placeholder="1-10" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-neutral-700 sm:col-span-2">
            Next task
            <input value={values.nextStep} onChange={(event) => updateValue("nextStep", event.target.value)} className="min-h-11 rounded-2xl border border-neutral-200 bg-neutral-50 px-4" placeholder="Follow-up action" />
          </label>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-bold text-neutral-700">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={values.visibleToClient} onChange={(event) => updateValue("visibleToClient", event.target.checked)} />
            Visible to client
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={values.followUpRequired} onChange={(event) => updateValue("followUpRequired", event.target.checked)} />
            Follow-up required
          </label>
        </div>
        <button disabled={disabled || saving || !values.title || !values.body} className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-bold text-white disabled:opacity-45">
          {saving ? "Saving..." : "Save note"}
        </button>
      </form>
    </Card>
  )
}

function ReferralForm({ onSubmit, disabled }) {
  const [values, setValues] = useState({ type: "", reason: "", priority: "Medium", externalProvider: "" })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (disabled || !values.type || !values.reason) return
    setSaving(true)
    try {
      await onSubmit(values)
      setValues({ type: "", reason: "", priority: "Medium", externalProvider: "" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <h2 className="text-xl font-black">Create referral</h2>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
        <input value={values.type} onChange={(event) => setValues((current) => ({ ...current, type: event.target.value }))} className="min-h-11 rounded-2xl border border-neutral-200 bg-neutral-50 px-4" placeholder="Referral type" />
        <textarea value={values.reason} onChange={(event) => setValues((current) => ({ ...current, reason: event.target.value }))} className="min-h-28 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3" placeholder="Reason" />
        <select value={values.priority} onChange={(event) => setValues((current) => ({ ...current, priority: event.target.value }))} className="min-h-11 rounded-2xl border border-neutral-200 bg-neutral-50 px-4">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input value={values.externalProvider} onChange={(event) => setValues((current) => ({ ...current, externalProvider: event.target.value }))} className="min-h-11 rounded-2xl border border-neutral-200 bg-neutral-50 px-4" placeholder="External provider" />
        <button disabled={disabled || saving || !values.type || !values.reason} className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-bold text-white disabled:opacity-45">
          {saving ? "Saving..." : "Create referral"}
        </button>
      </form>
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

function TherapistAside({ role }) {
  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600">Current focus</p>
        <p className="mt-3 text-sm leading-6 text-neutral-700">
          Complete open notes, confirm online links and in-person room details, and check risk flags before end of day.
        </p>
      </div>
      <div className="rounded-2xl border border-yellow-200 bg-white p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600">Therapist permissions</p>
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

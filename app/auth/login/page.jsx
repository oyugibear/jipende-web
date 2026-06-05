"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiArrowRight, FiMail, FiLock } from "react-icons/fi"
import AuthShell, { SocialSignInButtons } from "@/components/Platform/AuthShell"
import { useAuth } from "@/context/AuthContext"

const roleHome = {
  Client: "/client",
  Therapist: "/therapist",
  Admin: "/admin",
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    setNotice("")

    try {
      const result = await login(email, password)

      if (result.success) {
        const nextRole = result.data?.user?.role
        router.push(roleHome[nextRole] || "/client")
      } else {
        setError(result.message || "Login failed")
      }
    } catch {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleProviderClick = (provider) => {
    setError("")
    setNotice(`${provider} sign-in is ready for UI, but the API still needs OAuth credentials and callback routes before it can authenticate users.`)
  }

  return (
    <AuthShell
      eyebrow="Secure sign in"
      title="Welcome back to your care space."
      description="Sign in to manage therapy sessions, secure messages, payment records, files, and operational dashboards based on your role."
      footer={
        <p className="text-center text-sm text-neutral-600">
          New to AJW?{" "}
          <Link href="/auth/register" className="font-black text-neutral-950 underline decoration-yellow-400 decoration-2 underline-offset-4">
            Create your account
          </Link>
        </p>
      }
    >
      <div>
        <h2 className="text-2xl font-black text-neutral-950">Sign in</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-500">Use your email and password, or choose a provider once OAuth is configured.</p>
      </div>

      <div className="mt-6">
        <SocialSignInButtons onProviderClick={handleProviderClick} />
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">or email</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      {error ? <Alert tone="error" message={error} /> : null}
      {notice ? <Alert tone="info" message={notice} /> : null}

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-bold text-neutral-700">
          Email address
          <span className="relative">
            <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <input
              type="email"
              autoComplete="email"
              required
              className="min-h-12 w-full rounded-2xl border border-neutral-200 bg-white pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </span>
        </label>

        <label className="grid gap-2 text-sm font-bold text-neutral-700">
          Password
          <span className="relative">
            <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <input
              type="password"
              autoComplete="current-password"
              required
              className="min-h-12 w-full rounded-2xl border border-neutral-200 bg-white pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </span>
        </label>

        <div className="flex items-center justify-between gap-4 text-sm">
          <Link href="/auth/forgotPassword" className="font-bold text-neutral-600 hover:text-neutral-950">
            Forgot password?
          </Link>
          <Link href="/terms" className="font-bold text-neutral-600 hover:text-neutral-950">
            Privacy
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-yellow-300 px-5 text-sm font-black text-neutral-950 transition duration-200 hover:-translate-y-0.5 hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in securely"}
          <FiArrowRight aria-hidden="true" />
        </button>
      </form>
    </AuthShell>
  )
}

function Alert({ message, tone }) {
  const classes = tone === "error"
    ? "border-red-200 bg-red-50 text-red-800"
    : "border-yellow-200 bg-yellow-50 text-neutral-700"

  return (
    <div className={`rounded-2xl border p-4 text-sm font-semibold leading-6 ${classes}`}>
      {message}
    </div>
  )
}

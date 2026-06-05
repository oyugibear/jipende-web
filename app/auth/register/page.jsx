"use client"

import { Button, Divider, Form, message } from "antd"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiArrowRight } from "react-icons/fi"
import AuthShell, { SocialSignInButtons } from "@/components/Platform/AuthShell"
import { AdvInputs } from "@/components/Constants/AdvInputs"
import { useAuth } from "@/context/AuthContext"
import countriesData from "@/data/countries.json"

export default function RegisterPage() {
  const [hasMounted, setHasMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()
  const [form] = Form.useForm()
  const countries = countriesData.countries

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  const handleSubmit = async (values) => {
    setLoading(true)

    try {
      const fullPhoneNumber = `${values.countryCode}${values.phoneNumberOnly.replace(/\s/g, "")}`

      const registrationData = {
        first_name: values.firstName,
        second_name: values.lastName,
        email: values.email,
        phone_number: fullPhoneNumber,
        country_of_residence: values.residence,
        nationality: values.nationality,
        date_of_birth: values.dob.format("YYYY-MM-DD"),
        password: values.password,
        role: "Client",
      }

      const result = await register(registrationData)

      if (result.success) {
        message.success("Your account has been created successfully.")
        router.push("/client")
      } else {
        message.error(result.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      message.error("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleProviderClick = (provider) => {
    message.info(`${provider} sign-up is ready for UI, but OAuth credentials and callback routes must be configured on the API first.`)
  }

  return (
    <AuthShell
      eyebrow="Create client account"
      title="Start with a protected therapy profile."
      description="Create an AJW account so intake details, appointments, care files, invoices, and therapist messages can live in one secure place."
      footer={
        <p className="text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-black text-neutral-950 underline decoration-yellow-400 decoration-2 underline-offset-4">
            Sign in
          </Link>
        </p>
      }
    >
      <div>
        <h2 className="text-2xl font-black text-neutral-950">Create account</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-500">
          This creates a client account. Therapist and admin roles are assigned by the AJW team.
        </p>
      </div>

      <div className="mt-6">
        <SocialSignInButtons onProviderClick={handleProviderClick} mode="sign up" />
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">or profile details</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        autoComplete="off"
        className="ajw-auth-form"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AdvInputs.TextInput
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            rules={[
              { required: true, message: "First name is required" },
              { min: 2, message: "First name must be at least 2 characters" },
            ]}
          />

          <AdvInputs.TextInput
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            rules={[
              { required: true, message: "Last name is required" },
              { min: 2, message: "Last name must be at least 2 characters" },
            ]}
          />
        </div>

        <AdvInputs.EmailInput />
        <AdvInputs.PhoneInput />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AdvInputs.DateInput />
          <AdvInputs.NationalityInput />
        </div>

        <AdvInputs.CountrySelect countries={countries} />

        <Divider className="!my-5" />

        <AdvInputs.PasswordRequirements />
        <AdvInputs.PasswordInput />
        <AdvInputs.ConfirmPasswordInput />

        <Form.Item className="mb-4">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="!flex !h-12 !w-full !items-center !justify-center !gap-2 !rounded-full !border-yellow-300 !bg-yellow-300 !text-sm !font-black !text-neutral-950 hover:!border-yellow-200 hover:!bg-yellow-200"
          >
            {loading ? "Creating account..." : "Create protected account"}
            <FiArrowRight aria-hidden="true" />
          </Button>
        </Form.Item>
      </Form>

      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-xs leading-6 text-neutral-600">
        By creating an account, you agree to AJW’s{" "}
        <Link href="/terms" className="font-black text-neutral-950 underline decoration-yellow-400 decoration-2 underline-offset-4">
          terms and privacy policy
        </Link>
        . If you are in crisis, contact local emergency services or go to the nearest hospital.
      </div>
    </AuthShell>
  )
}

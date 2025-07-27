"use client"

import { Form, Button, message, Card, Typography, Divider } from 'antd';
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import countriesData from '@/data/countries.json';
import Link from 'next/link';
import { AdvInputs } from '@/components/Constants/AdvInputs';

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [hasMounted, setHasMounted] = useState(false)
  const { register } = useAuth();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const countries = countriesData.countries;

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      // Combine country code and phone number
      const fullPhoneNumber = `${values.countryCode}${values.phoneNumberOnly.replace(/\s/g, '')}`;
      
      const registrationData = {
        first_name: values.firstName,
        second_name: values.lastName,
        email: values.email,
        phone_number: fullPhoneNumber,
        country_of_residence: values.residence,
        nationality: values.nationality,
        date_of_birth: values.dob.format('YYYY-MM-DD'),
        password: values.password,
        role: "Client"
      };

      const result = await register(registrationData);
      
      if (result.success) {
        message.success("Your Account has Been Created Successfully!");
        router.push("/auth/login");
      } else {
        message.error(result.message || "Registration failed. Please try again.");
      }
      
    } catch (error) {
      console.error("Registration error:", error);
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <Card 
        className="w-full max-w-lg shadow-xl border-0"
        bodyStyle={{ padding: '2rem' }}
      >
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2 !text-gray-800">
            Create Your Account
          </Title>
          <Text className="text-gray-600">
            Join Jipende Wellness for your mental health journey
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdvInputs.TextInput
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              rules={[
                { required: true, message: 'First name is required' },
                { min: 2, message: 'First name must be at least 2 characters' }
              ]}
            />

            <AdvInputs.TextInput
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              rules={[
                { required: true, message: 'Last name is required' },
                { min: 2, message: 'Last name must be at least 2 characters' }
              ]}
            />
          </div>

          <AdvInputs.EmailInput />

          <AdvInputs.PhoneInput />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdvInputs.DateInput />

            <AdvInputs.NationalityInput />
          </div>

          <AdvInputs.CountrySelect
            countries={countries}
          />

          <Divider className="!my-6" />

          <AdvInputs.PasswordRequirements />

          <AdvInputs.PasswordInput />

          <AdvInputs.ConfirmPasswordInput />

          <Form.Item className="mb-4">
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              loading={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 h-12 text-base font-medium"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text className="text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-yellow-600 hover:text-yellow-700 font-medium">
                Sign in here
              </Link>
            </Text>
          </div>
        </Form>

        <Divider className="!my-6" />

        <div className="text-center">
          <Text className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-yellow-600 hover:text-yellow-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-yellow-600 hover:text-yellow-700">
              Privacy Policy
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}

"use client"

import { Form, Input, Select, DatePicker } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, GlobalOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const { Option } = Select;

// Advanced Input Components with built-in validation
export const AdvInputs = {
  // Text Input with validation
  TextInput: ({ name, label, placeholder, prefix = <UserOutlined className="text-gray-400" />, rules = [], ...props }) => (
    <Form.Item name={name} label={label} rules={rules}>
      <Input 
        prefix={prefix}
        placeholder={placeholder}
        size="large"
        {...props}
      />
    </Form.Item>
  ),

  // Email Input with validation
  EmailInput: ({ name = "email", label = "Email Address", placeholder = "Enter your email address", ...props }) => (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required: true, message: 'Email is required' },
        { type: 'email', message: 'Please enter a valid email address' }
      ]}
    >
      <Input 
        prefix={<MailOutlined className="text-gray-400" />}
        placeholder={placeholder}
        size="large"
        {...props}
      />
    </Form.Item>
  ),

  // Phone Input with country code selector
  PhoneInput: ({ 
    name = "phoneNumber", 
    label = "Phone Number",
    countryCodeName = "countryCode",
    phoneNumberName = "phoneNumberOnly",
    defaultCountryCode = "+254",
    placeholder = "700 000 000",
    ...props 
  }) => {
    const [countryCodes, setCountryCodes] = useState([]);

    useEffect(() => {
      fetch('/data/country-codes.json')
        .then(response => response.json())
        .then(data => {
          setCountryCodes(data.countryCodes);
        })
        .catch(error => {
          console.error('Error loading country codes:', error);
        });
    }, []);

    const validatePhoneNumber = (_, value) => {
      if (!value) return Promise.resolve();
      const cleanNumber = value.replace(/\D/g, '');
      if (cleanNumber.length < 7) {
        return Promise.reject(new Error('Phone number is too short'));
      }
      if (cleanNumber.length > 15) {
        return Promise.reject(new Error('Phone number is too long'));
      }
      return Promise.resolve();
    };

    return (
      <Form.Item name={name} label={label}>
        <Input.Group compact>
          <Form.Item
            name={countryCodeName}
            noStyle
            initialValue={defaultCountryCode}
            rules={[{ required: true, message: 'Country code is required' }]}
          >
            <Select
              placeholder="Code"
              size="large"
              style={{ width: '30%' }}
              showSearch
              filterOption={(input, option) => {
                const searchValue = input.toLowerCase();
                const countryCode = option.value.toLowerCase();
                // Find the country data to get the country name for search
                const country = countryCodes.find(c => c.code === option.value);
                const countryName = country ? country.country?.toLowerCase() || '' : '';
                return countryCode.includes(searchValue) || countryName.includes(searchValue);
              }}
            >
              {countryCodes.map((country) => (
                <Option key={country.iso} value={country.code}>
                  {country.flag} {country.code}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={phoneNumberName}
            noStyle
            rules={[
              { required: true, message: 'Phone number is required' },
              { validator: validatePhoneNumber }
            ]}
          >
            <Input 
              placeholder={placeholder}
              size="large"
              style={{ width: '70%' }}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                const formattedValue = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
                e.target.value = formattedValue;
              }}
              {...props}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    );
  },

  // Date Picker with age validation
  DateInput: ({ 
    name = "dob", 
    label = "Date of Birth", 
    placeholder = "Select your date of birth",
    minAge = 13,
    maxAge = 120,
    ...props 
  }) => {
    const validateAge = (_, value) => {
      if (!value) return Promise.resolve();
      const age = dayjs().diff(value, 'years');
      if (age < minAge) {
        return Promise.reject(new Error(`You must be at least ${minAge} years old`));
      }
      if (age > maxAge) {
        return Promise.reject(new Error('Please enter a valid date of birth'));
      }
      return Promise.resolve();
    };

    return (
      <Form.Item
        name={name}
        label={label}
        rules={[
          { required: true, message: 'Date of birth is required' },
          { validator: validateAge }
        ]}
      >
        <DatePicker 
          placeholder={placeholder}
          size="large"
          className="w-full"
          disabledDate={(current) => current && current > dayjs().subtract(minAge, 'years')}
          showToday={false}
          {...props}
        />
      </Form.Item>
    );
  },

  // Country/Nationality Select
  CountrySelect: ({ 
    name = "residence", 
    label = "Country of Residence", 
    placeholder = "Select your country of residence",
    defaultValue = "Kenya",
    countries = [],
    ...props 
  }) => (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: true, message: `${label} is required` }]}
      initialValue={defaultValue}
    >
      <Select
        placeholder={placeholder}
        size="large"
        showSearch
        filterOption={(input, option) => {
          const searchValue = input.toLowerCase();
          return option.value.toLowerCase().includes(searchValue);
        }}
        {...props}
      >
        {countries?.map((country) => (
          <Option key={country.name.common} value={country.name.common}>
            {country.name.common}
          </Option>
        ))}
      </Select>
    </Form.Item>
  ),

  // Nationality Input (can be text input for flexibility)
  NationalityInput: ({ 
    name = "nationality", 
    label = "Nationality", 
    placeholder = "e.g., Kenyan",
    ...props 
  }) => (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required: true, message: 'Nationality is required' },
        { min: 2, message: 'Please enter a valid nationality' }
      ]}
    >
      <Input 
        prefix={<GlobalOutlined className="text-gray-400" />}
        placeholder={placeholder}
        size="large"
        {...props}
      />
    </Form.Item>
  ),

  // Password Input with strength validation
  PasswordInput: ({ 
    name = "password", 
    label = "Password", 
    placeholder = "Create a strong password",
    minLength = 6,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = false,
    requireSpecialChars = false,
    ...props 
  }) => {
    const validatePassword = (_, value) => {
      if (!value) {
        return Promise.reject(new Error('Password is required'));
      }
      if (value.length < minLength) {
        return Promise.reject(new Error(`Password must be at least ${minLength} characters`));
      }
      if (requireUppercase && !/[A-Z]/.test(value)) {
        return Promise.reject(new Error('Password must contain at least one uppercase letter'));
      }
      if (requireLowercase && !/[a-z]/.test(value)) {
        return Promise.reject(new Error('Password must contain at least one lowercase letter'));
      }
      if (requireNumbers && !/\d/.test(value)) {
        return Promise.reject(new Error('Password must contain at least one number'));
      }
      if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return Promise.reject(new Error('Password must contain at least one special character'));
      }
      return Promise.resolve();
    };

    return (
      <Form.Item
        name={name}
        label={label}
        rules={[{ validator: validatePassword }]}
      >
        <Input.Password 
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder={placeholder}
          size="large"
          {...props}
        />
      </Form.Item>
    );
  },

  // Confirm Password Input
  ConfirmPasswordInput: ({ 
    name = "confirmPassword", 
    label = "Confirm Password", 
    placeholder = "Confirm your password",
    passwordFieldName = "password",
    ...props 
  }) => {
    const validateConfirmPassword = ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue(passwordFieldName) === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Passwords do not match'));
      },
    });

    return (
      <Form.Item
        name={name}
        label={label}
        dependencies={[passwordFieldName]}
        rules={[
          { required: true, message: 'Please confirm your password' },
          validateConfirmPassword
        ]}
      >
        <Input.Password 
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder={placeholder}
          size="large"
          {...props}
        />
      </Form.Item>
    );
  },

  // Password Requirements Display
  PasswordRequirements: ({ 
    minLength = 6,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = false,
    requireSpecialChars = false 
  }) => (
    <div className="text-xs text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg">
      <strong>Password Requirements:</strong>
      <ul className="mt-1 space-y-1">
        <li>• At least {minLength} characters long</li>
        {requireUppercase && <li>• Contains at least one uppercase letter</li>}
        {requireLowercase && <li>• Contains at least one lowercase letter</li>}
        {requireNumbers && <li>• Contains at least one number</li>}
        {requireSpecialChars && <li>• Contains at least one special character</li>}
        <li>• Use a unique password you haven't used elsewhere</li>
      </ul>
    </div>
  )
};

export default AdvInputs;

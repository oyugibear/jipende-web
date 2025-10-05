import { Modal, Form, Select, DatePicker, TimePicker, Button, message, Steps, Card, Avatar, Tag, Input } from 'antd'
import React, { useState, useEffect } from 'react'
import { UserOutlined, CalendarOutlined, HeartOutlined, CheckOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { api, bookingAPI } from '@/utils/api'

const { Option } = Select
const { TextArea } = Input

export default function BookingModal({ isModalOpen, handleOk, handleCancel, info, setRefresh }) {
    const [form] = Form.useForm()
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedClient, setSelectedClient] = useState(null)
    const [selectedService, setSelectedService] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchClient, setSearchClient] = useState('')
    const [searchService, setSearchService] = useState('')

    console.log("info", info?.info)

    // Use data from info?.info prop
    const clients = info?.info?.users || []
    const services = info?.info?.services || []

    const handleClientSelect = (clientId) => {
        const client = clients.find(c => c._id === clientId)
        setSelectedClient(client)
        setCurrentStep(1)
    }

    const handleServiceSelect = (serviceId) => {
        const service = services.find(s => s._id === serviceId)
        setSelectedService(service)
        setCurrentStep(2)
    }

    const handleNewBooking = async (values) => {
        setLoading(true)
        console.log("Form values received:", values)
        console.log("Selected client:", selectedClient)
        console.log("Selected service:", selectedService)
        
        try {
            // Create the service object with appointment details
            const serviceWithAppointment = {
                ...selectedService,
                date: values.date.format('YYYY-MM-DD'),
                time: values.time.format('HH:mm'),
                notes: values.notes
            };

            const bookingData = {
                clientId: selectedClient._id,
                services: [serviceWithAppointment], // API expects services array
                status: 'confirmed',
                final_amount: parseInt(selectedService?.price) || 0,
                vat: 0
            }

            console.log("Complete booking data being sent to API:", bookingData)
            console.log("Service price extracted:", selectedService?.price)
            console.log("Services array:", bookingData.services)
            
            // Make API call to create booking
            // await api.post('/bookings', bookingData)
            const response = await bookingAPI.create(bookingData);
            console.log("API Response:", response);
            
            if(response && response.status){
                message.success('Booking created successfully!')
                handleModalClose()
                handleOk() // Refresh the bookings list
                
                // Refresh all data from parent page
                if (setRefresh) {
                    setRefresh(prev => !prev)
                }
            } else {
                message.error(response?.error || 'Failed to create booking - Invalid response')
            }
        } catch (error) {
            console.error('Error creating booking:', error)
            message.error(error.message || 'Failed to create booking')
        } finally {
            setLoading(false)
        }
    }

    const handleModalClose = () => {
        form.resetFields()
        setCurrentStep(0)
        setSelectedClient(null)
        setSelectedService(null)
        setSearchClient('')
        setSearchService('')
        handleCancel()
    }

    const goBackStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
            if (currentStep === 1) {
                setSelectedClient(null)
            } else if (currentStep === 2) {
                setSelectedService(null)
            }
        }
    }

    const disabledDate = (current) => {
        return current && current < dayjs().startOf('day')
    }

    const disabledHours = () => {
        const hours = []
        for (let i = 0; i < 8; i++) hours.push(i) // Before 8 AM
        for (let i = 19; i < 24; i++) hours.push(i) // After 7 PM
        return hours
    }

    const filteredClients = clients.filter(client => {
        if (!searchClient) return true
        
        const searchTerm = searchClient.toLowerCase()
        const fullName = `${client.first_name || ''} ${client.second_name || ''}`.toLowerCase()
        const email = (client.email || '').toLowerCase()
        const phone = (client.phone || '').toLowerCase()
        const role = (client.role || '').toLowerCase()
        
        return fullName.includes(searchTerm) ||
               email.includes(searchTerm) ||
               phone.includes(searchTerm) ||
               role.includes(searchTerm)
    })

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchService.toLowerCase()) ||
        service.category?.toLowerCase().includes(searchService.toLowerCase())
    )

    const steps = [
        {
            title: 'Select Client',
            icon: <UserOutlined />
        },
        {
            title: 'Choose Service',
            icon: <HeartOutlined />
        },
        {
            title: 'Schedule & Details',
            icon: <CalendarOutlined />
        }
    ]

    return (
        <Modal
            title="Create New Booking"
            open={isModalOpen}
            onCancel={handleModalClose}
            footer={null}
            width={800}
            destroyOnClose
        >
            <div className="p-4">
                <Steps current={currentStep} className="mb-8">
                    {steps.map((step, index) => (
                        <Steps.Step
                            key={index}
                            title={step.title}
                            icon={step.icon}
                            className={index <= currentStep ? 'text-yellow-600' : ''}
                        />
                    ))}
                </Steps>

                {/* Step 1: Select Client */}
                {currentStep === 0 && (
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Select a Client</h3>
                                <div className="text-sm text-gray-500">
                                    Total: {clients.length} users | Showing: {filteredClients.length}
                                </div>
                            </div>
                            <Input
                                placeholder="Search clients by name, email, or phone..."
                                value={searchClient}
                                onChange={(e) => setSearchClient(e.target.value)}
                                className="mb-4"
                                prefix={<UserOutlined />}
                                allowClear
                            />
                            {searchClient && (
                                <div className="text-xs text-gray-500 mb-2">
                                    Filtering by: "{searchClient}" - {filteredClients.length} results found
                                </div>
                            )}
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto space-y-3 p-3">
                            {filteredClients.length > 0 ? (
                                filteredClients.map(client => (
                                    <Card
                                        key={client._id}
                                        hoverable
                                        className="cursor-pointer transition-all duration-200 hover:shadow-md"
                                        onClick={() => handleClientSelect(client._id)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <Avatar 
                                                size={48} 
                                                icon={<UserOutlined />}
                                                className="bg-blue-500"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-lg">
                                                    {client.first_name} {client.second_name}
                                                </h4>
                                                <p className="text-gray-500 text-sm">{client.email}</p>
                                                <p className="text-gray-400 text-xs">
                                                    {client.phone_number || 'No phone number'}
                                                </p>
                                                {client.role && (
                                                    <p className="text-xs text-blue-600 capitalize">
                                                        Role: {client.role}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <Tag color="blue">Client</Tag>
                                                {client.createdAt && (
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        Joined: {new Date(client.createdAt).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : clients.length > 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <UserOutlined className="text-4xl mb-2" />
                                    <div>No clients found matching your search.</div>
                                    <div className="text-xs mt-1">
                                        Try adjusting your search terms or <Button type="link" onClick={() => setSearchClient('')} className="p-0 h-auto">clear the filter</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <UserOutlined className="text-4xl mb-2" />
                                    <div>No clients available</div>
                                    <div className="text-xs mt-1">No users found in the system</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 2: Select Service */}
                {currentStep === 1 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Choose a Service</h3>
                            <Button type="link" onClick={goBackStep}>
                                ← Back to Client Selection
                            </Button>
                        </div>
                        
                        {selectedClient && (
                            <Card className="bg-yellow-50 border-yellow-200 mb-4">
                                <div className="flex items-center space-x-3">
                                    <Avatar icon={<UserOutlined />} />
                                    <div>
                                        <span className="font-medium">Selected Client: </span>
                                        <span>{selectedClient.first_name} {selectedClient.second_name}</span>
                                    </div>
                                </div>
                            </Card>
                        )}

                        <Input
                            placeholder="Search services by name or category..."
                            value={searchService}
                            onChange={(e) => setSearchService(e.target.value)}
                            className="mb-4"
                            prefix={<HeartOutlined />}
                        />
                        
                        <div className="max-h-96 overflow-y-auto space-y-3 p-3">
                            {filteredServices.map(service => (
                                <Card
                                    key={service._id}
                                    hoverable
                                    className="cursor-pointer"
                                    onClick={() => handleServiceSelect(service._id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-lg">{service.title}</h4>
                                            <p className="text-gray-500 text-sm">{service.description}</p>
                                            <div className="flex items-center space-x-4 mt-2">
                                                <Tag color="purple">{service.category}</Tag>
                                                <span className="text-sm text-gray-600">
                                                    Duration: {service.duration || '50 minutes'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-green-600">
                                                KSH {service.price}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {filteredServices.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No services found matching your search.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 3: Schedule & Details */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Schedule & Booking Details</h3>
                            <Button type="link" onClick={goBackStep}>
                                ← Back to Service Selection
                            </Button>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <Card className="bg-blue-50 border-blue-200">
                                <div className="flex items-center space-x-3">
                                    <Avatar icon={<UserOutlined />} />
                                    <div>
                                        <div className="font-medium">Client</div>
                                        <div className="text-sm text-gray-600">
                                            {selectedClient?.first_name} {selectedClient?.second_name}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            
                            <Card className="bg-green-50 border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">{selectedService?.title}</div>
                                        <div className="text-sm text-gray-600">{selectedService?.category}</div>
                                    </div>
                                    <div className="text-green-600 font-bold">
                                        KSH {selectedService?.price}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleNewBooking}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item
                                    name="date"
                                    label="Appointment Date"
                                    rules={[{ required: true, message: 'Please select a date' }]}
                                >
                                    <DatePicker
                                        className="w-full"
                                        disabledDate={disabledDate}
                                        placeholder="Select date"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="time"
                                    label="Appointment Time"
                                    rules={[{ required: true, message: 'Please select a time' }]}
                                >
                                    <TimePicker
                                        className="w-full"
                                        format="HH:mm"
                                        disabledHours={disabledHours}
                                        placeholder="Select time"
                                        size="large"
                                        minuteStep={30}
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item
                                name="paymentStatus"
                                label="Payment Status"
                                initialValue="pending"
                            >
                                <Select size="large">
                                    <Option value="pending">Pending</Option>
                                    <Option value="paid">Paid</Option>
                                    <Option value="failed">Failed</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="notes"
                                label="Additional Notes (Optional)"
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="Add any special notes or requirements for this booking..."
                                />
                            </Form.Item>

                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <Button onClick={handleModalClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="bg-yellow-500 hover:bg-yellow-600"
                                    icon={<CheckOutlined />}
                                >
                                    Create Booking
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
            </div>
        </Modal>
    )
}

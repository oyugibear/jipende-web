"use client"

import SimpleLoading from '@/components/Constants/Loading/SimpleLoading'
import Hero from '@/components/Pages/Services/Hero'
import Card from '@/components/Pages/Services/ServiceCard/Card'
import { Dropdown } from 'antd'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { api } from '@/utils/api'

export default function Page() {
    const [hasMounted, setHasMounted] = useState(false)
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [therapyType, setTherapyType] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [filtered, setFiltered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setHasMounted(true)
    }, [])

    useEffect(() => {
        async function loadServices() {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get('/services');
                setServices(response.data || []);
            } catch (error) {
                console.error("Error fetching services:", error);
                setError("Failed to load services. Please try again later.");
                setServices([]);
            } finally {
                setLoading(false);
            }
        }
        loadServices();
    }, []);
    
    const therapyItems = [
        // { key: '1', label: 'Individual Awareness', value: 'Individual Awareness' },
        // { key: '2', label: 'Self Development', value: 'Self Development' },
        // { key: '3', label: 'Mental Awareness', value: 'Mental Awareness' },
        { key: '1', label: 'Individual', value: 'Individual' },
        { key: '2', label: 'Corporate', value: 'Corporate' },
        { key: '3', label: 'Group', value: 'Group' },
        { key: '4', label: 'Family', value: 'Family' },
        { key: '5', label: 'School', value: 'School' },
        { key: '6', label: 'Friends', value: 'Friends' },
        { key: '7', label: 'Couples', value: 'Couples' },
        { key: '8', label: 'All', value: 'All' },
    ];

    const locationItems = [
        { key: '1', label: 'In Person', value: 'In Person' },
        { key: '2', label: 'Online', value: 'Online' },
        { key: '3', label: 'All', value: 'All' },
    ];

    // filters
    useEffect(() => {
        if (therapyType) {
            setFilteredServices(services.filter(service => service.category === therapyType));
        }

        if (location) {
            setFilteredServices(services.filter(service => service.location === location))
        }
    }, [therapyType, location]);

    console.log("Location: ", location);

    const handleFilter = (type, e) => {
        setFiltered(true);
        if (type === 'therapyType') {
            const selectedItem = therapyItems.find(item => item.key === e.key);
            if( selectedItem?.value === 'All') {
                setTherapyType('');
                setFilteredServices(services || []);
                setFiltered(false);
                return;
            }
            setTherapyType(selectedItem?.value || '');
        }
        if (type === 'location') {
            const selectedItem = locationItems.find(item => item.key === e.key);
            console.log("first selectedItem", selectedItem);
            if( selectedItem?.value === 'All') {
                setLocation('');
                setFilteredServices(services || []);
                setFiltered(false);
                return;
            }
            setLocation(selectedItem?.value || '');
        }
    }

    console.log("filteredServices", filteredServices);
    if (!hasMounted) return (<SimpleLoading />)
    if (loading) return (<SimpleLoading />)
    if (error) return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-red-600">{error}</p>
        </div>
    )
    if (!services || services.length === 0) return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p>No services available at the moment.</p>
        </div>
    )
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        <Hero />
        <div className='flex flex-col w-full max-w-[1440px] my-8 items-center justify-center'>
            <div className='flex flex-row items-start md:items-center w-full md:justify-evenly md:max-w-[800px] whitespace-nowrap overflow-x-auto pb-42 md:pb-0'>
                <Dropdown menu={{ items : therapyItems, selectable: true, onSelect: (e) => handleFilter("therapyType", e) }}>
                    <div className='flex flex-row mx-4 items-center '>
                        <p className='mr-2 font-light'>Therapy Type</p>
                        <IoIosArrowDropdownCircle className='text-[#FFD02A]'/>
                    </div>
                </Dropdown>

                {/* <Dropdown menu={{ items }}>
                    <div className='flex flex-row mx-4 items-center'>
                        <p className='mr-2 font-light'>Price</p>
                        <IoIosArrowDropdownCircle className='text-[#FFD02A]'/>
                    </div>
                </Dropdown> */}
                <Dropdown menu={{ items: locationItems, selectable: true, onSelect: (e) => handleFilter("location", e) }}>
                    <div className='flex flex-row mx-4 items-center'>
                        <p className='mr-2 font-light'>Location</p>
                        <IoIosArrowDropdownCircle className='text-[#FFD02A]'/>
                    </div>
                </Dropdown>
            </div>
            {/* Cards */}
            <div className='flex flex-wrap justify-evenly items-start w-full gap-y-4 my-12 px-4'>
                {filtered ? (
                    <>
                        {filteredServices?.map((service) => (
                            <Card service={service} key={service._id}/>
                        ))}
                    </>
                ) : (
                    <>
                        {services?.map((service) => (
                            <Card service={service} key={service._id}/>
                        ))}
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

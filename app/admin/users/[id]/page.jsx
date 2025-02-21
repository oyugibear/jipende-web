'use client'

import { API_URL } from '@/config/api.config'
import { useUser } from '@/context'
import { Descriptions, message } from 'antd'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { Result } from 'postcss'
import React, { useEffect, useState } from 'react'

async function getUser(id){
    const res = await axios.get(`${API_URL}/user/${id}`)
    return res.data
}

async function getProfile(id){
    try {
        const res = await axios.get(`${API_URL}/profile/${id}`)
        return res.data
    } catch (error) {
        console.error("Error fetching profile:", error)
        return null
    }
}

export default function page({}) {

    const [userData, setUserData] = useState(null)
    const [profileData, setProfileData] = useState(null)
    const { id } = useParams();

    const { user } = useUser()
  
    const getData = async () => {
      const data = await getUser(id) || null
      const profileData = await getProfile(data.data.profile_id) || null
      setUserData(data.data)
      if(!data.data.profile_id){
        console.log("User has not started their profile")
    } else {
        setProfileData(profileData.data)
    }
    }
  
    useEffect(() => {
      getData()
    }, [])

    console.log("Profile Data", profileData)

    const userItems = [
        {
            key: '1',
            label: 'Full Names',
            children: `${userData?.first_name} ${userData?.second_name}`
        },
        {
            key: '2',
            label: 'Email',
            children: userData?.email
        },
        {
            key: '3',
            label: 'Phone Number',
            children: userData?.phone_number
        },
        {
            key: '4',
            label: 'Date of Birth',
            children: userData?.date_of_birth
        },
        {
            key: '5',
            label: 'Country of Residence',
            children:  userData?.country_of_residence
        },
        {
            key: '6',
            label: 'Nationality',
            children: userData?.nationality
        },
        {
            key: '6',
            label: 'Profile Status',
            children: userData?.profile_status ? userData?.profile_status : 'Not Started'
        },
        {
            key: '6',
            label: 'Profile ID',
            children: userData?.profile_id ? userData?.profile_id : 'Not Started'
        }
    ]

    const profileDetails = [
        // { key: '1', label: 'Profile Status', children: profileData?.profile_status },
        { key: '2', label: 'Current Psychiatric Services', children: profileData?.currentPsychiatricServices },
        { key: '3', label: 'Had Previous Therapist', children: profileData?.hadPreviousTherapist },
        { key: '4', label: 'Previous Therapist', children: profileData?.previousTherapist },
        { key: '5', label: 'Taking Prescribed Medication', children: profileData?.takingPrescribedMedication },
        { key: '6', label: 'Prescribed Medication', children: profileData?.prescribedMedication },
        { key: '7', label: 'Prescribed By', children: profileData?.prescribedBy },
        { key: '8', label: 'Has Primary Doctor', children: profileData?.hasPrimaryDoctor },
        { key: '9', label: 'Primary Doctor', children: profileData?.primaryDoctor },
        { key: '10', label: 'Has Other Doctor', children: profileData?.hasOtherDoctor },
        { key: '11', label: 'Other Doctor', children: profileData?.otherDoctor },
        { key: '12', label: 'Previous Physical', children: profileData?.previousPhysical },
        { key: '13', label: 'Physical Health', children: profileData?.physicalHealth },
        { key: '14', label: 'Health Concerns', children: profileData?.healthConcerns },
        { key: '15', label: 'Medicine For Health Concerns', children: profileData?.medicineForHealthConcerns },
        { key: '16', label: 'Has Sleep Problems', children: profileData?.hasSleepProblems },
        { key: '17', label: 'Sleep Problems', children: profileData?.sleepProblems },
        { key: '18', label: 'Exercise Per Week', children: profileData?.exercisePerWeek },
        { key: '19', label: 'Exercise Types', children: profileData?.exerciseTypes },
        { key: '20', label: 'Average Exercise Time', children: profileData?.avgExerciseTime },
        { key: '21', label: 'Has Eating Problems', children: profileData?.hasEatingProblems },
        { key: '22', label: 'Eating Problems', children: profileData?.eatingProblems },
        { key: '23', label: 'Weight Change', children: profileData?.weightChange },
        { key: '24', label: 'Drinks Alcohol', children: profileData?.drinksAlcohol },
        { key: '25', label: 'Alcohol Amount', children: profileData?.alcoholAmount },
        { key: '26', label: 'Recreational Drugs', children: profileData?.recDrugs },
        { key: '27', label: 'Tobacco', children: profileData?.tobacco },
        { key: '28', label: 'Suicidal Thoughts', children: profileData?.suicidalThoughts },
        { key: '29', label: 'Previous Suicidal Thoughts', children: profileData?.prevSuicidalThoughts },
        { key: '30', label: 'Relationship', children: profileData?.relationship },
        { key: '31', label: 'Relationship Length', children: profileData?.relationshipLength },
        { key: '32', label: 'Relationship Rating', children: profileData?.relationshipRating },
        { key: '33', label: 'Has Life Changing Stress', children: profileData?.hasLifeChangingStress },
        { key: '34', label: 'Life Changing Stress', children: profileData?.lifeChangingStress },
        { key: '35', label: 'Extreme Depressed Mood', children: profileData?.extremeDepressedMood },
        { key: '36', label: 'Dramatic Mood Swings', children: profileData?.dramaticMoodSwings },
        { key: '37', label: 'Rapid Speech', children: profileData?.rapidSpeech },
        { key: '38', label: 'Extreme Anxiety', children: profileData?.extremeAnxiety },
        { key: '39', label: 'Panic Attacks', children: profileData?.panicAttacks },
        { key: '40', label: 'Phobias', children: profileData?.phobias },
        { key: '41', label: 'Sleep Disturbances', children: profileData?.sleepDisturbances },
        { key: '42', label: 'Hallucinations', children: profileData?.hallucinations },
        { key: '43', label: 'Unexplained Losses Of Time', children: profileData?.unexplainedLossesOfTime },
        { key: '44', label: 'Unexplained Memory Lapses', children: profileData?.unexplainedMemoryLapses },
        { key: '45', label: 'Alcohol Substance Abuse', children: profileData?.alcoholSubstanceAbuse },
        { key: '46', label: 'Frequent Body Complaints', children: profileData?.frequentBodyComplaints },
        { key: '47', label: 'Eating Disorder', children: profileData?.eatingDisorder },
        { key: '48', label: 'Body Image Problems', children: profileData?.bodyImageProblems },
        { key: '49', label: 'Repetitive Thoughts', children: profileData?.repetitiveThoughts },
        { key: '50', label: 'Repetitive Behaviors', children: profileData?.repetitiveBehaviors },
        { key: '51', label: 'Homicidal Thoughts', children: profileData?.homicidalThoughts },
        { key: '52', label: 'Suicidal Attempts', children: profileData?.suicidalAttempts },
        { key: '53', label: 'Last Suicidal Attempts', children: profileData?.lastSuicidalAttempts },
        { key: '54', label: 'Education Start Year', children: profileData?.educationStartYear },
        { key: '55', label: 'Nursery', children: profileData?.nursery },
        { key: '56', label: 'Primary School', children: profileData?.primarySchool },
        { key: '57', label: 'High School', children: profileData?.highSchool },
        { key: '58', label: 'University', children: profileData?.university },
        { key: '59', label: 'Employed', children: profileData?.employed },
        { key: '60', label: 'Employed Position', children: profileData?.employedPosition },
        { key: '61', label: 'Job Satisfaction', children: profileData?.jobSatisfaction },
        { key: '62', label: 'Work Stressor', children: profileData?.workStressor },
        { key: '63', label: 'Family Depression', children: profileData?.familyDepression },
        { key: '64', label: 'Family Depression Member', children: profileData?.familyDepressionMember },
        { key: '65', label: 'Family Bipolar', children: profileData?.familyBipolar },
        { key: '66', label: 'Family Bipolar Member', children: profileData?.familyBipolarMember },
        { key: '67', label: 'Family Anxiety', children: profileData?.familyAnxiety },
        { key: '68', label: 'Family Anxiety Member', children: profileData?.familyAnxietyMember },
        { key: '69', label: 'Family Panic', children: profileData?.familyPanic },
        { key: '70', label: 'Family Panic Member', children: profileData?.familyPanicMember },
        { key: '71', label: 'Family Schizophrenia', children: profileData?.familySchiz },
        { key: '72', label: 'Family Schizophrenia Member', children: profileData?.familySchizMember },
        { key: '73', label: 'Family Alcohol', children: profileData?.familyAlcohol },
        { key: '74', label: 'Family Alcohol Member', children: profileData?.familyAlcoholMember },
        { key: '75', label: 'Family Eating Disorder', children: profileData?.familyEating },
        { key: '76', label: 'Family Eating Disorder Member', children: profileData?.familyEatingMember },
        { key: '77', label: 'Family Learning Disorder', children: profileData?.familyLearning },
        { key: '78', label: 'Family Learning Disorder Member', children: profileData?.familyLearningMember },
        { key: '79', label: 'Family Trauma', children: profileData?.familyTrauma },
        { key: '80', label: 'Family Trauma Member', children: profileData?.familyTraumaMember },
        { key: '81', label: 'Family Suicide', children: profileData?.familySuicide },
        { key: '82', label: 'Family Suicide Member', children: profileData?.familySuicideMember },
        { key: '83', label: 'Family Illness', children: profileData?.familyIllness },
        { key: '84', label: 'Family Illness Member', children: profileData?.familyIllnessMember },
        { key: '85', label: 'Father Relationship', children: profileData?.fatherRelationship },
        { key: '86', label: 'Mother Relationship', children: profileData?.motherRelationship },
        { key: '87', label: 'Sibling Relationship', children: profileData?.siblingRelationship },
        { key: '88', label: 'Personal Strengths', children: profileData?.personalStrengths },
        { key: '89', label: 'Personal Likes', children: profileData?.personalLikes },
        { key: '90', label: 'Coping Strategy', children: profileData?.copingStrategy },
        { key: '91', label: 'Therapy Goals', children: profileData?.therapyGoals },
        { key: '92', label: 'Jail Time', children: profileData?.jailTime },
        // { key: '93', label: 'Posted By', children: profileData?.postedBy },
        { key: '94', label: 'Edited By', children: profileData?.edittedBy },
        { key: '95', label: 'Last Viewed By', children: profileData?.lastViewedBy }
    ];

    return (
        <div className='flex flex-col w-full items-center justify-center py-12 p-4'>
            <div className='max-w-[1440px] w-full flex flex-col'>
                <h1 className='text-xl font-medium'>User Information</h1>
                <p>Below are are all the details concerning this user</p>
                <div className='my-6 gap-6'>
                    <Descriptions bordered items={userItems} />
                    <div className='mt-8'>
                        <h2 className='text-lg font-medium mb-2'>Profile Information</h2>
                        {profileData !== null ? (
                            <Descriptions bordered items={profileDetails} />
                        ) : (
                            <div className='py-8 flex flex-col  gap-2 items-center justify-center'>
                                <h2 className='italic font-medium'>Profile Not Started</h2>
                                <p>Please ask the client to input their information on the adult intake form</p>
                            </div>
                            
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

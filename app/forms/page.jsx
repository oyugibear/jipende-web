'use client'

import BasicInputs from '@/components/Constants/fields/BasicInputs'
import BasicRadioBox from '@/components/Constants/fields/BasicRadioBox'
import BasicTextArea from '@/components/Constants/fields/BasicTextArea'
import MultipleChoiceRadio from '@/components/Constants/fields/MultipleChoiceRadio'
import PictureHero from '@/components/Constants/PictureHero'
import { API_URL } from '@/config/api.config'
import { useAuth } from '@/context/AuthContext'
import { message, Steps, Card, Button, Progress, Alert, Spin } from 'antd'
import { 
  UserOutlined, 
  MedicineBoxOutlined, 
  HeartOutlined, 
  BookOutlined, 
  BankOutlined, 
  TeamOutlined, 
  InfoCircleOutlined,
  SafetyOutlined,
  SaveOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [savedProgress, setSavedProgress] = useState(false)

  const { user, token, loading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    // Only redirect if not loading and no user
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  // Clear potentially corrupted localStorage data on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('intakeFormProgress')
    if (savedProgress) {
      try {
        const data = JSON.parse(savedProgress)
        // Check if any boolean fields are strings
        const booleanFields = [
          'currentPsychiatricServices', 'hadPreviousTherapist', 'takingPrescribedMedication', 
          'hasPrimaryDoctor', 'hasOtherDoctor', 'hasEatingProblems', 'weightChange',
          'hasSleepProblems', 'drinksAlcohol', 'tobacco', 'hasLifeChangingStress',
          'relationship', 'employed', 'familyMentalIllness', 'familySubstanceAbuse',
          'familySuicide', 'dramaticMoodSwings', 'rapidSpeech', 'extremeAnxiety',
          'panicAttacks', 'phobias', 'sleepDisturbances', 'hallucinations',
          'unexplainedLossesOfTime', 'unexplainedMemoryLapses', 'alcoholSubstanceAbuse',
          'frequentBodyComplaints', 'eatingDisorder', 'bodyImageProblems',
          'repetitiveThoughts', 'repetitiveBehaviors', 'homicidalThoughts',
          'suicidalAttempts', 'familyIllness'
        ]
        const hasCorruptedData = booleanFields.some(field => 
          data[field] !== undefined && typeof data[field] !== 'boolean'
        )
        
        if (hasCorruptedData) {
          console.warn('Clearing corrupted form data from localStorage')
          localStorage.removeItem('intakeFormProgress')
          message.warning('Previous form data was corrupted and has been cleared. Please start fresh.')
        }
      } catch (error) {
        localStorage.removeItem('intakeFormProgress')
      }
    }
  }, [])

  // Step configuration
  const steps = [
    {
      title: 'Current Services',
      icon: <UserOutlined />,
      description: 'Current psychiatric care (1 question)'
    },
    {
      title: 'Treatment History',
      icon: <MedicineBoxOutlined />,
      description: 'Previous therapy and medications (3 questions)'
    },
    {
      title: 'Health & Lifestyle',
      icon: <HeartOutlined />,
      description: 'Physical health and daily habits (12 questions)'
    },
    {
      title: 'Mental Health',
      icon: <InfoCircleOutlined />,
      description: 'Current symptoms and relationships (8 questions)'
    },
    {
      title: 'Education & Career',
      icon: <BookOutlined />,
      description: 'Academic and work background (9 questions)'
    },
    {
      title: 'Family & Social',
      icon: <TeamOutlined />,
      description: 'Family history and relationships (9 questions)'
    },
    {
      title: 'Final Details',
      icon: <CheckCircleOutlined />,
      description: 'Goals and additional information (5 questions)'
    }
  ]

  // Treatment History
  const [currentPsychiatricServices, setCurrentPsychiatricServices] = useState(false)
  const [hadPreviousTherapist, setHadPreviousTherapist] = useState(false)
  const [previousTherapist, setPreviousTherapist] = useState('')
  const [takingPrescribedMedication, setTakingPrescribedMedication] = useState(false)
  const [prescribedMedication, setPrescribedMedication] = useState('')
  const [prescribedBy, setPrescribedBy] = useState('')

  // Health & Social Information
  const [hasPrimaryDoctor, setHasPrimaryDoctor] = useState(false)
  const [primaryDoctor, setPrimaryDoctor] = useState('')
  const [hasOtherDoctor, setHasOtherDoctor] = useState(false)
  const [otherDoctor, setOtherDoctor] = useState('')
  const [previousPhysical, setPreviousPhysical] = useState('')
  const [physicalHealth, setPhysicalHealth] = useState('Satisfactory')
  const [healthConcerns, setHealthConcerns] = useState('')
  const [medicineForhealthConcerns, setMedicineForHealthConcerns] = useState('')
  const [hasSleepProblems, setHasSleepProblems] = useState(false)
  const [sleepProblems, setSleepProblems] = useState('')
  const [excersicePerWeek, setExcercisePerWeek] = useState('')
  const [excerciseTypes, setExcerciseTypes] = useState('')
  const [avgExerciseTime, setAvgExerciseTime] = useState('')
  const [hasEatingProblems, setHasEatingProblems] = useState(false)
  const [eatingProblems, setEatingProblems] = useState('')
  const [weightChange, setWeightChange] = useState(false)
  const [drinksAlcohol, setDrinksAlcohol] = useState(false)
  const [alocholAmount, setAlcoholAmounts] = useState('')
  const [recDrugs, setRecDrugs] = useState('Never')
  const [tobacco, setTobacco] = useState(false)
  const [sucicidalThoughts, setSuicidalThoughts] = useState('Never')
  const [prevSucicidalThoughts, setPrevSuicidalThoughts] = useState('Never')
  const [relationship, setRelationship] = useState(false)
  const [relationshipLength, setRelationshipLength] = useState('')
  const [relationshipRating, setRelationshipRating] = useState('')
  const [hasLifeChangingStress, setHasLifeChangingStress] = useState(false)
  const [lifeChangingStress, setLifeChangingStress] = useState('')
  
  const [extremeDepressedMood, setExtremeDepressedMood] = useState('')  
  const [dramaticMoodSwings, setDramaticMoodSwings] = useState(false)
  const [rapidSpeech, setRapidSpeech] = useState(false)
  const [extremeAnxiety, setExtremeAnxiety] = useState(false)
  const [panicAttacks, setPanicAttacks] = useState(false)
  const [phobias, setPhobias] = useState(false)
  const [sleepDisturbances, setSleepDisturbances] = useState(false)
  const [hallucinations, setHallucinations] = useState(false)
  const [unexplainedLossesOfTime, setUnexplainedLossesOfTime] = useState(false)
  const [unexplainedMemoryLapses, setUnexplainedMemoryLapses] = useState(false)
  const [alcoholSubstanceAbuse, setAlcoholSubstanceAbuse] = useState(false)
  const [frequentBodyComplaints, setFrequentBodyComplaints] = useState(false)
  const [eatingDisorder, setEatingDisorder] = useState(false)
  const [bodyImageProblems, setBodyImageProblems] = useState(false)
  const [repetitiveThoughts, setRepetitiveThoughts] = useState(false)
  const [repetitiveBehaviors, setRepetitiveBehaviors] = useState(false)
  const [homicidalThoughts, setHomicidalThoughts] = useState(false)
  const [suicidalAttempts, setSuicidalAttempts] = useState(false)
  const [lastSuicidalAttempts, setLastSuicidalAttempts] = useState('')
  
  // Education History
  const [educationStartYear, setEducationStartYear] = useState('')
  const [nursery, setNursery] = useState('')
  const [primarySchool, setPrimarySchool] = useState('')
  const [highSchool, setHighSchool] = useState('')
  const [university, setUniversity] = useState('')
  
  // Occupational Information
  const [employed, setEmployed] = useState(false)
  const [occupation, setOccupation] = useState('')
  const [employer, setEmployer] = useState('')
  const [workDuration, setWorkDuration] = useState('')
  const [workEnjoyment, setWorkEnjoyment] = useState('')
  
  // Family History
  const [familyMentalIllness, setFamilyMentalIllness] = useState(false)
  const [familyMentalIllnessMember, setFamilyMentalIllnessMember] = useState('')
  const [familySubstanceAbuse, setFamilySubstanceAbuse] = useState(false)
  const [familySubstanceAbuseMember, setFamilySubstanceAbuseMember] = useState('')
  const [familySuicide, setFamilySuicide] = useState(false)
  const [familySuicideMember, setFamilySuicideMember] = useState('')
  const [familyIllness, setFamilyIllness] = useState(false)
  const [familyIllnessMember, setFamilyIllnessMember] = useState('')
  const [fatherRelationship, setFatherRelationship] = useState('')
  const [motherRelationship, setMotherRelationship] = useState('')
  const [siblingRelationship, setSiblingRelationship] = useState('')
  
  // Other Information
  const [personalStengths, setPersonalStrengths] = useState('')
  const [personalLikes, setPersonalLikes] = useState('')
  const [coping, setCoping] = useState('')
  const [therapyGoals, setTherapyGoals] = useState('')
  
  // Forensic History
  const [jailTime, setJailTime] = useState('')

  // Form validation functions
  const validateStep = (step) => {
    const errors = {}
    
    switch(step) {
      case 0: // Current Services
        if (currentPsychiatricServices !== true && currentPsychiatricServices !== false) {
          errors.currentPsychiatricServices = 'Please select yes or no'
        }
        break
      case 1: // Treatment History
        if (hadPreviousTherapist !== true && hadPreviousTherapist !== false) {
          errors.hadPreviousTherapist = 'Please select yes or no'
        }
        if (takingPrescribedMedication !== true && takingPrescribedMedication !== false) {
          errors.takingPrescribedMedication = 'Please select yes or no'
        }
        break
      case 2: // Health & Lifestyle
        if (hasPrimaryDoctor !== true && hasPrimaryDoctor !== false) {
          errors.hasPrimaryDoctor = 'Please select yes or no'
        }
        if (hasOtherDoctor !== true && hasOtherDoctor !== false) {
          errors.hasOtherDoctor = 'Please select yes or no'
        }
        if (hasEatingProblems !== true && hasEatingProblems !== false) {
          errors.hasEatingProblems = 'Please select yes or no'
        }
        if (weightChange !== true && weightChange !== false) {
          errors.weightChange = 'Please select yes or no'
        }
        break
      case 3: // Mental Health
        if (hasSleepProblems !== true && hasSleepProblems !== false) {
          errors.hasSleepProblems = 'Please select yes or no'
        }
        if (drinksAlcohol !== true && drinksAlcohol !== false) {
          errors.drinksAlcohol = 'Please select yes or no'
        }
        if (tobacco !== true && tobacco !== false) {
          errors.tobacco = 'Please select yes or no'
        }
        if (hasLifeChangingStress !== true && hasLifeChangingStress !== false) {
          errors.hasLifeChangingStress = 'Please select yes or no'
        }
        if (relationship !== true && relationship !== false) {
          errors.relationship = 'Please select yes or no'
        }
        break
      case 4: // Education & Career
        if (employed !== true && employed !== false) {
          errors.employed = 'Please select yes or no'
        }
        break
      case 5: // Family & Social
        if (familyMentalIllness !== true && familyMentalIllness !== false) {
          errors.familyMentalIllness = 'Please select yes or no'
        }
        if (familySubstanceAbuse !== true && familySubstanceAbuse !== false) {
          errors.familySubstanceAbuse = 'Please select yes or no'
        }
        if (familySuicide !== true && familySuicide !== false) {
          errors.familySuicide = 'Please select yes or no'
        }
        break
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
        setSavedProgress(true)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveProgress = async () => {
    setIsLoading(true)
    try {
      // Save all form data to localStorage
      const formData = {
        currentStep,
        currentPsychiatricServices,
        hadPreviousTherapist,
        previousTherapist,
        takingPrescribedMedication,
        prescribedMedication,
        prescribedBy,
        hasPrimaryDoctor,
        primaryDoctor,
        hasOtherDoctor,
        otherDoctor,
        previousPhysical,
        physicalHealth,
        healthConcerns,
        medicineForhealthConcerns,
        hasSleepProblems,
        sleepProblems,
        excersicePerWeek,
        excerciseTypes,
        avgExerciseTime,
        hasEatingProblems,
        eatingProblems,
        weightChange,
        drinksAlcohol,
        alocholAmount,
        recDrugs,
        tobacco,
        sucicidalThoughts,
        prevSucicidalThoughts,
        relationship,
        relationshipLength,
        relationshipRating,
        hasLifeChangingStress,
        lifeChangingStress,
        employed,
        occupation,
        employer,
        workDuration,
        workEnjoyment,
        educationStartYear,
        nursery,
        primarySchool,
        highSchool,
        university,
        familyMentalIllness,
        familyMentalIllnessMember,
        familySubstanceAbuse,
        familySubstanceAbuseMember,
        familySuicide,
        familySuicideMember,
        fatherRelationship,
        motherRelationship,
        siblingRelationship,
        personalStengths,
        personalLikes,
        coping,
        therapyGoals,
        jailTime,
        lastSaved: new Date().toISOString()
      }
      
      localStorage.setItem('intakeFormProgress', JSON.stringify(formData))
      message.success('Progress saved successfully!')
      setSavedProgress(true)
    } catch (error) {
      message.error('Failed to save progress')
    }
    setIsLoading(false)
  }
  
  // Auto-save progress when moving between steps
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (currentStep > 0) {
        saveProgress()
      }
    }, 30000) // Auto-save every 30 seconds
    
    return () => clearTimeout(autoSave)
  }, [currentStep])

  // Load saved progress on component mount
  useEffect(() => {
    const savedProgressData = localStorage.getItem('intakeFormProgress')
    if (savedProgressData) {
      try {
        const formData = JSON.parse(savedProgressData)
        
        // Restore form state
        setCurrentStep(formData.currentStep || 0)
        setCurrentPsychiatricServices(formData.currentPsychiatricServices !== undefined ? formData.currentPsychiatricServices : false)
        setHadPreviousTherapist(formData.hadPreviousTherapist !== undefined ? formData.hadPreviousTherapist : false)
        setPreviousTherapist(formData.previousTherapist || '')
        setTakingPrescribedMedication(formData.takingPrescribedMedication !== undefined ? formData.takingPrescribedMedication : false)
        setPrescribedMedication(formData.prescribedMedication || '')
        setPrescribedBy(formData.prescribedBy || '')
        setHasPrimaryDoctor(formData.hasPrimaryDoctor !== undefined ? formData.hasPrimaryDoctor : false)
        setPrimaryDoctor(formData.primaryDoctor || '')
        setHasOtherDoctor(formData.hasOtherDoctor !== undefined ? formData.hasOtherDoctor : false)
        setOtherDoctor(formData.otherDoctor || '')
        setPreviousPhysical(formData.previousPhysical || '')
        setPhysicalHealth(formData.physicalHealth || '')
        setHealthConcerns(formData.healthConcerns || '')
        // ... restore other fields as needed
        
        message.info('Previous form progress restored')
        setSavedProgress(true)
      } catch (error) {
        console.error('Failed to restore progress:', error)
        localStorage.removeItem('intakeFormProgress')
      }
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all steps before submission
    let allValid = true
    const allErrors = {}
    
    for (let i = 0; i < steps.length; i++) {
      const stepErrors = validateStep(i)
      if (!stepErrors) {
        allValid = false
        // Get the current form errors from the validation
        Object.assign(allErrors, formErrors)
      }
    }
    
    if (!allValid) {
      message.error("Please complete all required fields before submitting")
      setFormErrors(allErrors)
      return
    }

    if (!token) {
      message.error("Please log in again to submit your form")
      router.push('/auth/login')
      return
    }

    // Additional validation: ensure all boolean fields are actual booleans
    const requiredBooleanFields = [
      'currentPsychiatricServices',
      'hadPreviousTherapist', 
      'takingPrescribedMedication',
      'hasPrimaryDoctor',
      'hasOtherDoctor',
      'hasEatingProblems',
      'weightChange',
      'hasSleepProblems',
      'drinksAlcohol',
      'tobacco',
      'hasLifeChangingStress',
      'relationship',
      'employed',
      'familyMentalIllness',
      'familySubstanceAbuse',
      'familySuicide',
      'dramaticMoodSwings',
      'rapidSpeech',
      'extremeAnxiety',
      'panicAttacks',
      'phobias',
      'sleepDisturbances',
      'hallucinations',
      'unexplainedLossesOfTime',
      'unexplainedMemoryLapses',
      'alcoholSubstanceAbuse',
      'frequentBodyComplaints',
      'eatingDisorder',
      'bodyImageProblems',
      'repetitiveThoughts',
      'repetitiveBehaviors',
      'homicidalThoughts',
      'suicidalAttempts',
      'familyIllness'
    ]

    const booleanValidationErrors = []
    requiredBooleanFields.forEach(field => {
      const fieldMap = {
        currentPsychiatricServices,
        hadPreviousTherapist,
        takingPrescribedMedication,
        hasPrimaryDoctor,
        hasOtherDoctor,
        hasEatingProblems,
        weightChange,
        hasSleepProblems,
        drinksAlcohol,
        tobacco,
        hasLifeChangingStress,
        relationship,
        employed,
        familyMentalIllness,
        familySubstanceAbuse,
        familySuicide,
        dramaticMoodSwings,
        rapidSpeech,
        extremeAnxiety,
        panicAttacks,
        phobias,
        sleepDisturbances,
        hallucinations,
        unexplainedLossesOfTime,
        unexplainedMemoryLapses,
        alcoholSubstanceAbuse,
        frequentBodyComplaints,
        eatingDisorder,
        bodyImageProblems,
        repetitiveThoughts,
        repetitiveBehaviors,
        homicidalThoughts,
        suicidalAttempts,
        familyIllness
      }
      
      const value = fieldMap[field]
      if (typeof value !== 'boolean') {
        booleanValidationErrors.push(`${field}: must be selected (yes/no)`)
      }
    })

    if (booleanValidationErrors.length > 0) {
      console.error('Boolean validation errors:', booleanValidationErrors)
      message.error(`Please complete the following required fields: ${booleanValidationErrors.join(', ')}`)
      return
    }
    
    setIsLoading(true)

    const profileDetails = {
      currentPsychiatricServices: currentPsychiatricServices,
      hadPreviousTherapist: hadPreviousTherapist,
      previousTherapist: previousTherapist, 
      takingPrescribedMedication: takingPrescribedMedication,
      prescribedMedication: prescribedMedication,
      prescribedBy: prescribedBy,
      hasPrimaryDoctor: hasPrimaryDoctor,
      primaryDoctor: primaryDoctor,
      hasOtherDoctor: hasOtherDoctor,
      otherDoctor: otherDoctor,
      previousPhysical: previousPhysical,
      physicalHealth: physicalHealth,
      healthConcerns: healthConcerns,
      medicineForhealthConcerns: medicineForhealthConcerns,
      hasSleepProblems: hasSleepProblems,
      sleepProblems: sleepProblems,
      excersicePerWeek: excersicePerWeek,
      excerciseTypes: excerciseTypes,
      avgExerciseTime: avgExerciseTime,
      hasEatingProblems: hasEatingProblems,
      eatingProblems: eatingProblems,
      weightChange: weightChange,
      drinksAlcohol: drinksAlcohol,
      alocholAmount: alocholAmount,
      recDrugs: recDrugs,
      tobacco: tobacco,
      sucicidalThoughts: sucicidalThoughts,
      prevSucicidalThoughts: prevSucicidalThoughts,
      relationship: relationship,
      relationshipLength: relationshipLength,
      relationshipRating: relationshipRating,
      hasLifeChangingStress: hasLifeChangingStress,
      lifeChangingStress: lifeChangingStress,
      extremeDepressedMood: extremeDepressedMood,
      dramaticMoodSwings: dramaticMoodSwings,
      rapidSpeech: rapidSpeech,
      extremeAnxiety: extremeAnxiety,
      panicAttacks: panicAttacks,
      phobias: phobias,
      sleepDisturbances: sleepDisturbances,
      hallucinations: hallucinations,
      unexplainedLossesOfTime: unexplainedLossesOfTime,
      unexplainedMemoryLapses: unexplainedMemoryLapses,
      alcoholSubstanceAbuse: alcoholSubstanceAbuse,
      frequentBodyComplaints: frequentBodyComplaints,
      eatingDisorder: eatingDisorder,
      bodyImageProblems: bodyImageProblems,
      repetitiveThoughts: repetitiveThoughts,
      repetitiveBehaviors: repetitiveBehaviors,
      homicidalThoughts: homicidalThoughts,
      suicidalAttempts: suicidalAttempts,
      lastSuicidalAttempts: lastSuicidalAttempts,
      educationStartYear: educationStartYear,
      nursery: nursery,
      primarySchool: primarySchool,
      highSchool: highSchool,
      university: university,
      employed: employed,
      occupation: occupation,
      employer: employer,
      workDuration: workDuration,
      workEnjoyment: workEnjoyment,
      familyMentalIllness: familyMentalIllness,
      familyMentalIllnessMember: familyMentalIllnessMember,
      familySubstanceAbuse: familySubstanceAbuse,
      familySubstanceAbuseMember: familySubstanceAbuseMember,
      familySuicide: familySuicide,
      familySuicideMember: familySuicideMember,
      familyIllness: familyIllness,
      familyIllnessMember: familyIllnessMember,
      fatherRelationship: fatherRelationship,
      motherRelationship: motherRelationship,
      siblingRelationship: siblingRelationship,
      personalStengths: personalStengths,
      personalLikes: personalLikes,
      coping: coping,
      therapyGoals: therapyGoals,
      jailTime: jailTime,
      postedBy: user._id
    }

    try {
      const {data} = await axios.post(`${API_URL}/profiles/add`, profileDetails, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if(data){
        // Clear saved progress after successful submission
        localStorage.removeItem('intakeFormProgress')
        
        message.success("Thank you for filling out the form! Your information has been securely submitted.")
        console.log(data)
        
        // Redirect after a brief delay to show success message
        setTimeout(() => {
          router.push('/account')
        }, 2000)
      }
    } catch (error) {
      console.error("Profile submission error: ", error)
      
      if (error.response) {
        // Server responded with error status
        const status = error.response.status
        const errorMessage = error.response.data?.message || 'An error occurred'
        
        if (status === 401) {
          message.error("Please log in again to submit your form")
          router.push('/auth/login')
        } else if (status === 400) {
          message.error(`Validation Error: ${errorMessage}`)
        } else if (status === 409) {
          message.error("You have already submitted this form")
        } else {
          message.error(`Error: ${errorMessage}`)
        }
      } else if (error.request) {
        // Network error
        message.error("Network error. Please check your connection and try again.")
      } else {
        // Other error
        message.error("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Step content components
  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return (
          <Card className="min-h-[400px] sm:min-h-[500px]">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <UserOutlined className="text-3xl sm:text-4xl text-blue-500 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Current Services</h3>
                <p className="text-sm sm:text-base text-gray-600 px-2">
                  Tell us about your current mental health care
                </p>
              </div>
              
              <Alert 
                message="How This Works" 
                description="This form has 7 short sections. You can move between sections anytime, and your progress is automatically saved. All fields have default values, so you can skip questions you prefer to discuss in person."
                type="info" 
                showIcon 
                className="mb-4 sm:mb-6 text-sm"
              />
              
              <Alert 
                message="Privacy Notice" 
                description="All information is confidential and follows the same standards as our therapy sessions."
                type="success" 
                showIcon 
                className="mb-4 sm:mb-6 text-sm"
              />
              
              {Object.keys(formErrors).length > 0 && (
                <Alert 
                  message="Please Complete Required Fields" 
                  description={
                    <ul className="list-disc list-inside text-sm">
                      {Object.entries(formErrors).map(([field, error]) => (
                        <li key={field} className="mb-1">{error}</li>
                      ))}
                    </ul>
                  }
                  type="error" 
                  showIcon 
                  className="mb-4 sm:mb-6"
                />
              )}
              
              <div className="space-y-4 sm:space-y-6">
                <BasicRadioBox 
                  label='Are you currently receiving psychiatric services, professional counseling or psychotherapy elsewhere?' 
                  value={currentPsychiatricServices} 
                  setValue={setCurrentPsychiatricServices}
                  error={formErrors.currentPsychiatricServices}
                />
                
                <div className="text-center mt-6 sm:mt-8 p-3 sm:p-4 bg-green-50 rounded-lg">
                  <p className="text-sm sm:text-base text-green-700 mb-2 flex items-center justify-center">
                    <CheckCircleOutlined className="mr-2" />
                    Ready to continue!
                  </p>
                  <p className="text-xs sm:text-sm text-green-600 leading-relaxed">
                    All questions have default values, so you can proceed to the next section anytime.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )
        
      case 1:
        return (
          <Card className="min-h-[400px] sm:min-h-[500px]">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <MedicineBoxOutlined className="text-3xl sm:text-4xl text-green-500 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Treatment History</h3>
                <p className="text-sm sm:text-base text-gray-600 px-2">
                  Tell us about your previous mental health care
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <BasicRadioBox 
                  label='Have you had previous psychotherapy?' 
                  value={hadPreviousTherapist} 
                  setValue={setHadPreviousTherapist}
                  error={formErrors.hadPreviousTherapist}
                />
                
                {hadPreviousTherapist === true && (
                  <BasicTextArea 
                    label='Previous Therapist Name and Contact' 
                    value={previousTherapist} 
                    setValue={setPreviousTherapist} 
                  />
                )}
                
                <BasicRadioBox 
                  label='Are you currently taking prescribed psychiatric medication (antidepressants or others)?' 
                  value={takingPrescribedMedication} 
                  setValue={setTakingPrescribedMedication}
                  error={formErrors.takingPrescribedMedication}
                />
                
                {takingPrescribedMedication === true && (
                  <div className="space-y-4">
                    <BasicTextArea 
                      label='List Medication' 
                      value={prescribedMedication} 
                      setValue={setPrescribedMedication} 
                    />
                    <BasicInputs 
                      label='Prescribed by which therapist' 
                      value={prescribedBy} 
                      setValue={setPrescribedBy} 
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        )
        
      case 2:
        return (
          <Card className="min-h-[400px] sm:min-h-[500px]">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <HeartOutlined className="text-3xl sm:text-4xl text-red-500 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Health & Lifestyle</h3>
                <p className="text-sm sm:text-base text-gray-600 px-2">
                  Information about your physical health and daily habits
                </p>
              </div>
              
              <div className="space-y-6">
                <BasicRadioBox 
                  label='Do you currently have a primary doctor?' 
                  value={hasPrimaryDoctor} 
                  setValue={setHasPrimaryDoctor}
                  error={formErrors.hasPrimaryDoctor}
                />
                
                {hasPrimaryDoctor === true && (
                  <BasicTextArea 
                    label='Primary Doctor Name and Contact' 
                    value={primaryDoctor} 
                    setValue={setPrimaryDoctor} 
                  />
                )}
                
                <BasicRadioBox 
                  label='Are you currently seeing more than one medical health specialist?' 
                  value={hasOtherDoctor} 
                  setValue={setHasOtherDoctor} 
                />
                
                {hasOtherDoctor === true && (
                  <BasicTextArea 
                    label='Please list their names' 
                    value={otherDoctor} 
                    setValue={setOtherDoctor} 
                  />
                )}
                
                <BasicInputs 
                  label='When was your last physical exam?' 
                  value={previousPhysical} 
                  setValue={setPreviousPhysical} 
                />
                
                <MultipleChoiceRadio 
                  label="How would you rate your current physical health?" 
                  value={physicalHealth} 
                  options={['Poor', 'Unsatisfactory', 'Satisfactory', 'Good', 'Very Good']} 
                  setValue={setPhysicalHealth}
                  error={formErrors.physicalHealth}
                  required={true}
                />
                
                <BasicTextArea 
                  label='Please list any persistent physical symptoms or health concerns (e.g. chronic pain, headaches, hypertension, diabetes, etc.)?' 
                  value={healthConcerns} 
                  setValue={setHealthConcerns} 
                />
                
                <BasicTextArea 
                  label='Are you currently on medication to manage a physical health concern? If yes, please list' 
                  value={medicineForhealthConcerns} 
                  setValue={setMedicineForHealthConcerns} 
                />
                
                <div className="space-y-3 sm:space-y-4 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 text-sm sm:text-base border-b border-gray-200 pb-2">
                    Exercise and Activity
                  </h4>
                  <BasicTextArea 
                    label='How many times per week do you exercise?' 
                    value={excersicePerWeek} 
                    setValue={setExcercisePerWeek} 
                  />
                  <BasicTextArea 
                    label='What type of exercise do you participate in?' 
                    value={excerciseTypes} 
                    setValue={setExcerciseTypes} 
                  />
                  <BasicTextArea 
                    label='Approximately how long each time?' 
                    value={avgExerciseTime} 
                    setValue={setAvgExerciseTime} 
                  />
                </div>
                
                <BasicRadioBox 
                  label='Are you having any difficulty with appetite or eating habits?' 
                  value={hasEatingProblems} 
                  setValue={setHasEatingProblems} 
                />
                
                {hasEatingProblems === true && (
                  <MultipleChoiceRadio 
                    label="If yes, check where applicable:" 
                    value={eatingProblems} 
                    options={['Eating Less', 'Eating More', 'Bingeing', 'Restricting']} 
                    setValue={setEatingProblems} 
                  />
                )}
                
                <BasicRadioBox 
                  label='Have you experienced significant weight change in the last 2 months?' 
                  value={weightChange} 
                  setValue={setWeightChange} 
                />
              </div>
            </div>
          </Card>
        )
        
      case 3:
        return (
          <Card className="min-h-[400px] sm:min-h-[500px]">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <InfoCircleOutlined className="text-3xl sm:text-4xl text-purple-500 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Mental Health & Lifestyle</h3>
                <p className="text-sm sm:text-base text-gray-600 px-2">
                  Current symptoms and lifestyle factors
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <BasicRadioBox 
                  label='Are you having any problems with your sleep habits?' 
                  value={hasSleepProblems} 
                  setValue={setHasSleepProblems}
                  error={formErrors.hasSleepProblems}
                />
                
                {hasSleepProblems === true && (
                  <MultipleChoiceRadio 
                    label="If yes, check where applicable:" 
                    value={sleepProblems} 
                    options={['Sleeping too little', 'Sleeping too much', 'Poor quality sleep', 'Disturbing Dreams']} 
                    setValue={setSleepProblems} 
                  />
                )}
                
                <BasicRadioBox 
                  label='Do you regularly use alcohol?' 
                  value={drinksAlcohol} 
                  setValue={setDrinksAlcohol}
                  error={formErrors.drinksAlcohol}
                />
                
                {drinksAlcohol === true && (
                  <BasicTextArea 
                    label='In a typical month, how often do you have 4 or more drinks in a 24 hour period?' 
                    value={alocholAmount} 
                    setValue={setAlcoholAmounts} 
                  />
                )}
                
                <MultipleChoiceRadio 
                  label="How often do you engage recreational drug use?" 
                  value={recDrugs} 
                  options={['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never']} 
                  setValue={setRecDrugs} 
                />
                
                <BasicRadioBox 
                  label='Do you smoke cigarettes or use other tobacco products?' 
                  value={tobacco} 
                  setValue={setTobacco} 
                />
                
                <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
                  <Alert
                    message="Important Safety Question"
                    description="This information helps us provide you with the best care and ensure your safety."
                    type="warning"
                    showIcon
                    className="mb-3 sm:mb-4 text-sm"
                  />
                  <MultipleChoiceRadio 
                    label="Have you had suicidal thoughts recently?" 
                    value={sucicidalThoughts} 
                    options={['Frequently', 'Sometimes', 'Rarely', 'Never']} 
                    setValue={setSuicidalThoughts}
                    error={formErrors.sucicidalThoughts}
                    required={true}
                  />
                  
                  <MultipleChoiceRadio 
                    label="Have you had them in the past?" 
                    value={prevSucicidalThoughts} 
                    options={['Frequently', 'Sometimes', 'Rarely', 'Never']} 
                    setValue={setPrevSuicidalThoughts} 
                  />
                </div>
                
                <BasicRadioBox 
                  label='In the last year, have you experienced any significant life changes or stressors?' 
                  value={hasLifeChangingStress} 
                  setValue={setHasLifeChangingStress} 
                />
                
                {hasLifeChangingStress === true && (
                  <BasicTextArea 
                    label='Please explain' 
                    value={lifeChangingStress} 
                    setValue={setLifeChangingStress} 
                  />
                )}
                
                <BasicRadioBox 
                  label='Are you in a romantic relationship?' 
                  value={relationship} 
                  setValue={setRelationship}
                  error={formErrors.relationship}
                />
                
                {relationship === true && (
                  <div className="space-y-4">
                    <BasicTextArea 
                      label='How long have you been in this relationship?' 
                      value={relationshipLength} 
                      setValue={setRelationshipLength} 
                    />
                    <BasicTextArea 
                      label='On a scale of 1-10 (10 being the highest quality), how would you rate your current relationship?' 
                      value={relationshipRating} 
                      setValue={setRelationshipRating} 
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        )
        
      case 4:
        return (
          <Card className="min-h-[500px]">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <BookOutlined className="text-4xl text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Education & Career</h3>
                <p className="text-gray-600">Your educational and professional background</p>
              </div>
              
              <div className="space-y-6">
                <BasicTextArea 
                  label='Please indicate the year you started and completed your academic years.' 
                  value={educationStartYear} 
                  setValue={setEducationStartYear} 
                />
                
                <BasicInputs 
                  label='Nursery' 
                  value={nursery} 
                  setValue={setNursery} 
                />
                
                <BasicInputs 
                  label='Primary School' 
                  value={primarySchool} 
                  setValue={setPrimarySchool} 
                />
                
                <BasicInputs 
                  label='High School' 
                  value={highSchool} 
                  setValue={setHighSchool} 
                />
                
                <BasicInputs 
                  label='University' 
                  value={university} 
                  setValue={setUniversity} 
                />
                
                <BasicRadioBox 
                  label='Are you employed?' 
                  value={employed} 
                  setValue={setEmployed}
                  error={formErrors.employed}
                />
                
                {employed === true && (
                  <div className="space-y-4">
                    <BasicInputs 
                      label='Occupation' 
                      value={occupation} 
                      setValue={setOccupation} 
                    />
                    <BasicInputs 
                      label='Employer' 
                      value={employer} 
                      setValue={setEmployer} 
                    />
                    <BasicInputs 
                      label='How long have you been working there?' 
                      value={workDuration} 
                      setValue={setWorkDuration} 
                    />
                    <BasicTextArea 
                      label='Do you enjoy your work?' 
                      value={workEnjoyment} 
                      setValue={setWorkEnjoyment} 
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        )
        
      case 5:
        return (
          <Card className="min-h-[500px]">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <TeamOutlined className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Family & Social History</h3>
                <p className="text-gray-600">Family background and relationships</p>
              </div>
              
              <div className="space-y-6">
                <p className="text-sm text-gray-600 mb-4">
                  Has anyone in your family (either immediate family members or relatives) experienced:
                </p>
                
                <BasicRadioBox 
                  label='Mental illness (depression, anxiety, bipolar, etc.)?' 
                  value={familyMentalIllness} 
                  setValue={setFamilyMentalIllness}
                  error={formErrors.familyMentalIllness}
                />
                
                {familyMentalIllness === true && (
                  <BasicTextArea 
                    label='Who and what condition?' 
                    value={familyMentalIllnessMember} 
                    setValue={setFamilyMentalIllnessMember} 
                  />
                )}
                
                <BasicRadioBox 
                  label='Substance abuse or addiction?' 
                  value={familySubstanceAbuse} 
                  setValue={setFamilySubstanceAbuse}
                  error={formErrors.familySubstanceAbuse}
                />
                
                {familySubstanceAbuse === true && (
                  <BasicTextArea 
                    label='Who and what substance?' 
                    value={familySubstanceAbuseMember} 
                    setValue={setFamilySubstanceAbuseMember} 
                  />
                )}
                
                <BasicRadioBox 
                  label='Suicide or suicide attempts?' 
                  value={familySuicide} 
                  setValue={setFamilySuicide} 
                />
                
                {familySuicide === true && (
                  <BasicTextArea 
                    label='Who?' 
                    value={familySuicideMember} 
                    setValue={setFamilySuicideMember} 
                  />
                )}
                
                <BasicTextArea 
                  label='Please describe the relationship you have with your father?' 
                  value={fatherRelationship} 
                  setValue={setFatherRelationship} 
                />
                
                <BasicTextArea 
                  label='Please describe the relationship you have with your mother?' 
                  value={motherRelationship} 
                  setValue={setMotherRelationship} 
                />
                
                <BasicTextArea 
                  label='Please describe the relationship you have with your siblings?' 
                  value={siblingRelationship} 
                  setValue={setSiblingRelationship} 
                />
              </div>
            </div>
          </Card>
        )
        
      case 6:
        return (
          <Card className="min-h-[400px] sm:min-h-[500px]">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <CheckCircleOutlined className="text-3xl sm:text-4xl text-green-500 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Final Details</h3>
                <p className="text-sm sm:text-base text-gray-600 px-2">
                  Additional information and therapy goals
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <BasicTextArea 
                  label='What do you consider to be your strengths?' 
                  value={personalStengths} 
                  setValue={setPersonalStrengths} 
                />
                
                <BasicTextArea 
                  label='What do you like about yourself?' 
                  value={personalLikes} 
                  setValue={setPersonalLikes} 
                />
                
                <BasicTextArea 
                  label='How do you cope with stress?' 
                  value={coping} 
                  setValue={setCoping} 
                />
                
                <BasicTextArea 
                  label='What are your goals for therapy?' 
                  value={therapyGoals} 
                  setValue={setTherapyGoals} 
                />
                
                <BasicTextArea 
                  label='Have you ever spent time in jail? (If yes, please explain)' 
                  value={jailTime} 
                  setValue={setJailTime} 
                />
                
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">
                    Form Completion Summary
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-600 mb-3 sm:mb-4 leading-relaxed">
                    You've completed all sections of the intake form. Your responses help us provide personalized care.
                  </p>
                  
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <p><strong>Sections Completed:</strong> {steps.length}</p>
                      <p><strong>Total Questions:</strong> 40+</p>
                    </div>
                    <div className="space-y-1">
                      <p><strong>Time Taken:</strong> Self-paced</p>
                      <p><strong>Data Security:</strong> Confidential</p>
                    </div>
                  </div>
                </div>
                
                <Alert 
                  message="Ready to Submit" 
                  description="Your information will be securely transmitted to your healthcare provider. You can review or update this information during your appointment."
                  type="success" 
                  showIcon 
                />
              </div>
            </div>
          </Card>
        )
        
      default:
        return (
          <Card className="min-h-[300px] sm:min-h-[400px]">
            <div className="text-center py-8 sm:py-12 px-4">
              <CheckCircleOutlined className="text-3xl sm:text-4xl text-green-500 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Form Complete</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                Review your information and submit when ready
              </p>
              <Button 
                type="primary" 
                size="large" 
                loading={isLoading}
                onClick={handleSubmit}
                icon={<SaveOutlined />}
                className="w-full xs:w-auto min-w-[200px]"
              >
                Submit Form
              </Button>
            </div>
          </Card>
        )
    }
  }

  // Show loading while authentication is being checked
  if (loading) {
    return (
      <div className='w-full min-h-screen bg-gray-50 flex items-center justify-center'>
        <Spin size="large" />
      </div>
    )
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null
  }

  return (
    <div className='w-full min-h-screen bg-gray-50'>
      <PictureHero 
        title="Adult Intake Form" 
        description="Complete this form at your own pace. Your progress will be saved automatically." 
        imgPath="/assets/Stockimgs/t3.jpg" 
      />
      
      <div className='max-w-6xl mx-auto p-3 sm:p-4 lg:p-6'>
        {/* Progress Header */}
        <Card className="mb-4 sm:mb-6 shadow-sm">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3 sm:gap-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 leading-tight">
                Mental Health Intake Assessment
              </h2>
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-1">
                <Button 
                  type="text" 
                  onClick={() => {
                    localStorage.removeItem('intakeFormProgress')
                    message.success('Form data cleared - refreshing page...')
                    setTimeout(() => window.location.reload(), 500)
                  }}
                  danger
                  size="small"
                  className="text-xs xs:text-sm"
                >
                  Reset Form
                </Button>
                <Button 
                  type="text" 
                  onClick={saveProgress}
                  loading={isLoading}
                  icon={<SaveOutlined />}
                  className="text-blue-600 text-xs xs:text-sm"
                  size="small"
                >
                  Save Progress
                </Button>
              </div>
            </div>
            
            <Progress 
              percent={Math.round(((currentStep + 1) / steps.length) * 100)} 
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              className="mb-3 sm:mb-4"
              size="small"
            />
            
            <p className="text-xs sm:text-sm text-gray-600 flex flex-col xs:flex-row xs:items-center">
              <span>Step {currentStep + 1} of {steps.length}</span>
              {savedProgress && (
                <span className="text-green-600 xs:ml-2 mt-1 xs:mt-0 flex items-center">
                  <CheckCircleOutlined className="mr-1 text-xs" />
                  Progress saved
                </span>
              )}
            </p>
          </div>
          
          <Steps 
            current={currentStep} 
            size="small"
            className="hidden lg:flex"
            direction="horizontal"
          >
            {steps.map((step, index) => (
              <Steps.Step
                key={index}
                title={<span className="text-xs lg:text-sm">{step.title}</span>}
                description={<span className="text-xs">{step.description}</span>}
                icon={step.icon}
              />
            ))}
          </Steps>
          
          {/* Mobile/Tablet Step Indicator */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0 text-lg sm:text-xl">
                  {steps[currentStep].icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                    {steps[currentStep].title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {steps[currentStep].description}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-sm sm:text-base font-medium text-blue-600">
                  {currentStep + 1}/{steps.length}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Form Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
          {/* Sidebar Navigation - Hidden on mobile/tablet */}
          <div className="hidden xl:block">
            <Card className="sticky top-6">
              <h4 className="font-semibold mb-4 text-sm">Form Sections</h4>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-2 lg:p-3 rounded cursor-pointer transition-colors ${
                      index === currentStep 
                        ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                        : index < currentStep 
                          ? 'bg-green-50 text-green-700'
                          : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    onClick={() => index <= currentStep && setCurrentStep(index)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{step.icon}</span>
                      <span className="text-xs lg:text-sm font-medium leading-tight">{step.title}</span>
                    </div>
                    {index < currentStep && (
                      <CheckCircleOutlined className="text-green-500 text-xs mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Form Content */}
          <div className="xl:col-span-3">
            <Spin spinning={isLoading}>
              {renderStepContent()}
            </Spin>
            
            {/* Navigation Buttons */}
            <Card className="mt-4 sm:mt-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
                <Button
                  size="large"
                  disabled={currentStep === 0}
                  onClick={prevStep}
                  icon={<ArrowLeftOutlined />}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  <span className="hidden xs:inline">Previous</span>
                  <span className="xs:hidden">Back</span>
                </Button>
                
                <div className="text-center order-1 sm:order-2">
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">
                    {currentStep + 1} of {steps.length} sections
                  </span>
                </div>
                
                {currentStep < steps.length - 1 ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={nextStep}
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                    className="w-full sm:w-auto order-3"
                  >
                    <span className="hidden xs:inline">Next</span>
                    <span className="xs:hidden">Continue</span>
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    loading={isLoading}
                    onClick={handleSubmit}
                    icon={<CheckCircleOutlined />}
                    className="w-full sm:w-auto order-3"
                  >
                    <span className="hidden xs:inline">Complete Form</span>
                    <span className="xs:hidden">Submit</span>
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

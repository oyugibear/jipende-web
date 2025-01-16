'use client'

import BasicInputs from '@/components/Constants/fields/basicInputs'
import BasicRadioBox from '@/components/Constants/fields/BasicRadioBox'
import BasicTextArea from '@/components/Constants/fields/BasicTextArea'
import PictureHero from '@/components/Constants/PictureHero'
import React, { useState } from 'react'

export default function page() {

  const [name, setName] = useState('')
  const [radioValue, setRadioValue] = useState(false)

  // Treatment History
  const [currentPsychiatricServices, setCurrentPsychiatricServices] = useState()
  const [hadPreviousTherapist, setHadPreviousTherapist] = useState('')
  const [previousTherapist, setPreviousTherapist] = useState('')
  const [takingPrescribedMedication, setTakingPrescribedMedication] = useState('')

  // Health & Social Information
  const [hasPrimaryDoctor, setHasPrimaryDoctor] = useState('')
  const [primaryDoctor, setPrimaryDoctor] = useState('')
  const [physicalHealth, setPhysicalHealth] = useState('')
  const [healthConcerns, setHealthConcerns] = useState('')
  const [medicineForhealthConcerns, setMedicineForHealthConcerns] = useState('')
  const [hasSleepProblems, setHasSleepProblems] = useState('')
  const [SleepProblems, setSleepProblems] = useState('')
  const [excersicePerWeek, setExcercisePerWeek] = useState('')
  const [excerciseTypes, setExcerciseTypes] = useState('')
  const [avgExerciseTime, setAvgExerciseTime] = useState('')
  const [hasEatingProblems, setHasEatingProblems] = useState('')
  const [eatingProblems, setEatingProblems] = useState('')
  const [weightChange, setWeightChange] = useState('')
  const [drinksAlochol, setDrinksAlcohol] = useState('')
  const [alocholAmount, setAlcoholAmounts] = useState('')
  const [recDrugs, setRecDrugs] = useState('')
  const [tobacco, setTobacco] = useState(false)
  const [sucicidalThoughts, setSuicidalThoughts] = useState('')
  const [relationship, setRelationship] = useState(false)
  const [relationshipLength, setRelationshipLength] = useState(false)
  const [relationshipRating, setRelationshipRating] = useState(false)
  const [lifeChangingStress, setLifeChangingStress] = useState(false)
  





  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <PictureHero title="Adult Intake Form" description={""} imgPath="/assets/Stockimgs/contract.png" />
        <div className='max-w-4xl mx-auto p-6 text-gray-900'>
          <div>
            <p className='my-4'>
              Please provide the following information for our records. Leave blank any question you
              would rather not answer or would prefer to discuss with your therapist. Information
              you provide here is held to the same standards of confidentiality as our therapy.
            </p>
            <form action="">
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Personal Infromation</p>
                <BasicInputs label='Name' value={name} setValue={setName} />
              </div>
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Treatment History</p>
                <BasicRadioBox label='Are you currently receiving psychiatric services, professional counseling or psychotherapy elsewhere?' value={currentPsychiatricServices} setValue={setCurrentPsychiatricServices} />
                <BasicRadioBox label='Have you had previous psychotherapy?' value={hadPreviousTherapist} setValue={setHadPreviousTherapist} />
                {hadPreviousTherapist == true ? (
                  <BasicTextArea label='Previous Therapist Name' value={previousTherapist} setValue={setPreviousTherapist} />
                ) : null}
                <BasicRadioBox label='Are you currently taking prescribed psychiatric medication (antidepressants or others)?' value={takingPrescribedMedication} setValue={setTakingPrescribedMedication} />
                {takingPrescribedMedication == true ? (
                  <>
                    <BasicTextArea label='List Medication' value={previousTherapist} setValue={setPreviousTherapist} />
                    <BasicInputs label='Prescribed by which therapist' value={previousTherapist} setValue={setPreviousTherapist} />
                  </>
                ) : null}
              </div>
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Health & Social Information</p>
                <BasicRadioBox label='Do you currently have a primary doctor?' value={hasPrimaryDoctor} setValue={setHasPrimaryDoctor} />
                {hasPrimaryDoctor == true ? (
                  <BasicTextArea label='Primary Doctor Name' value={primaryDoctor} setValue={setPrimaryDoctor} />
                ) : null}
                <BasicRadioBox label='Are you currently seeing more than one medical health specialist?' value={hadPreviousTherapist} setValue={setHadPreviousTherapist} />
                {hasPrimaryDoctor == true ? (
                  <>
                    <BasicTextArea label='Please list their names' value={primaryDoctor} setValue={setPrimaryDoctor} />
                    <BasicTextArea label='When was your last physical' value={primaryDoctor} setValue={setPrimaryDoctor} />
                  </>
                ) : null}
                {/* Missing physical health radio */}
                <BasicTextArea label='Please list any persistent physical symptoms or health concerns (e.g. chronic pain, headaches, hypertension, diabetes, etc.)?' value={healthConcerns} setValue={setHealthConcerns} />
                <BasicTextArea label='Are you currently on medication to manage a physical health concern? If yes, please list' value={healthConcerns} setValue={setHealthConcerns} />
                <BasicRadioBox label='Are you having any problems with your sleep habits?' value={hadPreviousTherapist} setValue={setHadPreviousTherapist} />
                
              </div>
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Education History</p>
                <BasicInputs label='Name' value={name} setValue={setName} />
              </div>
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Occupational History</p>
                <BasicInputs label='Name' value={name} setValue={setName} />
              </div>
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Family History</p>
                <BasicInputs label='Name' value={name} setValue={setName} />
              </div>
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Family Relationship History</p>
                <BasicInputs label='Name' value={name} setValue={setName} />
              </div>
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Other Information</p>
                <BasicInputs label='Name' value={name} setValue={setName} />
              </div>
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Forensic History</p>
                <BasicInputs label='Name' value={name} setValue={setName} />
              </div> 
            </form>
          </div>
        </div>
    </div>
  )
}

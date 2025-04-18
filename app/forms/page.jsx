'use client'

import BasicInputs from '@/components/Constants/fields/BasicInputs'
import BasicRadioBox from '@/components/Constants/fields/BasicRadioBox'
import BasicTextArea from '@/components/Constants/fields/BasicTextArea'
import MultipleChoiceRadio from '@/components/Constants/fields/MultipleChoiceRadio'
import PictureHero from '@/components/Constants/PictureHero'
import { API_URL } from '@/config/api.config'
import { useUser } from '@/context'
import { message } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {

  const { user } = useUser()
  const router = useRouter()
  useEffect(() => {
    if(!user){
      router.push("/auth/signin")
    }
  }, [user])

  // Treatment History
  const [currentPsychiatricServices, setCurrentPsychiatricServices] = useState()
  const [hadPreviousTherapist, setHadPreviousTherapist] = useState('')
  const [previousTherapist, setPreviousTherapist] = useState('')
  const [takingPrescribedMedication, setTakingPrescribedMedication] = useState('')
  const [prescribedMedication, setPrescribedMedication] = useState('')
  const [prescribedBy, setPrescribedBy] = useState('')

  // Health & Social Information
  const [hasPrimaryDoctor, setHasPrimaryDoctor] = useState('')
  const [primaryDoctor, setPrimaryDoctor] = useState('')
  const [hasOtherDoctor, setHasOtherDoctor] = useState('')
  const [otherDoctor, setOtherDoctor] = useState('')
  const [previousPhysical, setPreviousPhysical] = useState('')
  const [physicalHealth, setPhysicalHealth] = useState('')
  const [healthConcerns, setHealthConcerns] = useState('')
  const [medicineForhealthConcerns, setMedicineForHealthConcerns] = useState('')
  const [hasSleepProblems, setHasSleepProblems] = useState('')
  const [sleepProblems, setSleepProblems] = useState('')
  const [excersicePerWeek, setExcercisePerWeek] = useState('')
  const [excerciseTypes, setExcerciseTypes] = useState('')
  const [avgExerciseTime, setAvgExerciseTime] = useState('')
  const [hasEatingProblems, setHasEatingProblems] = useState('')
  const [eatingProblems, setEatingProblems] = useState('')
  const [weightChange, setWeightChange] = useState('')
  const [drinksAlcohol, setDrinksAlcohol] = useState('')
  const [alocholAmount, setAlcoholAmounts] = useState('')
  const [recDrugs, setRecDrugs] = useState('')
  const [tobacco, setTobacco] = useState(false)
  const [sucicidalThoughts, setSuicidalThoughts] = useState('')
  const [prevSucicidalThoughts, setPrevSuicidalThoughts] = useState('')
  const [relationship, setRelationship] = useState(false)
  const [relationshipLength, setRelationshipLength] = useState(false)
  const [relationshipRating, setRelationshipRating] = useState(false)
  const [hasLifeChangingStress, setHasLifeChangingStress] = useState(false)
  const [lifeChangingStress, setLifeChangingStress] = useState(false)
  
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
  //add the rest
  
  // Education History
  const [educationStartYear, setEducationStartYear] = useState('')
  const [nursery, setNursery] = useState('')
  const [primarySchool, setPrimarySchool] = useState('')
  const [highSchool, setHighSchool] = useState('')
  const [university, setUniversity] = useState('')
  
  // Occupational Information
  const [employed, setEmployed] = useState('')
  const [employedPosition, setEmployedPosition] = useState('')
  const [jobSatisfaction, setJobSatisfaction] = useState('')
  const [workStressor, setWorkStressor] = useState('')

  // Family History
  const [familyDepression, setFamilyDepression] = useState(false)
  const [familyDepressionMember, setFamilyDepressionMember] = useState('')
  const [familyBipolar, setFamilyBipolar] = useState(false)
  const [familyBipolarMember, setFamilyBipolarMember] = useState('')
  const [familyAnxiety, setFamilyAnxiety] = useState(false)
  const [familyAnxietyMember, setFamilyAnxietyMember] = useState('')
  const [familyPanic, setFamilyPanic] = useState(false)
  const [familyPanicMember, setFamilyPanicMember] = useState('')
  const [familySchiz, setFamilySchiz] = useState(false)
  const [familySchizMember, setFamilySchizMember] = useState('')
  const [familyAlcohol, setFamilyAlcohol] = useState(false)
  const [familyAlcoholMember, setFamilyAlcoholMember] = useState('')
  const [familyEating, setFamilyEating] = useState(false)
  const [familyEatingMember, setFamilyEatingMember] = useState('')
  const [familyLearning, setFamilyLearning] = useState(false)
  const [familyLearningMember, setFamilyLearningMember] = useState('')
  const [familyTrauma, setFamilyTrauma] = useState(false)
  const [familyTraumaMember, setFamilyTraumaMember] = useState('')
  const [familySuicide, setFamilySuicide] = useState(false)
  const [familySuicideMember, setFamilySuicideMember] = useState('')
  const [familyIllness, setFamilyIllness] = useState(false)
  const [familyIllnessMember, setFamilyIllnessMember] = useState('')

  // Family Relationship History
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


  const handleSubmit = async (e) => {
    e.preventDefault()

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
      employedPosition: employedPosition,
      jobSatisfaction: jobSatisfaction,
      workStressor: workStressor,
      familyDepression: familyDepression,
      familyDepressionMember: familyDepressionMember,
      familyBipolar: familyBipolar,
      familyBipolarMember: familyBipolarMember,
      familyAnxiety: familyAnxiety,
      familyAnxietyMember: familyAnxietyMember,
      familyPanic: familyPanic,
      familyPanicMember: familyPanicMember,
      familySchiz: familySchiz,
      familySchizMember: familySchizMember,
      familyAlcohol: familyAlcohol,
      familyAlcoholMember: familyAlcoholMember,
      familyEating: familyEating,
      familyEatingMember: familyEatingMember,
      familyLearning: familyLearning,
      familyLearningMember: familyLearningMember,
      familyTrauma: familyTrauma,
      familyTraumaMember: familyTraumaMember,
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
      const {data} = await axios.post(`${API_URL}/profile/add`, profileDetails)
      if(data){
        message.success("Thank you for filling out the form")
        console.log(data)
      }

  } catch (error) {
    console.log("error: ", error)
    message.error("Please try again")
  }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <PictureHero title="Adult Intake Form" description={""} imgPath="/assets/Stockimgs/t3.jpg" />
        <div className='max-w-4xl mx-auto p-6 text-gray-900'>
          <div>
            <p className='my-4'>
              Please provide the following information for our records. Leave blank any question you
              would rather not answer or would prefer to discuss with your therapist. Information
              you provide here is held to the same standards of confidentiality as our therapy.
            </p>
            <form onSubmit={(e) => handleSubmit(e)}>
              {/* <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Personal Infromation</p>
                <BasicInputs label='Name' value={name} setValue={setName} />
              </div> */}
              {/* Treatment History */}
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
                    <BasicTextArea label='List Medication' value={prescribedMedication} setValue={setPrescribedMedication} />
                    <BasicInputs label='Prescribed by which therapist' value={prescribedBy} setValue={setPrescribedBy} />
                  </>
                ) : null}
              </div>
              {/* Health & Social */}
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Health & Social Information</p>
                <BasicRadioBox label='Do you currently have a primary doctor?' value={hasPrimaryDoctor} setValue={setHasPrimaryDoctor} />
                {hasPrimaryDoctor == true ? (
                  <BasicTextArea label='Primary Doctor Name' value={primaryDoctor} setValue={setPrimaryDoctor} />
                ) : null}
                <BasicRadioBox label='Are you currently seeing more than one medical health specialist?' value={hasOtherDoctor} setValue={setHasOtherDoctor} />
                {hasPrimaryDoctor == true ? (
                  <>
                    <BasicTextArea label='Please list their names' value={otherDoctor} setValue={setOtherDoctor} />
                  </>
                ) : null}
                <BasicTextArea label='When was your last physical' value={previousPhysical} setValue={setPreviousPhysical} />
                {/* Missing physical health radio */}
                <MultipleChoiceRadio label="How would you rate your current physical health (please circle one)?" value={physicalHealth} options={['Poor', 'Unsatisfactory', 'Satisfactory', 'Good', 'Very Good']} setValue={setPhysicalHealth} />
                <BasicTextArea label='Please list any persistent physical symptoms or health concerns (e.g. chronic pain, headaches, hypertension, diabetes, etc.)?' value={healthConcerns} setValue={setHealthConcerns} />
                <BasicTextArea label='Are you currently on medication to manage a physical health concern? If yes, please list' value={medicineForhealthConcerns} setValue={setMedicineForHealthConcerns} />
                <BasicRadioBox label='Are you having any problems with your sleep habits?' value={hasSleepProblems} setValue={setHasSleepProblems} />
                {hasSleepProblems == true ? (
                  <>
                    <MultipleChoiceRadio label="if yes, check where applicable:" value={sleepProblems} options={['Sleeping too little', 'Sleeping too much', 'Poor quality sleep', 'Distrubing Dreams']} setValue={setSleepProblems} />
                  </>
                ) : null}
                <BasicTextArea label='How many times per week do you exercise?' value={excersicePerWeek} setValue={setExcercisePerWeek} />
                <BasicTextArea label='What type of exercise due you participate in?' value={excerciseTypes} setValue={setExcerciseTypes} />
                <BasicTextArea label='Approximately how long each time?' value={avgExerciseTime} setValue={setAvgExerciseTime} />
                <BasicRadioBox label='Are you having any difficulty with appetite or eating habits?' value={hasEatingProblems} setValue={setHasEatingProblems} />
                {hasEatingProblems == true ? (
                  <>
                    <MultipleChoiceRadio label="if yes, check where applicable:" value={eatingProblems} options={['Eating Less', 'Eating More', 'Bingeing', 'Restricting']} setValue={setEatingProblems} />
                  </>
                ) : null}
                <BasicRadioBox label='Have you experienced significant weight change in the last 2 months?' value={weightChange} setValue={weightChange} />
                <BasicRadioBox label='Do you regularly use alcohol?' value={drinksAlcohol} setValue={setDrinksAlcohol} />
                {drinksAlcohol == true ? (
                  <>
                    <BasicTextArea label='In a typical month, how often do you have 4 or more drinks in a 24 hour period?' value={alocholAmount} setValue={setAlcoholAmounts} />
                  </>
                ) : null}
                <MultipleChoiceRadio label="How often do you engage recreational drug use?" value={recDrugs} options={['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never']} setValue={setRecDrugs} />
                <BasicRadioBox label='Do you smoke cigarettes or use other tobacco products?' value={tobacco} setValue={setTobacco} />
                <MultipleChoiceRadio label="Have you had suicidal thoughts recently?" value={sucicidalThoughts} options={['Frequently', 'Sometimes', 'Rarely', 'Never']} setValue={setSuicidalThoughts} />
                <MultipleChoiceRadio label="Have you had them in the past?" value={prevSucicidalThoughts} options={['Frequently', 'Sometimes', 'Rarely', 'Never']} setValue={setPrevSuicidalThoughts} />
                <BasicRadioBox label='Are you in a romantic relationship?' value={relationship} setValue={setRelationship} />
                {relationship == true ? (
                  <>
                    <BasicTextArea label='how long have you been in this relationship?' value={relationshipLength} setValue={setRelationshipLength} />
                    <BasicTextArea label='On a scale of 1-10 (10 being the highest quality), how would you rate your current relationship?' value={relationshipRating} setValue={setRelationshipRating} />
                  </>
                ) : null}
                <BasicRadioBox label='In the last year, have you experienced any significant life changes or stressors?' value={hasLifeChangingStress} setValue={setHasLifeChangingStress} />
                {hasLifeChangingStress == true ? (
                  <>
                    <BasicTextArea label='Please explain' value={lifeChangingStress} setValue={setLifeChangingStress} />
                  </>
                ) : null}
                <p>Have you ever experienced the following</p>
                <BasicRadioBox label='Extreme depressed mood' value={extremeDepressedMood} setValue={setExtremeDepressedMood} />
                <BasicRadioBox label='Dramatic mood swings' value={dramaticMoodSwings} setValue={setDramaticMoodSwings} />
                <BasicRadioBox label='Rapid speech' value={rapidSpeech} setValue={setRapidSpeech} />
                <BasicRadioBox label='Extreme anxiety' value={extremeAnxiety} setValue={setExtremeAnxiety} />
                <BasicRadioBox label='Panic attacks' value={panicAttacks} setValue={setPanicAttacks} />
                <BasicRadioBox label='Phobias' value={phobias} setValue={setPhobias} />
                <BasicRadioBox label='Sleep disturbances' value={sleepDisturbances} setValue={setSleepDisturbances} />
                <BasicRadioBox label='Hallucinations' value={hallucinations} setValue={setHallucinations} />
                <BasicRadioBox label='Unexplained losses of time' value={unexplainedLossesOfTime} setValue={setUnexplainedLossesOfTime} />
                <BasicRadioBox label='Unexplained memory lapses' value={unexplainedMemoryLapses} setValue={setUnexplainedMemoryLapses} />
                <BasicRadioBox label='Alcohol/substance abuse' value={alcoholSubstanceAbuse} setValue={setAlcoholSubstanceAbuse} />
                <BasicRadioBox label='Frequent body complaints' value={frequentBodyComplaints} setValue={setFrequentBodyComplaints} />
                <BasicRadioBox label='Eating disorder' value={eatingDisorder} setValue={setEatingDisorder} />
                <BasicRadioBox label='Body image problems' value={bodyImageProblems} setValue={setBodyImageProblems} />
                <BasicRadioBox label='Repetitive thoughts (e.g. obsessions)' value={repetitiveThoughts} setValue={setRepetitiveThoughts} />
                <BasicRadioBox label='Repetitive behaviors (e.g. frequent checking, hand washing)' value={repetitiveBehaviors} setValue={setRepetitiveBehaviors} />
                <BasicRadioBox label='Homicidal thoughts' value={homicidalThoughts} setValue={setHomicidalThoughts} />
                <BasicRadioBox label='Suicidal attempts' value={suicidalAttempts} setValue={setSuicidalAttempts} />
                {suicidalAttempts == true ? (
                  <>
                    <BasicTextArea label='When' value={lastSuicidalAttempts} setValue={setLastSuicidalAttempts} />
                  </>
                ) : null}
              </div>
              {/* Educational */}
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Education History</p>
                <BasicTextArea label='Please indicate the year you started and the year completed your academic years.' value={educationStartYear} setValue={setEducationStartYear} />
                <BasicTextArea label='Which Nursery school did you attend?' value={nursery} setValue={setNursery} />
                <BasicTextArea label='Which Primary school did you attend?' value={primarySchool} setValue={setPrimarySchool} />
                <BasicTextArea label='Which High school did you attend?' value={highSchool} setValue={setHighSchool} />
                <BasicTextArea label='Which University or College  did you attend?' value={university} setValue={setUniversity} />
              </div>
              {/* Occupational */}
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Occupational History</p>
                <BasicRadioBox label='Are you employed' value={employed} setValue={setEmployed} />
                {employed == true ? (
                  <>
                    <BasicTextArea label='Who is your currently employer/position?' value={employedPosition} setValue={setEmployedPosition} />
                    <BasicTextArea label='Are you happy with your current position?' value={jobSatisfaction} setValue={setJobSatisfaction} />
                  </>
                ) : null}
                <BasicTextArea label='Please list any work-related stressors, if any' value={workStressor} setValue={setWorkStressor} />
              </div>
              {/* Family Illness */}
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Family History</p>
                <p>
                  Has anyone in your family (either immediate family members or relatives) experienced
                  difficulties with the following? (circle any that apply and list family member, e.g. sibling
                  parent, uncle, etc.)
                </p>
                <p className='italic'>Select an issue that a family member has experienced</p>
                <BasicRadioBox label='Depression' value={familyDepression} setValue={setFamilyDepression} />
                {familyDepression && (
                  <BasicTextArea label='Which family member?' value={familyDepressionMember} setValue={setFamilyDepressionMember} />
                )}
                <BasicRadioBox label='Bipolar disorder' value={familyBipolar} setValue={setFamilyBipolar} />
                {familyBipolar && (
                  <BasicTextArea label='Which family member?' value={familyBipolarMember} setValue={setFamilyBipolarMember} />
                )}
                <BasicRadioBox label='Anxiety disorder' value={familyAnxiety} setValue={setFamilyAnxiety} />
                {familyAnxiety && (
                  <BasicTextArea label='Which family member?' value={familyAnxietyMember} setValue={setFamilyAnxietyMember} />
                )}
                <BasicRadioBox label='Panic attacks' value={familyPanic} setValue={setFamilyPanic} />
                {familyPanic && (
                  <BasicTextArea label='Which family member?' value={familyPanicMember} setValue={setFamilyPanicMember} />
                )}
                <BasicRadioBox label='Schizophrenia' value={familySchiz} setValue={setFamilySchiz} />
                {familySchiz && (
                  <BasicTextArea label='Which family member?' value={familySchizMember} setValue={setFamilySchizMember} />
                )}
                <BasicRadioBox label='Alcohol/substance abuse' value={familyAlcohol} setValue={setFamilyAlcohol} />
                {familyAlcohol && (
                  <BasicTextArea label='Which family member?' value={familyAlcoholMember} setValue={setFamilyAlcoholMember} />
                )}
                <BasicRadioBox label='Eating disorders' value={familyEating} setValue={setFamilyEating} />
                {familyEating && (
                  <BasicTextArea label='Which family member?' value={familyEatingMember} setValue={setFamilyEatingMember} />
                )}
                <BasicRadioBox label='Learning disabilities' value={familyLearning} setValue={setFamilyLearning} />
                {familyLearning && (
                  <BasicTextArea label='Which family member?' value={familyLearningMember} setValue={setFamilyLearningMember} />
                )}
                <BasicRadioBox label='Trauma history' value={familyTrauma} setValue={setFamilyTrauma} />
                {familyTrauma && (
                  <BasicTextArea label='Which family member?' value={familyTraumaMember} setValue={setFamilyTraumaMember} />
                )}
                <BasicRadioBox label='Suicide attempts' value={familySuicide} setValue={setFamilySuicide} />
                {familySuicide && (
                  <BasicTextArea label='Which family member?' value={familySuicideMember} setValue={setFamilySuicideMember} />
                )}
                <BasicRadioBox label='Chronic illness' value={familyIllness} setValue={setFamilyIllness} />
                {familyIllness && (
                  <BasicTextArea label='Which family member?' value={familyIllnessMember} setValue={setFamilyIllnessMember} />
                )}
              </div>
              {/* Family Relations */}
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Family Relationship History</p>
                <BasicTextArea label='Please describe the relationship you have with your father?' value={fatherRelationship} setValue={setFatherRelationship} />
                <BasicTextArea label='Please describe the relationship you have with your mother?' value={motherRelationship} setValue={setMotherRelationship} />
                <BasicTextArea label='If you have any siblings please describe the relationship you have with them?' value={siblingRelationship} setValue={setSiblingRelationship} />
              </div>
              {/* Other Information */}
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Other Information</p>
                <BasicTextArea label='What do you consider to be your strengths?' value={personalStengths} setValue={setPersonalStrengths} />
                <BasicTextArea label='What do you like most about yourself?' value={personalLikes} setValue={setPersonalLikes} />
                <BasicTextArea label='What are effective coping strategies that you have learned?' value={coping} setValue={setCoping} />
                <BasicTextArea label='What are your goals for therapy?' value={therapyGoals} setValue={setTherapyGoals} />
              </div>
              {/* Forensic History */}
              <div className='flex my-6 flex-col gap-4'>
                <p className='underline font-bold'>Forensic History</p>
                <BasicTextArea label='Have you ever spent time in jail?' value={jailTime} setValue={setJailTime} />
              </div> 
              <button type='submit' className='button'>Submit</button>
            </form>
          </div>
        </div>
    </div>
  )
}

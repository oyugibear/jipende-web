import PictureHero from '@/components/Constants/PictureHero'
import React from 'react'

export default function page() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <PictureHero title="Terms Of Service" description={""} imgPath="/assets/Stockimgs/contract.png" />
        <div className='flex flex-col max-w-[800px] my-12 gap-2'>
            <h2 className='text-lg font-bold mb-4'>Introduction</h2>
            <p>
            Africa Jipende Wellness is a Private Limited Company duly registered and incorporated under the Companies Act, 2015 of the Republic of Kenya.
            This document comprises the following terms and conditions, hereinafter referred to as the “Agreement,” which constitutes a legally binding agreement
            between you and Africa Jipende Wellness, (“AJW,” “we,” or “us”), the operator of africajipendewellness.com (the “Site”).
            </p>
            <p>
            These Terms of Service (the “Terms of Service”) govern your use of our mental health, wellness, and behavioral programs and site, both as a casual visitor and as a registered user.
            </p>
            <p>
            By (a) using the Website as a research resource or registering as a member for our mental health and wellness programs or (b) clicking on a button or link indicating your acceptance thereof, you understand and hereby agree to the terms of the Agreement.
            You also confirm that Africa Jipende Wellness reserves the right to change or modify these terms at any time and in our sole discretion.
            </p>

            <h3 className='my-2 font-medium'>Whereas</h3>
            <p>
            Africa Jipende Wellness will list the Care Provider details and Mental Health and Wellness Services (as defined herein) on its website for Members to research and find information.
            </p>
            <p>
            The Member may use the Website to find information and submit inquiries to Africa Jipende Wellness for Mental Health and Wellness Services or about our wellness programs.
            </p>

            <h2 className='text-lg font-bold my-4'>Definitions and Interpretation</h2>
            <p>In this Agreement, unless context requires otherwise, the following terms shall have the following meanings:</p>
            <ul>
                <li>
                    <strong>Care Provider:</strong> A healthcare provider including, but not limited to, the wellness center, trained psychologists, counseling psychologists, and caregivers. The term shall also include an administrator of a Care Provider on the Website.
                </li>
                <li>
                    <strong>Guardian:</strong> A person who has the legal authority to make decisions relevant to a patient who is a minor.
                </li>
                <li>
                    <strong>Member:</strong> Clients or users of our wellness services and/or individuals who contact Africa Jipende Wellness seeking information on our psychological and emotional wellness programs.
                </li>
                <li>
                    <strong>Wellness Programs:</strong> The psychological and wellness care, or other services to be provided by the trained psychologist or counselor.
                </li>
                <li>
                    <strong>Intellectual Property Rights:</strong> Copyrights, trademarks, service marks, publicity rights, database rights, patents, and other intellectual property rights or proprietary rights recognized by law.
                </li>
                <li>
                    <strong>Rates:</strong> The fees charged by the trained psychologist or counselor to a Member for the Wellness programs.
                </li>
            </ul>

            <h3 className='my-2 font-medium'>Interpretation</h3>
            <ul>
            <li>Reference to the singular includes a reference to the plural and vice versa.</li>
            <li>Reference to any gender includes reference to all other genders.</li>
            <li>
                Reference to statutory provisions shall include any amendment or re-enactment in force and all statutory instruments or orders made pursuant to statutory provisions.
            </li>
            </ul>

            <h2 className='text-lg font-bold my-4'>Office Hours</h2>
            <p>
            My office hours are by appointment. My voicemail is available 24 hours for messages under +254 745 601 045 or +254 735 432 045. I check messages during the daytime only.
            If there is a life-threatening emergency, contact the National Emergency Line 0800722022.
            </p>

            <h2 className='text-lg font-bold my-4'>Telephone Follow-Up</h2>
            <p>
            As far as a patient reserves the right to choose the type of consultation, Africa Jipende Wellness reserves the right to decide on which form of therapy is required.
            In some cases, it may be deemed appropriate to recommend a face-to-face consultation instead of a telephone or Zoom/Google Meet-based one.
            </p>

            <h2 className='text-lg font-bold my-4'>Payment</h2>
            <p>
            Please note that Africa Jipende Wellness is a private practice of mental health, wellness, and behavioral therapy and is not covered by NHIF.
            Our policy is either to receive payment in advance for self-funding patients or, for insured patients, we require a claim form which the patient will then submit to their insurer for reimbursement.
            </p>

            <h2 className='text-lg font-bold my-4'>Late Cancellation Policy</h2>
            <p>
            If a confirmed appointment is cancelled between 24 and 48 hours of the appointment time (excluding weekends and Public Holidays), we will retain 50% of the fee paid or the patient will be liable for 50% of the fee if not already paid.
            If the appointment is cancelled within 24 working hours of the confirmed time or if an appointment is missed, we will retain 100% of the fee, or the patient will be liable for 100% of the fee if not already paid.
            </p>

            <h2 className='text-lg font-bold my-4'>Records</h2>
            <p>
            Any hard copies of documentation we receive will be scanned and uploaded to Data Protection Act-compliant online records. Hard copies will be shredded unless the patient requests otherwise.
            </p>
            <p>
            For more details, please see our privacy policy on the website.
            </p>

            <h2 className='text-lg font-bold my-4'>Intellectual Property Rights</h2>
            <p>
            Africa Jipende Wellness owns the Website and all intellectual property rights in and to the Website and its content. These materials are available for your personal use only.
            You may not use any part of the content on the Website for commercial purposes without obtaining a license from us.
            </p>

            <h2 className='text-lg font-bold my-4'>Limitation of Liability</h2>
            <p>
            Africa Jipende Wellness does not provide any guarantee or warranty regarding information or services provided. We are not liable for direct, indirect, or consequential losses
            arising from the use of our services or Website, except as required by applicable law.
            </p>
            <p>
            Our total liability is limited to 100% of the amount paid by you for the services in the 12 months preceding the incident causing liability.
            </p>

            <h2 className='text-lg font-bold my-4'>Termination</h2>
            <p>
            Your authorization to use our services ends automatically if you breach any terms of this Agreement. Upon termination, you must cease using our services
            and return or destroy all materials obtained through the Website.
            </p>

            <h2 className='text-lg font-bold my-4'>Viruses, Hacking, and Other Offenses</h2>
            <p>
            You must not misuse the Website by introducing harmful materials such as viruses. Any breach will be reported to law enforcement.
            Africa Jipende Wellness is not responsible for any damage caused by such breaches.
            </p>

            <h2 className='text-lg font-bold my-4'>Jurisdiction and Applicable Law</h2>
            <p>
            This Agreement is governed by Kenyan law, and disputes are subject to the exclusive jurisdiction of Kenyan courts.
            </p>

            <h2 className='text-lg font-bold my-4'>Rights of Third Parties</h2>
            <p>
            These terms do not confer rights on any third party.
            </p>

            <h2 className='text-lg font-bold my-4'>How to Contact Us</h2>
            <p>
            If you have questions, complaints, or concerns, contact us at +254 745 601 992 (Safaricom), +254 734 432 045 (Airtel), or email us at info@africajipendewellness.com.
            </p>
        </div>
    </div>
  )
}

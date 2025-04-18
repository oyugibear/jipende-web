'use client'

import PictureHero from '@/components/Constants/PictureHero'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <PictureHero title="Terms Of Service" description={""} imgPath="/assets/Stockimgs/t3.jpg" />
        <div className="max-w-4xl mx-auto p-6 text-gray-900">

            <div className='mb-6 flex flex-row gap-6 my-4'>
                <Link href="/forms">
                    <button className='w-full h-full px-4 py- 2 bg-yellow-500 rounded-lg uppercase text-black text-sm font-bold my-4'>
                        Adult Intake Form
                    </button>
                </Link>
                {/* <button className='px-4 py-2 bg-yellow-500 rounded-lg uppercase text-black text-sm font-bold my-4'>
                    Adult Intake Form
                </button> */}
            </div>

            <div className="py-6">
                <h3 className="text-lg font-bold">INTRODUCTION</h3>
                <p>
                Africa Jipende Wellness is a Private Limited Company duly registered and incorporated under the Companies Act, 2015 of the Republic of Kenya.
                This document comprises the following terms and conditions, hereinafter referred to as the “Agreement” which constitutes a legally binding
                agreement between you and Africa Jipende Wellness, (“AJW,” “we,” or “us”), the operator of africajipendewellness.com (the “Site”). These
                Terms of Service (the “Terms of Service”) govern your use of our mental health, wellness and behavioral programs and site, both as a casual
                visitor and as a registered user.
                </p>
                <p className="mt-4">
                By (a) using the Website as a research resource or registering as a member for our mental health and wellness programs or (b) clicking on a
                button or link indicating your acceptance thereof, you understand and hereby agree to the terms of the Agreement. You also confirm that Africa
                Jipende Wellness reserves the right to change or modify these terms at any time and in our sole discretion. If the organization makes changes
                to these terms, we will provide you with notice of such changes, such as by sending an email, posting a notice on our Website or updating the
                date at the top of the Agreement. Your continued use of the Website or our services will confirm your acceptance of the revised terms.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">WHEREAS</h3>
                <p>
                Africa Jipende Wellness will list the Care Provider details and Mental Health and Wellness Services (as defined herein) on its website for
                Members to research and find information.
                </p>
                <p className="mt-4">
                The Member may use the Website to find information and submit inquiries to Africa Jipende Wellness for Mental Health and Wellness Services or
                about our wellness programs.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">NOW THEREFORE</h3>
                <p>
                In consideration of the mutual promises and covenants set forth in this Agreement, the Parties hereby agree as follows:
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">Definitions and Interpretation</h3>
                <ul className="list-disc list-inside">
                <li>
                    <strong>“Care Provider”</strong> means a healthcare provider including, but not limited to, the wellness center, trained psychologists,
                    counseling psychologists, and caregivers. The term shall also include an administrator of a Care Provider on the Website.
                </li>
                <li>
                    <strong>“Guardian”</strong> means a person who has the legal authority to make decisions relevant to a patient who is a minor.
                </li>
                <li>
                    <strong>“Member”</strong> means clients or users of our wellness services and/or individuals who contact Africa Jipende Wellness seeking
                    information on our psychological and emotional wellness programs. Unless expressly specified otherwise, reference to a Member shall also
                    include the relatives, guardian, or other agent of a Member who uses the wellness programs or communicates with Africa Jipende Wellness on
                    behalf of the Member.
                </li>
                <li>
                    <strong>“Wellness Programs”</strong> shall refer to the psychological and wellness care, or other services to be provided by the trained
                    psychologist or counselor.
                </li>
                <li>
                    <strong>“Intellectual Property Rights”</strong> means copyrights, trademarks, service marks, publicity rights, database rights, patents, and
                    other intellectual property rights or proprietary rights recognized by law.
                </li>
                <li>
                    <strong>“Rates”</strong> means the fees charged by the trained psychologist or counselor to a Member for the Wellness programs.
                </li>
                </ul>
                <p className="mt-4">
                In this Agreement (unless the context requires otherwise):
                </p>
                <ol className="list-[lower-alpha] list-inside">
                <li>Reference to the singular includes a reference to the plural and vice versa, and reference to any gender includes reference to all other genders;</li>
                <li>Reference to natural persons includes reference to legal persons;</li>
                <li>
                    Reference to statutory provisions shall be construed as meaning and including references also to any amendment or re-enactment (whether before
                    or after the date of this Agreement) for the time being in force and to all statutory instruments or orders made pursuant to statutory
                    provisions;
                </li>
                <li>
                    Reference to any Article, Clause, Schedule or Annexure shall be deemed to be a reference to such Article, Clause, Schedule or Annexure of or
                    to this Agreement.
                </li>
                </ol>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">OFFICE HOURS</h3>
                <p>
                My office hours are by appointment. My voicemail is available 24 hours for messages under +254 745 601 045 or +254 735 432 045. I check messages
                during the daytime only. If there is a life-threatening emergency contact the National Emergency Line 0800722022.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">TELEPHONE FOLLOW UP</h3>
                <p>
                As far as a patient reserves the right to choose the type of consultation, Africa Jipende Wellness reserves the right to decide on which form of
                therapy is required. In some cases, it may be deemed appropriate to recommend a face-to-face consultation instead of a telephone or
                Zoom/Google meet-based one.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">PAYMENT</h3>
                <p>
                Please note that Africa Jipende Wellness is a private practice of mental health, wellness and behavioral therapy and is not covered by NHIF. Our
                policy is either to receive payment in advance for self-funding patients or, for insured patients, we require a claim form which the patient
                will then submit to their insurer for reimbursement.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">LATE CANCELLATION POLICY</h3>
                <p>
                If a confirmed appointment is cancelled between 24 and 48 hours of the appointment time (where notice is given during working days only – i.e.
                excluding weekends and Public Holidays), we will retain 50% of the fee paid or the patient will be liable for 50% of the fee if not already
                paid. If the appointment is cancelled within 24 working hours of the confirmed time or if an appointment is missed, we will retain 100% of the
                fee, or the patient will be liable for 100% of the fee if not already paid.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">RECORDS</h3>
                <p>
                Please note that any hard copies of documentation we receive will be scanned and uploaded to Data Protection Act compliant online records. Hard
                copies will be shredded to protect confidentiality unless the patient has stipulated that hard copies should be returned to them. Please see
                our privacy policy on the website for more information. You also agree that Africa Jipende Wellness may access, preserve, and disclose details
                provided by You on the Website:
                </p>
                <ul className="list-disc list-inside">
                <li>for the purpose of providing wellness services to You;</li>
                <li>for the purpose of administering Your account in accordance with the standard operating procedures of Africa Jipende Wellness;</li>
                <li>if required to do so by law; or</li>
                <li>
                    in the good faith belief that any such access, preservation or disclosure is reasonably necessary to comply with legal process.
                </li>
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">INTELLECTUAL PROPERTY RIGHTS</h3>
                <p>
                We own the Website, and We are the owners or the licensee of all intellectual property rights in and to the Website, and in the material and
                content published on it. All such materials and content are protected by copyright laws and treaties around the world. All such rights are
                reserved to Us in full.
                </p>
                <p className="mt-4">
                Africa Jipende Wellness provides You with a limited licence to download and access the Website and the materials and content on it and subject
                to these terms and conditions. The materials and content are available for Your personal use only. You must not use any part of the materials or
                content on Our Website for commercial purposes without obtaining a licence to do so from Us.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">LIMITATION OF LIABILITY</h3>
                <p>
                Africa Jipende Wellness does not provide any guarantee, condition or warranty as to any information or wellness service and does not accept any
                liability for any errors or omissions contained in the services offered, information, content or materials on or available through the website.
                We do exclude and limit in any way our liability for:
                </p>
                <ul className="list-disc list-inside">
                <li>death or personal injury not arising from Our negligence or that of Our employees;</li>
                <li>fraud or fraudulent misrepresentation; or</li>
                <li>any other liability which cannot be excluded or limited under applicable law.</li>
                </ul>
                <p className="mt-4">
                Any liability for any direct, indirect or consequential loss or damage incurred by You or any permitted user in connection with Africa Jipende
                Wellness or in connection with the use, inability to use, or results of the use of its Website, or any websites linked to it and any materials
                posted on it, including, without limitation any liability for loss of income or revenue; loss of business; loss of profits or contracts; loss
                of anticipated savings; loss of data; loss of goodwill; wasted management or office time; and any other loss or damage of any kind, however
                arising and whether caused by tort (including negligence), breach of contract or otherwise, even if foreseeable, are hereby excluded.
                </p>
                <p className="mt-4">
                NB: Subject only to the above provisions of this ‘Limits of Liability’ section, in no event shall Our total liability to You for any one event
                or series of related events exceed the sum of 100% of the total amount paid by you for the Services giving rise to the liability in the 12
                months preceding the first incident out of which the liability arose.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">TERMINATION</h3>
                <p>
                The authorization granted under this Agreement remains valid until terminated by Africa Jipende Wellness or by You. Your rights to use the
                services will terminate automatically and without notice if You fail to comply with any of the Terms or with other applicable terms, rules or
                regulations of Africa Jipende Wellness relating to the use of the Website or to the use of any Africa Jipende Wellness Services.
                </p>
                <p className="mt-4">
                On termination of this Agreement however occurring, You shall cease to receive any services offered by Africa Jipende Wellness and you shall be
                required to return or destroy all copies, information, materials, content, downloads or other aspects of the Website which are held by You.
                </p>
                <p className="mt-4">
                Africa Jipende Wellness reserves the right at any time to discontinue, withdraw, modify or terminate the wellness services offered and
                associated Services without notice and without liability to You.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">VIRUSES, HACKING AND OTHER OFFENCES</h3>
                <p>
                You must not whether deliberately or negligently misuse the Website by introducing viruses, trojans, worms, logic bombs or other material which
                is malicious or technologically harmful. You must not attempt to gain unauthorised access to the Website, the server on which the Website is
                stored or any server, computer or database connected to the Website or to any of the information which is collected and stored via the Website.
                You must not attack the Website via a denial-of-service attack or a distributed denial-of-service attack. Any breach of this provision may constitute a criminal offense under applicable laws. Africa Jipende Wellness will report any such breach to the relevant law enforcement authorities and will cooperate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use the Website will cease immediately.

                </p>
                <p className="mt-4">
                    Africa Jipende Wellness will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses, or other technologically harmful material that may infect your computer equipment, computer programs, data, or other proprietary material due to your use of the Website or to your downloading of any material posted on it or on any website linked to it.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">GOVERNING LAW AND JURISDICTION</h3>
                <p>
                    This Agreement shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Kenya.
                </p>
                <p className="mt-4">
                    You agree that any claim or cause of action arising out of or related to the use of the Website or these Terms must be filed within one (1) year after such claim or cause of action arose or be forever barred.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold">ENTIRE AGREEMENT</h3>
                <p>
                    These Terms, together with any additional terms to which you agree when using particular elements of the Website, constitute the entire agreement between you and Africa Jipende Wellness regarding the use of the Website and supersede all prior agreements and understandings between you and Africa Jipende Wellness.
                </p>
                <p className="mt-4">
                    If any provision of these Terms is found to be unlawful, void, or unenforceable for any reason, that provision shall be deemed severable from these Terms and shall not affect the validity and enforceability of any remaining provisions.
                </p>
            </div>

           

            <div className="border-t border-gray-300 pt-4">
                <p className="text-sm text-center text-gray-600">
                    By using our services or accessing the Website, you confirm that you have read, understood, and agree to these Terms of Service.
                </p>
                <p className="text-sm text-center text-gray-600 mt-2">
                    For further inquiries, contact us at <a href="mailto:info@africajipendewellness.com" className="text-blue-500 underline">info@africajipendewellness.com</a>.
                </p>
            </div>

        </div>
        

    </div>
  )
}

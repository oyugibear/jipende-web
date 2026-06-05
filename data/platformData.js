export const brand = {
  name: "Africa Jipende Wellness",
  shortName: "AJW",
  tagline: "Therapy that meets you where you are.",
  email: "info@africajipendewellness.com",
  alternateEmail: "jipendewellness@gmail.com",
  phone: "+254 700 000 000",
  location: "Kilimani, Nairobi, Kenya",
  onlineArea: "Online therapy across Kenya and East Africa",
  founded: "Founded in 2018",
  crisisText:
    "If this is an emergency or you may harm yourself or someone else, call local emergency services or go to the nearest hospital. AJW messaging is not monitored as an emergency service.",
}

export const roles = [
  {
    key: "Client",
    label: "Client",
    home: "/client",
    permissions: [
      "view_own_profile",
      "view_own_sessions",
      "message_assigned_therapist",
      "view_own_invoices",
      "download_own_files",
    ],
  },
  {
    key: "Therapist",
    label: "Therapist",
    home: "/therapist",
    permissions: [
      "view_assigned_clients",
      "write_session_notes",
      "message_assigned_clients",
      "manage_meeting_links",
      "flag_follow_ups",
    ],
  },
  {
    key: "Admin",
    label: "Founder/Admin",
    home: "/admin",
    permissions: [
      "manage_clients",
      "manage_therapists",
      "view_revenue",
      "view_outcomes",
      "manage_roles",
      "view_audit_logs",
    ],
  },
]

export const serviceLines = [
  {
    title: "Online Therapy",
    description:
      "Secure video sessions for clients in Kenya and across East Africa, with meeting links, reminders, and therapist follow-up in one portal.",
    format: "Video",
    audience: "Individuals",
  },
  {
    title: "In-Person Therapy",
    description:
      "Office-based care in Kilimani, Nairobi with appointment directions, therapist details, and session preparation notes.",
    format: "Office",
    audience: "Individuals",
  },
  {
    title: "Couples Therapy",
    description:
      "Structured sessions for partners working through communication, trust, conflict, life transitions, and reconnection.",
    format: "Hybrid",
    audience: "Couples",
  },
  {
    title: "Family Therapy",
    description:
      "Family-system support for parenting, grief, conflict, school stress, caregiving, and intergenerational patterns.",
    format: "Hybrid",
    audience: "Families",
  },
  {
    title: "Group Therapy",
    description:
      "Guided peer groups that create safe, moderated spaces for shared healing and accountable progress.",
    format: "Cohort",
    audience: "Groups",
  },
  {
    title: "Corporate and School Wellness",
    description:
      "Mental wellness programming, psychoeducation, assessments, referrals, and staff or student support pathways.",
    format: "Program",
    audience: "Organizations",
  },
]

export const credibility = [
  "Kenya-based holistic mental wellness practice",
  "Telehealth support for East Africa",
  "Office-based therapy in Nairobi",
  "Founder-led clinical and wellness programs",
]

export const testimonials = [
  {
    quote:
      "The intake felt respectful and practical. I knew where to go, who I was meeting, and what we were working on.",
    name: "Client in Nairobi",
    type: "Individual therapy",
  },
  {
    quote:
      "Our therapist helped us slow the conversation down and leave with a clear plan for the week.",
    name: "Couples client",
    type: "Couples therapy",
  },
  {
    quote:
      "The school wellness session gave our team language for stress that students actually understood.",
    name: "Program lead",
    type: "School wellness",
  },
]

export const faqs = [
  {
    question: "Can I book online therapy from outside Nairobi?",
    answer:
      "Yes. AJW supports secure online therapy for clients in Kenya and across East Africa, subject to therapist availability and suitability for telehealth.",
  },
  {
    question: "Where do in-person sessions happen?",
    answer:
      "In-person appointments are coordinated around the AJW Nairobi base, with session-specific location details shown in the client portal.",
  },
  {
    question: "Is messaging a crisis service?",
    answer:
      "No. Secure messages are for care coordination and follow-up. Emergencies should go to local emergency services or the nearest hospital.",
  },
  {
    question: "Can therapists manage notes and follow-ups?",
    answer:
      "Yes. The therapist portal includes assigned clients, session notes, progress notes, reminders, risk flags, referrals, and calendar views.",
  },
]

export const resources = [
  {
    title: "Preparing for your first therapy session",
    category: "Client guide",
    readTime: "5 min",
  },
  {
    title: "How online therapy works in Kenya",
    category: "Telehealth",
    readTime: "4 min",
  },
  {
    title: "When to refer a client for psychiatric review",
    category: "Clinical workflow",
    readTime: "7 min",
  },
]

export const therapyProcess = [
  {
    step: "01",
    title: "Share what support you need",
    text: "Start with a respectful intake that captures care goals, preferred language, location, session mode, and safety context.",
  },
  {
    step: "02",
    title: "Match with the right therapist",
    text: "AJW can recommend a clinician based on specialty fit, availability, care format, and whether online or in-person support is best.",
  },
  {
    step: "03",
    title: "Meet, track, and continue care",
    text: "Clients and therapists use the portal for sessions, secure messages, worksheets, invoices, progress goals, and follow-up reminders.",
  },
]

export const serviceCatalog = [
  {
    title: "Individual Therapy",
    description: "One-to-one therapy for anxiety, depression, trauma, grief, stress, identity, relationships, and personal growth.",
    benefits: ["Private care plan", "Goal tracking", "Hybrid continuity"],
    process: "Intake, therapist match, weekly or biweekly sessions, progress review, and practical between-session tasks.",
    outcomes: "Clearer emotional regulation, healthier routines, stronger coping skills, and measurable progress against goals.",
    format: "Online or in-person",
  },
  {
    title: "Couples Therapy",
    description: "Structured support for partners navigating conflict, trust, communication, intimacy, parenting, or major transitions.",
    benefits: ["Shared session goals", "Communication tools", "Follow-up summaries"],
    process: "Joint intake, relationship pattern mapping, guided sessions, home practice, and recurring check-ins.",
    outcomes: "More productive conversations, repaired trust habits, and a shared plan for conflict and connection.",
    format: "Hybrid",
  },
  {
    title: "Family Therapy",
    description: "Family-system care for parenting stress, conflict, grief, school issues, caregiving, and intergenerational patterns.",
    benefits: ["Whole-family view", "Safe facilitation", "Practical agreements"],
    process: "Family intake, participant alignment, facilitated sessions, homework, and care coordination where needed.",
    outcomes: "Improved communication, clearer roles, safer conflict repair, and stronger household support systems.",
    format: "Hybrid",
  },
  {
    title: "Group Therapy",
    description: "Moderated therapeutic groups for shared healing, psychoeducation, accountability, and community support.",
    benefits: ["Guided peer support", "Cohort structure", "Lower barrier to care"],
    process: "Group screening, cohort placement, weekly facilitated sessions, shared worksheets, and outcome tracking.",
    outcomes: "Reduced isolation, stronger coping language, shared accountability, and better continuity between sessions.",
    format: "Cohort",
  },
  {
    title: "Adolescent Therapy",
    description: "Developmentally aware care for teenagers navigating school pressure, family stress, identity, grief, mood, and anxiety.",
    benefits: ["Guardian coordination", "Youth-safe approach", "School-aware care"],
    process: "Guardian and adolescent intake, confidentiality expectations, therapy sessions, family updates, and referral support.",
    outcomes: "Better emotional vocabulary, safer support systems, improved coping, and clearer escalation pathways.",
    format: "Online or in-person",
  },
  {
    title: "Corporate Wellness",
    description: "Mental health programming, employee referrals, debriefs, workshops, and care pathways for organizations.",
    benefits: ["Program reporting", "Referral routes", "Wellness education"],
    process: "Needs assessment, program design, staff sessions, referral management, utilization review, and leadership reporting.",
    outcomes: "Higher awareness, earlier support, better referral follow-through, and clearer mental health operations.",
    format: "Program",
  },
  {
    title: "School Wellness",
    description: "Student, educator, and parent wellness support through workshops, referrals, crisis-aware pathways, and group care.",
    benefits: ["Age-aware resources", "Staff support", "Referral tracking"],
    process: "School assessment, stakeholder alignment, wellness sessions, counselor coordination, and progress reporting.",
    outcomes: "Stronger student support, clearer referral processes, and mental health language that fits school communities.",
    format: "Program",
  },
]

export const therapistDirectory = [
  {
    name: "Rubie Miseda",
    role: "Founder / Lead therapist",
    image: "/assets/about/rubie.jpg",
    specialties: ["Anxiety", "Trauma", "Relationships", "Workplace stress"],
    languages: ["English", "Swahili"],
    sessionTypes: ["Online", "In-person", "Corporate"],
    availability: "Accepting new clients",
    experience: "Founder-led holistic wellness programs",
    location: "Kilimani, Nairobi",
    profile:
      "Warm, structured therapy for adults and organizations, with a focus on culturally grounded mental wellness and practical progress.",
  },
  {
    name: "Nicole Kegode",
    role: "Therapist",
    image: "/assets/about/kamau.jpg",
    specialties: ["Depression", "Grief", "Family", "Adolescents"],
    languages: ["English", "Swahili"],
    sessionTypes: ["Online", "In-person"],
    availability: "This week",
    experience: "Family and adolescent care pathways",
    location: "Nairobi and online",
    profile:
      "Calm, collaborative support for clients working through loss, mood changes, family transitions, and school-related stress.",
  },
  {
    name: "Mukami Wambugu",
    role: "Wellness practitioner",
    image: "/assets/about/tribe.jpg",
    specialties: ["Career", "Stress", "Group care", "School wellness"],
    languages: ["English", "Swahili"],
    sessionTypes: ["Group", "Corporate", "School"],
    availability: "Program bookings",
    experience: "Workshops, group facilitation, and psychoeducation",
    location: "Kenya-wide programs",
    profile:
      "Group-centered wellness support for schools, teams, and communities needing practical mental health education and referrals.",
  },
]

export const therapistFilters = [
  "Anxiety",
  "Depression",
  "Trauma",
  "Relationships",
  "Family",
  "Career",
  "Grief",
  "Addiction",
]

export const resourceHub = [
  {
    title: "A Kenya-first guide to choosing online or in-person therapy",
    category: "Guide",
    type: "Article",
    readTime: "6 min",
    summary: "How to decide between telehealth, Nairobi office sessions, or a hybrid plan.",
  },
  {
    title: "First-session worksheet: what to bring into therapy",
    category: "Downloads",
    type: "Worksheet",
    readTime: "PDF",
    summary: "A practical worksheet for goals, questions, symptoms, and session preferences.",
  },
  {
    title: "How families can talk about therapy without shame",
    category: "Family",
    type: "Guide",
    readTime: "8 min",
    summary: "Language families can use to normalize care and reduce fear before intake.",
  },
  {
    title: "Workplace burnout signals leaders should not ignore",
    category: "Corporate wellness",
    type: "Article",
    readTime: "5 min",
    summary: "Operational and emotional signs that a team needs structured mental health support.",
  },
  {
    title: "Understanding referrals during therapy",
    category: "Clinical workflow",
    type: "Video",
    readTime: "4 min",
    summary: "What psychiatric, medical, school, or family referrals can mean inside a care plan.",
  },
  {
    title: "Mood tracking template for clients",
    category: "Downloads",
    type: "Worksheet",
    readTime: "PDF",
    summary: "A lightweight tool for noticing emotional patterns between therapy sessions.",
  },
]

export const executiveDashboard = {
  metrics: [
    { label: "Active Clients", value: "1,284", change: "+12%", tone: "gold" },
    { label: "Retention Rate", value: "94.2%", change: "+3%", tone: "green" },
    { label: "Therapist Util.", value: "78.5%", change: "-2%", tone: "red" },
    { label: "MRR Growth", value: "$42.8k", change: "+18%", tone: "gold" },
  ],
  trend: [
    { label: "Jan", clinic: 42, satisfaction: 31 },
    { label: "Mar", clinic: 51, satisfaction: 35 },
    { label: "May", clinic: 58, satisfaction: 33 },
    { label: "Jul", clinic: 48, satisfaction: 55 },
    { label: "Sep", clinic: 77, satisfaction: 47 },
    { label: "Nov", clinic: 69, satisfaction: 54 },
  ],
  journey: [
    { label: "Website Visits", value: "42,109", percent: 100 },
    { label: "Inquiry Leads", value: "18,432", percent: 44 },
    { label: "Assessment Completed", value: "4,011", percent: 24 },
    { label: "Onboarded Patients", value: "1,284", percent: 14 },
  ],
  alerts: [
    {
      title: "Capacity Warning: Adolescent Trauma Unit",
      body: "Therapist utilization exceeded 95% for 3 consecutive days.",
      time: "2 mins ago",
      tone: "red",
    },
    {
      title: "New Practitioner Onboarded",
      body: "Dr. Amara Okoro has been added to the Child Psychology department.",
      time: "1 hour ago",
      tone: "amber",
    },
    {
      title: "Clinical Safety Audit Completed",
      body: "Compliance score: 100%. No outstanding vulnerabilities identified.",
      time: "5 hours ago",
      tone: "green",
    },
  ],
}

export const clientProfile = {
  id: "client_001",
  name: "Amina W.",
  pronouns: "she/her",
  location: "Nairobi, Kenya",
  therapist: "Rubie Miseda",
  carePlan: "Hybrid therapy plan",
  status: "Stable",
  risk: "Low",
  lastUpdated: "4 Jun 2026",
  primaryConcern: "Anxiety, workplace stress, sleep disruption",
  referralSource: "Employer wellness program",
  privacyLevel: "Therapist and admin only",
  summary:
    "Client is working on emotional regulation, assertive communication, and consistent sleep routines. Prefers in-person sessions once monthly and online sessions for weekly continuity.",
}

export const goals = [
  {
    title: "Reduce weekly anxiety spikes",
    progress: 72,
    status: "Improving",
    detail: "Client reports faster recovery after work conflict.",
  },
  {
    title: "Rebuild sleep routine",
    progress: 58,
    status: "Active",
    detail: "Worksheet adherence is steady, screen cutoff remains difficult.",
  },
  {
    title: "Practice boundary scripts",
    progress: 44,
    status: "Needs support",
    detail: "Role-play planned for the next session.",
  },
]

export const appointments = [
  {
    id: "sess_501",
    type: "Online therapy",
    therapist: "Rubie Miseda",
    date: "Thu, 11 Jun 2026",
    time: "6:00 PM EAT",
    status: "Confirmed",
    mode: "Online",
    meetingLink: "https://meet.google.com/ajw-calm-room",
    location: "Google Meet",
    reminders: ["24 hours before", "2 hours before"],
  },
  {
    id: "sess_502",
    type: "In-person therapy",
    therapist: "Rubie Miseda",
    date: "Thu, 25 Jun 2026",
    time: "5:00 PM EAT",
    status: "Pending payment",
    mode: "In-person",
    meetingLink: "",
    location: "Kilimani, Nairobi. Suite details visible after confirmation.",
    reminders: ["24 hours before", "Bring completed worksheet"],
  },
]

export const sessionHistory = [
  {
    id: "hist_143",
    date: "28 May 2026",
    mode: "Online",
    theme: "Stress cycle mapping",
    outcome: "Completed",
    nextStep: "Track triggers after meetings",
  },
  {
    id: "hist_142",
    date: "21 May 2026",
    mode: "In-person",
    theme: "Sleep and boundaries",
    outcome: "Completed",
    nextStep: "Practice evening wind-down plan",
  },
  {
    id: "hist_141",
    date: "14 May 2026",
    mode: "Online",
    theme: "Intake review",
    outcome: "Completed",
    nextStep: "Confirm care plan",
  },
]

export const invoices = [
  {
    id: "INV-2048",
    description: "Online therapy session",
    amount: "KES 6,500",
    status: "Paid",
    method: "M-Pesa",
    date: "28 May 2026",
  },
  {
    id: "INV-2052",
    description: "In-person therapy session",
    amount: "KES 8,000",
    status: "Due",
    method: "Payment link sent",
    date: "25 Jun 2026",
  },
]

export const referrals = [
  {
    id: "ref_220",
    type: "Psychiatric review",
    status: "Optional",
    reason: "Medication consultation if sleep disruption persists",
    owner: "Therapist",
  },
  {
    id: "ref_221",
    type: "Corporate wellness follow-up",
    status: "Closed",
    reason: "Employer referral intake completed",
    owner: "Admin",
  },
]

export const worksheets = [
  {
    title: "Anxiety trigger tracker",
    status: "Assigned",
    due: "Before next session",
  },
  {
    title: "Sleep reset worksheet",
    status: "In progress",
    due: "Weekly",
  },
  {
    title: "Boundaries script builder",
    status: "New",
    due: "11 Jun 2026",
  },
]

export const notifications = [
  {
    title: "Session reminder",
    body: "Online therapy starts Thu, 11 Jun at 6:00 PM EAT.",
    tone: "Reminder",
  },
  {
    title: "Invoice due",
    body: "INV-2052 is pending for the in-person session on 25 Jun.",
    tone: "Billing",
  },
  {
    title: "Worksheet available",
    body: "Rubie shared a boundaries script builder in your files.",
    tone: "Care",
  },
]

export const messageThread = [
  {
    id: "msg_1",
    author: "Rubie Miseda",
    role: "Therapist",
    time: "Today, 9:12 AM",
    body: "Hi Amina, I added the boundaries worksheet for us to use on Thursday. Bring one real example if it feels manageable.",
    attachments: ["Boundaries script builder.pdf"],
  },
  {
    id: "msg_2",
    author: "Amina W.",
    role: "Client",
    time: "Today, 10:03 AM",
    body: "Thank you. I can think of one example from work yesterday. I will add it before the session.",
    attachments: [],
  },
  {
    id: "msg_3",
    author: "Rubie Miseda",
    role: "Therapist",
    time: "Today, 10:20 AM",
    body: "That is enough. No need to write a perfect version. We will shape it together.",
    attachments: [],
  },
]

export const therapistClients = [
  {
    id: "client_001",
    name: "Amina W.",
    plan: "Hybrid therapy",
    status: "Stable",
    risk: "Low",
    nextSession: "11 Jun, Online",
    lastContact: "Today",
    progress: 68,
    flags: ["Invoice due"],
  },
  {
    id: "client_002",
    name: "Daniel K.",
    plan: "Couples therapy",
    status: "Monitor",
    risk: "Medium",
    nextSession: "12 Jun, In-person",
    lastContact: "Yesterday",
    progress: 51,
    flags: ["Follow-up needed"],
  },
  {
    id: "client_003",
    name: "Lilian M.",
    plan: "Online therapy",
    status: "Improving",
    risk: "Low",
    nextSession: "17 Jun, Online",
    lastContact: "2 days ago",
    progress: 79,
    flags: [],
  },
]

export const therapistCalendar = [
  {
    time: "09:00",
    client: "Amina W.",
    mode: "Online",
    action: "Review worksheet",
  },
  {
    time: "11:30",
    client: "Daniel K. and spouse",
    mode: "In-person",
    action: "Prepare couples summary",
  },
  {
    time: "15:00",
    client: "Corporate debrief",
    mode: "Online",
    action: "Send attendance notes",
  },
]

export const progressNotes = [
  {
    title: "Session summary",
    body: "Client identified workplace trigger pattern and agreed to a two-step pause before responding.",
    tag: "Completed",
  },
  {
    title: "Progress note",
    body: "Sleep routine improved from 3 to 5 consistent evenings per week. Continue monitoring.",
    tag: "Clinical",
  },
  {
    title: "Follow-up flag",
    body: "Check whether invoice reminder created pressure before next in-person session.",
    tag: "Follow-up",
  },
]

export const quickUpdateFields = [
  "Mood rating",
  "Risk status",
  "Attendance",
  "Session summary",
  "Next task",
  "Referral required",
]

export const adminMetrics = [
  {
    label: "Active clients",
    value: "248",
    change: "+12%",
    detail: "24 new intakes this month",
  },
  {
    label: "Therapist utilization",
    value: "82%",
    change: "+6%",
    detail: "Across online and in-person care",
  },
  {
    label: "Monthly revenue",
    value: "KES 2.8M",
    change: "+18%",
    detail: "Therapy, programs, and retainers",
  },
  {
    label: "Retention",
    value: "74%",
    change: "+9%",
    detail: "Clients with 4+ sessions",
  },
]

export const adminDashboards = {
  acquisition: [
    { label: "Corporate referrals", value: 44 },
    { label: "Direct website intake", value: 38 },
    { label: "Therapist referrals", value: 16 },
    { label: "School programs", value: 12 },
  ],
  outcomes: [
    { label: "Goal progress average", value: "66%" },
    { label: "Completed care plans", value: "31" },
    { label: "High-risk escalations", value: "4" },
    { label: "Referral completion", value: "71%" },
  ],
  finance: [
    { label: "Paid invoices", value: "KES 2.1M" },
    { label: "Outstanding", value: "KES 410K" },
    { label: "M-Pesa share", value: "68%" },
    { label: "Corporate billing", value: "22%" },
  ],
}

export const adminPeople = [
  {
    name: "Rubie Miseda",
    role: "Founder / Lead therapist",
    load: "86%",
    clients: 32,
    status: "Available",
  },
  {
    name: "Nicole Kegode",
    role: "Therapist",
    load: "71%",
    clients: 25,
    status: "Available",
  },
  {
    name: "Mukami Wambugu",
    role: "Wellness practitioner",
    load: "64%",
    clients: 18,
    status: "Program day",
  },
]

export const bookingOverview = [
  {
    id: "BK-8841",
    client: "Amina W.",
    therapist: "Rubie Miseda",
    type: "Online",
    date: "11 Jun",
    status: "Confirmed",
  },
  {
    id: "BK-8842",
    client: "Daniel K.",
    therapist: "Nicole Kegode",
    type: "In-person",
    date: "12 Jun",
    status: "Needs room",
  },
  {
    id: "BK-8843",
    client: "Karibu School",
    therapist: "Mukami Wambugu",
    type: "Group",
    date: "13 Jun",
    status: "Contract sent",
  },
]

export const auditLogs = [
  {
    actor: "Admin",
    action: "Updated therapist role permissions",
    time: "Today, 8:42 AM",
    scope: "RBAC",
  },
  {
    actor: "Rubie Miseda",
    action: "Added session note for Amina W.",
    time: "Yesterday, 5:11 PM",
    scope: "Client record",
  },
  {
    actor: "System",
    action: "Sent booking confirmation and reminder",
    time: "Yesterday, 9:00 AM",
    scope: "Messaging",
  },
]

export const analyticsSchema = [
  "users.role",
  "profiles.status",
  "sessions.mode",
  "sessions.attendance_status",
  "sessions.outcome_rating",
  "invoices.payment_status",
  "referrals.source",
  "messages.response_time_minutes",
  "goals.progress_percent",
  "audit_logs.actor_role",
]

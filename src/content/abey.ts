// The only personal-content source. Replace TODO text with Abey's own words.
// Do not add employment, dates or links until they have been confirmed.
export const abey = {
  name: "Abey Maghari",
  firstName: "Abey",
  greeting: "Hi, I’m Abey.",
  intro: "I help teams turn messy data into smart decisions.",
  infoTitle: "A LITTLE ABOUT ME",
  notesTitle: "ON MY LIST",
  details: [
    { label: "A few words about me", value: "TODO · My own little introduction" },
    { label: "What makes me smile", value: "TODO · The little things" },
    { label: "Something I love", value: "TODO · A favourite to share" },
    { label: "A little fun fact", value: "TODO · Something very me" },
  ],
  notes: [
    { label: "Something to try", value: "TODO · My next little adventure" },
    { label: "Something to learn", value: "TODO · A new curiosity" },
  ],
  favouritesTitle: "FAVOURITE THINGS",
  favourites: [
    { title: "Guitar", prompt: "A little music", art: "guitar", color: "sand" },
    { title: "Motorcycle", prompt: "On two wheels", art: "motorcycle", color: "peach" },
    { title: "Travel", prompt: "Out in the world", art: "travel", color: "olive" },
    { title: "Biking", prompt: "A ride to enjoy", art: "bicycle", color: "blue" },
  ],
  footer: "A little space for Abey.",
} as const;

// Approved career copy. Preserve wording, dates, source limitations and visible titles.
// Reviewed source fixture: tests/fixtures/abey-experience.md.
export const career = {
  "highlights": [
    "Automated 200+ manual files into bulk processing with PowerQuery & VBA",
    "Built dashboards (Power BI, Tableau, Sheets) for inventory, sales, pricing, forecasts & KPIs",
    "Designed reporting for QuickBooks, logistics, and database-driven systems",
    "Streamlined workflows with Power Automate, Zapier & Smartsheets",
    "Expert in dynamic tables, complex formulas, and data cleaning in Excel"
  ],
  "specialties": [
    "Excel & VBA",
    "Power BI",
    "KPI Reporting",
    "Forecasting",
    "Pricing Analysis",
    "QB & Logistics Reporting",
    "Database Handling",
    "Workflow Automation"
  ],
  "entries": [
    {
      "company": "Books To Go Bookkeeping",
      "context": "Full-time - 5 yrs 3 mos",
      "titles": [
        "Reporting Specialist - Jan 2021 - Mar 2026 - 5 yrs 3 mos",
        "Data Specialist - Jan 2021 - Mar 2026 - 5 yrs 3 mos - United States"
      ],
      "details": [
        "1. Automated Master Dashboard (Power BI, SmartSheets, Excel) - Reduced reporting time by 40% by eliminating manual processes through PowerQuery.",
        "2. Streamlined Client Onboarding - Automated invoicing and built customized client dashboards (contacts, deliverables, hours tracking), improving efficiency and accuracy.",
        "3. Optimized Invoicing & Reporting - Managed invoicing for 200+ clients with workflow automations ensuring 100% billing accuracy and faster processing.",
        "4. Automated Year-End & Payroll Processes - Integrated QuickBooks with Google Sheets for error-free year-end reporting and built payroll automations for seamless compliance.",
        "5. Enhanced Inventory & Expense Tracking - Created automated inventory reports and an interactive payroll dashboard to monitor stock, costs, and revenue trends for better decision-making."
      ],
      "namedSkills": "Named skills: QuickBooks, Microsoft Power BI"
    },
    {
      "company": "WeCompete Lenders",
      "context": "Data Analyst - Full-time - Sep 2020 - Dec 2020 - 4 mos - New York, United States",
      "titles": [],
      "details": [
        "- Managing master data of the lenders matrix, including creation, updates and deletion",
        "- Provide quality assurance of imported data, working with quality assurance analyst if necessary.",
        "- Helping develop analysis and report based on the needed data",
        "- Trouble shooting the reporting database environment and reports."
      ],
      "namedSkills": "Named skills: Graphics, Quality Measures"
    },
    {
      "company": "Department of Education - Philippines",
      "context": "Administrative Assistant II - Part-time - Apr 2019 - Sep 2020 - 1 yr 6 mos - Metro Manila",
      "titles": [],
      "details": [
        "- Receives accounting documents and maintains a record by photocopying and filing documents upon receipt, for future reference.",
        "- Maintains accounting databases by entering data into the computer and processing backups.",
        "- Reconciles bank statements by comparing statements with general ledger.",
        "- Verifies financial reports by running performance analysis software program.",
        "- Determines value of depreciable assets by running depreciation software program."
      ],
      "namedSkills": null
    },
    {
      "company": "Department of Social Welfare and Development",
      "context": "Administrative Officer II - Full-time - Mar 2018 - Mar 2019 - 1 yr 1 mo - National Capital Region, Philippines",
      "titles": [],
      "details": [
        "1. Assisted in day-to-day operational activities of the FMS, ensuring smooth workflow and timely task execution.",
        "2. Provided high-level administrative support to the FMS Director, including review and quality control of documents, reports, memoranda, and communications prepared by Accounting, Budget, and Cash Divisions.",
        "3. Contributed to the establishment and improvement of systems and standard operating procedures (SOPs) to enhance efficiency and service delivery.",
        "4. Led the monitoring of activities, outputs, and system implementation to ensure effective performance across the FMS.",
        "5. Prepared official communications, summary reports, and supporting documentation for management use.",
        "6. Coordinated and documented meetings, workshops, trainings, and program events, providing full secretariat support."
      ],
      "namedSkills": null
    },
    {
      "company": "RareJob Philippines, Inc.",
      "context": "Staff Financial Analyst - Full-time - Oct 2016 - Mar 2017 - 6 mos - National Capital Region, Philippines",
      "titles": [],
      "details": [
        "- Receiving of Payment request from the service providers of the company",
        "- Verifying and checking of the details of each request",
        "- Payment preparation via check, cash and wireless bank transfer",
        "- Monitoring of the payment through the passbook.",
        "- Preparing of the report of all the payment done for the day"
      ],
      "namedSkills": null
    }
  ],
  "notes": [
    "Notes: entries ending \"… more\" were truncated on LinkedIn - use only the text below, never complete them.",
    "\"+8 skills\" / \"+3 skills\" / \"+2 skills\" are hidden lists - do not guess them."
  ]
} as const;

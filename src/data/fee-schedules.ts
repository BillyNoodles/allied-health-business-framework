import { FeeScheduleType, ServiceType, FeeItem, FinancialBenchmark, BillingRequirement } from '@/lib/models/FeeSchedule';
import { DisciplineType } from '@/lib/models/DisciplineType';
import { Country } from '@/lib/models/Country';

// WorkCover Fee Schedules
export const WORKCOVER_FEES: FeeItem[] = [
  // Victoria WorkSafe
  {
    id: 'wc-vic-initial',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.INITIAL,
    description: 'Initial consultation - WorkSafe Victoria',
    duration: 60,
    fee: 159.85,
    requiresApproval: false,
    jurisdiction: 'VIC',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'wc-vic-standard',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.STANDARD,
    description: 'Standard consultation - WorkSafe Victoria',
    duration: 30,
    fee: 89.40,
    requiresApproval: false,
    jurisdiction: 'VIC',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'wc-vic-complex',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.COMPLEX,
    description: 'Complex consultation - WorkSafe Victoria',
    duration: 45,
    fee: 134.10,
    requiresApproval: true,
    jurisdiction: 'VIC',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'wc-vic-report',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.REPORT,
    description: 'Report writing - WorkSafe Victoria',
    fee: 134.10,
    requiresApproval: false,
    jurisdiction: 'VIC',
    effectiveDate: new Date('2024-07-01')
  },
  
  // NSW SIRA
  {
    id: 'wc-nsw-initial',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.INITIAL,
    description: 'Initial consultation - SIRA NSW',
    duration: 60,
    fee: 169.00,
    requiresApproval: false,
    jurisdiction: 'NSW',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'wc-nsw-standard',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.STANDARD,
    description: 'Standard consultation - SIRA NSW',
    duration: 30,
    fee: 94.00,
    requiresApproval: false,
    jurisdiction: 'NSW',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'wc-nsw-complex',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.COMPLEX,
    description: 'Complex consultation - SIRA NSW',
    duration: 45,
    fee: 141.00,
    requiresApproval: true,
    jurisdiction: 'NSW',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'wc-nsw-report',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.REPORT,
    description: 'Report writing - SIRA NSW',
    fee: 141.00,
    requiresApproval: false,
    jurisdiction: 'NSW',
    effectiveDate: new Date('2024-07-01')
  },
  
  // Queensland WorkCover
  {
    id: 'wc-qld-initial',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.INITIAL,
    description: 'Initial consultation - WorkCover QLD',
    duration: 60,
    fee: 164.60,
    requiresApproval: false,
    jurisdiction: 'QLD',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'wc-qld-standard',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.STANDARD,
    description: 'Standard consultation - WorkCover QLD',
    duration: 30,
    fee: 91.90,
    requiresApproval: false,
    jurisdiction: 'QLD',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'wc-qld-complex',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.COMPLEX,
    description: 'Complex consultation - WorkCover QLD',
    duration: 45,
    fee: 137.85,
    requiresApproval: true,
    jurisdiction: 'QLD',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'wc-qld-report',
    scheduleType: FeeScheduleType.WORKCOVER,
    serviceType: ServiceType.REPORT,
    description: 'Report writing - WorkCover QLD',
    fee: 137.85,
    requiresApproval: false,
    jurisdiction: 'QLD',
    effectiveDate: new Date('2024-07-01')
  }
];

// DVA Fee Schedule
export const DVA_FEES: FeeItem[] = [
  {
    id: 'dva-initial',
    scheduleType: FeeScheduleType.DVA,
    serviceType: ServiceType.INITIAL,
    itemNumber: 'PT01',
    description: 'Initial consultation - DVA',
    fee: 95.65,
    requiresApproval: false,
    jurisdiction: 'NATIONAL',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'dva-standard',
    scheduleType: FeeScheduleType.DVA,
    serviceType: ServiceType.STANDARD,
    itemNumber: 'PT02',
    description: 'Standard consultation - DVA',
    fee: 82.25,
    requiresApproval: false,
    jurisdiction: 'NATIONAL',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'dva-complex',
    scheduleType: FeeScheduleType.DVA,
    serviceType: ServiceType.COMPLEX,
    itemNumber: 'PT03',
    description: 'Complex consultation - DVA',
    fee: 115.15,
    requiresApproval: true,
    jurisdiction: 'NATIONAL',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'dva-home',
    scheduleType: FeeScheduleType.DVA,
    serviceType: ServiceType.HOME_VISIT,
    itemNumber: 'PT04',
    description: 'Home visit - DVA',
    fee: 115.15,
    requiresApproval: true,
    jurisdiction: 'NATIONAL',
    effectiveDate: new Date('2024-07-01')
  },
  {
    id: 'dva-report',
    scheduleType: FeeScheduleType.DVA,
    serviceType: ServiceType.REPORT,
    itemNumber: 'PT55',
    description: 'Report writing - DVA',
    fee: 82.25,
    requiresApproval: false,
    jurisdiction: 'NATIONAL',
    effectiveDate: new Date('2024-07-01')
  }
];

// NDIS Fee Schedule
export const NDIS_FEES: FeeItem[] = [
  {
    id: 'ndis-assessment',
    scheduleType: FeeScheduleType.NDIS,
    serviceType: ServiceType.ASSESSMENT,
    itemNumber: '15_048_0128_1_3',
    description: 'Initial Assessment - NDIS',
    fee: 193.99,
    requiresApproval: false,
    allowsTravel: true,
    jurisdiction: 'NATIONAL',
    effectiveDate: new Date('2023-07-01'),
    expiryDate: new Date('2024-06-30')
  },
  {
    id: 'ndis-therapy',
    scheduleType: FeeScheduleType.NDIS,
    serviceType: ServiceType.THERAPY,
    itemNumber: '15_047_0128_1_3',
    description: 'Therapy Session - NDIS',
    fee: 193.99,
    requiresApproval: false,
    allowsTravel: true,
    jurisdiction: 'NATIONAL',
    effectiveDate: new Date('2023-07-01'),
    expiryDate: new Date('2024-06-30')
  },
  {
    id: 'ndis-report',
    scheduleType: FeeScheduleType.NDIS,
    serviceType: ServiceType.REPORT,
    itemNumber: '15_049_0128_1_3',
    description: 'Report Writing - NDIS',
    fee: 193.99,
    requiresApproval: false,
    allowsTravel: false,
    jurisdiction: 'NATIONAL',
    effectiveDate: new Date('2023-07-01'),
    expiryDate: new Date('2024-06-30')
  },
  {
    id: 'ndis-travel',
    scheduleType: FeeScheduleType.NDIS,
    serviceType: ServiceType.TRAVEL,
    itemNumber: '15_050_0128_1_3',
    description: 'Provider Travel - NDIS',
    fee: 193.99,
    requiresApproval: false,
    jurisdiction: 'NATIONAL',
    effectiveDate: new Date('2023-07-01'),
    expiryDate: new Date('2024-06-30')
  }
];

// Billing Requirements
export const BILLING_REQUIREMENTS: BillingRequirement[] = [
  {
    id: 'billing-workcover',
    scheduleType: FeeScheduleType.WORKCOVER,
    description: 'WorkCover billing requirements',
    documentationRequired: [
      'SOAP format clinical notes',
      'Treatment justification',
      'Progress measures',
      'Future planning',
      'Service codes',
      'Time records',
      'Provider details',
      'Patient information'
    ],
    processingGuidelines: [
      'Submit claims within 21 days of service',
      'Include all required documentation',
      'Use correct item numbers',
      'Obtain prior approval for complex treatments',
      'Maintain copies of all submitted documentation'
    ],
    effectiveDate: new Date('2024-01-01')
  },
  {
    id: 'billing-dva',
    scheduleType: FeeScheduleType.DVA,
    description: 'DVA billing requirements',
    documentationRequired: [
      'SOAP format clinical notes',
      'Treatment justification',
      'Progress measures',
      'Future planning',
      'Service codes',
      'Time records',
      'Provider details',
      'Patient information',
      'D1216 referral form'
    ],
    processingGuidelines: [
      'Submit claims within 30 days of service',
      'Include all required documentation',
      'Use correct item numbers',
      'Verify card type (Gold/White)',
      'Submit end of cycle reports',
      'Obtain new referrals at end of treatment cycle'
    ],
    effectiveDate: new Date('2024-01-01')
  },
  {
    id: 'billing-ndis',
    scheduleType: FeeScheduleType.NDIS,
    description: 'NDIS billing requirements',
    documentationRequired: [
      'SOAP format clinical notes',
      'Treatment justification',
      'Progress measures',
      'Future planning',
      'Service codes',
      'Time records',
      'Provider details',
      'Patient information',
      'Service agreement'
    ],
    processingGuidelines: [
      'Verify funding in participant plan',
      'Use correct support item numbers',
      'Submit claims through provider portal',
      'Document service delivery agreements',
      'Maintain evidence of service delivery',
      'Track funding utilization'
    ],
    effectiveDate: new Date('2023-07-01')
  },
  {
    id: 'billing-private',
    scheduleType: FeeScheduleType.PRIVATE,
    description: 'Private health insurance billing requirements',
    documentationRequired: [
      'SOAP format clinical notes',
      'Treatment justification',
      'Progress measures',
      'Future planning',
      'Service codes',
      'Time records',
      'Provider details',
      'Patient information',
      'Health fund provider number'
    ],
    processingGuidelines: [
      'Verify patient coverage before service',
      'Use correct item numbers for each fund',
      'Submit claims through HICAPS/provider portal',
      'Collect gap payments at time of service',
      'Provide itemized receipts',
      'Track annual limits'
    ],
    effectiveDate: new Date('2024-01-01')
  }
];

// Financial Benchmarks
export const FINANCIAL_BENCHMARKS: FinancialBenchmark[] = [
  // Revenue benchmarks
  {
    id: 'benchmark-revenue-per-provider',
    metric: 'Revenue per Full-Time Provider',
    description: 'Annual revenue generated per full-time equivalent provider',
    value: 250000,
    unit: 'AUD',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  },
  {
    id: 'benchmark-revenue-per-hour',
    metric: 'Revenue per Clinical Hour',
    description: 'Average revenue generated per clinical hour',
    value: 150,
    unit: 'AUD',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  },
  {
    id: 'benchmark-utilization-rate',
    metric: 'Provider Utilization Rate',
    description: 'Percentage of available clinical hours utilized',
    value: 85,
    unit: 'percent',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  },
  
  // Expense benchmarks
  {
    id: 'benchmark-labor-cost',
    metric: 'Labor Cost Percentage',
    description: 'Labor costs as a percentage of total revenue',
    value: 55,
    unit: 'percent',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  },
  {
    id: 'benchmark-rent-cost',
    metric: 'Rent Cost Percentage',
    description: 'Rent costs as a percentage of total revenue',
    value: 8,
    unit: 'percent',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  },
  {
    id: 'benchmark-operating-expenses',
    metric: 'Operating Expenses Percentage',
    description: 'Operating expenses as a percentage of total revenue',
    value: 25,
    unit: 'percent',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  },
  
  // Profitability benchmarks
  {
    id: 'benchmark-profit-margin',
    metric: 'Net Profit Margin',
    description: 'Net profit as a percentage of total revenue',
    value: 15,
    unit: 'percent',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  },
  {
    id: 'benchmark-owner-compensation',
    metric: 'Owner Compensation Percentage',
    description: 'Owner compensation as a percentage of total revenue',
    value: 20,
    unit: 'percent',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  },
  
  // Billing benchmarks
  {
    id: 'benchmark-collection-rate',
    metric: 'Collection Rate',
    description: 'Percentage of billed charges collected',
    value: 95,
    unit: 'percent',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  },
  {
    id: 'benchmark-days-in-ar',
    metric: 'Days in Accounts Receivable',
    description: 'Average number of days to collect payment',
    value: 30,
    unit: 'days',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  },
  {
    id: 'benchmark-no-show-rate',
    metric: 'No-Show Rate',
    description: 'Percentage of appointments missed without notice',
    value: 5,
    unit: 'percent',
    disciplineType: DisciplineType.PHYSIOTHERAPY,
    country: Country.AUSTRALIA,
    source: 'Physiotherapy Benchmarks 2024',
    effectiveDate: new Date('2024-01-01')
  }
];

import { DisciplineType } from '@/lib/models/DisciplineType';
import { Country } from '@/lib/models/Country';

export enum FeeScheduleType {
  WORKCOVER = 'WORKCOVER',
  DVA = 'DVA',
  NDIS = 'NDIS',
  PRIVATE = 'PRIVATE',
  MEDICARE = 'MEDICARE'
}

export enum ServiceType {
  INITIAL = 'INITIAL',
  STANDARD = 'STANDARD',
  COMPLEX = 'COMPLEX',
  REPORT = 'REPORT',
  HOME_VISIT = 'HOME_VISIT',
  ASSESSMENT = 'ASSESSMENT',
  THERAPY = 'THERAPY',
  TRAVEL = 'TRAVEL'
}

export interface FeeItem {
  id: string;
  scheduleType: FeeScheduleType;
  serviceType: ServiceType;
  itemNumber?: string;
  description: string;
  duration?: number; // in minutes
  fee: number;
  requiresApproval: boolean;
  allowsTravel?: boolean;
  jurisdiction?: string; // state/territory or 'NATIONAL'
  effectiveDate: Date;
  expiryDate?: Date;
}

export interface FinancialBenchmark {
  id: string;
  metric: string;
  description: string;
  value: number;
  unit: string;
  disciplineType: DisciplineType;
  country: Country;
  source: string;
  effectiveDate: Date;
}

export interface BillingRequirement {
  id: string;
  scheduleType: FeeScheduleType;
  description: string;
  documentationRequired: string[];
  processingGuidelines: string[];
  jurisdiction?: string;
  effectiveDate: Date;
}

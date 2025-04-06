import { MaterialResourceType } from './MaterialResourceType';

export enum ComplianceFrameworkType {
  WORKCOVER = 'WORKCOVER',
  NDIS = 'NDIS',
  DVA = 'DVA',
  INSURANCE = 'INSURANCE',
  CYBERSECURITY = 'CYBERSECURITY',
  PRIVACY = 'PRIVACY',
  CLINICAL = 'CLINICAL',
  GENERAL = 'GENERAL'
}

export interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  frameworkType: ComplianceFrameworkType;
  authority: string;
  legislation?: string;
  standard?: string;
  riskLevel: 'low' | 'medium' | 'high';
  verificationMethod: string[];
  resources: MaterialResourceType[];
  implementationSteps: string[];
  reviewFrequency: 'monthly' | 'quarterly' | 'biannually' | 'annually';
}

export interface ComplianceStatus {
  requirementId: string;
  status: 'compliant' | 'partially-compliant' | 'non-compliant' | 'not-applicable';
  lastVerified?: Date;
  evidence?: string;
  notes?: string;
  actionItems?: string[];
  nextReviewDate: Date;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  type: ComplianceFrameworkType;
  requirements: ComplianceRequirement[];
  applicableJurisdictions?: string[];
  version: string;
  lastUpdated: Date;
}

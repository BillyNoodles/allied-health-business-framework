import { FeeScheduleType, ServiceType, FeeItem, FinancialBenchmark, BillingRequirement } from '@/models/FeeSchedule';
import { WORKCOVER_FEES, DVA_FEES, NDIS_FEES, BILLING_REQUIREMENTS, FINANCIAL_BENCHMARKS } from '@/data/fee-schedules';
import { DisciplineType } from '@/models/DisciplineType';
import { PracticeSize } from '@/models/PracticeSize';
import { Country } from '@/models/Country';
import { AssessmentCategory } from '@/models/AssessmentCategory';

export interface FinancialAssessmentResult {
  overallScore: number;
  categoryScores: {
    category: string;
    score: number;
    benchmark: number;
    gap: number;
  }[];
  recommendations: string[];
  projections: {
    current: number;
    potential: number;
    improvement: number;
    timeframe: string;
  };
  benchmarkComparisons: {
    metric: string;
    practice: number;
    benchmark: number;
    percentile: number;
  }[];
}

export class FinancialAssessmentCalculator {
  /**
   * Calculate financial health score based on assessment answers and fee data
   * @param answers Assessment answers related to financial health
   * @param discipline Practice discipline
   * @param size Practice size
   * @param country Practice country
   * @returns Financial assessment result
   */
  public static calculateFinancialHealth(
    answers: Record<string, any>,
    discipline: DisciplineType,
    size: PracticeSize,
    country: Country
  ): FinancialAssessmentResult {
    // Get applicable benchmarks for this practice type
    const benchmarks = this.getApplicableBenchmarks(discipline, country);

    // Calculate category scores
    const revenueScore = this.calculateRevenueScore(answers, benchmarks);
    const expenseScore = this.calculateExpenseScore(answers, benchmarks);
    const billingScore = this.calculateBillingScore(answers, benchmarks);
    const pricingScore = this.calculatePricingScore(answers, discipline, country);
    const profitabilityScore = this.calculateProfitabilityScore(answers, benchmarks);

    // Calculate overall score (weighted average)
    const overallScore = (
      revenueScore * 0.25 +
      expenseScore * 0.2 +
      billingScore * 0.2 +
      pricingScore * 0.15 +
      profitabilityScore * 0.2
    );

    // Create category scores array
    const categoryScores = [
      {
        category: 'Revenue Generation',
        score: revenueScore,
        benchmark: 85,
        gap: 85 - revenueScore
      },
      {
        category: 'Expense Management',
        score: expenseScore,
        benchmark: 80,
        gap: 80 - expenseScore
      },
      {
        category: 'Billing Efficiency',
        score: billingScore,
        benchmark: 90,
        gap: 90 - billingScore
      },
      {
        category: 'Pricing Strategy',
        score: pricingScore,
        benchmark: 75,
        gap: 75 - pricingScore
      },
      {
        category: 'Profitability',
        score: profitabilityScore,
        benchmark: 85,
        gap: 85 - profitabilityScore
      }
    ];

    // Generate recommendations
    const recommendations = this.generateRecommendations(categoryScores, answers, discipline, size, country);

    // Calculate financial projections
    const projections = this.calculateProjections(answers, categoryScores, discipline, size);

    // Generate benchmark comparisons
    const benchmarkComparisons = this.generateBenchmarkComparisons(answers, benchmarks);

    return {
      overallScore,
      categoryScores,
      recommendations,
      projections,
      benchmarkComparisons
    };
  }

  /**
   * Get applicable financial benchmarks for a practice
   * @param discipline Practice discipline
   * @param country Practice country
   * @returns Applicable financial benchmarks
   */
  private static getApplicableBenchmarks(
    discipline: DisciplineType,
    country: Country
  ): FinancialBenchmark[] {
    return FINANCIAL_BENCHMARKS.filter(benchmark =>
      benchmark.disciplineType === discipline &&
      benchmark.country === country
    );
  }

  /**
   * Calculate revenue generation score
   * @param answers Assessment answers
   * @param benchmarks Applicable benchmarks
   * @returns Revenue score (0-100)
   */
  private static calculateRevenueScore(
    answers: Record<string, any>,
    benchmarks: FinancialBenchmark[]
  ): number {
    // Get relevant benchmarks
    const revenuePerProviderBenchmark = benchmarks.find(b => b.id === 'benchmark-revenue-per-provider')?.value || 250000;
    const revenuePerHourBenchmark = benchmarks.find(b => b.id === 'benchmark-revenue-per-hour')?.value || 150;
    const utilizationRateBenchmark = benchmarks.find(b => b.id === 'benchmark-utilization-rate')?.value || 85;

    // Get practice values from answers
    const revenuePerProvider = answers.revenuePerProvider || 0;
    const revenuePerHour = answers.revenuePerHour || 0;
    const utilizationRate = answers.utilizationRate || 0;

    // Calculate component scores
    const revenuePerProviderScore = Math.min(100, (revenuePerProvider / revenuePerProviderBenchmark) * 100);
    const revenuePerHourScore = Math.min(100, (revenuePerHour / revenuePerHourBenchmark) * 100);
    const utilizationRateScore = Math.min(100, (utilizationRate / utilizationRateBenchmark) * 100);

    // Calculate weighted average
    return (
      revenuePerProviderScore * 0.4 +
      revenuePerHourScore * 0.3 +
      utilizationRateScore * 0.3
    );
  }

  /**
   * Calculate expense management score
   * @param answers Assessment answers
   * @param benchmarks Applicable benchmarks
   * @returns Expense score (0-100)
   */
  private static calculateExpenseScore(
    answers: Record<string, any>,
    benchmarks: FinancialBenchmark[]
  ): number {
    // Get relevant benchmarks
    const laborCostBenchmark = benchmarks.find(b => b.id === 'benchmark-labor-cost')?.value || 55;
    const rentCostBenchmark = benchmarks.find(b => b.id === 'benchmark-rent-cost')?.value || 8;
    const operatingExpensesBenchmark = benchmarks.find(b => b.id === 'benchmark-operating-expenses')?.value || 25;

    // Get practice values from answers
    const laborCost = answers.laborCostPercentage || 0;
    const rentCost = answers.rentCostPercentage || 0;
    const operatingExpenses = answers.operatingExpensesPercentage || 0;

    // For expenses, lower is better, so we invert the comparison
    // Calculate component scores (closer to benchmark is better)
    const laborCostScore = Math.max(0, 100 - Math.abs(laborCost - laborCostBenchmark) * 2);
    const rentCostScore = Math.max(0, 100 - Math.abs(rentCost - rentCostBenchmark) * 5);
    const operatingExpensesScore = Math.max(0, 100 - Math.abs(operatingExpenses - operatingExpensesBenchmark) * 2);

    // Calculate weighted average
    return (
      laborCostScore * 0.5 +
      rentCostScore * 0.2 +
      operatingExpensesScore * 0.3
    );
  }

  /**
   * Calculate billing efficiency score
   * @param answers Assessment answers
   * @param benchmarks Applicable benchmarks
   * @returns Billing score (0-100)
   */
  private static calculateBillingScore(
    answers: Record<string, any>,
    benchmarks: FinancialBenchmark[]
  ): number {
    // Get relevant benchmarks
    const collectionRateBenchmark = benchmarks.find(b => b.id === 'benchmark-collection-rate')?.value || 95;
    const daysInARBenchmark = benchmarks.find(b => b.id === 'benchmark-days-in-ar')?.value || 30;
    const noShowRateBenchmark = benchmarks.find(b => b.id === 'benchmark-no-show-rate')?.value || 5;

    // Get practice values from answers
    const collectionRate = answers.collectionRate || 0;
    const daysInAR = answers.daysInAR || 0;
    const noShowRate = answers.noShowRate || 0;

    // Calculate component scores
    const collectionRateScore = Math.min(100, (collectionRate / collectionRateBenchmark) * 100);

    // For days in AR and no-show rate, lower is better
    const daysInARScore = Math.max(0, 100 - ((daysInAR - daysInARBenchmark) / daysInARBenchmark) * 100);
    const noShowRateScore = Math.max(0, 100 - ((noShowRate - noShowRateBenchmark) / noShowRateBenchmark) * 100);

    // Calculate weighted average
    return (
      collectionRateScore * 0.4 +
      daysInARScore * 0.4 +
      noShowRateScore * 0.2
    );
  }

  /**
   * Calculate pricing strategy score
   * @param answers Assessment answers
   * @param discipline Practice discipline
   * @param country Practice country
   * @returns Pricing score (0-100)
   */
  private static calculatePricingScore(
    answers: Record<string, any>,
    discipline: DisciplineType,
    country: Country
  ): number {
    // Get applicable fee schedules
    const workCoverFees = WORKCOVER_FEES;
    const dvaFees = DVA_FEES;
    const ndisFees = NDIS_FEES;

    // Get practice values from answers
    const privateInitialFee = answers.privateInitialFee || 0;
    const privateStandardFee = answers.privateStandardFee || 0;
    const privateComplexFee = answers.privateComplexFee || 0;

    // Calculate average fees from fee schedules
    const avgWorkCoverInitialFee = this.calculateAverageFee(workCoverFees, ServiceType.INITIAL);
    const avgWorkCoverStandardFee = this.calculateAverageFee(workCoverFees, ServiceType.STANDARD);
    const avgWorkCoverComplexFee = this.calculateAverageFee(workCoverFees, ServiceType.COMPLEX);

    // Calculate optimal private fees (typically 10-20% higher than WorkCover)
    const optimalInitialFee = avgWorkCoverInitialFee * 1.15;
    const optimalStandardFee = avgWorkCoverStandardFee * 1.15;
    const optimalComplexFee = avgWorkCoverComplexFee * 1.15;

    // Calculate component scores (closer to optimal is better)
    const initialFeeScore = Math.max(0, 100 - Math.abs(privateInitialFee - optimalInitialFee) / optimalInitialFee * 100);
    const standardFeeScore = Math.max(0, 100 - Math.abs(privateStandardFee - optimalStandardFee) / optimalStandardFee * 100);
    const complexFeeScore = Math.max(0, 100 - Math.abs(privateComplexFee - optimalComplexFee) / optimalComplexFee * 100);

    // Calculate fee structure score
    const feeStructureScore = (initialFeeScore + standardFeeScore + complexFeeScore) / 3;

    // Calculate program participation score
    const programParticipationScore = this.calculateProgramParticipationScore(answers);

    // Calculate weighted average
    return (
      feeStructureScore * 0.6 +
      programParticipationScore * 0.4
    );
  }

  /**
   * Calculate profitability score
   * @param answers Assessment answers
   * @param benchmarks Applicable benchmarks
   * @returns Profitability score (0-100)
   */
  private static calculateProfitabilityScore(
    answers: Record<string, any>,
    benchmarks: FinancialBenchmark[]
  ): number {
    // Get relevant benchmarks
    const profitMarginBenchmark = benchmarks.find(b => b.id === 'benchmark-profit-margin')?.value || 15;
    const ownerCompensationBenchmark = benchmarks.find(b => b.id === 'benchmark-owner-compensation')?.value || 20;

    // Get practice values from answers
    const profitMargin = answers.profitMargin || 0;
    const ownerCompensation = answers.ownerCompensation || 0;

    // Calculate component scores
    const profitMarginScore = Math.min(100, (profitMargin / profitMarginBenchmark) * 100);
    const ownerCompensationScore = Math.min(100, (ownerCompensation / ownerCompensationBenchmark) * 100);

    // Calculate weighted average
    return (
      profitMarginScore * 0.6 +
      ownerCompensationScore * 0.4
    );
  }

  /**
   * Calculate average fee for a service type from a fee schedule
   * @param fees Fee schedule
   * @param serviceType Service type
   * @returns Average fee
   */
  private static calculateAverageFee(
    fees: FeeItem[],
    serviceType: ServiceType
  ): number {
    const serviceFees = fees.filter(fee => fee.serviceType === serviceType);

    if (serviceFees.length === 0) {
      return 0;
    }

    const totalFee = serviceFees.reduce((sum, fee) => sum + fee.fee, 0);
    return totalFee / serviceFees.length;
  }

  /**
   * Calculate program participation score
   * @param answers Assessment answers
   * @returns Program participation score (0-100)
   */
  private static calculateProgramParticipationScore(
    answers: Record<string, any>
  ): number {
    // Check which programs the practice participates in
    const participatesInWorkCover = answers.participatesInWorkCover || false;
    const participatesInDVA = answers.participatesInDVA || false;
    const participatesInNDIS = answers.participatesInNDIS || false;
    const participatesInPrivateHealth = answers.participatesInPrivateHealth || false;
    const participatesInMedicare = answers.participatesInMedicare || false;

    // Calculate score based on participation
    let score = 0;

    if (participatesInWorkCover) score += 20;
    if (participatesInDVA) score += 20;
    if (participatesInNDIS) score += 20;
    if (participatesInPrivateHealth) score += 20;
    if (participatesInMedicare) score += 20;

    return score;
  }

  /**
   * Generate financial recommendations based on assessment results
   * @param categoryScores Category scores
   * @param answers Assessment answers
   * @param discipline Practice discipline
   * @param size Practice size
   * @param country Practice country
   * @returns List of recommendations
   */
  private static generateRecommendations(
    categoryScores: { category: string; score: number; benchmark: number; gap: number }[],
    answers: Record<string, any>,
    discipline: DisciplineType,
    size: PracticeSize,
    country: Country
  ): string[] {
    const recommendations: string[] = [];

    // Sort categories by gap (largest gap first)
    const sortedCategories = [...categoryScores].sort((a, b) => b.gap - a.gap);

    // Generate recommendations for top 3 categories with largest gaps
    for (let i = 0; i < Math.min(3, sortedCategories.length); i++) {
      const category = sortedCategories[i];

      if (category.gap <= 0) continue; // Skip if no gap

      switch (category.category) {
        case 'Revenue Generation':
          recommendations.push(...this.generateRevenueRecommendations(answers, discipline, size));
          break;
        case 'Expense Management':
          recommendations.push(...this.generateExpenseRecommendations(answers, discipline, size));
          break;
        case 'Billing Efficiency':
          recommendations.push(...this.generateBillingRecommendations(answers, discipline, size));
          break;
        case 'Pricing Strategy':
          recommendations.push(...this.generatePricingRecommendations(answers, discipline, country));
          break;
        case 'Profitability':
          recommendations.push(...this.generateProfitabilityRecommendations(answers, discipline, size));
          break;
      }
    }

    // Add general recommendations
    recommendations.push(
      'Conduct quarterly financial reviews to track progress against benchmarks',
      'Implement a financial dashboard to monitor key performance indicators',
      'Consider engaging a healthcare financial consultant for detailed analysis'
    );

    return recommendations;
  }

  /**
   * Generate revenue-specific recommendations
   * @param answers Assessment answers
   * @param discipline Practice discipline
   * @param size Practice size
   * @returns List of revenue recommendations
   */
  private static generateRevenueRecommendations(
    answers: Record<string, any>,
    discipline: DisciplineType,
    size: PracticeSize
  ): string[] {
    const recommendations: string[] = [];

    // Get practice values from answers
    const utilizationRate = answers.utilizationRate || 0;
    const revenuePerHour = answers.revenuePerHour || 0;

    // Add recommendations based on specific metrics
    if (utilizationRate < 80) {
      recommendations.push(
        'Implement online booking system to reduce scheduling gaps',
        'Develop a wait list management system for filling cancellations',
        'Optimize provider schedules based on peak demand periods'
      );
    }

    if (revenuePerHour < 140) {
      recommendations.push(
        'Review service mix to increase proportion of higher-value services',
        'Implement tiered pricing structure based on provider experience',
        'Consider adding specialized services with higher reimbursement rates'
      );
    }

    // Add size-specific recommendations
    if (size === PracticeSize.SOLO || size === PracticeSize.SMALL) {
      recommendations.push(
        'Consider expanding operating hours to include early mornings or evenings',
        'Develop referral relationships with complementary healthcare providers'
      );
    } else {
      recommendations.push(
        'Implement productivity incentives for providers',
        'Analyze provider performance data to identify improvement opportunities'
      );
    }

    return recommendations;
  }

  /**
   * Generate expense-specific recommendations
   * @param answers Assessment answers
   * @param discipline Practice discipline
   * @param size Practice size
   * @returns List of expense recommendations
   */
  private static generateExpenseRecommendations(
    answers: Record<string, any>,
    discipline: DisciplineType,
    size: PracticeSize
  ): string[] {
    const recommendations: string[] = [];

    // Get practice values from answers
    const laborCost = answers.laborCostPercentage || 0;
    const rentCost = answers.rentCostPercentage || 0;
    const operatingExpenses = answers.operatingExpensesPercentage || 0;

    // Add recommendations based on specific metrics
    if (laborCost > 60) {
      recommendations.push(
        'Review staffing mix and adjust to optimize productivity',
        'Implement scheduling efficiency measures to reduce overtime',
        'Consider performance-based compensation models'
      );
    }

    if (rentCost > 10) {
      recommendations.push(
        'Evaluate space utilization and consider downsizing or reconfiguring',
        'Negotiate lease terms at renewal',
        'Consider shared space arrangements for satellite locations'
      );
    }

    if (operatingExpenses > 28) {
      recommendations.push(
        'Conduct supplier audit and renegotiate contracts',
        'Implement inventory management system to reduce waste',
        'Review utility usage and implement conservation measures'
      );
    }

    // Add size-specific recommendations
    if (size === PracticeSize.SOLO || size === PracticeSize.SMALL) {
      recommendations.push(
        'Consider outsourcing non-clinical functions like billing',
        'Join group purchasing organizations to reduce supply costs'
      );
    } else {
      recommendations.push(
        'Implement centralized purchasing for all locations',
        'Conduct regular expense audits by department'
      );
    }

    return recommendations;
  }

  /**
   * Generate billing-specific recommendations
   * @param answers Assessment answers
   * @param discipline Practice discipline
   * @param size Practice size
   * @returns List of billing recommendations
   */
  private static generateBillingRecommendations(
    answers: Record<string, any>,
    discipline: DisciplineType,
    size: PracticeSize
  ): string[] {
    const recommendations: string[] = [];

    // Get practice values from answers
    const collectionRate = answers.collectionRate || 0;
    const daysInAR = answers.daysInAR || 0;
    const noShowRate = answers.noShowRate || 0;

    // Add recommendations based on specific metrics
    if (collectionRate < 90) {
      recommendations.push(
        'Implement time-of-service collections for patient portions',
        'Verify insurance eligibility prior to appointments',
        'Develop clear financial policies and communicate to patients'
      );
    }

    if (daysInAR > 35) {
      recommendations.push(
        'Submit claims within 48 hours of service',
        'Implement claim scrubbing software to reduce rejections',
        'Follow up on unpaid claims after 30 days'
      );
    }

    if (noShowRate > 7) {
      recommendations.push(
        'Implement appointment reminder system (SMS, email)',
        'Develop and enforce no-show policy with fees',
        'Analyze no-show patterns and adjust scheduling accordingly'
      );
    }

    // Add size-specific recommendations
    if (size === PracticeSize.SOLO || size === PracticeSize.SMALL) {
      recommendations.push(
        'Consider outsourcing billing to specialized medical billing service',
        'Implement electronic payment options for patients'
      );
    } else {
      recommendations.push(
        'Conduct regular billing staff training on program requirements',
        'Implement key performance indicators for billing department'
      );
    }

    return recommendations;
  }

  /**
   * Generate pricing-specific recommendations
   * @param answers Assessment answers
   * @param discipline Practice discipline
   * @param country Practice country
   * @returns List of pricing recommendations
   */
  private static generatePricingRecommendations(
    answers: Record<string, any>,
    discipline: DisciplineType,
    country: Country
  ): string[] {
    const recommendations: string[] = [];

    // Get applicable fee schedules
    const workCoverFees = WORKCOVER_FEES;

    // Calculate average fees from fee schedules
    const avgWorkCoverInitialFee = this.calculateAverageFee(workCoverFees, ServiceType.INITIAL);
    const avgWorkCoverStandardFee = this.calculateAverageFee(workCoverFees, ServiceType.STANDARD);
    const avgWorkCoverComplexFee = this.calculateAverageFee(workCoverFees, ServiceType.COMPLEX);

    // Calculate optimal private fees (typically 10-20% higher than WorkCover)
    const optimalInitialFee = avgWorkCoverInitialFee * 1.15;
    const optimalStandardFee = avgWorkCoverStandardFee * 1.15;
    const optimalComplexFee = avgWorkCoverComplexFee * 1.15;

    // Get practice values from answers
    const privateInitialFee = answers.privateInitialFee || 0;
    const privateStandardFee = answers.privateStandardFee || 0;
    const privateComplexFee = answers.privateComplexFee || 0;

    // Add recommendations based on specific metrics
    if (Math.abs(privateInitialFee - optimalInitialFee) / optimalInitialFee > 0.1) {
      recommendations.push(
        `Adjust initial consultation fee to approximately $${Math.round(optimalInitialFee)} based on market rates`,
        'Develop tiered initial assessment options based on complexity'
      );
    }

    if (Math.abs(privateStandardFee - optimalStandardFee) / optimalStandardFee > 0.1) {
      recommendations.push(
        `Adjust standard consultation fee to approximately $${Math.round(optimalStandardFee)} based on market rates`,
        'Consider length-based pricing for standard consultations'
      );
    }

    // Check program participation
    const participatesInWorkCover = answers.participatesInWorkCover || false;
    const participatesInDVA = answers.participatesInDVA || false;
    const participatesInNDIS = answers.participatesInNDIS || false;

    if (!participatesInWorkCover) {
      recommendations.push('Apply for WorkCover provider status to expand revenue streams');
    }

    if (!participatesInDVA) {
      recommendations.push('Register as a DVA provider to access veteran patient population');
    }

    if (!participatesInNDIS) {
      recommendations.push('Consider NDIS registration to tap into disability sector funding');
    }

    // Add general pricing recommendations
    recommendations.push(
      'Conduct annual fee review based on updated fee schedules',
      'Develop package pricing for multiple-session treatment plans',
      'Implement value-based pricing for specialized services'
    );

    return recommendations;
  }

  /**
   * Generate profitability-specific recommendations
   * @param answers Assessment answers
   * @param discipline Practice discipline
   * @param size Practice size
   * @returns List of profitability recommendations
   */
  private static generateProfitabilityRecommendations(
    answers: Record<string, any>,
    discipline: DisciplineType,
    size: PracticeSize
  ): string[] {
    const recommendations: string[] = [];

    // Get practice values from answers
    const profitMargin = answers.profitMargin || 0;
    const ownerCompensation = answers.ownerCompensation || 0;

    // Add recommendations based on specific metrics
    if (profitMargin < 12) {
      recommendations.push(
        'Conduct service line profitability analysis',
        'Implement minimum productivity standards for providers',
        'Review and optimize provider compensation models'
      );
    }

    if (ownerCompensation < 15) {
      recommendations.push(
        'Separate owner compensation from profit distributions',
        'Establish market-based compensation for clinical work',
        'Structure regular profit distributions based on performance'
      );
    }

    // Add size-specific recommendations
    if (size === PracticeSize.SOLO || size === PracticeSize.SMALL) {
      recommendations.push(
        'Consider adding associate providers to increase capacity',
        'Develop passive revenue streams (products, rental income)'
      );
    } else {
      recommendations.push(
        'Implement location-specific profit and loss tracking',
        'Develop performance-based bonus system for location managers'
      );
    }

    return recommendations;
  }

  /**
   * Calculate financial projections based on assessment results
   * @param answers Assessment answers
   * @param categoryScores Category scores
   * @param discipline Practice discipline
   * @param size Practice size
   * @returns Financial projections
   */
  private static calculateProjections(
    answers: Record<string, any>,
    categoryScores: { category: string; score: number; benchmark: number; gap: number }[],
    discipline: DisciplineType,
    size: PracticeSize
  ): {
    current: number;
    potential: number;
    improvement: number;
    timeframe: string;
  } {
    // Get current revenue and profit
    const currentRevenue = answers.annualRevenue || 0;
    const currentProfit = answers.annualProfit || 0;

    // Calculate average gap across categories
    const totalGap = categoryScores.reduce((sum, category) => sum + category.gap, 0);
    const averageGap = totalGap / categoryScores.length;

    // Calculate potential improvement percentages based on gaps
    const revenueImprovementPercent = Math.min(30, averageGap / 2);
    const profitImprovementPercent = Math.min(50, averageGap);

    // Calculate potential revenue and profit
    const potentialRevenue = currentRevenue * (1 + revenueImprovementPercent / 100);
    const potentialProfit = currentProfit * (1 + profitImprovementPercent / 100);

    // Calculate improvement amounts
    const revenueImprovement = potentialRevenue - currentRevenue;
    const profitImprovement = potentialProfit - currentProfit;

    // Determine timeframe based on practice size
    let timeframe = '';
    switch (size) {
      case PracticeSize.SOLO:
        timeframe = '6-12 months';
        break;
      case PracticeSize.SMALL:
        timeframe = '6-12 months';
        break;
      case PracticeSize.MEDIUM:
        timeframe = '12-18 months';
        break;
      case PracticeSize.LARGE:
        timeframe = '12-24 months';
        break;
      case PracticeSize.ENTERPRISE:
        timeframe = '18-36 months';
        break;
    }

    return {
      current: currentProfit,
      potential: potentialProfit,
      improvement: profitImprovement,
      timeframe
    };
  }

  /**
   * Generate benchmark comparisons for practice metrics
   * @param answers Assessment answers
   * @param benchmarks Applicable benchmarks
   * @returns Benchmark comparisons
   */
  private static generateBenchmarkComparisons(
    answers: Record<string, any>,
    benchmarks: FinancialBenchmark[]
  ): {
    metric: string;
    practice: number;
    benchmark: number;
    percentile: number;
  }[] {
    const comparisons: {
      metric: string;
      practice: number;
      benchmark: number;
      percentile: number;
    }[] = [];

    // Map of answer keys to benchmark IDs and display names
    const metricMap: { answerKey: string; benchmarkId: string; displayName: string }[] = [
      { answerKey: 'revenuePerProvider', benchmarkId: 'benchmark-revenue-per-provider', displayName: 'Revenue per Provider' },
      { answerKey: 'revenuePerHour', benchmarkId: 'benchmark-revenue-per-hour', displayName: 'Revenue per Hour' },
      { answerKey: 'utilizationRate', benchmarkId: 'benchmark-utilization-rate', displayName: 'Provider Utilization Rate' },
      { answerKey: 'laborCostPercentage', benchmarkId: 'benchmark-labor-cost', displayName: 'Labor Cost %' },
      { answerKey: 'rentCostPercentage', benchmarkId: 'benchmark-rent-cost', displayName: 'Rent Cost %' },
      { answerKey: 'operatingExpensesPercentage', benchmarkId: 'benchmark-operating-expenses', displayName: 'Operating Expenses %' },
      { answerKey: 'profitMargin', benchmarkId: 'benchmark-profit-margin', displayName: 'Net Profit Margin' },
      { answerKey: 'collectionRate', benchmarkId: 'benchmark-collection-rate', displayName: 'Collection Rate' },
      { answerKey: 'daysInAR', benchmarkId: 'benchmark-days-in-ar', displayName: 'Days in AR' },
      { answerKey: 'noShowRate', benchmarkId: 'benchmark-no-show-rate', displayName: 'No-Show Rate' }
    ];

    // Generate comparisons for each metric
    metricMap.forEach(metric => {
      const practiceValue = answers[metric.answerKey] || 0;
      const benchmark = benchmarks.find(b => b.id === metric.benchmarkId);

      if (benchmark) {
        // Calculate percentile (simplified approach)
        // For metrics where higher is better
        let percentile = 0;
        if (metric.answerKey === 'daysInAR' || metric.answerKey === 'noShowRate') {
          // For metrics where lower is better
          percentile = Math.max(0, Math.min(100, (benchmark.value / practiceValue) * 100));
        } else {
          percentile = Math.max(0, Math.min(100, (practiceValue / benchmark.value) * 100));
        }

        comparisons.push({
          metric: metric.displayName,
          practice: practiceValue,
          benchmark: benchmark.value,
          percentile
        });
      }
    });

    return comparisons;
  }
}

export default FinancialAssessmentCalculator;


export interface ReviewCategory {
  name: string;
  percentage: number;
}

export interface Course {
  id: string;
  name: string;
  platformId: string;
  description: string;
  reviewDistribution: ReviewCategory[];
  instructor: {
    name: string;
    title?: string;
  };
  tags: string[];
}

export interface Platform {
  id:string;
  name: string;
  tagline: string;
  summary:string;
  logo: string;
  website: string;
  pricingModel: string;
  keyFeatures: string[];
}

export interface ComparisonSubject {
  id: string;
  name: string;
  type: 'Course' | 'Platform';
  description: string;
  logo?: string;
  // This will hold the pre-analyzed review data for more contextual comparisons
  reviewInsight?: ReviewInsight; 
}

// Helper types for views
export interface CourseWithPlatform extends Course {
  platform: Platform;
}

// Types for AI-generated graphical statistics
export interface ComparisonRating {
  name: string;
  score: number; // Score out of 10
}

export interface ComparisonItemAnalysis {
  name: string;
  ratings: ComparisonRating[];
  pros: string[];
  cons: string[];
}

export interface StructuredComparisonResult {
  item1: ComparisonItemAnalysis;
  item2: ComparisonItemAnalysis;
  verdict: string;
}

// For pre-analyzed in-depth reviews
export interface ReviewInsight {
  id: string; // Corresponds to course or platform id
  type: 'Course' | 'Platform';
  praise: string[];
  criticism: string[];
  bestFor: string;
  verdict: string;
}
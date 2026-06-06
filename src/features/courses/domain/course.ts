export interface Course {
  course_id: string;
  title: string;
  description_short: string;
  instructor_id?: string;
  instructor_name: string;
  instructor_expertise_level?: string;
  duration_weeks: number;
  price_usd: number;
  is_premium: boolean;
  tags: string[];
  rating: number;
  last_updated: string;

  is_enrolled: boolean;
}

import { Course } from "../../domain/course";

export const mapRemoteCourse = (remote: any): Omit<Course, "is_enrolled"> => ({
  course_id: remote.course_id,
  title: remote.title,
  description_short: remote.description_short,
  instructor_id: remote.instructor_id,
  instructor_name: remote.instructor_name,
  instructor_expertise_level: remote.instructor_expertise_level,
  duration_weeks: remote.duration_weeks,
  price_usd: Number(remote.price_usd),
  is_premium: remote.is_premium,
  tags: remote.tags,
  rating: Number(remote.rating),
  last_updated: remote.last_updated,
});

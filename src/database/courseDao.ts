import { db } from "./database";

export const getCourses = async () => {
  return await db.getAllAsync(`SELECT * FROM courses`);
};

export const getCourseById = async (id: string) => {
  return await db.getFirstAsync(`SELECT * FROM courses WHERE course_id = ?`, [
    id,
  ]);
};

export const updateEnrollment = async (courseId: string, enrolled: boolean) => {
  await db.runAsync(
    `
      UPDATE courses
      SET is_enrolled = ?
      WHERE course_id = ?
    `,
    [enrolled ? 1 : 0, courseId],
  );
};

export const upsertCourse = async (course: any) => {
  const existing = await getCourseById(course.course_id);

  const enrolled = (existing as any)?.is_enrolled ?? 0;

  await db.runAsync(
    `
      INSERT OR REPLACE INTO courses (
        course_id,
        title,
        description_short,
        instructor_id,
        instructor_name,
        instructor_expertise_level,
        duration_weeks,
        price_usd,
        is_premium,
        tags,
        rating,
        last_updated,
        is_enrolled
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      course.course_id,
      course.title,
      course.description_short,
      course.instructor_id,
      course.instructor_name,
      course.instructor_expertise_level,
      course.duration_weeks,
      course.price_usd,
      course.is_premium ? 1 : 0,
      JSON.stringify(course.tags),
      course.rating,
      course.last_updated,
      enrolled,
    ],
  );
};

export const queryCourses = async (filters: {
  search?: string;
  premium?: boolean;
  enrolled?: boolean;
  sortBy?: "rating" | "price" | "duration";
}) => {
  let query = `SELECT * FROM courses WHERE 1=1`;

  const params: any[] = [];

  if (filters.search) {
    query += `
      AND (
        title LIKE ?
        OR instructor_name LIKE ?
        OR tags LIKE ?
      )
    `;

    const search = `%${filters.search}%`;

    params.push(search, search, search);
  }

  if (filters.premium !== undefined) {
    query += ` AND is_premium = ?`;

    params.push(filters.premium ? 1 : 0);
  }

  if (filters.enrolled !== undefined) {
    query += ` AND is_enrolled = ?`;

    params.push(filters.enrolled ? 1 : 0);
  }

  if (filters.sortBy === "rating") {
    query += ` ORDER BY rating DESC`;
  }

  if (filters.sortBy === "price") {
    query += ` ORDER BY price_usd ASC`;
  }

  if (filters.sortBy === "duration") {
    query += ` ORDER BY duration_weeks ASC`;
  }

  return await db.getAllAsync(query, params);
};

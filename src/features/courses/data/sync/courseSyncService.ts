import { CourseRemoteDataSource } from "../remote/courseRemoteDataSource";
import { upsertCourse } from "@/database/courseDao";

export const syncCourses = async () => {
  try {
    console.log("SYNC STARTED");

    const remoteCourses = await CourseRemoteDataSource.getCourses();

    console.log("REMOTE COURSES:", remoteCourses?.length);

    for (const course of remoteCourses) {
      console.log("UPSERT:", course.course_id);
      await upsertCourse(course);
    }

    console.log("SYNC COMPLETED");
    return true;
  } catch (error) {
    console.error("SYNC FAILED ❌", error);
    throw error; // IMPORTANT: don't hide errors
  }
};

import { CourseRemoteDataSource } from "../remote/courseRemoteDataSource";
import { upsertCourse, getCourses } from "@/database/courseDao";

export const syncCourses = async () => {
  try {
    console.log("SYNC STARTED");

    const remoteCourses = await CourseRemoteDataSource.getCourses();

    console.log("REMOTE COURSES:", remoteCourses?.length);

    for (const course of remoteCourses) {
      console.log("UPSERT:", course.course_id);
      await upsertCourse(course);
    }

    const localCourses = await getCourses();

    console.log("LOCAL SQLITE:", localCourses);

    console.log("SYNC COMPLETED");

    return true;
  } catch (error) {
    console.error("SYNC FAILED ❌", error);
    throw error;
  }
};
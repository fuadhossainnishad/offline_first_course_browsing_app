import { updateEnrollment, queryCourses, getCourseById } from "@/database/courseDao";
import { syncCourses } from "../sync/courseSyncService";

export const CourseRepository = {
  async getCourses(filters?: any) {
    return queryCourses(filters ?? {});
  },

  async getCourse(id: string) {
    return getCourseById(id);
  },

  async refreshCourses() {
    await syncCourses();
  },

  async toggleEnrollment(courseId: string, enrolled: boolean) {
    // 1. update local DB
    await updateEnrollment(courseId, enrolled);

    // 2. return updated single course (NOT full query)
    return getCourseById(courseId);
  },

  async loadInitialCourses(filters?: any) {
    const cached = await queryCourses(filters ?? {});

    syncCourses().catch(() => { });

    return cached;
  },
};
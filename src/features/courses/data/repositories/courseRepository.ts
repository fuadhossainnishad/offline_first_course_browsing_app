import {
  getCourseById,
  queryCourses,
  updateEnrollment,
} from "@/database/courseDao";

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
    await updateEnrollment(courseId, enrolled);
  },

  async loadInitialCourses(filters?: any) {
    const cached = await queryCourses(filters ?? {});

    syncCourses()
      .catch((err) => {
        console.log("❌ SYNC FAILED:", err);
      })
      .finally(() => { });

    return cached;
  },
};

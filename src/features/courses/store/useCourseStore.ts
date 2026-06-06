import { create } from "zustand";
import { CourseRepository } from "../data/repositories/courseRepository";

export type SortBy = "rating" | "price" | "duration";

export type Filters = {
  search: string;
  premium?: boolean;
  enrolled?: boolean;
  sortBy?: SortBy;
};

interface CourseStore {
  courses: any[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;

  filters: Filters;

  loadCourses: () => Promise<void>;
  refreshCourses: () => Promise<void>;

  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;

  toggleEnrollment: (courseId: string, enrolled: boolean) => Promise<void>;
}

export const useCourseStore = create<CourseStore>((set, get) => {
  const buildFilters = () => get().filters;

  return {
    courses: [],
    loading: false,
    refreshing: false,
    error: null,

    filters: {
      search: "",
      premium: undefined,
      enrolled: undefined,
      sortBy: undefined,
    },

    loadCourses: async () => {
      try {
        set({ loading: true, error: null });

        const courses = await CourseRepository.getCourses(buildFilters());

        set({ courses, loading: false });
      } catch {
        set({ loading: false, error: "Failed to load courses" });
      }
    },

    refreshCourses: async () => {
      set({ refreshing: true });

      try {
        await CourseRepository.refreshCourses();

        const courses = await CourseRepository.getCourses(buildFilters());

        set({
          courses,
          refreshing: false,
        });
      } catch {
        set({
          refreshing: false,
          error: "Refresh failed",
        });
      }
    },

    setFilters: (newFilters) => {
      set((state) => ({
        filters: {
          ...state.filters,
          ...newFilters,
        },
      }));
    },

    resetFilters: () => {
      set({
        filters: {
          search: "",
          premium: undefined,
          enrolled: undefined,
          sortBy: undefined,
        },
      });
    },

    toggleEnrollment: async (courseId, enrolled) => {
      await CourseRepository.toggleEnrollment(courseId, enrolled);

      const courses = await CourseRepository.getCourses(buildFilters());

      set({ courses });
    },
  };
});
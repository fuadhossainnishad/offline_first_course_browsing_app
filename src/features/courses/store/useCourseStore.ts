import { create } from "zustand";

import { CourseRepository } from "../data/repositories/courseRepository";
import { useMemo } from "react";

export interface CourseStore {
  courses: any[];

  loading: boolean;
  refreshing: boolean;
  error: string | null;

  lastSynced: string | null;

  search: string;

  premium?: boolean;
  enrolled?: boolean;
  sortBy?: "rating" | "price" | "duration";

  loadCourses: () => Promise<void>;
  refreshCourses: () => Promise<void>;

  toggleEnrollment: (courseId: string, enrolled: boolean) => Promise<void>;

  setSearch: (value: string) => void;
  setPremium: (value?: boolean) => void;
  setEnrolled: (value?: boolean) => void;
  setSortBy: (value?: "rating" | "price" | "duration") => void;
}

export const useCourseStore = create<CourseStore>((set, get) => {
  const buildFilters = () => ({
    search: get().search,
    premium: get().premium,
    enrolled: get().enrolled,
    sortBy: get().sortBy,
  });

  return {
    courses: [],

    loading: false,
    refreshing: false,
    error: null,

    lastSynced: null,

    search: "",
    premium: undefined,
    enrolled: undefined,
    sortBy: undefined,

    loadCourses: async () => {
      try {
        set({ loading: true, error: null });

        const courses = await CourseRepository.getCourses(buildFilters());

        set({
          courses,
          loading: false,
        });
      } catch (err) {
        set({
          loading: false,
          error: "Failed to load courses",
        });
      }
    },

    refreshCourses: async () => {
      try {
        set({ refreshing: true });

        await CourseRepository.refreshCourses();

        const courses = await CourseRepository.getCourses(buildFilters());

        set({
          courses,
          refreshing: false,
          lastSynced: new Date().toISOString(),
        });
      } catch {
        set({
          refreshing: false,
          error: "Refresh failed",
        });
      }
    },

    toggleEnrollment: async (courseId, enrolled) => {
      await CourseRepository.toggleEnrollment(courseId, enrolled);

      const courses = await CourseRepository.getCourses(buildFilters());

      set({ courses });
    },

    setSearch: (value) => {
      set({ search: value });
    },

    setPremium: (value) => {
      set({ premium: value });
    },

    setEnrolled: (value) => {
      set({ enrolled: value });
    },

    setSortBy: (value) => {
      set({ sortBy: value });
    },
  };
});

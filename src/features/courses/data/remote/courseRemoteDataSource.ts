import { supabase } from "@/services/supabase";

export const CourseRemoteDataSource = {
  async getCourses() {
    const { data, error } = await supabase.from("courses").select("*");

    if (error) {
      throw error;
    }

    return data;
  },
};

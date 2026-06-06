import { supabase } from "@/services/supabase";

const testSupabase = async () => {
    const { data, error } = await supabase.from("courses").select("*");

    console.log("SUPABASE DATA:", data);
    console.log("SUPABASE ERROR:", error);
};

export default testSupabase
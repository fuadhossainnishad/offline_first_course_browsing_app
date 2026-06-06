import { createClient } from "@supabase/supabase-js";
import config from "../config/config";

export const supabase = createClient(
  config.supabase_url!,
  config.supabase_anon_key!,
);

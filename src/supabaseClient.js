import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aymbrbqxvkpniojdlinv.supabase.co";
const supabaseKey = "sb_publishable_I8bUArYc8KqV2wjfrXhezg_xTTwgK6I";

export const supabase = createClient(supabaseUrl, supabaseKey);

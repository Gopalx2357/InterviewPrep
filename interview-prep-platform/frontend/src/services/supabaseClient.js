import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gbsapcmbosmtwiskhqnk.supabase.co';
const supabaseAnonKey = 'sb_publishable_dR_H1hb9R0Vo04sdVuxd4A_fkW40';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

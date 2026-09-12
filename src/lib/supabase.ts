import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mmtymoooswyxtopghoyr.supabase.co'
const supabaseAnonKey = 'sb_publishable__Ut1wfOklx7_MoTG7anCtQ_S9GdhNZO'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

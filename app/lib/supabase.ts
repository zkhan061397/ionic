import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wnznnuqoehrxomzkchlr.supabase.co'
const supabaseKey = 'sb_publishable_vvG6F0As60ZE995ogZn8pw_JGho2l9z'

export const supabase = createClient(supabaseUrl, supabaseKey)
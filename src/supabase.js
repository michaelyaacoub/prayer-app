import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rfcmzmakvfqhhfjenvjk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmY216bWFrdmZxaGhmamVudmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NDczMzUsImV4cCI6MjAwNzEyMzMzNX0.4yPEPdAIIrPJOF8q9XhWfD0nlFa4W6Y9Vgo-rH92nEs";

const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;
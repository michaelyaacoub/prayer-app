import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wafzssnalvkgwgispeht.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZnpzc25hbHZrZ3dnaXNwZWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0OTkzOTksImV4cCI6MjA1MTA3NTM5OX0.jqoAd1-VxeALZAr9jgIDxwQRX4aIgWp9GLx3fgYNE5U";

const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;
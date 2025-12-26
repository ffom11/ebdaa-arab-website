// Supabase Configuration
const SUPABASE_URL = 'https://vfewmbirxkobxsifuyck.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZXdtYmlyeGtvYnhzaWZ1eWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NTk0NTMsImV4cCI6MjA4MjMzNTQ1M30.e7T7om_4G3R08tRJemx8LyLTsmfsP3oiC0uea3yN-5k';

// Initialize Supabase
const { createClient } = supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other files
window.supabase = supabase;

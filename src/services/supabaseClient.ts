import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://blhpmonvhqjxvzuuzqdg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsaHBtb252aHFqeHZ6dXV6cWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1Mjc1OTYsImV4cCI6MjA3MTEwMzU5Nn0.aW54Y-j6yAl0X8ld2_uUB2J0Y0XEMVmw-Biv7Zn5bkw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
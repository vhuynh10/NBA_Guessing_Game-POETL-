import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default supabase;


// This file creates a Supabase client instance using the Supabase URL and Anon Key from environment variables.
// It uses the createClient function from the @supabase/supabase-js library to create the client.
// The client instance is then exported for use in other parts of the application.
// The dotenv package is used to load environment variables from a .env file.
// This allows for secure storage of sensitive information like API keys and database URLs. 
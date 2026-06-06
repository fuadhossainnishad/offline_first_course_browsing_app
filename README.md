# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Supabase Setup

1. Create a Supabase project.
2. Create the `courses` table using the provided SQL schema.
3. Insert sample records.
4. Enable Row Level Security.
5. Create a SELECT policy for anonymous users.
6. Add environment variables:

EXPO_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL

EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

The application uses Supabase as the remote source and SQLite as the local source of truth.

Course enrollment status is stored locally and preserved during synchronization.

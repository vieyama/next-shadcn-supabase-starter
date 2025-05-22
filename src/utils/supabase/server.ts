import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const cookies = await cookieStore;
          const entries = cookies.getAll(); // Assuming `getAll()` returns an array of cookies
          return entries.map(({ name, value }) => ({ name, value }));
        },
        async setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          const cookies = await cookieStore;
          for (const { name, value, options } of cookiesToSet) {
            cookies.set({ name, value, ...options });
          }
        },
      },
    }
  );
}

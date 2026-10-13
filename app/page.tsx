import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import GuokeApp from "@/components/GuokeApp";

export default async function Page() {
  let email: string | null = null;
  let name: string | null = null;
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ) {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);
      const { data } = await supabase.auth.getUser();
      email = data.user?.email ?? null;
      name =
        (data.user?.user_metadata as { display_name?: string } | null)
          ?.display_name ?? null;
    }
  } catch {
    email = null;
    name = null;
  }

  return <GuokeApp initialEmail={email} initialName={name} />;
}

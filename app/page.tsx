import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import GuokeApp from "@/components/GuokeApp";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <GuokeApp
      initialEmail={user?.email ?? null}
      initialName={
        (user?.user_metadata as { display_name?: string } | null)
          ?.display_name ?? null
      }
    />
  );
}

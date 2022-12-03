import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SignIn = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  return (
    <div>
      <main className="container mx-auto py-8">
        {!session ? (
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} redirectTo="/" />
        ) : null}
      </main>
    </div>
  );
};

export default SignIn;
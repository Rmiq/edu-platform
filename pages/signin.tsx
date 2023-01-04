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
      <main className="container mx-auto max-w-2xl py-8">
        <h1 className="text-2xl text-center py-4">Please login to the application</h1>
        {!session ? (
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} onlyThirdPartyProviders={true} redirectTo="http://localhost:3000/api/auth/callback/discord" providers={["discord"]}/>
        ) : null}
      </main>
    </div>
  );
};

export default SignIn;
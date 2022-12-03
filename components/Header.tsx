import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();

  return (
    <header className="border p-4">
      <div className="container mx-auto flex flex-row justify-between">
        <Link className="text-lg" href="/">
          🏠
        </Link>
        <div>
          <span className="mx-2 text-lg">💰: 0</span>
          <span className="mx-2 text-lg">👩 {user?.email}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

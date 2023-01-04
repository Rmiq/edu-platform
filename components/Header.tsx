import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const user = useUser();
  const session = useSession();
  const supabase = useSupabaseClient();
  const [points, setPoints] = useState(0);

  const getProfileData = async () => {
    const id = user?.id;
    let { data: users, error } = await supabase.from('users').select('points').eq('id', id);
    setPoints(users ? users[0].points : 0);
  };

  useEffect(() => {
    getProfileData();
  }, [user, session]);

  return (
    <header className="border">
      <div className="container mx-auto p-4 flex flex-row justify-between">
        <Link className="text-lg" href="/">
          🏠
        </Link>
        <div>
          <span className="mx-2 text-lg">💰: {points}</span>
          <Link className="mx-2 text-lg" href="/account">{user.avatar_url} {user.email}</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

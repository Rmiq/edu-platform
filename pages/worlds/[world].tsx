import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../components/Header';

export const getServerSideProps = withPageAuth({
  redirectTo: "/signin",
  // async getServerSideProps(context) {
  //   const world = context.query.id;
  //   return { props: { world: world } };
  // }
});

const World: NextPage = () => {
  
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  
  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-xl mb-4">Tasks</h1>
        <ul>
          <li>
            <Link href="/worlds/1/1" className='block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100'>Task 1</Link>
          </li>
        </ul>
      </main>
    </>
  );
};

export default World;

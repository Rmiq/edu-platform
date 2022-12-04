import { createServerSupabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../components/Header';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  // if (!session)
  //   return {
  //     redirect: {
  //       destination: '/signin',
  //       permanent: false
  //     }
  //   };

  return { props: {}}
};

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
            <Link href="/worlds/1/1" className='block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 my-4'>Task 1</Link>
          </li>
          <li>
            <button disabled className='block text-start w-full p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md my-4'>🔒 Task 2</button>
          </li>
          <li>
            <button disabled className='block text-start w-full p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md my-4'>🔒 Task 3</button>
          </li>
        </ul>
      </main>
    </>
  );
};

export default World;

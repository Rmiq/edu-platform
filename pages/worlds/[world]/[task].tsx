import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../../components/Header';

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const task = ctx.query.task;
  return { props: { task: task } };
};

const World = ({ task } : {task: string}) => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  useEffect(() => {
    const id = user?.id;
    setUserId(id);
  }, [user])
 

  const handleClick = async () => {
    setIsClicked(true);
    
    let { data: users } = await supabase.from('users').select('points').eq('id', userId);
    const incrementedPoints = users ? users[0].points += 10 : 0;
    const { data, error } = await supabase
      .from('users')
      .update({ points: incrementedPoints })
      .eq('id', userId);
  };

  const Modal = () => {
    return (
      <div
        data-modal-backdrop="static"
        className="bg-slate-500 bg-opacity-30 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex items-center justify-center"
      >
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-white rounded-lg shadow bg-gray-700">
            <div className="text-center p-5 border-b rounded-t border-gray-600">
              <h3 className="text-3xl my-6 font-medium text-gray-900 text-white">🎉 Congratulations 🎉</h3>
              <p className="text-white">You have earned 10 points 💰</p>
            </div>
            <div className="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                onClick={() => {
                  router.replace('/worlds/1');
                }}
              >
                Go to next task
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-xl mb-4">Task {task}</h1>
        <p>I am fancy task {task}. Click the button to get the points!</p>
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white rounded p-2 my-2 disabled:bg-slate-50 disabled:text-slate-500"
          onClick={handleClick}
          disabled={isClicked}
        >
          Click me
        </button>
        {isClicked ? <Modal /> : null}
      </main>
    </>
  );
};

export default World;

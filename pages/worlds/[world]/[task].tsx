import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../../components/Header';

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

  const Modal = () => {
    return (
      <div
        data-modal-backdrop="static"
        className="bg-slate-500 bg-opacity-30 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex items-center justify-center"
      >
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-center items-center p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Congratulations 🎉</h3>
            </div>
            <div className="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {router.replace('/worlds/1')}}
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
        <h1 className="text-xl mb-4">Task 1</h1>
        <p>I am fancy task 1. Click the button to get the points!</p>
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

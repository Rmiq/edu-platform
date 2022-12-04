import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, NextPage } from 'next';
import Header from '../components/Header';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    };

  return { props: {} };
};

const Account: NextPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-xl mb-4">Account</h1>
        <form className="block">
          <div className="my-4">
            <label className="block my-1 text-sm text-gray-500">First name</label>
            <input className="border rounded-sm p-2 w-full" placeholder="First name" />
          </div>
          <div className="my-4">
            <label className="block my-1 text-sm text-gray-500">Last name</label>
            <input className="border rounded-sm p-2 w-full" placeholder="Last name" />
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            onClick={() => {}}
          >Save</button>
        </form>
      </main>
    </>
  );
};

export default Account;

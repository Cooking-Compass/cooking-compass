import ReportForm from '@/components/ReportForm';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { getServerSession } from 'next-auth';
import { Jost } from 'next/font/google';

// import font
const jost = Jost({ subsets: ['latin'] });

const Report = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main className={jost.className}>
      <ReportForm />
    </main>
  );
};

export default Report;

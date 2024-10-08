'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { getTokenBalance, getWalletRole } from '../../utils/tokenBalance';
import { FaWallet, FaUserTag, FaCoins, FaCopy, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';

const NYT_TOKEN_MINT = 'HmEZfEKp76yCW2UXy99NhcmCRikuQArpopTq9Vnyw2A2';

export default function Dashboard() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const router = useRouter();
  const [balance, setBalance] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [upcomingPayment, setUpcomingPayment] = useState<{ amount: number; date: string } | null>(null);
  const [pendingProposals, setPendingProposals] = useState<{ title: string; description: string }[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!publicKey) {
      router.push('/');
    } else {
      const userRole = getWalletRole(publicKey);
      setRole(userRole);
      getTokenBalance(publicKey, NYT_TOKEN_MINT, connection)
        .then(setBalance)
        .catch(console.error);
      
      // Set placeholder data based on role
      switch (userRole) {
        case 'Driver Representative':
        case 'Driver':
          setUpcomingPayment({ amount: 1500, date: '2023-11-25' });
          setPendingProposals([{ title: 'Increase Driver Commissions', description: 'Proposal to increase driver commissions by 5%' }]);
          break;
        case 'Developer Representative':
          setUpcomingPayment({ amount: 5000, date: '2023-11-28' });
          setPendingProposals([{ title: 'Implement Surge Pricing', description: 'Implement dynamic pricing during peak hours' }]);
          break;
        case 'Passenger Representative':
          setUpcomingPayment(null);
          setPendingProposals([{ title: 'Add In-App Tipping', description: 'Add a feature for passengers to tip drivers through the app' }]);
          break;
        default:
          setUpcomingPayment({ amount: 100, date: '2023-11-30' });
          setPendingProposals([{ title: 'Community Feedback System', description: 'Implement a system for community members to provide feedback on the platform' }]);
      }
    }
  }, [publicKey, connection, router]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!publicKey) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            icon={<FaWallet className="text-blue-500" size={24} />}
            title="Wallet Address"
            value={`${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`}
            action={
              <div className="relative">
                <FaCopy
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  size={18}
                  onClick={() => copyToClipboard(publicKey.toBase58())}
                />
                {copied && (
                  <FaCheckCircle
                    className="text-green-500 absolute -top-1 -right-1"
                    size={12}
                  />
                )}
              </div>
            }
          />
          <DashboardCard
            icon={<FaCoins className="text-yellow-500" size={24} />}
            title="NYT Balance"
            value={balance !== null ? `${balance.toLocaleString()} NYT` : 'Loading...'}
            highlight={true}
          />
          <DashboardCard
            icon={<FaUserTag className="text-green-500" size={24} />}
            title="Role"
            value={role || 'Loading...'}
            highlight={true}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingPayment && (
            <LargeCard
              icon={<MdPayment className="text-purple-500" size={24} />}
              title="Upcoming Payment"
              value={`${upcomingPayment.amount.toLocaleString()} NYT`}
              subValue={`Due on ${new Date(upcomingPayment.date).toLocaleDateString()}`}
            />
          )}
          <LargeCard
            icon={<FaFileAlt className="text-red-500" size={24} />}
            title="Pending Proposals"
            value={pendingProposals[0]?.title || 'No pending proposals'}
            subValue={pendingProposals[0]?.description || ''}
          />
        </div>
      </main>
    </div>
  );
}

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  highlight?: boolean;
  action?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, highlight = false, action }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon}
          <h3 className="text-xl font-semibold text-gray-800 ml-2">{title}</h3>
        </div>
        {action}
      </div>
      <p className={`${highlight ? 'text-lg font-semibold text-blue-600' : 'text-gray-600'}`}>
        {value}
      </p>
    </div>
  </div>
);

const LargeCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  subValue: string;
}> = ({ icon, title, value, subValue }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg p-6">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-gray-800 ml-2">{title}</h3>
    </div>
    <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
    <p className="text-sm text-gray-600">{subValue}</p>
  </div>
);
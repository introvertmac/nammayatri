'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { FaVoteYea, FaUsers, FaCoins } from 'react-icons/fa';
import Loader from '../components/Loader';

export default function Home() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (publicKey) {
      setLoading(true);
      // Simulate a delay before redirecting
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
  }, [publicKey, router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 text-center">Namma Yatri Governance</h1>
        <p className="text-lg sm:text-xl mb-8 sm:mb-16 text-center text-gray-600 max-w-2xl mx-auto">
          Empowering the community to shape the future of ride-sharing through decentralized decision-making
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          <FeatureCard
            icon={<FaVoteYea size={36} />}
            title="Decentralized Voting"
            description="Participate in key decisions that shape Namma Yatri's future"
          />
          <FeatureCard
            icon={<FaUsers size={36} />}
            title="Community-Driven"
            description="Your voice matters in our inclusive ecosystem"
          />
          <FeatureCard
            icon={<FaCoins size={36} />}
            title="Token-Based Governance"
            description="Use NYT tokens to vote and propose changes"
          />
        </div>
      </main>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col items-center text-center bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
    <div className="text-black mb-4 sm:mb-6">{icon}</div>
    <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
)
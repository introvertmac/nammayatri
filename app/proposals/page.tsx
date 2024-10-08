'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { FaVoteYea, FaPlus } from 'react-icons/fa';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Passed' | 'Rejected';
  votes: { for: number; against: number };
}

const mockProposals: Proposal[] = [
    {
        id: '1',
        title: 'Increase Driver Commissions',
        description: 'Proposal to increase driver commissions by 5%',
        status: 'Active',
        votes: { for: 100, against: 50 },
      },
      {
        id: '2',
        title: 'Implement Surge Pricing',
        description: 'Implement surge pricing during peak hours',
        status: 'Passed',
        votes: { for: 200, against: 75 },
      },
      {
        id: '3',
        title: 'Add In-App Tipping',
        description: 'Add an in-app tipping feature for passengers',
        status: 'Active',
        votes: { for: 150, against: 100 },
      },
    
];

export default function Proposals() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (!publicKey) {
      router.push('/');
    } else {
      setProposals(mockProposals);
    }
  }, [publicKey, router]);

  if (!publicKey) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Governance Proposals</h1>
          <Link href="/proposals/create" className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300 ease-in-out flex items-center">
            <FaPlus className="mr-2" />
            Create Proposal
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </main>
    </div>
  );
}

const ProposalCard: React.FC<{ proposal: Proposal }> = ({ proposal }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div className="px-6 py-4">
      <h3 className="text-xl font-semibold mb-2">{proposal.title}</h3>
      <p className="text-gray-600 mb-4">{proposal.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className={`px-2 py-1 rounded-full text-sm ${
          proposal.status === 'Active' ? 'bg-blue-100 text-blue-800' :
          proposal.status === 'Passed' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {proposal.status}
        </span>
        <div className="flex items-center">
          <FaVoteYea className="text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">
            For: {proposal.votes.for} | Against: {proposal.votes.against}
          </span>
        </div>
      </div>
      <Link href={`/proposals/${proposal.id}`} className="w-full inline-block text-center bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300 ease-in-out">
        View Details
      </Link>
    </div>
  </div>
);
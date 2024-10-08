'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { FaVoteYea, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

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
    status: 'Active',
    votes: { for: 75, against: 25 },
  },
];

export default function ProposalPage({ params }: { params: { id: string } }) {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const { publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const foundProposal = mockProposals.find(p => p.id === params.id);
    setProposal(foundProposal || null);
  }, [params.id]);

  const handleVote = async (voteFor: boolean) => {
    if (!publicKey) {
      router.push('/');
      return;
    }

    console.log(`Voted ${voteFor ? 'for' : 'against'} proposal ${params.id}`);

    setProposal(prev => {
      if (!prev) return null;
      return {
        ...prev,
        votes: {
          for: voteFor ? prev.votes.for + 1 : prev.votes.for,
          against: voteFor ? prev.votes.against : prev.votes.against + 1,
        },
      };
    });
  };

  if (!proposal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">{proposal.title}</h1>
        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <p className="text-lg mb-4">{proposal.description}</p>
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm ${
              proposal.status === 'Active' ? 'bg-blue-200 text-blue-800' :
              proposal.status === 'Passed' ? 'bg-green-200 text-green-800' :
              'bg-red-200 text-red-800'
            }`}>
              {proposal.status}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Votes</h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaThumbsUp className="text-green-500 mr-2" size={24} />
                <span className="text-xl font-bold">{proposal.votes.for}</span>
              </div>
              <div className="flex items-center">
                <FaThumbsDown className="text-red-500 mr-2" size={24} />
                <span className="text-xl font-bold">{proposal.votes.against}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Cast Your Vote</h2>
            <div className="flex justify-between">
              <button
                onClick={() => handleVote(true)}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300 flex items-center"
              >
                <FaThumbsUp className="mr-2" />
                Vote For
              </button>
              <button
                onClick={() => handleVote(false)}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300 flex items-center"
              >
                <FaThumbsDown className="mr-2" />
                Vote Against
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

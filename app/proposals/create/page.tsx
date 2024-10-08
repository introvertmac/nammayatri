'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import { FaPaperPlane } from 'react-icons/fa';

export default function CreateProposal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { publicKey } = useWallet();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating proposal:', { title, description });
    router.push('/proposals');
  };

  if (!publicKey) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Proposal</h1>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black"
              id="title"
              type="text"
              placeholder="Proposal Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black h-32"
              id="description"
              placeholder="Proposal Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center"
            >
              <FaPaperPlane className="mr-2" />
              Submit Proposal
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
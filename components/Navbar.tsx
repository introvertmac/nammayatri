'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { FaTaxi } from 'react-icons/fa';
import Link from 'next/link';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const Navbar = () => {
  const { publicKey } = useWallet();

  return (
    <nav className="bg-white border-b border-gray-200 p-4 sm:p-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <Link href="/" className="flex items-center mb-4 sm:mb-0">
          <FaTaxi className="mr-2 text-black" size={24} />
          <span className="font-semibold text-xl text-black">Namma Yatri Governance</span>
        </Link>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {publicKey && (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-black transition-colors">
                Dashboard
              </Link>
              <Link href="/proposals" className="text-gray-600 hover:text-black transition-colors">
                Proposals
              </Link>
            </>
          )}
          <WalletMultiButtonDynamic className="bg-black hover:bg-gray-800 text-white text-sm font-bold py-2 px-4 rounded transition-colors" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
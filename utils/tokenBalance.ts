import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';

export async function getTokenBalance(wallet: PublicKey, tokenMintAddress: string, connection: Connection): Promise<number> {
  const tokenMint = new PublicKey(tokenMintAddress);
  const associatedTokenAddress = await getAssociatedTokenAddress(tokenMint, wallet);

  try {
    const balance = await connection.getTokenAccountBalance(associatedTokenAddress);
    return parseFloat(balance.value.uiAmount?.toFixed(2) || '0');
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return 0;
  }
}

export function getWalletRole(wallet: PublicKey): string {
  const driverWallet = new PublicKey('AjhgzZY2r4rC3iPrRcoAJy51HJBZb6timDmC59SyGYrE');
  const passengerWallet = new PublicKey('CRKViCKjQ6hpPmf7tJq29kjw3BTGCRjL5xsytzFzSgGL');
  const developerWallet = new PublicKey('2KsTX7z6AFR5cMjNuiWmrBSPHPk3F3tb7K5Fw14iek3t');

  if (wallet.equals(driverWallet)) return 'Driver Representative';
  if (wallet.equals(passengerWallet)) return 'Passenger Representative';
  if (wallet.equals(developerWallet)) return 'Developer Representative';
  return 'Community Member';
}
import '../styles/globals.css'
import { WalletProviderComponent } from '../components/WalletProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <WalletProviderComponent>
        <body>{children}</body>
      </WalletProviderComponent>
    </html>
  )
}
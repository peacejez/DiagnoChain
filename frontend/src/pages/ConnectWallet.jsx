import WalletButton from '../components/WalletButton.jsx'

export default function ConnectWallet() {
  return (
    <div className="container" style={{maxWidth:'520px'}}>
      <h1>Connect your wallet</h1>
      <p style={{color:'#475569'}}>Use MetaMask to continue.</p>
      <WalletButton />
    </div>
  )
}

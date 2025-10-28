import { useState } from 'react'
import { ethers } from 'ethers'

export default function WalletButton() {
  const [account, setAccount] = useState(null)

  async function connect() {
    if (!window.ethereum) {
      alert('MetaMask not found. Please install it.')
      return
    }
    const provider = new ethers.BrowserProvider(window.ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    setAccount(accounts[0])
  }

  return (
    <button onClick={connect} style={{width:'100%', padding:'12px 16px', borderRadius:'10px', background:'#111827', color:'#fff', border:'none'}}>
      {account ? `Connected: ${account.slice(0,6)}...${account.slice(-4)}` : 'Connect MetaMask'}
    </button>
  )
}

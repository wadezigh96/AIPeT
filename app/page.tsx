import Chat from "@/components/Chat";
import WalletButton from "@/components/WalletButton";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🐾</span>
            <div>
              <h1 className="text-2xl font-bold text-orange-800">AIPeT</h1>
              <p className="text-sm text-orange-600/80">Decentralized AI Pet • x402 + Privy</p>
            </div>
          </div>
          <WalletButton />
        </header>

        {/* Hero text */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Your AI companion, paid by the message
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Chat with AIPeT using micropayments on Base. No subscriptions.
            Powered by <strong>x402</strong> protocol & <strong>Privy</strong> agentic wallets.
          </p>
        </div>

        {/* Chat */}
        <Chat />

        {/* Footer info */}
        <footer className="mt-10 text-center text-sm text-gray-500 space-y-1">
          <p>
            Payments go to{" "}
            <code className="bg-orange-100 px-1 rounded text-xs">
              0xB095...ec29
            </code>{" "}
            via x402 on Base
          </p>
          <p>
            Get test USDC on Base Sepolia from{" "}
            <a
              href="https://faucet.circle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline"
            >
              Circle Faucet
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}

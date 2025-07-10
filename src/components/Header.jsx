export default function Header() {
  return (
    <header className="bg-white shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="flex items-center space-x-2">
            <img
              src="/assets/images/bitcoin.svg"
              alt="Bitcoin"
              className="w-8 h-8"
            />
            <a
              href="/"
              className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors"
            >
              CoinInsight
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

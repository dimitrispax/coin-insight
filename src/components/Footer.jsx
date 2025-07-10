export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-50 border-t border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-center h-16 space-y-2">
					<div className="flex items-center space-x-1 text-xs text-gray-500">
						<span>Data provided by</span>
						<a
							href="https://www.coingecko.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-600 font-medium hover:text-gray-800 transition-colors"
						>
							CoinGecko
						</a>
					</div>

					<p className="text-xs text-gray-500 font-mono">
						Made with ❤️ by Dimitrios Paximadakis © {currentYear}
					</p>
				</div>
			</div>
		</footer>
	);
}

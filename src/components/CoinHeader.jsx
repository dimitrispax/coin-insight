import { formatPrice, formatPercentage } from "@/utils/formatters";

export default function CoinHeader({ coin }) {
	return (
		<div className="bg-white shadow-sm rounded-lg p-6 mb-6">
			<div className="flex items-center mb-6">
				<img
					src={coin.image}
					alt={coin.name}
					className="h-24 w-24 rounded-full mr-4"
				/>
				<div>
					{coin.market_cap_rank && (
						<div className="mb-2">
							<span className="inline-block bg-gray-100 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium text-gray-700">
								Rank #{coin.market_cap_rank}
							</span>
						</div>
					)}
					<h1 className="text-3xl font-bold text-gray-900">{coin.name}</h1>
					<p className="text-lg text-gray-600">{coin.symbol}</p>
				</div>
			</div>

			<div className="mb-6">
				<div className="text-4xl font-bold text-gray-900 mb-2">
					{formatPrice(coin.current_price)}
				</div>
				<div className="flex items-center space-x-4">
					<div className="text-sm text-gray-600">
						24h Change:{" "}
						{formatPercentage(coin.price_changes?.price_change_percentage_24h)}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-gray-50 p-4 rounded-lg">
					<div className="text-sm text-gray-600 mb-1">24h High</div>
					<div className="text-xl font-semibold text-gray-900">
						{formatPrice(coin.high_24h)}
					</div>
				</div>
				<div className="bg-gray-50 p-4 rounded-lg">
					<div className="text-sm text-gray-600 mb-1">24h Low</div>
					<div className="text-xl font-semibold text-gray-900">
						{formatPrice(coin.low_24h)}
					</div>
				</div>
			</div>
		</div>
	);
}

import { useRouter } from "next/navigation";
import { formatPrice, formatPercentage } from "@/utils/formatters";

/* Extracting common classes to reduce code duplication and improve readability */
const baseHeaderClass =
	"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center";
const leftHeaderClass = `${baseHeaderClass}`;
const rightHeaderClass = `${baseHeaderClass}`;
const nameHeaderClass =
	"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left";

const baseCellClass = "px-6 py-4 whitespace-nowrap text-center";
const leftCellClass = `${baseCellClass} text-sm text-gray-900`;
const rightCellClass = `${baseCellClass} text-sm text-gray-900`;
const rightCellBoldClass = `${baseCellClass} text-sm font-medium text-gray-900`;
const rightCellPlainClass = `${baseCellClass} text-sm`;
const nameCellClass = "px-6 py-4 whitespace-nowrap text-left";

export default function CoinTable({ coins }) {
	const router = useRouter();

	const handleRowClick = (coinId) => {
		router.push(`/coins/${coinId}`);
	};

	const handleKeyDown = (event, coinId) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();

			handleRowClick(coinId);
		}
	};

	return (
		<>
			{/* Mobile view */}
			<div className="bg-white shadow-sm rounded-lg max-w-full overflow-hidden">
				<div className="block sm:hidden">
					<div className="space-y-2 p-3">
						{coins.map((coin) => (
							<button
								key={coin.id}
								type="button"
								onClick={() => handleRowClick(coin.id)}
								className="w-full bg-gray-50 rounded-lg p-3 text-left hover:bg-gray-100 transition-colors"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center flex-1">
										<div className="text-sm font-bold text-gray-600 mr-2 self-center">
											#{coin.market_cap_rank}
										</div>
										<div className="flex flex-col items-center flex-1">
											<img
												src={coin.image}
												alt={coin.name}
												className="h-8 w-8 rounded-full mb-1"
											/>
											<div className="text-center">
												<div className="text-sm font-medium text-gray-900">
													{coin.name}
												</div>
												<div className="text-sm text-gray-500">
													{coin.symbol}
												</div>
											</div>
										</div>
									</div>

									<div className="flex-1 px-2 space-y-1 text-sm text-center">
										<div>
											<div className="text-gray-500">24H HIGH</div>
											<div className="font-medium">
												{formatPrice(coin.high_24h)}
											</div>
										</div>
										<div>
											<div className="text-gray-500">24H LOW</div>
											<div className="font-medium">
												{formatPrice(coin.low_24h)}
											</div>
										</div>
									</div>

									<div className="flex-1 text-right">
										<div className="text-sm font-medium text-gray-900">
											{formatPrice(coin.current_price)}
										</div>
										<div className="text-sm">
											{formatPercentage(coin.price_change_percentage_24h)}
										</div>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Desktop view */}
				<div className="hidden sm:block">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className={leftHeaderClass}>Rank</th>
									<th className={nameHeaderClass}>Name</th>
									<th className={rightHeaderClass}>Price</th>
									<th className={rightHeaderClass}>24h Change</th>
									<th className={`${rightHeaderClass} hidden md:table-cell`}>
										24h HIGH
									</th>
									<th className={`${rightHeaderClass} hidden md:table-cell`}>
										24h LOW
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{coins.map((coin) => (
									<tr
										key={coin.id}
										className="hover:bg-gray-100 cursor-pointer transition-colors"
										onClick={() => handleRowClick(coin.id)}
										onKeyDown={(e) => handleKeyDown(e, coin.id)}
										tabIndex={0}
										aria-label={`View details for ${coin.name}`}
									>
										<td className={leftCellClass}>{coin.market_cap_rank}</td>
										<td className={nameCellClass}>
											<div className="flex items-center">
												<img
													src={coin.image}
													alt={coin.name}
													className="h-10 w-10 rounded-full mr-3"
												/>
												<div>
													<div className="text-sm font-medium text-gray-900">
														{coin.name}
													</div>
													<div className="text-sm text-gray-500">
														{coin.symbol}
													</div>
												</div>
											</div>
										</td>
										<td className={rightCellBoldClass}>
											{formatPrice(coin.current_price)}
										</td>
										<td className={rightCellPlainClass}>
											{formatPercentage(coin.price_change_percentage_24h)}
										</td>
										<td className={`${rightCellClass} hidden md:table-cell`}>
											{formatPrice(coin.high_24h)}
										</td>
										<td className={`${rightCellClass} hidden md:table-cell`}>
											{formatPrice(coin.low_24h)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

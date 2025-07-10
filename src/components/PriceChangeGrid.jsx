import { formatPercentage } from "@/utils/formatters";

export default function PriceChangeGrid({ priceChanges }) {
	const priceChangeItems = [
		{ label: "24h", key: "price_change_percentage_24h" },
		{ label: "7d", key: "price_change_percentage_7d" },
		{ label: "14d", key: "price_change_percentage_14d" },
		{ label: "30d", key: "price_change_percentage_30d" },
		{ label: "60d", key: "price_change_percentage_60d" },
		{ label: "200d", key: "price_change_percentage_200d" },
		{ label: "1y", key: "price_change_percentage_1y" },
	];

	return (
		<div className="bg-white shadow-sm rounded-lg p-6 mb-6">
			<h2 className="text-xl font-bold text-gray-900 mb-4">Price Changes</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
				{priceChangeItems.map((item) => (
					<div key={item.key} className="bg-gray-50 p-4 rounded-lg text-center">
						<div className="text-sm text-gray-600 mb-1">{item.label}</div>
						<div className="text-lg font-medium">
							{formatPercentage(priceChanges[item.key])}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default function CoinDescription({ coin }) {
	const cleanDescription = (description) => {
		if (!description) {
			return "";
		}

		return `${
			description
				.replace(/<[^>]*>/g, "")
				.replace(/\s+/g, " ")
				.trim()
				.split(".")[0]
		}.`;
	};

	if (!coin.description) {
		return null;
	}

	return (
		<div className="bg-white shadow-sm rounded-lg p-6 mb-8">
			<h2 className="text-xl font-bold text-gray-900 mb-4">
				About {coin.name}
			</h2>
			<p className="text-gray-700 leading-relaxed">
				{cleanDescription(coin.description)}
			</p>
		</div>
	);
}

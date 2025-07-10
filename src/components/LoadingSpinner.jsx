export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img
        src="/assets/images/bitcoin.svg"
        alt="Loading..."
        className="w-16 h-16 animate-spin"
      />
    </div>
  );
}

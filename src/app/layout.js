import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata = {
  title: 'CoinInsight',
  description:
    'Track cryptocurrency prices, market data, and detailed coin information with CoinInsight.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

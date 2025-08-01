## CoinInsight

A mini demo cryptocurrency tracking application built with Next.js, TailwindCSS and DaisyUI that provides coin data, market information, and analytics for various cryptocurrencies.

### Getting Started

First, make sure you are at the project's directory and run:

```bash
npm install
```

For the second step, add your Coingecko API Key in a `.env` file:

```bash
COINGECKO_API_KEY=YOUR_API_KEY
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development Process

**Project Structure**
I used [Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate) as the foundation since it's a solid, well maintained starter with 10k+ stars and follows good practices out of the box.

**Design**
The UI design was inspired by [crypto.com/prices](https://crypto.com/prices). I really liked their clean approach, so I tried to capture that same feel.

**Tech Choices**

- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) because I'm comfortable with Tailwind and DaisyUI gives you nice components without much setup.
- **Validation**: Used [zod/mini](https://zod.dev/packages/mini) for request/response validation even though it's a simple API, validation is always worth it (especially in JS).
- **API**: Went with Next.js API routes instead of server actions since it fits the project size better.

**Rate Limiting**
The [CoinGecko API](https://coingecko.com/api) has rate limits, so I added error handling to let users know when they hit the limit.

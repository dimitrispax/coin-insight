'use client';

import { useRouter } from 'next/navigation';

export default function BackButton({ text = 'Back to Markets' }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer py-2 px-4 bg-white shadow-sm rounded-lg hover:bg-gray-50 transition-colors"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <title>Back arrow</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {text}
    </button>
  );
}

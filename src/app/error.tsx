'use client';
import Link from 'next/link';
import { useEffect } from 'react';

export default function  ErrorPage({ error, reset }:
     { error: Error; reset: () => void }) {
  useEffect(() => {
     console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-amber-50 text-red-800">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className=" flext flex-col mb-6 font-blod m-b4">{error.message}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Try Again
        </button>
        <Link href="/home" className="px-4 py-2 bg-blue-600 text-white rounded">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

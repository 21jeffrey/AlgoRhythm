'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get('message');

return (
  <div className="min-h-screen flex items-center justify-center bg-blend-purple bg-gradient-to-l from-purple-500 to-violet-900">
    <div className="text-center p-8 bg-gray-600 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Email Verification
      </h1>

      {message === 'already_verified' ? (
        <p className="text-gray-100 mb-6">
          Your email was already verified.
        </p>
      ) : message === 'invalid_link' ? (
        <p className="text-red-400 mb-6">
          The verification link is invalid or has expired.
        </p>
      ) : message === 'error' ? (
        <p className="text-red-400 mb-6">
          There was an error verifying your email.
        </p>
      ) : (
        <p className="text-gray-100 mb-6">
          Your email has been successfully verified. You can now access all features.
        </p>
      )}

      <div className="space-y-3">
        {message === null || message === '' || message === 'already_verified' ? (
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Continue to Dashboard
          </button>
        ) : (
          <button
            onClick={() => router.push('/verify')}
            className="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Back to Verification
          </button>
        )}
      </div>
    </div>
  </div>
);
}

export default function EmailVerificationSuccess() {
    return (
        <Suspense fallback={<div><Loading/></div>}>
            <SuccessContent />
        </Suspense>
    );
}
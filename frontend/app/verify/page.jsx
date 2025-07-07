'use client'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

function page() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [verificationError, setVerificationError] = useState(null)
    const token = Cookies.get('token')

    useEffect(() => {    
      if (token) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}api/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => {
            if (data.user) setUser(data.user);
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, [token]);

    const verifyEmail = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/email/verification-notification`, {
                method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            }
            })

            if (!response.ok) {
                throw new Error('Failed to send verification email')
            }

            const data = await response.json()
            toast.success(data.message || 'Verification email sent successfully')
        } catch (err) {
            console.error('Verification error:', err)
            setVerificationError(err.message || 'Failed to send verification email')
            toast.error(err.message || 'Failed to send verification email')
        }
        setLoading(false)
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-violet-700 p-4 bg-blend-purple bg-gradient-to-l from-purple-500 to-violet-900">
      <div className="bg-gray-700 shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">      
            {user?.email_verified_at ? (
                <span className="text-green-600">Your email is already verified.</span>
            ) : (
                <span className="text-red-600">Please verify your email to continue.</span>
            )}
        </p>
        <button
            onClick={verifyEmail}
            disabled={loading || user?.email_verified_at}
            className={`w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? 'Sending...' : 'Send Verification Email'}
        </button>
        {verificationError && (
          <p className="text-red-600 mt-4">{verificationError}</p>
        )}

        <div className="text-gray-100 mt-4 flex items-center flex-wrap">
          <span>If you didn't receive the verification email, check your spam folder or</span>
          <button
            onClick={verifyEmail}
            className="text-purple-600 hover:underline ml-1"
            disabled={loading || user?.email_verified_at}
          >
            click here to resend it.
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
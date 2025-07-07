'use client';
import React, { useState, useEffect } from 'react';
import { Users,  Award, TrendingUp, Calendar, Star , GraduationCapIcon, Flame} from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import Loading from '@/components/Loading';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/analytics');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const analyticsData = await response.json();
        setData(analyticsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };


  // Loading state
  if (loading) {
    return (
    <Loading/>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Data</h2>
          <p className="text-gray-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No data available</p>
        </div>
      </div>
    );
  }

 

  return (
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">Analytics Dashboard</h1>
          <p className="text-white text-center">Overview of platform performance and user engagement</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-purple-700 rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-[0_10px_15px_rgba(139,92,246,0.4)] duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-100">Total Learners</p>
                <p className="text-3xl font-bold text-gray-100">{data.top_users.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </div>

          {/* Total Challenges */}
          <div className="bg-purple-700 rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-[0_10px_15px_rgba(139,92,246,0.4)] duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-100">Total Challenges</p>
                <p className="text-3xl font-bold text-gray-100">{data.total_challenges}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <GraduationCapIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Top User Points */}
          <div className="bg-purple-700 rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-[0_10px_15px_rgba(139,92,246,0.4)] duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-100">Highest Score</p>
                <p className="text-3xl font-bold text-gray-100">{Math.max(...data.top_users.map(u => u.points))}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Monthly Registrations */}
          <div className="bg-purple-700 rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-[0_10px_15px_rgba(139,92,246,0.4)] duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-100">Current Month Registrations</p>
                <p className="text-3xl font-bold text-gray-100">{data.registrations_over_time[data.registrations_over_time.length - 1].count}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Users */}
          <div className="bg-purple-700 rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400 " />
                Top Learners
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data.top_users.map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-purple-600  rounded-lg hover:bg-purple-800  duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-100">{user.name}</p>
                        <p className="text-sm text-gray-100">User ID: {user.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-100">{user.points} pts</p>
                      <p className="text-sm text-gray-100 flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        {user.current_streak} streak
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registration Timeline & Badges */}
          <div className="space-y-8">
            {/* Registration Timeline */}
            <div className="bg-purple-700 rounded-xl  border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Registration Timeline
                </h2>
              </div>
              <div className="p-6">
                {data.registrations_over_time.map((registration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-purple-600 hover:bg-purple-900 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-100">{formatMonth(registration.month)}</p>
                      <p className="text-sm text-gray-100">New registrations</p>
                    </div>
                    <div className="text-2xl font-bold text-green-300">
                      {registration.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Earned Badges */}
            <div className="bg-purple-700 rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Most Earned Badges
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {data.most_earned_badges.map((badge, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-purple-600 hover:bg-purple-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Award className="h-4 w-4 text-yellow-800" />
                        </div>
                        <p className="font-medium text-gray-100">{badge.badge_name}</p>
                      </div>
                      <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {badge.count} earned
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}
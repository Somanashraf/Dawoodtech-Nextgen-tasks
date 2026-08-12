import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Globe, 
  Users, 
  Eye, 
  Clock, 
  Download,
  Filter
} from 'lucide-react';
import { AnalyticsChartCard } from './AnalyticsChartCard';

export const AnalyticsView = () => {
  const [dateRange, setDateRange] = useState('30d');

  const topPages = [
    { path: '/dashboard/overview', views: '48,290', bounce: '24.2%', avgTime: '4m 12s' },
    { path: '/projects/tailwind-v4', views: '32,140', bounce: '18.9%', avgTime: '6m 45s' },
    { path: '/analytics/realtime', views: '21,800', bounce: '31.5%', avgTime: '3m 10s' },
    { path: '/settings/security', views: '14,920', bounce: '12.4%', avgTime: '2m 30s' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit">
            Analytics & Performance Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track user engagement, conversion funnels, and real-time site performance metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>

          <button className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition-all">
            <Download className="h-4 w-4" />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Page Views</span>
            <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Eye className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white font-outfit">117,150</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="h-4 w-4" /> +24.8% vs last period
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Unique Visitors</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white font-outfit">42,890</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="h-4 w-4" /> +12.4% vs last period
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Avg. Session Duration</span>
            <div className="h-8 w-8 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white font-outfit">4m 18s</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="h-4 w-4" /> +8.1% vs last period
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <AnalyticsChartCard />

      {/* Top Pages Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit mb-4">
          Top Performing Pages
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase">
                <th className="py-2.5 px-3">Page Path</th>
                <th className="py-2.5 px-3">Views</th>
                <th className="py-2.5 px-3">Bounce Rate</th>
                <th className="py-2.5 px-3">Avg Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {topPages.map((page, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-mono font-medium text-indigo-600 dark:text-indigo-400">{page.path}</td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{page.views}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{page.bounce}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{page.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

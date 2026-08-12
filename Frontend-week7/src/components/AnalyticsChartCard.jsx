import React, { useState } from 'react';
import { Calendar, Monitor, Smartphone, Tablet } from 'lucide-react';

export const AnalyticsChartCard = () => {
  const [timeframe, setTimeframe] = useState('thisWeek');

  const chartData = {
    thisWeek: [
      { day: 'Mon', hours: 38 },
      { day: 'Tue', hours: 45 },
      { day: 'Wed', hours: 52 },
      { day: 'Thu', hours: 40 },
      { day: 'Fri', hours: 60 },
      { day: 'Sat', hours: 25 },
      { day: 'Sun', hours: 15 },
    ],
    lastWeek: [
      { day: 'Mon', hours: 30 },
      { day: 'Tue', hours: 40 },
      { day: 'Wed', hours: 48 },
      { day: 'Thu', hours: 35 },
      { day: 'Fri', hours: 50 },
      { day: 'Sat', hours: 20 },
      { day: 'Sun', hours: 10 },
    ]
  };

  const currentData = chartData[timeframe] || chartData.thisWeek;
  const maxHours = 70;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Weekly Hours Tracked
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Team output across active projects
          </p>
        </div>

        <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
          <button
            onClick={() => setTimeframe('thisWeek')}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              timeframe === 'thisWeek'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe('lastWeek')}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              timeframe === 'lastWeek'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Last Week
          </button>
        </div>
      </div>

      {/* Chart Bars */}
      <div className="mt-6">
        <div className="flex items-end justify-between gap-3 h-44 px-2">
          {currentData.map((item, idx) => {
            const heightPercent = Math.round((item.hours / maxHours) * 100);
            return (
              <div key={idx} className="group flex-1 flex flex-col items-center h-full justify-end">
                <span className="text-[10px] font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  {item.hours}h
                </span>
                <div 
                  style={{ height: `${heightPercent}%` }}
                  className="w-full max-w-[32px] rounded-t bg-indigo-600 dark:bg-indigo-500 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-400 transition-all"
                />
                <span className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Device Breakdown */}
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-slate-400 text-[11px]">Desktop</p>
            <p className="font-semibold text-slate-900 dark:text-white">68%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-slate-400 text-[11px]">Mobile</p>
            <p className="font-semibold text-slate-900 dark:text-white">24%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tablet className="h-4 w-4 text-slate-400" />
          <div>
            <p className="text-slate-400 text-[11px]">Tablet</p>
            <p className="font-semibold text-slate-900 dark:text-white">8%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

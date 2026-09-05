import React from 'react';

export default function MetricsCard({ icon: Icon, label, value, accentColor }) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      ring: 'ring-blue-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      ring: 'ring-emerald-100',
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      ring: 'ring-indigo-100',
    },
  };

  const colors = colorMap[accentColor] || colorMap.blue;

  return (
    <div className="dash-card flex items-center gap-4 animate-slide-up">
      <div
        className={`p-3 ${colors.bg} ${colors.text} rounded-xl ring-1 ${colors.ring}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-2xl font-extrabold text-slate-800 mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { X, Mail, Briefcase, Building2, CalendarDays, ShieldCheck } from 'lucide-react';

export default function EmployeeModal({ employee, onClose }) {
  if (!employee) return null;

  const details = [
    { icon: Mail, label: 'Email', value: employee.email },
    { icon: Briefcase, label: 'Role', value: employee.role },
    { icon: Building2, label: 'Department', value: employee.department },
    {
      icon: CalendarDays,
      label: 'Joining Date',
      value: new Date(employee.joiningDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
    { icon: ShieldCheck, label: 'Status', value: employee.status },
  ];

  return (
    <div
      id="employee-modal-backdrop"
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pt-6 pb-10">
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/15 hover:bg-white/25
                       text-white transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold border border-white/30">
              {employee.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{employee.name}</h3>
              <p className="text-blue-100 text-sm">{employee.role}</p>
            </div>
          </div>
        </div>

        {/* Status Badge (overlapping header) */}
        <div className="px-6 -mt-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
              employee.status === 'Active'
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                employee.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
            {employee.status}
          </span>
        </div>

        {/* Detail Fields */}
        <div className="px-6 py-5 space-y-4">
          {details.map(({ icon: DetailIcon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-400 flex-shrink-0 mt-0.5">
                <DetailIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  {label}
                </p>
                <p className="text-sm text-slate-800 font-semibold mt-0.5">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
          <button
            id="close-modal-footer-btn"
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700
                       hover:from-blue-700 hover:to-blue-800
                       text-white rounded-xl text-sm font-semibold
                       shadow-md shadow-blue-600/20 hover:shadow-blue-700/25
                       transition-all duration-200 active:scale-[0.98]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

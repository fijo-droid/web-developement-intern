import React from 'react';
import { Eye } from 'lucide-react';

export default function EmployeeTable({ employees, onViewEmployee }) {
  if (employees.length === 0) {
    return (
      <div className="dash-card text-center py-16 animate-fade-in">
        <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <Eye className="w-7 h-7 text-slate-400" />
        </div>
        <p className="text-slate-500 font-medium">No employees found</p>
        <p className="text-sm text-slate-400 mt-1">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="dash-card overflow-hidden !p-0 animate-slide-up">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80">
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Employee
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Department
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Role
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Joined
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="table-row-hover"
                onClick={() => onViewEmployee(emp)}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {emp.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{emp.name}</p>
                      <p className="text-xs text-slate-400">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                    {emp.department}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600">{emp.role}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      emp.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                        : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        emp.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                    />
                    {emp.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-500 text-sm">
                  {new Date(emp.joiningDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    id={`view-employee-${emp.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewEmployee(emp);
                    }}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50
                               rounded-lg transition-all duration-200"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden divide-y divide-slate-100">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
            onClick={() => onViewEmployee(emp)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {emp.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{emp.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{emp.role}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                  emp.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    emp.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                  }`}
                />
                {emp.status}
              </span>
            </div>
            <div className="mt-2 ml-[52px] flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="bg-slate-100 px-2 py-0.5 rounded">{emp.department}</span>
              <span>•</span>
              <span>
                {new Date(emp.joiningDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

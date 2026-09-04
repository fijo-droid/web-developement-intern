import React, { useState, useEffect } from 'react';
import { 
  Shield, User, Lock, LogOut, LayoutDashboard, Search, Filter, 
  ChevronLeft, ChevronRight, Eye, Users, UserCheck, Briefcase 
} from 'lucide-react';
import { MOCK_EMPLOYEES } from './data/employees';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Dashboard States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const itemsPerPage = 5;

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDept]);

  const filteredEmployees = MOCK_EMPLOYEES.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      {!isAuthenticated ? (
        /* White Sign-In Box */
        <div className="w-full max-w-md relative">
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10">
            <div className="icon-badge w-14 h-14 rounded-2xl flex items-center justify-center text-white border-2 border-white">
              <Shield className="w-7 h-7" />
            </div>
          </div>

          <div className="auth-box rounded-2xl pt-12 pb-8 px-8 relative">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Employee Management<br />Dashboard
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Welcome Back! Sign in to continue
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Username or Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>

              <button type="submit" className="auth-btn-primary uppercase mt-2">
                Sign In
              </button>
            </form>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mt-6 font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">Forgot Password?</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Sign Up</a>
          </div>
        </div>
      ) : (
        /* White Dashboard View */
        <div className="w-full max-w-6xl bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-xl overflow-hidden my-6">
          <header className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-lg text-slate-800">Employee Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500">{email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 border border-slate-300 rounded-lg text-xs font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </header>

          <main className="p-6 space-y-6 bg-slate-50">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total Employees</p>
                  <p className="text-xl font-bold text-slate-800">{MOCK_EMPLOYEES.length}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Active Status</p>
                  <p className="text-xl font-bold text-slate-800">
                    {MOCK_EMPLOYEES.filter(e => e.status === 'Active').length}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Departments</p>
                  <p className="text-xl font-bold text-slate-800">5</p>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Security">Security</option>
                </select>
              </div>
            </div>

            {/* Employee Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginatedEmployees.length > 0 ? (
                    paginatedEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium text-slate-900">
                          {emp.name}
                          <div className="text-xs text-slate-400">{emp.email}</div>
                        </td>
                        <td className="p-4">{emp.department}</td>
                        <td className="p-4">{emp.role}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              emp.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {emp.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedEmployee(emp)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">
                        No employees match the search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Showing {paginatedEmployees.length} of {filteredEmployees.length} results</span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 bg-white border border-slate-300 rounded-lg disabled:opacity-40 hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 bg-white border border-slate-300 rounded-lg disabled:opacity-40 hover:bg-slate-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </main>

          {/* Modal for Employee Details */}
          {selectedEmployee && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Employee Details</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><strong className="text-slate-800">Name:</strong> {selectedEmployee.name}</p>
                  <p><strong className="text-slate-800">Email:</strong> {selectedEmployee.email}</p>
                  <p><strong className="text-slate-800">Department:</strong> {selectedEmployee.department}</p>
                  <p><strong className="text-slate-800">Role:</strong> {selectedEmployee.role}</p>
                  <p><strong className="text-slate-800">Joining Date:</strong> {selectedEmployee.joinDate}</p>
                  <p><strong className="text-slate-800">Status:</strong> {selectedEmployee.status}</p>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => setSelectedEmployee(null)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
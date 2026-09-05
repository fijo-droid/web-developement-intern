import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  User,
  Lock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  UserCheck,
  Briefcase,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { MOCK_EMPLOYEES } from './data/employees';
import Navbar from './components/Navbar';
import MetricsCard from './components/MetricsCard';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';

/* ─── Constants ─── */
const ITEMS_PER_PAGE = 5;
const DEPARTMENTS = ['All', ...new Set(MOCK_EMPLOYEES.map((e) => e.department))];

export default function App() {
  /* ─── Auth State ─── */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* ─── Dashboard State ─── */
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [sortOrder, setSortOrder] = useState('none'); // 'none' | 'asc' | 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  /* ─── Auth Handlers ─── */
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
    setSearchTerm('');
    setSelectedDept('All');
    setSortOrder('none');
    setCurrentPage(1);
    setSelectedEmployee(null);
  };

  /* ─── Reset page when filters change ─── */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDept]);

  /* ─── Filtered + Sorted Employees ─── */
  const processedEmployees = useMemo(() => {
    let result = MOCK_EMPLOYEES.filter((emp) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        emp.name.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term);

      const matchesDept =
        selectedDept === 'All' || emp.department === selectedDept;

      return matchesSearch && matchesDept;
    });

    if (sortOrder === 'asc') {
      result = [...result].sort(
        (a, b) => new Date(a.joiningDate) - new Date(b.joiningDate)
      );
    } else if (sortOrder === 'desc') {
      result = [...result].sort(
        (a, b) => new Date(b.joiningDate) - new Date(a.joiningDate)
      );
    }

    return result;
  }, [searchTerm, selectedDept, sortOrder]);

  /* ─── Pagination ─── */
  const totalPages = Math.ceil(processedEmployees.length / ITEMS_PER_PAGE) || 1;
  const paginatedEmployees = processedEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ─── Metrics ─── */
  const totalEmployees = MOCK_EMPLOYEES.length;
  const activeEmployees = MOCK_EMPLOYEES.filter(
    (e) => e.status === 'Active'
  ).length;
  const totalDepartments = new Set(MOCK_EMPLOYEES.map((e) => e.department)).size;

  /* ─── Sort Toggle ─── */
  const cycleSortOrder = () => {
    setSortOrder((prev) => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
  };

  const SortIcon =
    sortOrder === 'asc' ? ArrowUp : sortOrder === 'desc' ? ArrowDown : ArrowUpDown;

  /* ─── Render: Login ─── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md relative animate-fade-in">
          {/* Floating Icon Badge */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10">
            <div className="icon-badge w-14 h-14 rounded-2xl flex items-center justify-center text-white border-2 border-white shadow-lg">
              <Shield className="w-7 h-7" />
            </div>
          </div>

          {/* Auth Card */}
          <div className="auth-card rounded-2xl pt-12 pb-8 px-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Employee Management
                <br />
                <span className="text-blue-600">Dashboard</span>
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-2">
                Welcome back! Sign in to continue
              </p>
            </div>

            <form id="login-form" onSubmit={handleSignIn} className="space-y-4">
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  id="email-input"
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
                  id="password-input"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>

              <button id="sign-in-btn" type="submit" className="auth-btn mt-2">
                Sign In
              </button>
            </form>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mt-6 font-medium">
            <a
              href="#"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Forgot Password?
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="#"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Render: Dashboard ─── */
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <Navbar email={email} onSignOut={handleSignOut} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* ─── Metrics Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricsCard
            icon={Users}
            label="Total Employees"
            value={totalEmployees}
            accentColor="blue"
          />
          <MetricsCard
            icon={UserCheck}
            label="Active Employees"
            value={activeEmployees}
            accentColor="emerald"
          />
          <MetricsCard
            icon={Briefcase}
            label="Departments"
            value={totalDepartments}
            accentColor="indigo"
          />
        </div>

        {/* ─── Controls Row ─── */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              id="search-input"
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5
                         text-sm text-slate-800 placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                         transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Department Filter */}
            <div className="relative flex-1 sm:flex-initial">
              <Filter className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
              <select
                id="department-filter"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full sm:w-auto bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2.5
                           text-sm text-slate-800 appearance-none cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                           transition-all duration-200"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'All' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by Joining Date */}
            <button
              id="sort-date-btn"
              onClick={cycleSortOrder}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium
                         transition-all duration-200 whitespace-nowrap ${
                           sortOrder !== 'none'
                             ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                             : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                         }`}
              title={
                sortOrder === 'none'
                  ? 'Sort by Joining Date'
                  : sortOrder === 'asc'
                  ? 'Sorted: Oldest First'
                  : 'Sorted: Newest First'
              }
            >
              <SortIcon className="w-4 h-4" />
              <span className="hidden sm:inline">
                {sortOrder === 'none'
                  ? 'Sort Date'
                  : sortOrder === 'asc'
                  ? 'Oldest First'
                  : 'Newest First'}
              </span>
            </button>
          </div>
        </div>

        {/* ─── Employee Table ─── */}
        <EmployeeTable
          employees={paginatedEmployees}
          onViewEmployee={setSelectedEmployee}
        />

        {/* ─── Pagination ─── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-slate-500">
          <span>
            Showing{' '}
            <span className="font-semibold text-slate-700">
              {paginatedEmployees.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-slate-700">
              {processedEmployees.length}
            </span>{' '}
            results
          </span>

          <div className="flex items-center gap-2">
            <button
              id="prev-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2.5 bg-white border border-slate-200 rounded-xl
                         disabled:opacity-40 disabled:cursor-not-allowed
                         hover:bg-slate-50 hover:border-slate-300
                         transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page number buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              id="next-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2.5 bg-white border border-slate-200 rounded-xl
                         disabled:opacity-40 disabled:cursor-not-allowed
                         hover:bg-slate-50 hover:border-slate-300
                         transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* ─── Employee Detail Modal ─── */}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
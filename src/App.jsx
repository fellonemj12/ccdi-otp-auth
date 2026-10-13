import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  UserCheck, 
  BookOpen, 
  FileText,
  LogOut,
  Clock,
  User,
  LayoutDashboard,
  Calendar,
  CreditCard,
  Award,
  Bell,
  ChevronRight,
  Sparkles,
  Download,
  CheckCircle,
  FileCheck,
  PlusCircle,
  Upload,
  Edit2,
  Trash2,
  Users,
  Save,
  X
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('login'); // 'login' | 'otp' | 'dashboard'
  const [role, setRole] = useState('student'); // 'student' | 'faculty'
  const [identifier, setIdentifier] = useState('marcus.belgado@ccdi.edu.ph');
  const [password, setPassword] = useState('••••••••');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successToast, setSuccessToast] = useState('');
  
  // Active Navigation Module
  const [activeModule, setActiveModule] = useState('overview'); 

  // Helper function to resolve target email for OTP dispatch
  const getDisplayEmail = () => {
    if (identifier.includes('@')) {
      return identifier;
    }
    // If user enters an ID number, convert it to their official institutional email
    if (role === 'student') {
      return 'marcus.belgado@ccdi.edu.ph';
    }
    return 'leah.detera@ccdi.edu.ph';
  };

  // Official BSIT Student Grades List
  const [studentGrades, setStudentGrades] = useState([
    { id: '2026-00123', name: 'Marcus Josei Belgado', course: 'BSIT', code: 'IT 311', subject: 'Web Systems & Technologies', midterm: '1.25', finalGrade: '1.20', status: 'PASSED' },
    { id: '2026-00123', name: 'Marcus Josei Belgado', course: 'BSIT', code: 'IT 312', subject: 'Information Assurance and Security', midterm: '1.50', finalGrade: '1.25', status: 'PASSED' },
    { id: '2026-00123', name: 'Marcus Josei Belgado', course: 'BSIT', code: 'IT 313', subject: 'System Integration Architecture', midterm: '1.25', finalGrade: '1.25', status: 'PASSED' },
    { id: '2026-00123', name: 'Marcus Josei Belgado', course: 'BSIT', code: 'IT 314', subject: 'Application Development', midterm: '1.25', finalGrade: '1.10', status: 'PASSED' },
    { id: '2026-00123', name: 'Marcus Josei Belgado', course: 'BSIT', code: 'ACT 101', subject: 'Fundamentals of Accounting', midterm: '1.75', finalGrade: '1.50', status: 'PASSED' },
    { id: '2026-00123', name: 'Marcus Josei Belgado', course: 'BSIT', code: 'IT 315', subject: 'Integrative Programming Technologies', midterm: '1.25', finalGrade: '1.20', status: 'PASSED' },

    // Other Students
    { id: '2026-00124', name: 'Daniel Noel Gonzales', course: 'BSIT', code: 'IT 311', subject: 'Web Systems & Technologies', midterm: '1.50', finalGrade: '1.25', status: 'PASSED' },
    { id: '2026-00125', name: 'Julie Mae Dionela', course: 'BSIT', code: 'IT 311', subject: 'Web Systems & Technologies', midterm: '1.25', finalGrade: '1.25', status: 'PASSED' },
    { id: '2026-00126', name: 'Kim Acebuche', course: 'BSIT', code: 'IT 312', subject: 'Information Assurance and Security', midterm: '1.75', finalGrade: '1.50', status: 'PASSED' },
    { id: '2026-00127', name: 'Mark Laurence Mendoza', course: 'BSIT', code: 'IT 312', subject: 'Information Assurance and Security', midterm: '1.50', finalGrade: '1.25', status: 'PASSED' }
  ]);

  // Inline Editing State
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ midterm: '', finalGrade: '' });

  // Document Requests State
  const [documentRequests, setDocumentRequests] = useState([
    { reqId: 'REQ-101', studentId: '2026-00123', name: 'Marcus Josei Belgado', document: 'Transcript of Records (TOR)', date: 'Oct 12, 2026', status: 'Pending' },
    { reqId: 'REQ-102', studentId: '2026-00124', name: 'Daniel Noel Gonzales', document: 'Certificate of Good Moral', date: 'Oct 13, 2026', status: 'Pending' }
  ]);

  // Form state for adding new student grade
  const [newGrade, setNewGrade] = useState({ id: '', name: '', code: 'IT 311', midterm: '', finalGrade: '' });

  // OTP Countdown Timer
  useEffect(() => {
    let interval;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleRoleSwitch = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'faculty') {
      setIdentifier('leah.detera@ccdi.edu.ph');
    } else {
      setIdentifier('marcus.belgado@ccdi.edu.ph');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!identifier || !password) {
      setErrorMessage('Please enter your ID or Email and Password.');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setTimer(60);
      setSuccessToast(`A 6-digit OTP code has been sent to ${getDisplayEmail()}!`);
      setTimeout(() => setSuccessToast(''), 4000);
    }, 1000);
  };

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setErrorMessage('Please enter the complete 6-digit OTP code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      setStep('dashboard');
      setActiveModule('overview');
    }, 1200);
  };

  const handleLogout = () => {
    setStep('login');
    setOtp(['', '', '', '', '', '']);
    setErrorMessage('');
    setActiveModule('overview');
  };

  const triggerToast = (message) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handleAddGrade = (e) => {
    e.preventDefault();
    if (!newGrade.id || !newGrade.name || !newGrade.finalGrade) {
      alert('Please fill out all required grade fields.');
      return;
    }
    
    const subjectMap = {
      'IT 311': 'Web Systems & Technologies',
      'IT 312': 'Information Assurance and Security',
      'IT 313': 'System Integration Architecture',
      'IT 314': 'Application Development',
      'ACT 101': 'Fundamentals of Accounting',
      'IT 315': 'Integrative Programming Technologies'
    };

    const entry = {
      ...newGrade,
      course: 'BSIT',
      subject: subjectMap[newGrade.code] || 'BSIT Elective Subject',
      status: parseFloat(newGrade.finalGrade) <= 3.0 ? 'PASSED' : 'FAILED'
    };

    setStudentGrades([...studentGrades, entry]);
    setNewGrade({ id: '', name: '', code: 'IT 311', midterm: '', finalGrade: '' });
    triggerToast('New student grade record added successfully!');
  };

  const handleStartEdit = (item) => {
    setEditingId(`${item.id}-${item.code}`);
    setEditFormData({ midterm: item.midterm, finalGrade: item.finalGrade });
  };

  const handleSaveEdit = (studentId, courseCode) => {
    setStudentGrades(studentGrades.map(item => {
      if (item.id === studentId && item.code === courseCode) {
        const finalVal = parseFloat(editFormData.finalGrade);
        return {
          ...item,
          midterm: editFormData.midterm,
          finalGrade: editFormData.finalGrade,
          status: finalVal <= 3.0 ? 'PASSED' : 'FAILED'
        };
      }
      return item;
    }));
    setEditingId(null);
    triggerToast(`Grades updated for ${courseCode}!`);
  };

  const handleDeleteGrade = (studentId, courseCode) => {
    if (window.confirm(`Are you sure you want to delete record for ${courseCode}?`)) {
      setStudentGrades(studentGrades.filter(g => !(g.id === studentId && g.code === courseCode)));
      triggerToast('Grade record deleted.');
    }
  };

  const handleApproveDocument = (reqId) => {
    setDocumentRequests(documentRequests.map(doc => doc.reqId === reqId ? { ...doc, status: 'Approved & Signed' } : doc));
    triggerToast(`Document Request ${reqId} approved and signed.`);
  };

  const CCDILogo = ({ className = "w-10 h-10" }) => (
    <img 
      src="https://scontent.fmnl46-1.fna.fbcdn.net/v/t39.30808-6/505561685_24051788911083923_6535667147125985236_n.jpg?stp=dst-jpg_tt6&cstp=mx1398x1575&ctp=s1398x1575&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHm9Rub2lKgfpOSzsGP6zbLGQijDfimVa4ZCKMN-KZVrhVrVNIVS6ceB3pOoF3zmOZsnIPTvvfGbWSDqmpf0-pe&_nc_ohc=4mVTZqfoBPQQ7kNvwG_nfZY&_nc_oc=Adp9hwvqylEyG4UYrCWI8X7Ki3-T9vIfAEuWHIIpFVtUJHItWIsYf8_rGk3gXYpHTtk&_nc_zt=23&_nc_ht=scontent.fmnl46-1.fna&_nc_gid=rYGiiItv-qrki1sjRq7CKw&_nc_ss=7b2a8&oh=00_AQMrqFBpVx8EzAEsXmGTF-5jmE26iBx6Qr7rsNPCVncyVg&oe=6AD419FA" 
      alt="CCDI Sorsogon Logo" 
      className={`object-contain rounded-lg ${className}`}
    />
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-start p-4 relative overflow-x-hidden font-sans">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 z-50 bg-white px-6 py-3 rounded-2xl border border-blue-600 flex items-center space-x-3 shadow-xl animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-slate-800">{successToast}</span>
        </div>
      )}

      {/* BRANDING HEADER (For Login and OTP steps) */}
      {step !== 'dashboard' && (
        <div className="text-center my-8 z-10">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-2xl mb-3 shadow-md border border-slate-200">
            <CCDILogo className="w-14 h-14" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            CCDI Sorsogon
          </h1>
          <p className="text-xs font-semibold text-blue-700 mt-1 tracking-widest uppercase">
            Computer Communication Development Institute
          </p>
        </div>
      )}

      {/* STEP 1: LOGIN FORM */}
      {step === 'login' && (
        <div className="w-full max-w-md bg-white rounded-3xl p-8 z-10 border border-slate-200 shadow-2xl">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-slate-900">Web Services Portal</h2>
            <p className="text-xs text-slate-500 mt-1">Sign in with Two-Factor OTP Authentication</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Role Switcher */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleRoleSwitch('student')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 ${
                  role === 'student' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Student Portal</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('faculty')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 ${
                  role === 'faculty' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Faculty / Staff</span>
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-2 text-red-600 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                {role === 'student' ? 'Student ID or Email' : 'Faculty / Staff Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={role === 'student' ? 'marcus.belgado@ccdi.edu.ph' : 'leah.detera@ccdi.edu.ph'}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-red-600 text-white font-semibold text-sm shadow-md hover:bg-red-700 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In & Get OTP Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* STEP 2: OTP VERIFICATION */}
      {step === 'otp' && (
        <div className="w-full max-w-md bg-white rounded-3xl p-8 z-10 border border-slate-200 shadow-2xl text-center">
          <div className="inline-flex p-4 rounded-full bg-blue-50 border border-blue-200 mb-3">
            <KeyRound className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">Enter OTP Passcode</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Authenticator security code sent to <strong className="text-blue-700">{getDisplayEmail()}</strong>.
          </p>

          {errorMessage && (
            <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-2 text-red-600 text-xs text-left">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                  className="w-11 h-12 text-center text-lg font-bold rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              ))}
            </div>

            <div className="text-xs text-slate-500">
              {timer > 0 ? (
                <span>Resend code in <strong className="text-red-600">{timer}s</strong></span>
              ) : (
                <button 
                  type="button" 
                  onClick={() => { setTimer(60); triggerToast('New OTP code sent!'); }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Resend OTP Code
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleLogout}
                className="w-1/3 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all border border-slate-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 py-3 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-md hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Verify & Enter Portal</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: MAIN DASHBOARD PORTAL */}
      {step === 'dashboard' && (
        <div className="w-full max-w-6xl z-10 space-y-6 my-4">
          
          {/* Header Navigation */}
          <header className="bg-white rounded-2xl p-4 flex flex-wrap items-center justify-between border border-slate-200 shadow-md gap-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveModule('overview')}>
              <div className="p-1 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                <CCDILogo className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900">
                  {role === 'faculty' ? 'CCDI Faculty Management Portal' : 'CCDI Student Services Portal'}
                </h1>
                <p className="text-xs text-blue-600 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Authenticated Role: <span className="uppercase font-bold">{role}</span>
                </p>
              </div>
            </div>

            {/* Navigation Pills */}
            <div className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button 
                onClick={() => setActiveModule('overview')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeModule === 'overview' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveModule('enrollment')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeModule === 'enrollment' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {role === 'faculty' ? 'Manage Enrollment' : 'Enrollment'}
              </button>
              <button 
                onClick={() => setActiveModule('grades')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeModule === 'grades' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {role === 'faculty' ? 'Grade Management' : 'Grades'}
              </button>
              <button 
                onClick={() => setActiveModule('schedule')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeModule === 'schedule' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {role === 'faculty' ? 'Manage Schedules' : 'Schedule'}
              </button>
              <button 
                onClick={() => setActiveModule('documents')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeModule === 'documents' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {role === 'faculty' ? 'Process Requests' : 'Documents'}
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">
                  {role === 'faculty' ? "Ma'am Leah Santa M. Detera, MIT" : 'Marcus Josei F. Belgado'}
                </p>
                <p className="text-[10px] text-slate-500">
                  {role === 'faculty' ? 'BSIT Department Instructor' : 'BSIT - 3rd Year Student'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </header>

          {/* FACULTY PORTAL DASHBOARD VIEW */}
          {role === 'faculty' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Assigned Classes</span>
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-900 mt-2">6 Active Subjects</p>
                  <p className="text-[11px] text-slate-500 mt-1">1st Semester 2026-2027</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Total Enrolled Students</span>
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-900 mt-2">128 Students</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">BSIT Department</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Pending Document Approvals</span>
                    <FileText className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-lg font-bold text-amber-600 mt-2">{documentRequests.filter(d => d.status === 'Pending').length} Pending Requests</p>
                  <p className="text-[11px] text-slate-500 mt-1">Requires Digital Signature</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Grade Encoding Status</span>
                    <Upload className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-blue-600 mt-2">Encoding Open</p>
                  <p className="text-[11px] text-slate-500 mt-1">Midterm & Final Submissions</p>
                </div>
              </div>

              {/* FACULTY GRADE MANAGEMENT MODULE */}
              {activeModule === 'grades' || activeModule === 'overview' ? (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        Faculty Grade Entry & Encoding Management
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">Input, edit, and update midterm/final grades for BSIT students.</p>
                    </div>
                  </div>

                  {/* Add New Grade Form */}
                  <form onSubmit={handleAddGrade} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <PlusCircle className="w-4 h-4 text-blue-600" /> Encode New Student Grade
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                      <input
                        type="text"
                        placeholder="Student ID (e.g., 2026-00128)"
                        value={newGrade.id}
                        onChange={(e) => setNewGrade({ ...newGrade, id: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                      <input
                        type="text"
                        placeholder="Student Name"
                        value={newGrade.name}
                        onChange={(e) => setNewGrade({ ...newGrade, name: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                      <select
                        value={newGrade.code}
                        onChange={(e) => setNewGrade({ ...newGrade, code: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none"
                      >
                        <option value="IT 311">IT 311 - Web Systems</option>
                        <option value="IT 312">IT 312 - Info Assurance</option>
                        <option value="IT 313">IT 313 - System Integration</option>
                        <option value="IT 314">IT 314 - App Development</option>
                        <option value="ACT 101">ACT 101 - Accounting</option>
                        <option value="IT 315">IT 315 - Integrative Prog</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Midterm Grade (e.g., 1.25)"
                        value={newGrade.midterm}
                        onChange={(e) => setNewGrade({ ...newGrade, midterm: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                      <input
                        type="text"
                        placeholder="Final Grade (e.g., 1.20)"
                        value={newGrade.finalGrade}
                        onChange={(e) => setNewGrade({ ...newGrade, finalGrade: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shadow-sm">
                      <Save className="w-4 h-4" />
                      <span>Save Grade Entry</span>
                    </button>
                  </form>

                  {/* Student Grades Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-2">Student ID</th>
                          <th className="py-3 px-2">Student Name</th>
                          <th className="py-3 px-2">Subject Code & Name</th>
                          <th className="py-3 px-2">Midterm</th>
                          <th className="py-3 px-2">Final Grade</th>
                          <th className="py-3 px-2">Status</th>
                          <th className="py-3 px-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {studentGrades.map((item, idx) => {
                          const itemKey = `${item.id}-${item.code}`;
                          return (
                            <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-2 font-mono font-bold text-blue-600">{item.id}</td>
                              <td className="py-3 px-2 font-semibold text-slate-900">{item.name}</td>
                              <td className="py-3 px-2 text-slate-600">
                                <span className="font-bold text-slate-800">{item.code}</span> - {item.subject}
                              </td>
                              
                              <td className="py-3 px-2 font-bold text-blue-600">
                                {editingId === itemKey ? (
                                  <input
                                    type="text"
                                    value={editFormData.midterm}
                                    onChange={(e) => setEditFormData({ ...editFormData, midterm: e.target.value })}
                                    className="w-16 px-2 py-1 rounded border border-blue-400 bg-white text-xs font-bold"
                                  />
                                ) : (
                                  item.midterm
                                )}
                              </td>

                              <td className="py-3 px-2 font-bold text-emerald-600">
                                {editingId === itemKey ? (
                                  <input
                                    type="text"
                                    value={editFormData.finalGrade}
                                    onChange={(e) => setEditFormData({ ...editFormData, finalGrade: e.target.value })}
                                    className="w-16 px-2 py-1 rounded border border-blue-400 bg-white text-xs font-bold"
                                  />
                                ) : (
                                  item.finalGrade
                                )}
                              </td>

                              <td className="py-3 px-2">
                                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                  {item.status}
                                </span>
                              </td>

                              <td className="py-3 px-2 text-right space-x-1">
                                {editingId === itemKey ? (
                                  <div className="inline-flex space-x-1">
                                    <button
                                      onClick={() => handleSaveEdit(item.id, item.code)}
                                      className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                                      title="Save Updates"
                                    >
                                      <Save className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => setEditingId(null)}
                                      className="p-1 rounded bg-slate-300 text-slate-700 hover:bg-slate-400"
                                      title="Cancel"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="inline-flex space-x-1">
                                    <button
                                      onClick={() => handleStartEdit(item)}
                                      className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                                      title="Edit Grades"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteGrade(item.id, item.code)}
                                      className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                      title="Delete Record"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {/* FACULTY DOCUMENT REQUEST APPROVALS */}
              {activeModule === 'documents' && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Process & Sign Student Document Requests
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-2">Request ID</th>
                          <th className="py-3 px-2">Student Name</th>
                          <th className="py-3 px-2">Requested Document</th>
                          <th className="py-3 px-2">Date Submitted</th>
                          <th className="py-3 px-2">Status</th>
                          <th className="py-3 px-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {documentRequests.map((req, index) => (
                          <tr key={index}>
                            <td className="py-3 px-2 font-mono font-bold text-blue-600">{req.reqId}</td>
                            <td className="py-3 px-2 font-semibold text-slate-900">{req.name} ({req.studentId})</td>
                            <td className="py-3 px-2 text-slate-600">{req.document}</td>
                            <td className="py-3 px-2 text-slate-500">{req.date}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                req.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {req.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right">
                              {req.status === 'Pending' ? (
                                <button 
                                  onClick={() => handleApproveDocument(req.reqId)}
                                  className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 cursor-pointer shadow-sm"
                                >
                                  Approve & Digital Sign
                                </button>
                              ) : (
                                <span className="text-emerald-600 font-bold text-xs">Approved ✓</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STUDENT PORTAL VIEW */}
          {role === 'student' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Academic Status</span>
                    <Sparkles className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-blue-600 mt-2">Officially Enrolled</p>
                  <p className="text-[11px] text-slate-500 mt-1">1st Semester, A.Y. 2026-2027</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">GWA / Grade Average</span>
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-900 mt-2">1.25 (Dean's List)</p>
                  <p className="text-[11px] text-slate-500 mt-1">21 Total Units Completed</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Tuition Balance</span>
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-blue-700 mt-2">₱ 0.00 (Fully Paid)</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">Cleared for Final Exams</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">2FA Security</span>
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-blue-600 mt-2">Active & Protected</p>
                  <p className="text-[11px] text-slate-500 mt-1">Last OTP Check: Active Now</p>
                </div>
              </div>

              {/* STUDENT GRADES VIEW */}
              {activeModule === 'grades' || activeModule === 'overview' ? (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                  <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-4">My Official Report of Grades</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                          <th className="py-3 px-2">Code</th>
                          <th className="py-3 px-2">Course Title</th>
                          <th className="py-3 px-2">Midterm</th>
                          <th className="py-3 px-2">Final Grade</th>
                          <th className="py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {studentGrades.filter(g => g.id === '2026-00123').map((g, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-2 font-mono font-bold text-blue-600">{g.code}</td>
                            <td className="py-3 px-2 font-semibold text-slate-900">{g.subject}</td>
                            <td className="py-3 px-2 font-bold text-blue-600">{g.midterm}</td>
                            <td className="py-3 px-2 font-bold text-emerald-600">{g.finalGrade}</td>
                            <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">{g.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          )}

        </div>
      )}

      {/* Footer */}
      <footer className="my-6 text-center text-xs text-slate-500 z-10">
        <p>&copy; {new Date().getFullYear()} Computer Communication Development Institute (CCDI) Sorsogon.</p>
      </footer>
    </div>
  );
}
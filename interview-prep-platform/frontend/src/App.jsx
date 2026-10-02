import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import PurchaseTicker from './components/PurchaseTicker';
import AIAssistantWidget from './components/AIAssistantWidget';
import ContactDetailsModal from './components/ContactDetailsModal';
import AllAccessModal from './components/AllAccessModal';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import NoteDetails from './pages/NoteDetails';
import Companies from './pages/Companies';
import CompanyDetails from './pages/CompanyDetails';
import FreeResources from './pages/FreeResources';
import ResumeChecker from './pages/ResumeChecker';
import CertificatePage from './pages/CertificatePage';
import Dashboard from './pages/Dashboard';
import MyPurchases from './pages/MyPurchases';
import AdminDashboard from './pages/AdminDashboard';
import AdminNotes from './pages/AdminNotes';
import AdminCompanies from './pages/AdminCompanies';
import AdminUpload from './pages/AdminUpload';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<NoteDetails />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetails />} />
            <Route path="/free-resources" element={<FreeResources />} />
            <Route path="/resume-checker" element={<ResumeChecker />} />
            <Route path="/certificate" element={<CertificatePage />} />

            {/* Protected User Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-purchases"
              element={
                <ProtectedRoute>
                  <MyPurchases />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notes"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminNotes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/companies"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminCompanies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/upload"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminUpload />
                </ProtectedRoute>
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toast />

        {/* Global Social Proof Ticker, All-Access Pass Modal & AI Assistant Floating Widget */}
        <PurchaseTicker />
        <AIAssistantWidget />
        <ContactDetailsModal />
        <AllAccessModal />
      </div>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

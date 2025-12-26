import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Team from './components/Team';
import Auth from './components/Auth';
import Documentation from './components/Documentation';
import { ViewState } from './types';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewState>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check auth on mount
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleNavigate = (newView: ViewState) => {
    // Protect dashboard route
    if (newView === 'dashboard' && !isAuthenticated) {
      setView('auth');
      return;
    }
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setView('landing');
  };

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-body selection:bg-gr selection:text-white">
      <Navbar 
        currentView={view} 
        onNavigate={handleNavigate} 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      
      <main className="relative">
        {view === 'landing' && <Landing onNavigate={handleNavigate} />}
        {view === 'dashboard' && <Dashboard />}
        {view === 'team' && <Team />}
        {view === 'auth' && <Auth onLoginSuccess={handleLoginSuccess} />}
        {view === 'docs' && <Documentation />}
      </main>
    </div>
  );
};

export default App;
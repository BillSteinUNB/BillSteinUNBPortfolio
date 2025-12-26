import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Loader from './components/Loader';
import Hero from './views/Hero';
import NeuralNet from './views/NeuralNet';
import Dashboard from './views/Dashboard';
import Logs from './views/Logs';
import Protocol from './views/Protocol';
import { View, ThemeMode } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>(View.HERO);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    // Add class to body for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Colors based on theme for 3D elements
  const themeColors = {
    primary: theme === 'dark' ? '#00f3ff' : '#0ea5e9',
    secondary: theme === 'dark' ? '#ff4d00' : '#f97316'
  };

  const renderView = () => {
    switch (view) {
      case View.HERO:
        return <Hero themeColor={themeColors.primary} secondaryColor={themeColors.secondary} onCta={() => setView(View.DASHBOARD)} />;
      case View.NEURAL_NET:
        return <NeuralNet themeColor={themeColors.primary} secondaryColor={themeColors.secondary} />;
      case View.DASHBOARD:
        return <Dashboard />;
      case View.LOGS:
        return <Logs />;
      case View.PROTOCOL:
        return <Protocol />;
      default:
        return <Hero themeColor={themeColors.primary} secondaryColor={themeColors.secondary} onCta={() => setView(View.DASHBOARD)} />;
    }
  };

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <Layout 
          currentView={view} 
          onNavigate={setView}
          theme={theme}
          toggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        >
          {renderView()}
        </Layout>
      )}
    </>
  );
};

export default App;

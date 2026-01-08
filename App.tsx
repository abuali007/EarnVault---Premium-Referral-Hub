import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TradingPage from './pages/TradingPage';
import AiToolsPage from './pages/AiToolsPage';
import SavingsPage from './pages/SavingsPage';
import AboutPage from './pages/AboutPage';
import SeoGuidePage from './pages/SeoGuidePage';
import { COUNTER_NAMESPACE, API_BASE_URL } from './constants';

// Analytics Keys
const COUNTER_KEY_VISITS = "global_visits";
const COUNTER_KEY_CLICKS = "global_clicks";

const App: React.FC = () => {
  // --- ANALYTICS STATE (Kept for Footer Stats) ---
  const [globalVisits, setGlobalVisits] = useState<number | null>(null);
  const [globalClicks, setGlobalClicks] = useState<number | null>(null);

  // --- GLOBAL CLOUD ANALYTICS LOGIC ---
  useEffect(() => {
    // 1. HIT VISIT
    const registerVisit = async () => {
        try {
           const res = await fetch(`${API_BASE_URL}/${COUNTER_NAMESPACE}/${COUNTER_KEY_VISITS}/up`);
           if (res.ok) {
             const data = await res.json();
             setGlobalVisits(data.count);
             localStorage.setItem('ev_backup_visits', data.count.toString());
           }
        } catch (e) {
           const backup = localStorage.getItem('ev_backup_visits');
           if (backup) setGlobalVisits(parseInt(backup, 10));
           else setGlobalVisits(1);
        }
    };

    // 2. GET CLICKS
    const fetchClicks = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/${COUNTER_NAMESPACE}/${COUNTER_KEY_CLICKS}`);
            if (res.ok) {
                const data = await res.json();
                setGlobalClicks(data.count || 0);
                localStorage.setItem('ev_backup_clicks', (data.count || 0).toString());
            }
        } catch (e) {
            const backup = localStorage.getItem('ev_backup_clicks');
            if (backup) setGlobalClicks(parseInt(backup, 10));
        }
    };

    registerVisit();
    fetchClicks();

    // Background Refresh
    const interval = setInterval(() => {
        fetch(`${API_BASE_URL}/${COUNTER_NAMESPACE}/${COUNTER_KEY_VISITS}`)
            .then(res => res.ok ? res.json() : null)
            .then(d => { if(d) setGlobalVisits(d.count); })
            .catch(() => {}); 

        fetch(`${API_BASE_URL}/${COUNTER_NAMESPACE}/${COUNTER_KEY_CLICKS}`)
            .then(res => res.ok ? res.json() : null)
            .then(d => { if(d) setGlobalClicks(d.count); })
            .catch(() => {}); 
    }, 20000); 

    return () => clearInterval(interval);
  }, []); 

  const incrementGlobalClicks = () => {
    setGlobalClicks(prev => (prev || 0) + 1);
    fetch(`${API_BASE_URL}/${COUNTER_NAMESPACE}/${COUNTER_KEY_CLICKS}/up`).catch(() => {});
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage onGlobalClickIncrement={incrementGlobalClicks} />} />
        <Route path="/trading" element={<TradingPage onGlobalClickIncrement={incrementGlobalClicks} />} />
        <Route path="/ai-tools" element={<AiToolsPage onGlobalClickIncrement={incrementGlobalClicks} />} />
        <Route path="/savings" element={<SavingsPage onGlobalClickIncrement={incrementGlobalClicks} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guides/seo" element={<SeoGuidePage />} />
      </Routes>
    </Layout>
  );
};

export default App;
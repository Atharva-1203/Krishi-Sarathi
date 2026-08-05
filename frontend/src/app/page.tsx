"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundEffects from '@/components/BackgroundEffects';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LandingPage from '@/components/LandingPage';
import PredictionDashboard from '@/components/PredictionDashboard';
import InsightsPage from '@/components/InsightsPage';
import AnalyticsPage from '@/components/AnalyticsPage';

export default function Home() {
  const [tab, setTab] = useState('landing');

  return (
    <div className="relative min-h-screen flex flex-col font-sans transition-colors duration-500 overflow-x-hidden">
      {/* Soft ambient backgrounds */}
      <BackgroundEffects />

      {/* Main Header */}
      <Header currentTab={tab} setTab={setTab} />

      <div className="flex flex-1">
        {/* Responsive left sidebar */}
        <Sidebar currentTab={tab} setTab={setTab} />

        {/* Main content body view */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {tab === 'landing' && <LandingPage setTab={setTab} />}
              {tab === 'dashboard' && <PredictionDashboard />}
              {tab === 'insights' && <InsightsPage />}
              {tab === 'analytics' && <AnalyticsPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

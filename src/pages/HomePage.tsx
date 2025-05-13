import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import logo from '../assets/logo.svg';

export default function HomePage() {
  const navigate = useNavigate();
  
  return (
    <Layout showHistoryButton={true}>
      <main className="bg-background rounded-xl shadow-lg p-10 w-full max-w-3xl flex flex-col items-center">
        <div className="bg-primary/10 rounded-full p-4 mb-4">
          <img src={logo} alt="Gardenia Logo" />
        </div>
        
        <h2 className="text-xl font-bold text-center text-secondary mb-2">
          Gardenia Customer Survey
        </h2>
        
        <p className="text-center text-secondary/80 mb-6 text-base">
          Thank you for taking the time to share your feedback. Your insights help us improve our products and services.
        </p>
        
        <button 
          onClick={() => navigate('/survey')} 
          className="bg-primary text-background px-6 py-3 rounded-lg hover:bg-secondary flex items-center text-base"
        >
          Start Survey
          <svg width="20" height="20" viewBox="0 0 20 20" className="ml-2">
            <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </main>
    </Layout>
  );
}
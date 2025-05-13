import React from 'react';
import { useNavigate } from 'react-router-dom';
import gardenia from '../assets/gardenia.svg';

type LayoutProps = {
  children: React.ReactNode;
  showHistoryButton?: boolean;
};

export default function Layout({ children, showHistoryButton = false }: LayoutProps) {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <header className="w-full max-w-xl flex items-center justify-between mb-8">
        <img src={gardenia} alt="Gardenia" />
        {showHistoryButton && (
          <button
            onClick={() => navigate('/history')}
            className="bg-primary text-background font-semibold px-4 py-2 rounded-lg shadow hover:bg-secondary"
          >
            View History
          </button>
        )}
      </header>
      {children}
      <footer className="w-full max-w-xl flex flex-col items-center mt-8">
        <p className="text-secondary/80 text-sm">© 2025 Gardenia. All rights reserved.</p>
      </footer>
    </div>
  );
}
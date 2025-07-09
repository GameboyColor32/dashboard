import { useState, useEffect } from 'react';
import { TicketAnalysis } from './types';
import { loadTicketData, analyzeTickets } from './utils/dataLoader';
import MacroDashboard from './components/MacroDashboard';
import MicroDashboard from './components/MicroDashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { BarChart3, MessageSquare, Loader2 } from 'lucide-react';

function App() {
  const [analysis, setAnalysis] = useState<TicketAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'macro' | 'micro'>('macro');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const tickets = await loadTicketData();
        const analysis = analyzeTickets(tickets);
        setAnalysis(analysis);
      } catch (err) {
        setError('Failed to load ticket data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-600" />
          <p className="text-gray-600">Loading ticket analysis data...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'No data available'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-primary-600 mr-3" />
                <h1 className="text-xl font-semibold text-gray-900">
                  Ticket Analysis Dashboard
                </h1>
              </div>
              
              {/* Navigation */}
              <nav className="flex space-x-4">
                <button
                  onClick={() => setView('macro')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'macro'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4 inline mr-1" />
                  Macro Overview
                </button>
                <button
                  onClick={() => setView('micro')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'micro'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  Chat Analysis
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {view === 'macro' ? (
            <MacroDashboard analysis={analysis} />
          ) : (
            <MicroDashboard analysis={analysis} />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App; 
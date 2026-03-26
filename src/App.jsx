import React, { useEffect, useState } from 'react';
import UTMForm from './components/UTMForm';

function App() {
  const [utmParams, setUtmParams] = useState({});
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Capture UTM parameters from URL on component mount
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get the current page from URL
    const page = urlParams.get('page') || 'home';
    setCurrentPage(page);
    
    const params = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || '',
      IntermediaryCode: urlParams.get('IntermediaryCode') || '',
      LeadGenerator: urlParams.get('LeadGenerator') || '',
      IsZKApp: urlParams.get('IsZKApp') || '',
    };

    // Store UTM parameters in localStorage
    if (Object.values(params).some(value => value !== '')) {
      localStorage.setItem('utmParams', JSON.stringify(params));
      setUtmParams(params);
    } else {
      // Try to load from localStorage if no URL params
      const stored = localStorage.getItem('utmParams');
      if (stored) {
        setUtmParams(JSON.parse(stored));
      }
    }
  }, []);

  const getPageTitle = () => {
    const titles = {
      home: '🏠 Home Page',
      about: '📖 About Us',
      contact: '📞 Contact Us'
    };
    return titles[currentPage] || '🏠 Home Page';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Page Header */}
      <div className="bg-white shadow-md border-b-2 border-blue-500">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600 bg-blue-100 px-2 sm:px-3 py-1 rounded-full">
                Page: <strong>{currentPage}</strong>
              </span>
              <span className="text-xs sm:text-sm text-gray-600 bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                UTM Tracked ✓
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
        <UTMForm utmParams={utmParams} />
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import UTMForm from './components/UTMForm';

function App() {
  const [utmParams, setUtmParams] = useState({});

  useEffect(() => {
    // Capture UTM parameters from URL on component mount
    const urlParams = new URLSearchParams(window.location.search);
    
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
        <UTMForm utmParams={utmParams} />
      </div>
    </div>
  );
}

export default App;
